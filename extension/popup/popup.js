document.getElementById("wordCount").textContent = 124;
document.getElementById("characterCount").textContent = 742;
document.getElementById("issueCount").textContent = 5;
document.getElementById("score").textContent = 92;

document.getElementById("checkNow").onclick = () => {
    alert("Coming soon!");
};

document.getElementById("settings").onclick = () => {
    chrome.runtime.openOptionsPage();
};
