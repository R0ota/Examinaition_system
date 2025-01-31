// Reference to the first element with the class "timer".
let timer = document.getElementsByClassName("timer")[0];
// Set the initial time for the countdown, in seconds (230 seconds = 3 minutes and 50 seconds).
let time = 230;

// Function that handles the countdown timer.
export function timeDown() {
  // Set up an interval to update the timer every second.
  const timerInterval = setInterval(() => {
    // Calculate the number of full minutes remaining.
    const minutes = Math.floor(time / 60);
    // Calculate the number of seconds remaining after full minutes are accounted for.
    const seconds = time % 60;

    // Update the timer display with leading zero for seconds less than 10.
    timer.textContent = `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
    // Change the timer color to red when 30 seconds or less remain.
    if (time <= 30) {
      timer.style.color = "#C62E2E";
    }
    // Stop the timer and navigate to a new page when the countdown reaches 0.
    if (time-- <= 0) {
      clearInterval(timerInterval);
      window.location.href = "../Time out/index.html";
    }
  }, 1000);
}
// Clear the timer display initially.
timer.innerHTML = ``;
