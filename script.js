const timerDisplay = document.getElementById("timer");
const minutesInput = document.getElementById("minutes");
const statusText = document.getElementById("status");

const startBtn = document.getElementById("start");
const pauseBtn = document.getElementById("pause");
const resetBtn = document.getElementById("reset");


let timeLeft = 25 * 60;   // seconds
let timerId = null;      // stores setInterval ID
let isRunning = false;   // prevents multiple intervals

function updateDisplay() {
  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;

  timerDisplay.textContent =
    `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
}

//button logic
startBtn.addEventListener("click", () => {
  if (isRunning) return;

  const inputMinutes = Number(minutesInput.value);
  if (inputMinutes > 0) {
    timeLeft = inputMinutes * 60;
  }

  isRunning = true;
  statusText.textContent = "Focusing...";

  timerId = setInterval(() => {
    if (timeLeft <= 0) {
      clearInterval(timerId);
      isRunning = false;
      statusText.textContent = "Session complete ✅";
      return;
    }

    timeLeft--;
    updateDisplay();
  }, 1000);
});

//pause logic
pauseBtn.addEventListener("click", () => {
  if (!isRunning) return;

  clearInterval(timerId);
  isRunning = false;
  statusText.textContent = "Paused";
});

//reset logic
resetBtn.addEventListener("click", () => {
  clearInterval(timerId);
  isRunning = false;
  timeLeft = 25 * 60;
  updateDisplay();
  statusText.textContent = "";
});

//initial display
updateDisplay();

