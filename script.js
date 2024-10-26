const voicesDropdown = document.querySelector("#voices");
const textarea = document.querySelector("#text");
const rateInput = document.querySelector("#rate");
const pitchInput = document.querySelector("#pitch");
const stopButton = document.querySelector("#stop-button");
const speakButton = document.querySelector("#speak-button");

const message = new SpeechSynthesisUtterance();
let voices = [];

function populateVoices() {
  voices = speechSynthesis.getVoices();

  for (let index = 0; index < voices.length; index++) {
    const option = document.createElement("option");
    option.setAttribute("value", voices[index].name);
    option.textContent = voices[index].name;

    voicesDropdown.appendChild(option);
  }
}

function setVoices() {
  for (let index = 0; index < voices.length; index++) {
    if (voicesDropdown.value === voices[index].name) {
      message.voice = voices[index];
    }
  }
}

function setRate() {
  message.rate = rateInput.value;
}

function setPitch() {
  message.pitch = pitchInput.value;
}

function setText() {
  message.text = textarea.value;
}

function stopVoice() {
  speechSynthesis.cancel();
}

function speakVoice() {
  speechSynthesis.cancel();  // Stop any ongoing speech first
  setText();  // Update the message text
  speechSynthesis.speak(message);
}

speechSynthesis.addEventListener("voiceschanged", populateVoices);
if (speechSynthesis.getVoices().length !== 0) {
  populateVoices();
}

voicesDropdown.addEventListener("change", setVoices);
rateInput.addEventListener("change", setRate);
pitchInput.addEventListener("change", setPitch);
textarea.addEventListener("change", setText);
stopButton.addEventListener("click", stopVoice);
speakButton.addEventListener("click", speakVoice);
