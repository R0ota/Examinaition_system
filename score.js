export function calculateScore(questions) {
  const savedAnswers = JSON.parse(localStorage.getItem("answers")) || {};
  let score = 0;

  questions.forEach((question) => {
    const userAnswer = savedAnswers[question.id];
    const correctOption = question.options.find((option) => option.isCorrect);

    if (userAnswer === correctOption.id.toString()) {
      score += correctOption.score;
    }
  });

    localStorage.setItem("score", score); // Store the score
    console.log(`score : ${score}`);
    
  return score;
}
