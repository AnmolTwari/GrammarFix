function createSuggestionPopup(message, suggestion, current, total) {

    removeSuggestionPopup();

    const popup = document.createElement("div");

    popup.id = "grammarfix-popup";

    const rect = GrammarState.target.getBoundingClientRect();

    popup.style.position = "fixed";
    popup.style.top = `${rect.bottom + 8}px`;
    popup.style.left = `${rect.left}px`;

    popup.innerHTML = `
        <h3>GrammarFix Beta</h3>

        <small>Issue ${current} of ${total}</small>

        <p>${message}</p>

        <button id="applySuggestion">
            ✔ ${suggestion}
        </button>

        <div class="gf-nav">

            <button id="prevIssue">◀ Previous</button>

            <button id="nextIssue">Next ▶</button>

        </div>

        <button id="ignoreSuggestion">
            Ignore this suggestion
        </button>
    `;

    document.body.appendChild(popup);

    document.getElementById("applySuggestion").onclick = applyCorrection;

    document.getElementById("ignoreSuggestion").onclick = removeSuggestionPopup;

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
