// ==UserScript==
// @name         WTF Flight Club
// @namespace    http://tampermonkey.net/
// @version      2025-04-16
// @description  Flight Club Helper tools
// @author       Silverdark [3503183]
// @match        https://www.torn.com/item.php
// @grant        GM_xmlhttpRequest
// @connect      travel.torn.wtf
// ==/UserScript==

(function() {
    'use strict';

    const remainingByItemName = new Map();

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

    function updateItemListEntry(listItem) {
        const sortId = listItem.dataset.sort;
        if (!sortId) return;

        let remaining = null;
        for (let [itemName, val] of remainingByItemName) {
            if (!sortId.includes(itemName)) continue;

            remaining = val;
            break;
        }

        if (!remaining) return;

        const nameWrap = listItem.querySelector(".name-wrap");
        let remainingFlightClubElement = nameWrap.querySelector(".flight-club-remaining");
        if (!remainingFlightClubElement) {
            remainingFlightClubElement = document.createElement("span");
            remainingFlightClubElement.className = "flight-club-remaining";

            nameWrap.appendChild(remainingFlightClubElement);
        }

        const remainingText = remaining < 0 ? "Done" : `x${remaining}`;
        remainingFlightClubElement.innerHTML = `FC: <span class="bold">${remainingText}</span>`;
    }

    function fetchData(type) {
        const url = type === "Plushies"
            ? "https://travel.torn.wtf/dashboard"
            : "https://travel.torn.wtf/dashboard/flowers";

        return new Promise(resolve => {
            GM_xmlhttpRequest({
                method: 'GET',
                url: url,
                anonymous: false,
                onload: function (response) {
                    if (response.status !== 200) {
                        console.error(`Request failed with status ${response.status}`);
                        return;
                    }

                    if (response.responseText.includes("Please login below with your existing Torn")) {
                        console.log("No Flight Club cookie available");
                        return;
                    }

                    const parser = new DOMParser();
                    const targetDocument = parser.parseFromString(response.responseText, "text/html");

                    const overviewTable = targetDocument.querySelector("#overview_table");
                    if (!overviewTable) {
                        console.error('Overview table not found in response');
                        return;
                    }

                    for (let row of Array.from(overviewTable.rows).slice(1))
                    {
                        const cells = row.cells;

                        const itemName = Array.from(cells[0].childNodes)
                        .find(x => x.nodeType === Node.TEXT_NODE)
                        .textContent
                        .trim();

                        const remaining = cells[2].textContent;
                        remainingByItemName.set(itemName, remaining);
                    }

                    resolve();
                },
                onerror: function(error) {
                    console.error('Request failed:', error);
                }
            });
        });
    }

    // Changes in category
    waitForElm(document.body, "#category-wrap").then(categoryWrapper => {
        const observer = new MutationObserver((mutations) => {
            for (const mutation of mutations) {
                const mutationTarget = mutation.target;
                updateItemListEntry(mutationTarget);
            }
        });

        observer.observe(categoryWrapper, {
            subtree: true,
            attributes: true
        });
    });

    // Flight Club Button handling
    document.addEventListener("click", function (evt) {
        const actionsNode = evt.target.closest(".cont-wrap");
        if (!actionsNode) return;

        const parentNode = actionsNode.parentNode;
        if (!parentNode) return;

        const itemCategory = parentNode.dataset.category;
        if (itemCategory !== "Plushie" && itemCategory !== "Flower") return;

        waitForElm(actionsNode, ".btn-wrap").then(btnWrapNode => {
            // Don't do anything when the flight club button is already available.
            if (btnWrapNode.querySelector('[data-flightclub="true"]')) return;

            const flightClubInnerBtn = document.createElement("div");
            flightClubInnerBtn.className = "torn-btn";
            flightClubInnerBtn.textContent = "Flight Club";
            flightClubInnerBtn.addEventListener("click", function (btnEvt) {
                const hiddenAmountTextInput = actionsNode.querySelector("input[type=hidden].amount");
                const amountTextInput = actionsNode.querySelector("input[type=text].amount");
                hiddenAmountTextInput.value = amountTextInput.dataset.max;
                amountTextInput.value = amountTextInput.dataset.max;

                const receiverTextInput = actionsNode.querySelector("input[type=text].user-id");
                receiverTextInput.value = "Hecle [3099100]";
            });

            const flightClubBtn = document.createElement("div");
            flightClubBtn.dataset.flightclub = "true";
            flightClubBtn.className = "btn";

            flightClubBtn.appendChild(flightClubInnerBtn);
            btnWrapNode.prepend(flightClubBtn);
        });
    }, false);

    // Fetch data from Flight Club page
    Promise.all(fetchData("Plushies"), fetchData("Flowers")).then(() => {
        const plushies = Array.from(document.querySelector("#plushies-items").getElementsByTagName("li"));
        plushies.forEach(x => updateItemListEntry(x));

        const flowers = Array.from(document.querySelector("#flowers-items").getElementsByTagName("li"));
        flowers.forEach(x => updateItemListEntry(x));
    });
})();
