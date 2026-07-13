console.log("GrammarFix Loaded!");

let debounceTimer;

document.addEventListener("input", async (event) => {
  const element = event.target;

  const isEditable =
    element.matches("textarea") ||
    element.matches("input[type='text']") ||
    element.isContentEditable;

  if (!isEditable) return;

  clearTimeout(debounceTimer);

  debounceTimer = setTimeout(async () => {
    const text = element.isContentEditable ? element.innerText : element.value;

    if (!text.trim()) return;

    chrome.runtime.sendMessage(
      {
        type: "CHECK_GRAMMAR",
        text: text,
      },
      (response) => {
        console.log(response);
      },
    );
  }, 500);
});
