//flag.js

export function handleFlagQuestion(
  questionId,
  markedQuestions,
  updateCallback
) {
  // Create a new array, updatedList, by checking if the questionId is in markedQuestions
  // If it is, remove it from the array (unflagging the question)
  // If it's not, add it to the array (flagging the question)

  // const updatedList = markedQuestions.includes(questionId)
  //   ? markedQuestions.filter((id) => id !== questionId)
  //   : [...markedQuestions, questionId];
if (!markedQuestions.includes(questionId)) {
  markedQuestions.push(questionId); // add ques if not exist.
} else {
  // إذا كانت موجودة، احذفها
  markedQuestions = markedQuestions.filter((id) => id !== questionId);
}
  updateCallback(markedQuestions); // Update flagged questions
}
