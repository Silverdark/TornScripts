// ==UserScript==
// @name         WTF Flight Club
// @namespace    https://github.com/Silverdark/TornScripts
// @version      2025-04-29.1
// @description  Flight Club Helper tools
// @author       Silverdark [3503183]
// @icon         data:image/png;base64,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
// @match        https://www.torn.com/item.php
// @grant        GM_xmlhttpRequest
// @grant        GM_getValue
// @grant        GM_setValue
// @grant        GM_deleteValue
// @connect      travel.torn.wtf
// ==/UserScript==

(async function() {
    'use strict';

    // Insert Torn Public API key here, used to authenticate you on the Flight Club page: https://travel.torn.wtf/
    // Quick link to create a new one: https://www.torn.com/preferences.php#tab=api?&step=addNewKey&title=WTF%20Stuffed%20Flowers%20Inc&type=1
    const apiKey = 'INSERT-PUBLIC-API-KEY';

    // Do not touch from here on

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

    const travelWebsiteUrl = "https://travel.torn.wtf/";
    const flightClubDataKey = "flightClubData";
    const event_FlightClubDataChanged = 'flight-club-data-changed';
    const event_FlightClubItemRowChanged = 'flight-club-itemrow-changed';

    const supportedFlightClubDataVersion = "1.0";
    const flightClubCacheTimeInSeconds = 120;

    const listeners = {};
    const remainingByItemName = new Map();

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

    init();

    // Helper functions

    function init() {
        initFlightClubData();
        initFlightClubItemRowChange();
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
        fcImage.src = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAABhGlDQ1BJQ0MgcHJvZmlsZQAAKJF9kT1Iw0AYht+mlYpUROwg6pChOtlFRRxLFYtgobQVWnUwufQPmjQkKS6OgmvBwZ/FqoOLs64OroIg+APiLjgpukiJ3yWFFjEeHPfw3r3vffcdIDSrTDUDMUDVLCOdiIu5/KoYfEUAoxgEMCsxU09mFrPwHF/38PH1LsqzvM/9OfqVgskAn0gcY7phEW/wezctnfM+cZiVJYX4nHjSoAKJH7kuu/zGueSwwDPDRjY9TxwmFktdLHcxKxsq8QxxRFE1yhdyLiuctzir1Tpr18lfGCpoKxmu0xxDAktIIgURMuqooAoLUVo1UkykaT/u4R9x/ClyyeSqgJFjATWokBw/+B/87q1ZnJ5yk0JxoOfFtj/GgeAu0GrY9vexbbdOAP8zcKV1/LUmMPdJeqOjRY6AgW3g4rqjyXvA5Q4w/KRLhuRIfppCsQi8n9E35YGhW6Bvze1bex+nD0CWerV8AxwcAhMlyl73eHdvd9/+PdPu3w+/F3LFwJwPtgAAAAZiS0dEAP8A/wD/oL2nkwAAAAlwSFlzAAAuIwAALiMBeKU/dgAAAAd0SU1FB+kEGxEMJAJV9C4AAAAZdEVYdENvbW1lbnQAQ3JlYXRlZCB3aXRoIEdJTVBXgQ4XAAAINklEQVRYw7WXe4xcVR3HP+c+Zu6dmTszO/vodtvudtst0NJugYJgiSAJYiRKYlCeKvifvBFrIKFCIpIIoZqIjxixUBRbEIJoJCABbAW1CKbt9gUt4L5nZ2dnZ+beedy5j+Mfw7LbspaFyDc5uSc559zf935/v9/5/a5gDt4dyytCEYaQaEIQImRDUaW3tK1d8glBzExGJqcivs/ZCK4WktVCUAT5N4R4UYQcXra4tfaJEhiamPqMlDwEnHTcnkHgl0LwSPei1vH/NwFtZlKtuRsjEX2lqigASCSiya8H+L6UrB7KTm7u7mwfOv4l249siSouG6SU5wDtAnZfvm7THz4SAdfzvYbnB6qqqALQdY2Irs/dd4VECYayhVu7OzMlgN+8eZ+hu8olbrl+eWE6v94L/E5FKGbMNN/aMfCAd8W6TX9esAsOHR3L+NK7J5Dyi6qiBIm42aYIxTpufxEh7nw1d9+vCNo2BqG3uWQXz6pUK4lMS5tqRA1kGJKfzst4LP7PpJW66cp1331jQQQA9h8ZVKUQUV3T7ohE9O/NuONYBC8P5J/bm3XevrpQKrRZcUukrTSI2Ve5DZdCcYqUlXoqZsQ2IZTBK/s3zZtJx1hYu6on0ITSCPygUKnUaHgenu8ThOFcAuervnqLU7XbuzqWiHQyg0TS8Bu4vosf+ESjUZJWCrtiX+p6jU1SkS0LUmAGB98eXFz3wh8pirhIU9W8aUSXaqoaax4QhPUB3qzsoxDUqTWqFCsFao0qoZREVB3LTJGMpXAqFepurdGaab8/6nPPZWfe0TihAjOoSyWradqtQoiLBTwthAhm1iQhHUaM05OdCN9jOP8fJkpjlGvTOPUShUqe0cIgk+Uc8VgcXdMjhUL+hkBXrvtQF8zgjL5lsr9v2cT6VT27JcFw2amEdbdBEEqUsI4i67TpMTYkOpGB9wEx/dAnX85ScR3SqRYkMl0oTX37d/vuv3RBBGbw4J67DEv5V6+lliNe3abmFIh4E+iigkCwPNHOF5ZuIKJoHzjrhR5OvYyUkrZMu6i7bo/tlO/cvve+jb8/tEV8KIEnDv44k/T0W0q16W90m4PmSmuMldYIHdEJFJpBqSkq/a29fGbRWnRF/SAJv4GUIaqi0t7aQaVaOb1aq94V+vKkl0YeEQDqfMa373vgNNsubS465W/lg1pLi5GgI6KizYbC7E2mqHSYaSoNl2x9GslstiWMJJaZQhEKqqKiqRp2xe4DusZz2VeefeRV+xjttu/f0hb43rXjuZGrBaI/ZaUVwzA5UM1jqjpdUWtetayIyQVL+ik2HI7a40gkilCIRxOoc5QxDROnYhNK+eVKrWID12q377hM9PX2t5hR7ZLC1MT1ZcdenWlpTcTNOKra5FcNPfY6E0QUlTY9Ni+JjGFxcc9Z7Di6k5xbImVmsIzkTD0hDEPqbh2namOaMWE7pQsAtIhuLHacwhO1mvYpKQNtWVePUFWVIAhwqg6aqiEQFLSAAWeCM60uLC06L4nOWAtf6jmbv2QPkEi0omsR/MCnXq8xWcghpQwksrz/zT2FklPaCqD5gW/U3fqqeCymW/EkqtqUrO7WGTi8ByEEiqLSu2wFmqpysDrJ+kQnxjyRL9HoTq3gc9F2DthjFKo5pksFqvUKAmV4LDfyWskpPhMo/vOP3/xaDkAby41OIpWHNVW9LQzRo5EoiqKiKIJo1KDFytDR1kHMjCOFYNC1ccsuP/jOQ6TjBqoya9zHIERFymYa1hpVao2CtKezjUapmgyrwfmEnCclW5I6lD18bduNO+1rfnreg4oqeltSma/mC5OivXURvu/j+S6JRIJ6o052Mku1WsOyLKajaV7YuZdffw26WxfU9ETfG81qEsJfD8MPX8DXALbduGv0m784/25FUZamk+lPTxXzwooniZtJDh05QCQSIRFPYBgGYxNDkGm66aK1sDTz0bugMATXB16Y05A8fN3Ow9f8jE1R/eRtYRj26ZouTlm5mjAIUFUNIQQNz6VWryGDcK7jTwjXbz6jGth12DfcPNLw57kJt92w8x/vDL2zOQzDrFOxcRsukUgUP/CxKzaj2TFKThE9os9fT+eZP/k6HBhtGn3tXXj07+D587RkM6j02U+OjA93LlvUfW/ZLiU0VWO6NMVYbhRN0YkZMaQM3/fl02/AWb3QkYSnXofzToLWBDw3APEoPLQLzu2DUDbX6z74Egz9f9SCxz+/OyzZxa2T07mfBEEQFIpTJBMpTu5dwyl9a1jdt5ZYLP7+fuc9WXMluGor7BmCKQf+tBcsA8wIJM3mMxOH1jikzVnXzVuMHr1plzNVzD5YKE0+JpGyWJ7GNEwieoSYGUPXmvQVARuWwxuD8O8h+Mp6ODjWJHTOCji9B/ra4bOnwOrFcEYP9C+F07qbipywGm69fld2ODt8b7E8/bJQRDhZyBEEAQ2vQS6fbbpZNKXPluDZfXDVOTBWhGf2wKlLQFebHxqETYOS2TETIyfsB3578ytvvTN49O5KtXogCHzGJ8cYzQ4ThvL9spgyYc3iZqBt7IMlLTBehBUdzfUOC57fD6PTTRLhcVmjfljODjw/PLT83OR40kqfHNUMt+G5Bw4dOrxr/4uD62+7EFpisLwNLu6HpS2wsgMuXANdaVAVWLUI2ixYkoZlmeZ6woAjE7DjdUJtIReHWRF/3HN49zASC2R212MHY8DXZz6mI9kcAJ2pY892pWFx6piunSCcDcIFEfj57S+FwNwfjHUAB0fB+Ri/rEEIb0+eoC1fANYCA6e242fiH+MqljA4BSMOwX8B6LCvWyw8+JwAAAAASUVORK5CYII=";
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
        receiverTextInput.value = "Hecle [3099100]";
    }

    // Flight Club Goal status

    async function initFlightClubData() {
        // Disable, when no API key defined
        if (apiKey === 'INSERT-PUBLIC-API-KEY') return;

        // Read data from storage
        let data = await GM.getValue(flightClubDataKey, null);
        if (data && data.version !== supportedFlightClubDataVersion) {
            await GM.deleteValue(flightClubDataKey);
            data = null;
        }

        // Load data, if required
        const currentTimestamp = new Date().getTime();
        if (!data || currentTimestamp > data.lastUpdate + flightClubCacheTimeInSeconds * 1000) {
            await ensureFlightClubLoggedIn();
            const itemDataByItemName = await getCurrentItemDataByItemName();

            data = {
                version: supportedFlightClubDataVersion,
                lastUpdate: currentTimestamp,
                itemDataByItemName,
            };

            await GM.setValue(flightClubDataKey, data);
        }

        // Transform raw data
        for (const [itemName, itemData] of Object.entries(data.itemDataByItemName)) {
            remainingByItemName.set(itemName, itemData.remaining);
        }

        emit(event_FlightClubDataChanged, remainingByItemName);
    }

    async function ensureFlightClubLoggedIn() {
        const loginPageResponse = await gmFetch(`${travelWebsiteUrl}`, 'GET');
        const { responseText } = loginPageResponse;

        if (responseText.includes('You are logged in as')) return;

        const parser = new DOMParser();
        const doc = parser.parseFromString(responseText, 'text/html');
        const token = doc.querySelector('#loginForm > input[type=hidden]').value;
        await gmFetch(`${travelWebsiteUrl}login`, 'POST',
            {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            `_token=${encodeURIComponent(token)}&apikey=${encodeURIComponent(apiKey)}`
        );
    }

    async function getCurrentItemDataByItemName() {
        const plushieDataByItemName = await getItemDataByItemNameFromPage(`${travelWebsiteUrl}dashboard`);
        const flowerDataByItemName = await getItemDataByItemNameFromPage(`${travelWebsiteUrl}dashboard/flowers`);
        return Object.assign({}, plushieDataByItemName, flowerDataByItemName);
    }

    async function getItemDataByItemNameFromPage(page) {
        const response = await gmFetch(page, 'GET');
        const responseText = response.responseText;

        const parser = new DOMParser();

        const doc = parser.parseFromString(responseText, 'text/html');
        const table = doc.querySelector('#overview_table > tbody');

        const itemDataByItemName = {};
        for (const row of table.children) {
            const itemName = Array.from(row.children[0].childNodes)
                .find(x => x.nodeType === Node.TEXT_NODE)
                .textContent
                .trim();

            itemDataByItemName[itemName] = {
                received: row.children[1].textContent,
                remaining: row.children[2].textContent,
                done: row.children[3].textContent.trim(),
            };
        }

        return itemDataByItemName;
    }

    function updateStatusFlightClubItemRow(itemRow) {
        const itemName = itemRow.dataset.sort;
        if (!itemName) return;

        let remaining = null;
        for (let [name, val] of remainingByItemName) {
            if (!itemName.includes(name)) continue;

            remaining = val;
            break;
        }

        if (!remaining) return;

        const nameWrap = itemRow.querySelector(".name-wrap");
        let statusTextNode = nameWrap.querySelector(".flight-club-status");
        if (!statusTextNode) {
            statusTextNode = document.createElement("span");
            statusTextNode.className = "qty flight-club-status";

            nameWrap.appendChild(statusTextNode);
        }

        statusTextNode.innerHTML = `(${remaining})`;
        statusTextNode.style.color = remaining < 0 ? "red" : "green";
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
