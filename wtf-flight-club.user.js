// ==UserScript==
// @name         WTF Flight Club
// @namespace    https://github.com/Silverdark/TornScripts
// @version      2025-07-19.1
// @description  Flight Club Helper tools
// @author       Silverdark [3503183], neth [3564828]
// @icon         https://travel.wtf-torn.app/assets/img/wtf-flight.png
// @match        https://www.torn.com/item.php
// @grant        GM_xmlhttpRequest
// @grant        GM_getValue
// @grant        GM_setValue
// @grant        GM_deleteValue
// @grant        GM_registerMenuCommand
// @connect      travel.wtf-torn.app
// ==/UserScript==

(async function() {
    'use strict';

    const allowedItemIds = [
        // Flowers
        "282", // African Violet
        "617", // Banana Orchid
        "271", // Ceibo
        "277", // Cherry Blossom
        "263", // Crocus
        "260", // Dahlia
        "272", // Edelweiss
        "267", // Heather
        "264", // Orchid
        "276", // Peony
        "385", // Tribulus Omanens

        // Plushies
        "384", // Camel
        "273", // Chamois
        "258", // Jaguar
        "215", // Kitten
        "281", // Lion
        "269", // Monkey
        "266", // Nessie
        "274", // Panda
        "268", // Red Fox
        "186", // Sheep
        "618", // Stingray
        "187", // Teddy Bear
        "261", // Wolverine
    ];

    const travelWebsiteUrl = "https://travel.wtf-torn.app/";
    const dataKey_flightClub = "flightClubData";
    const dataKey_publicApiKey = "publicApiKey";
    const event_FlightClubDataChanged = 'flight-club-data-changed';
    const event_FlightClubItemRowChanged = 'flight-club-itemrow-changed';
    const event_PublicApiKeyChanged = 'public-api-key-changed';

    const supportedFlightClubDataVersion = "1.0";
    const flightClubCacheTimeInSeconds = 120;

    const listeners = {};
    const remainingByItemId = new Map();

    let apiKey = await GM.getValue(dataKey_publicApiKey, "###PDA-APIKEY###");

    on(event_FlightClubItemRowChanged, itemRow => {
        const actionsWrap = itemRow.querySelector(".actions-wrap");
        const fcSendContainer = actionsWrap.children[2];
        const fcOriginalSendButton = actionsWrap.children[1];

        // Use the "sell" class as indicator if there is already a send button
        if (fcSendContainer.classList.contains("sell")) return;
        fcSendContainer.classList.add("sell");

        const fcButton = createFlightClubSendButton();
        fcButton.addEventListener("click", function (btnEvt) {
            btnEvt.stopPropagation();
            fcOriginalSendButton.click();

            const actionsNode = btnEvt.target.closest(".cont-wrap");
            if (!actionsNode) return;

            waitForElm(actionsNode, ".user-id-label").then(() => {
                updateSendDetailsToTargetFlightClub(actionsNode);
            });
        });

        fcSendContainer.appendChild(fcButton);
    });

    on(event_FlightClubItemRowChanged, itemRow => {
        updateStatusFlightClubItemRow(itemRow);
    });

    on(event_FlightClubDataChanged, async () => {
        const itemRows = await getFlightClubItemRows();
        for (const itemRow of itemRows) {
            updateStatusFlightClubItemRow(itemRow);
        }
    });

    on(event_PublicApiKeyChanged, async () => {
        remainingByItemId.clear();
        await GM.deleteValue(dataKey_flightClub);
        await initFlightClubData();
    });

    init();

    // Helper functions

    function init() {
        initFlightClubData();
        initFlightClubItemRowChange();

        GM_registerMenuCommand('Set API Key', () => {
            createApiKeyInput();
        });
    }

    async function initFlightClubItemRowChange() {
        const categoryWrapper = await waitForElm(document.body, "#category-wrap");

        const observer = new MutationObserver((mutations) => {
            for (const mutation of mutations) {
                const node = mutation.target;

                if (!isItemRowNode(node)) continue;

                emit(event_FlightClubItemRowChanged, node);
            }
        });

        observer.observe(categoryWrapper, {
            subtree: true,
            attributes: true
        });
    }

    async function getFlightClubItemRows() {
        const categoryWrapper = await waitForElm(document.body, "#category-wrap");
        const nodes = document.querySelectorAll("#category-wrap li");
        return Array.from(nodes).filter(x => isItemRowNode(x));
    }

    function isItemRowNode(node) {
        const itemId = node.dataset.item;
        if (!itemId || !allowedItemIds.includes(itemId)) return false;

        const itemName = node.dataset.sort;
        if (!itemName) return false;

        return true;
    }

    // Send button

    function createFlightClubSendButton() {
        const fcSpan = document.createElement("span");
        fcSpan.className = "icon-h";
        fcSpan.title = "Send to Flight Club";

        const fcButton = document.createElement("button");
        fcButton.className = "wai-btn";
        fcButton.style.width = "34px";

        const fcImage = document.createElement("img");
        fcImage.src = "https://travel.wtf-torn.app/assets/img/wtf-flight.png";
        fcImage.alt = "WTF Flight Club";
        fcImage.style.width = "18px";
        fcImage.style.height = "18px";
        fcImage.style.verticalAlign = "middle";

        const optSpan = document.createElement("span");
        optSpan.className = "opt-name";
        optSpan.textContent = "Flight";

        fcButton.appendChild(fcImage);
        fcSpan.appendChild(fcButton);
        fcSpan.appendChild(optSpan);
        return fcSpan;
    }

    function updateSendDetailsToTargetFlightClub(node) {
        const hiddenAmountTextInput = node.querySelector("input[type=hidden].amount");
        const amountTextInput = node.querySelector("input[type=text].amount");
        hiddenAmountTextInput.value = amountTextInput.dataset.max;
        amountTextInput.value = amountTextInput.dataset.max;

        const receiverTextInput = node.querySelector("input[type=text].user-id");
        receiverTextInput.value = "LwG94 [2772102]";
    }

    // Flight Club Goal status

    async function initFlightClubData() {
        // Disable, when no API key defined
        if (!apiKey || apiKey.trim() === '' || apiKey.startsWith('###')) {
            emit(event_FlightClubDataChanged);
            return;
        }

        // Read data from storage
        let data = await GM.getValue(dataKey_flightClub, null);
        if (data && data.version !== supportedFlightClubDataVersion) {
            await GM.deleteValue(dataKey_flightClub);
            data = null;
        }

        // Load data, if required
        const currentTimestamp = new Date().getTime();
        if (!data || currentTimestamp > data.lastUpdate + flightClubCacheTimeInSeconds * 1000) {
            await GM.deleteValue(dataKey_flightClub);

            const itemDataByItemName = await getCurrentItemDataByItemName();

            data = {
                version: supportedFlightClubDataVersion,
                lastUpdate: currentTimestamp,
                itemDataByItemName,
            };

            await GM.setValue(dataKey_flightClub, data);
        }

        // Transform raw data
        for (const [itemId, itemData] of Object.entries(data.itemDataByItemName)) {
            remainingByItemId.set(itemId, itemData.remaining);
        }

        emit(event_FlightClubDataChanged);
    }

    async function getCurrentItemDataByItemName() {
        const response = await gmFetch(`${travelWebsiteUrl}api/goals/current/items?apikey=${apiKey}`, 'GET');
        return JSON.parse(response.responseText);
    }

    function updateStatusFlightClubItemRow(itemRow) {
        const itemId = itemRow.dataset.item;
        if (!itemId) return;

        let remaining = null;
        for (let [id, val] of remainingByItemId) {
            if (!itemId.includes(id)) continue;

            remaining = val;
            break;
        }

        const nameWrap = itemRow.querySelector(".name-wrap");
        let statusTextNode = nameWrap.querySelector(".flight-club-status");

        if (!remaining) {
            if (statusTextNode) {
                statusTextNode.remove();
            }
            return;
        }

        if (!statusTextNode) {
            statusTextNode = document.createElement("span");
            statusTextNode.className = "qty flight-club-status";

            nameWrap.appendChild(statusTextNode);
        }

        statusTextNode.innerHTML = `(${remaining})`;
        statusTextNode.style.color = remaining < 0 ? "red" : "green";
    }

    // Set API key function

    function createApiKeyInput() {
        const headerRoot = document.getElementById('header-root');
        if (!headerRoot) return;

        const apiKeyInputForm = document.getElementById('apiKeyputId');
        if (apiKeyInputForm) return;

        const wrapper = document.createElement('div');
        wrapper.id = 'apiKeyputId';
        wrapper.style.width = '100%';
        wrapper.style.height = '50px';
        wrapper.style.display = 'flex';
        wrapper.style.flexDirection = 'row';
        wrapper.style.gap = '10px';
        wrapper.style.justifyContent = 'center';
        wrapper.style.alignItems = 'center';;
        wrapper.style.padding = '4px';

        const label = document.createElement('label');
        label.innerText = 'Enter WTF Flight API Key';

        const input = document.createElement('input');
        input.type = 'text';
        input.value = apiKey;
        input.style.width = '140px';
        input.style.padding = '4px';

        const submit = document.createElement('button');
        submit.classList.add('torn-btn');
        submit.innerText = 'Submit';
        submit.onclick = () => {
            apiKey = input.value;
            GM_setValue(dataKey_publicApiKey, apiKey);
            wrapper.remove();

            emit(event_PublicApiKeyChanged);
        }

        wrapper.appendChild(label);
        wrapper.appendChild(input);
        wrapper.appendChild(submit);
        headerRoot.parentNode.insertBefore(wrapper, headerRoot);
    }

    // Utilities

    // Source: https://stackoverflow.com/a/61511955
    function waitForElm(parent, selector) {
        return new Promise(resolve => {
            if (parent.querySelector(selector)) {
                return resolve(parent.querySelector(selector));
            }

            const observer = new MutationObserver(mutations => {
                if (parent.querySelector(selector)) {
                    observer.disconnect();
                    resolve(parent.querySelector(selector));
                }
            });

            observer.observe(document.body, {
                childList: true,
                subtree: true
            });
        });
    }

    function gmFetch(url, method, headers = {}, data = '') {
        return new Promise((resolve, reject) => {
            GM_xmlhttpRequest({
                method: method,
                url: url,
                headers: headers,
                data: data,
                onload: resolve,
                onerror: reject,
            })
        })
    }

    // Event handling

    function on(event, callback) {
        if (!listeners[event]) listeners[event] = [];
        listeners[event].push(callback);
    }

    function emit(event, data) {
        (listeners[event] || []).forEach(cb => cb(data));
    }
})();
