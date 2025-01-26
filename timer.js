let timer = document.getElementsByClassName("timer")[0];
let time = 30; // 2 minute in seconds

export function timeDown() {
  const timerInterval = setInterval(() => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;

    // Update the timer display format 0:00
    timer.textContent = `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
    if (time <= 30) {
      timer.style.color = "red";
    }
    // Stop the timer at 0
    if (time-- <= 0) {
      clearInterval(timerInterval);
      window.location.href = "/Time out/index.html";
    }
  }, 1000);
}
timer.innerHTML = ``;
