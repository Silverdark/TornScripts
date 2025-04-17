// ==UserScript==
// @name         WTF Flight Club
// @namespace    http://tampermonkey.net/
// @version      2025-04-17.2
// @description  Flight Club Helper tools
// @author       Silverdark [3503183]
// @match        https://www.torn.com/item.php
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

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
})();
