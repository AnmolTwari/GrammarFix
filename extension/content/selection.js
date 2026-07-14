function getCaretRect() {

    const selection = window.getSelection();

    if (!selection.rangeCount) {
        return null;
    }

    const range = selection.getRangeAt(0);

    return range.getBoundingClientRect();

}