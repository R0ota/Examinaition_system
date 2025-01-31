let timer = document.getElementsByClassName("timer")[0];
// Set the initial time for the countdown, in seconds (230 seconds = 3 minutes and 50 seconds).

// Function that handles the countdown timer.
export function timeDown() {
  // Check if there's already a time stored in localStorage, otherwise set it to 230 seconds.
  let time = localStorage.getItem("remainingTime")
    ? parseInt(localStorage.getItem("remainingTime"), 10)
    : 120;
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
      timer.style.color = "red";
    }

    // Update the remaining time in localStorage every second.
    localStorage.setItem("remainingTime", time);
    // Stop the timer and navigate to a new page when the countdown reaches 0.

    if (time-- <= 0) {
      clearInterval(timerInterval);
      localStorage.removeItem("remainingTime"); // Clear the stored time when the countdown ends.
      window.location.href = "../Time out/index.html";
    }
  }, 1000);
}

// Clear the timer display and start the countdown on page load.
window.onload = function () {
  timer.textContent = "";
  timeDown();
};
