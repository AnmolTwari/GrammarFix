let debounceTimer;

async function checkCurrentText(element = GrammarState.target) {

    clearHighlights();

    const text = element.isContentEditable
        ? element.innerText
        : element.value;

    if (GrammarState.text !== text) {
        GrammarState.ignoredSuggestions = [];
    }

    if (!text.trim()) {
        removeSuggestionPopup();
        return;
    }

    const result = await checkGrammar(text);

    result.matches = result.matches.filter(match =>
        !GrammarState.ignoredSuggestions.includes(match.offset)
    );

    GrammarState.target = element;
    GrammarState.text = text;
    GrammarState.matches = result.matches;
    GrammarState.currentIndex = 0;
GrammarState.selectedMatch = result.matches[0] || null;

renderHighlights(result.matches);
showSuggestions(result.matches);
}

document.addEventListener("input", (event) => {

    const element = event.target;

    const isEditable =
        element.matches("textarea") ||
        element.matches("input[type='text']") ||
        element.isContentEditable;

    if (!isEditable) return;

    clearTimeout(debounceTimer);

    debounceTimer = setTimeout(() => {

        checkCurrentText(element);

    }, 500);

});
