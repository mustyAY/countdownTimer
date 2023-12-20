const millis = document.querySelector(".timer__milliseconds");
const seconds = document.querySelector(".timer__seconds");
const minutes = document.querySelector(".timer__minutes");
const startButton = document.querySelector(".stopwatch__start");
const stopButton = document.querySelector(".stopwatch__stop");
const resetButton = document.querySelector(".stopwatch__reset");

let startTime;
let cancelId;
let savedTime = 0;
const countdown = 25 * 60 * 1000;

function startTimer() {
  startButton.disabled = true;
  stopButton.disabled = false;
  resetButton.disabled = false;

  startTime = Date.now();
  cancelId = requestAnimationFrame(updateTimer);
}

function stopTimer() {
  stopButton.disabled = true;
  startButton.disabled = false;

  savedTime += Date.now() - startTime;
  cancelAnimationFrame(cancelId);
}

function resetTimer() {
  startTime = Date.now();
  savedTime = 0;

  millis.innerHTML = "000";
  seconds.innerHTML = "00";
  minutes.innerHTML = "25";
}

function updateTimer() {
  let millisElapsed = Date.now() - startTime + savedTime;

  let millisLeft = countdown - millisElapsed;
  if (millisLeft < 0) {
    millisLeft = 0;
    cancelAnimationFrame(cancelId);
    cancelId = null;
  }
  let secondsLeft = millisLeft / 1000;
  let minutesLeft = secondsLeft / 60;

  let millisText = millisLeft % 1000;
  let secondsText = Math.floor(secondsLeft % 60);
  let minutesText = Math.floor(minutesLeft);

  if (minutesText.toString().length < 2) {
    minutesText = minutesText.toString().padStart(2, "0");
  }
  if (secondsText.toString().length < 2) {
    secondsText = secondsText.toString().padStart(2, "0");
  }
  if (millisText.toString().length < 3) {
    millisText = millisText.toString().padStart(3, "0");
  }

  millis.innerHTML = millisText;
  seconds.innerHTML = secondsText;
  minutes.innerHTML = minutesText;

  if (cancelId) {
    cancelId = requestAnimationFrame(updateTimer);
  }
}
