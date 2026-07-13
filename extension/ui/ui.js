function showSuggestions(matches) {

    removeSuggestionPopup();

    if (!matches || matches.length === 0) {
        return;
    }

    GrammarState.matches = matches;

    renderSuggestion();
}

function renderSuggestion() {

    removeSuggestionPopup();

    const match = GrammarState.matches[GrammarState.currentIndex];

    if (!match) return;

    createSuggestionPopup(
        match.message,
        match.replacements[0]?.value || "No suggestion",
        GrammarState.currentIndex + 1,
        GrammarState.matches.length
    );
}