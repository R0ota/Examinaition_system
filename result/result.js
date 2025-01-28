const title = document.getElementsByClassName("title")[0];
const image = document.getElementById("img");
const userMsg = document.getElementById("msg");
const scoreMsg = document.getElementById("score");

let score = localStorage.getItem("score");
let userName = localStorage.getItem("User Name");
//handle result depend on the score 
if (score >= 30) {
  title.innerText = "Congratulations!";
  image.src = "s.jpeg";
  scoreMsg.innerText = `${score} / 50`;
  userMsg.innerText=`Well done ${userName}, You have passed the exam!`
} else {
    title.innerText = "Opps!";
    image.src = "f.jpeg";
    scoreMsg.innerText = `${score} / 50`;
    userMsg.innerText = `Sorry ${userName}, You haven't passed the exam!`;
}


// export function displayResult(totalScore, firstName, lastName) {
//   const gradeMessage = document.getElementById("gradeMessage");
//   const resultMessage = document.getElementById("resultMessage");
//   const resultImage = document.getElementById("resultImage");
//   const resultContainer = document.getElementById("resultContainer");
//   const quizContainer = document.getElementById("quizContainer");

//   quizContainer.classList.add("hidden"); // Hide quiz container
//   resultContainer.classList.remove("hidden"); // Show result container

//   const passingScore = 40; // Define the passing score

//   // Check if the score is pass or fail
//   if (totalScore >= passingScore) {
//     gradeMessage.textContent = `Your grade is ${totalScore}%`;
//     gradeMessage.className = "success";

//     resultMessage.textContent = `Congratulations ${firstName} ${lastName}!`;
//     resultImage.src = "s.jpeg"; // Success image
//   } else {
//     gradeMessage.textContent = `Your grade is ${totalScore}%`;
//     gradeMessage.className = "fail";

//     resultMessage.textContent = `Sorry ${firstName} ${lastName}, you failed this quiz.`;
//     resultImage.src = "f.jpeg"; // Failure image
//   }
// }
