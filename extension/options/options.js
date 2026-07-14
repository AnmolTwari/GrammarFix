const enabled = document.getElementById("enabled");
const autoCheck = document.getElementById("autoCheck");
const language = document.getElementById("language");
const delay = document.getElementById("delay");

chrome.storage.sync.get({

enabled: true,

autoCheck: true,

language: "en-US",

delay: 800

}, data => {

enabled.checked = data.enabled;

autoCheck.checked = data.autoCheck;

language.value = data.language;

delay.value = data.delay;

});

document.getElementById("save").onclick = () => {

chrome.storage.sync.set({

enabled: enabled.checked,

autoCheck: autoCheck.checked,

language: language.value,

delay: Number(delay.value)

});

alert("Saved");

};
