document.addEventListener("keydown", (event) => {

    const popup = document.getElementById("grammarfix-popup");

    if (!popup) return;

    switch (event.key) {

        case "Escape":
            removeSuggestionPopup();
            break;

        case "Enter":
            event.preventDefault();
            applyCorrection();
            break;

        case "ArrowRight":

            if (GrammarState.currentIndex < GrammarState.matches.length - 1) {

                GrammarState.currentIndex++;
                GrammarState.selectedMatch =
                    GrammarState.matches[GrammarState.currentIndex];

                renderSuggestion();
            }

            break;

        case "ArrowLeft":

            if (GrammarState.currentIndex > 0) {

                GrammarState.currentIndex--;
                GrammarState.selectedMatch =
                    GrammarState.matches[GrammarState.currentIndex];

                renderSuggestion();
            }

            break;

    }

});