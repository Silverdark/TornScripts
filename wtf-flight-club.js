// ==UserScript==
// @name         WTF Flight Club
// @namespace    http://tampermonkey.net/
// @version      2025-04-25.1
// @description  Flight Club Helper tools
// @author       Silverdark [3503183]
// @match        https://www.torn.com/item.php
// @grant        GM_addStyle
// ==/UserScript==

(function() {
    'use strict';

    const enableButton = true;
    const enableItemRowHightlight = true;

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

    GM_addStyle(`
        .flight-club-item-row {
            background-color: var(--default-bg-blue-color) !important;
        }

        .flight-club-item-row:hover {
            background-color: var(--default-bg-blue-hover-color) !important;
        }
    `);

    waitForElm(document.body, "#category-wrap").then(categoryWrapper => {
        if (!enableItemRowHightlight) return;

        const observer = new MutationObserver((mutations) => {
            for (const mutation of mutations) {
                const mutationTarget = mutation.target;

                const itemId = mutationTarget.dataset.item;
                if (!itemId || !allowedItemIds.includes(itemId)) continue;

                if (!mutationTarget.classList.contains("flight-club-item-row")) {
                    mutationTarget.classList.add("flight-club-item-row");
                }
            }
        });

        observer.observe(categoryWrapper, {
            subtree: true,
            attributes: true
        });
    });

    // Flight Club Button handling
    document.addEventListener("click", function (evt) {
        if (!enableButton) return;

        const actionsNode = evt.target.closest(".cont-wrap");
        if (!actionsNode) return;

        const parentNode = actionsNode.parentNode;
        if (!parentNode) return;

        const itemCategory = parentNode.dataset.category;
        if (itemCategory !== "Plushie" && itemCategory !== "Flower") return;

        const itemId = parentNode.dataset.item;
        if (!allowedItemIds.includes(itemId)) return;

        waitForElm(actionsNode, ".btn-wrap").then(btnWrapNode => {
            // Don't do anything when the flight club button is already available.
            if (btnWrapNode.querySelector('[data-flightclub="true"]')) return;

            const flightClubBtn = createFlightClubButton();
            flightClubBtn.addEventListener("click", function (btnEvt) {
                const hiddenAmountTextInput = actionsNode.querySelector("input[type=hidden].amount");
                const amountTextInput = actionsNode.querySelector("input[type=text].amount");
                hiddenAmountTextInput.value = amountTextInput.dataset.max;
                amountTextInput.value = amountTextInput.dataset.max;

                const receiverTextInput = actionsNode.querySelector("input[type=text].user-id");
                receiverTextInput.value = "Hecle [3099100]";
            });

            btnWrapNode.prepend(flightClubBtn);
        });
    }, false);

    // Utilities

    function createFlightClubButton() {
        const flightClubInnerBtn = document.createElement("div");
        flightClubInnerBtn.className = "torn-btn";
        flightClubInnerBtn.textContent = "Flight Club";

        const flightClubBtn = document.createElement("div");
        flightClubBtn.dataset.flightclub = "true";
        flightClubBtn.className = "btn";

        flightClubBtn.appendChild(flightClubInnerBtn);
        return flightClubBtn;
    }

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
})();
