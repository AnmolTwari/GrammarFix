function renderHighlights(matches) {

    clearHighlights();

    if (!matches || matches.length === 0) return;

    if (!GrammarState.target.isContentEditable) return;

    matches.forEach((match, index) => {

        const range = getRangeFromOffset(
            GrammarState.target,
            match.offset,
            match.length
        );

        if (!range) return;

        const rect = range.getBoundingClientRect();

        createHighlight(rect, match, index);

    });

}

function createHighlight(rect, match, index) {

    if (rect.width === 0)
        return;

    const highlight = document.createElement("div");

    highlight.className = "grammarfix-highlight";

    highlight.style.position = "absolute";
    highlight.style.left = `${rect.left + window.scrollX}px`;
    highlight.style.top = `${rect.bottom + window.scrollY - 2}px`;
    highlight.style.width = `${Math.max(rect.width, 10)}px`;
    highlight.style.height = "3px";

    highlight.dataset.index = index;

    highlight.onclick = () => {

        GrammarState.currentIndex = index;
        GrammarState.selectedMatch = match;

        GrammarState.popupRect = rect;

        renderSuggestion();

    };

    document.body.appendChild(highlight);

    GrammarState.highlights.push({
        element: highlight,
        match,
        index
    });

}

function getTextNodes(root) {

    const walker = document.createTreeWalker(
        root,
        NodeFilter.SHOW_TEXT,
        null
    );

    const nodes = [];

    while (walker.nextNode()) {

        if (walker.currentNode.textContent.trim() !== "") {
            nodes.push(walker.currentNode);
        }
    }

    return nodes;

}

function getRangeFromOffset(root, offset, length) {

    const walker = document.createTreeWalker(
        root,
        NodeFilter.SHOW_TEXT,
        null
    );

    let current = 0;
    let startNode = null;
    let endNode = null;
    let startOffset = 0;
    let endOffset = 0;

    while (walker.nextNode()) {

        const node = walker.currentNode;
        const nodeLength = node.textContent.length;

        if (!startNode && offset >= current && offset < current + nodeLength) {

            startNode = node;
            startOffset = offset - current;

        }

        if (startNode &&
            offset + length <= current + nodeLength) {

            endNode = node;
            endOffset = offset + length - current;

            break;

        }

        current += nodeLength;

    }

    if (!startNode || !endNode)
        return null;

    const range = document.createRange();

    range.setStart(startNode, startOffset);
    range.setEnd(endNode, endOffset);

    return range;

}

function clearHighlights() {

    GrammarState.highlights.forEach(item => {

        item.element.remove();

    });

    GrammarState.highlights = [];

}

function removeHighlight(index) {

    const highlight = GrammarState.highlights.find(
        item => item.index === index
    );

    if (!highlight) return;

    highlight.element.remove();

    GrammarState.highlights =
        GrammarState.highlights.filter(
            item => item.index !== index
        );

}
