const title = document.getElementsByClassName("title")[0];
const image = document.getElementById("img");
const userMsg = document.getElementById("msg");
const scoreMsg = document.getElementById("score");
const home = document.getElementById("btn");

let score = localStorage.getItem("score");
let currentUser = JSON.parse(localStorage.getItem("currentUser"));
let userName = currentUser.fullName;
//handle result depend on the score
if (score >= 30) {
  title.innerText = "Congratulations!";
  image.src = "../images/Celebration.gif";
  scoreMsg.innerText = `${score} / 50`;
  userMsg.innerText = `Well done ${userName}, You have passed the exam!`;
} else {
  title.innerText = "Opps!";
  image.src = "../images/Student stress.gif";
  scoreMsg.innerText = `${score} / 50`;
  userMsg.innerText = `Sorry ${userName}, You haven't passed the exam!`;
}
home.addEventListener("click", function () {
  location.href = "../Register/home.html";
});
