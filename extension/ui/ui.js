function showSuggestions(matches) {

    removeSuggestionPopup();

    if (!matches || matches.length === 0) {
        return;
    }

    GrammarState.matches = matches;

    renderSuggestion();
}

function ignoreCurrentSuggestion() {

    GrammarState.ignoredSuggestions.push(
        GrammarState.selectedMatch.offset
    );

    GrammarState.matches = GrammarState.matches.filter(match =>
        match.offset !== GrammarState.selectedMatch.offset
    );

    GrammarState.currentIndex = Math.min(
        GrammarState.currentIndex,
        GrammarState.matches.length - 1
    );

    GrammarState.selectedMatch =
        GrammarState.matches[GrammarState.currentIndex] || null;

    removeSuggestionPopup();

    if (GrammarState.selectedMatch) {
        renderSuggestion();
    }
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
