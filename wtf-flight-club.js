// ==UserScript==
// @name         WTF Flight Club
// @namespace    http://tampermonkey.net/
// @version      2025-04-26.1
// @description  Flight Club Helper tools
// @author       Silverdark [3503183]
// @match        https://www.torn.com/item.php
// @grant        none
// ==/UserScript==

(function() {
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

    onFlightClubItemRowChanged(itemRow => {
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

    // Helper functions

    function createFlightClubSendButton() {
        const fcSpan = document.createElement("span");
        fcSpan.className = "icon-h";
        fcSpan.title = "Send to Flight Club";

        const fcButton = document.createElement("button");
        fcButton.className = "option-sell wai-btn";

        const optSpan = document.createElement("span");
        optSpan.className = "opt-name";
        optSpan.textContent = "Flight";

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

    function onFlightClubItemRowChanged(callback) {
        waitForElm(document.body, "#category-wrap").then(categoryWrapper => {
            const observer = new MutationObserver((mutations) => {
                for (const mutation of mutations) {
                    const mutationTarget = mutation.target;

                    const itemId = mutationTarget.dataset.item;
                    if (!itemId || !allowedItemIds.includes(itemId)) continue;

                    callback(mutationTarget);
                }
            });

            observer.observe(categoryWrapper, {
                subtree: true,
                attributes: true
            });
        });
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
})();
