async function checkGrammar(text) {
    return new Promise((resolve) => {
        chrome.runtime.sendMessage(
            {
                type: "CHECK_GRAMMAR",
                text
            },
            (response) => resolve(response)
        );
    });
}