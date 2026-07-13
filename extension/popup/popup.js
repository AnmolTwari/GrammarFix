function createSuggestionPopup(message, suggestion) {

    removeSuggestionPopup();

    const popup = document.createElement("div");
    popup.id = "grammarfix-popup";

    popup.innerHTML = `
        <h3>GrammarFix</h3>

        <p>${message}</p>

        <button id="applySuggestion">
            ✔ ${suggestion}
        </button>

        <button id="ignoreSuggestion">
            Ignore
        </button>
    `;

    document.body.appendChild(popup);

    document
        .getElementById("applySuggestion")
        .addEventListener("click", applyCorrection);

    document
        .getElementById("ignoreSuggestion")
        .addEventListener("click", removeSuggestionPopup);
}

function removeSuggestionPopup() {

    const popup = document.getElementById("grammarfix-popup");

    if (popup) {
        popup.remove();
    }
}