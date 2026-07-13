function applyCorrection() {

    if (!GrammarState.target || !GrammarState.selectedMatch) {
        return;
    }

    const text = GrammarState.target.isContentEditable
        ? GrammarState.target.innerText
        : GrammarState.target.value;

    const before = text.substring(
        0,
        GrammarState.selectedMatch.offset
    );

    const after = text.substring(
        GrammarState.selectedMatch.offset +
        GrammarState.selectedMatch.length
    );

    const replacement =
        GrammarState.selectedMatch.replacements[0]?.value || "";

    const newText = before + replacement + after;

    if (GrammarState.target.isContentEditable) {
        GrammarState.target.innerText = newText;
    } else {
        GrammarState.target.value = newText;
    }

    // Close current popup
    removeSuggestionPopup();

    // Trigger grammar check again
    checkCurrentText(GrammarState.target);
}