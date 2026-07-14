function createSuggestionPopup(message, suggestion, current, total) {

    removeSuggestionPopup();

    const popup = document.createElement("div");

    popup.id = "grammarfix-popup";

    popup.innerHTML = `
<div class="gf-header">
    <span class="gf-logo">🟦 GrammarFix</span>

    <button id="gf-close">✕</button>
</div>

<div class="gf-body">

    <div class="gf-message">
        ⚠ ${message}
    </div>

    <div class="gf-label">
        Replace with
    </div>

    <button
        id="applySuggestion"
        class="grammarfix-btn">

        ✔ ${suggestion}

    </button>

</div>

<div class="gf-footer">

    <button
        id="ignoreSuggestion"
        class="grammarfix-ignore">

        Ignore

    </button>

    <div class="gf-counter">

        <button id="prevIssue">◀</button>

        <span>

            ${current}/${total}

        </span>

        <button id="nextIssue">▶</button>

    </div>

</div>
    `;

    const rect = GrammarState.popupRect ??
                 GrammarState.target.getBoundingClientRect();

    popup.style.position = "fixed";
    popup.style.top = `${rect.bottom + 10}px`;
    popup.style.left = `${rect.left}px`;

    if (rect.bottom + 250 > window.innerHeight) {
        popup.style.top =
            `${rect.top - 220}px`;
    }

    const popupWidth = 340;
    const margin = 10;

    if (rect.left + popupWidth > window.innerWidth) {
        popup.style.left = `${window.innerWidth - popupWidth - margin}px`;
    }

    document.body.appendChild(popup);

    document.getElementById("applySuggestion").onclick = applyCorrection;

    document.getElementById("ignoreSuggestion").onclick = ignoreCurrentSuggestion;

    document
        .getElementById("gf-close")
        .onclick = removeSuggestionPopup;

    const prevButton = document.getElementById("prevIssue");
    const nextButton = document.getElementById("nextIssue");

    prevButton.disabled = GrammarState.currentIndex === 0;
    nextButton.disabled =
        GrammarState.currentIndex === GrammarState.matches.length - 1;

    prevButton.onclick = () => {

        if (GrammarState.currentIndex > 0) {

            GrammarState.currentIndex--;

            GrammarState.selectedMatch =
                GrammarState.matches[GrammarState.currentIndex];

            renderSuggestion();
        }

    };

    nextButton.onclick = () => {

        if (GrammarState.currentIndex < GrammarState.matches.length - 1) {

            GrammarState.currentIndex++;

            GrammarState.selectedMatch =
                GrammarState.matches[GrammarState.currentIndex];

            renderSuggestion();
        }

    };

}

function removeSuggestionPopup() {

    const popup = document.getElementById("grammarfix-popup");

    if (popup) {
        popup.remove();
    }

}
