chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {

    if (request.type !== "CHECK_GRAMMAR") return;

    fetch("http://localhost:8081/v2/check", {
        method: "POST",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded"
        },
        body: new URLSearchParams({
            text: request.text,
            language: "en-US"
        })
    })
    .then(response => response.json())
    .then(data => sendResponse(data))
    .catch(error => {
        console.error(error);
        sendResponse({ error: error.message });
    });

    return true;
});