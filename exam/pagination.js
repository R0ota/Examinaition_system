// Function to create and manage pagination controls for navigating through questions.
export function createPagination(
  currentQuestionIndex, // The index of the currently displayed question.
  totalQuestions, // The total number of questions in the quiz.
  onNavigate // A callback function to handle navigation.
) {
  // Select the HTML element that displays the current page info.
  const pageInfo = document.querySelector(".page-info");
  // Select the HTML elements for the previous and next navigation arrows.
  const prevArrow = document.querySelector(".prev-arrow");
  const nextArrow = document.querySelector(".next-arrow");

  // Update the text content of pageInfo to reflect the current position in the quiz.
  pageInfo.textContent = `${currentQuestionIndex + 1} out of ${totalQuestions}`;

  // Set the visibility of the previous arrow. Hide if on the first question, otherwise show.
  prevArrow.style.visibility =
    currentQuestionIndex === 0 ? "hidden" : "visible";
  // Set the visibility of the next arrow. Hide if on the last question, otherwise show.
  nextArrow.style.visibility =
    currentQuestionIndex === totalQuestions - 1 ? "hidden" : "visible";

  // Add an onclick event to the previous arrow to navigate to the previous question.
  prevArrow.onclick = () => {
    if (currentQuestionIndex > 0) onNavigate(currentQuestionIndex - 1);
  };

  // Add an onclick event to the next arrow to navigate to the next question.
  nextArrow.onclick = () => {
    if (currentQuestionIndex < totalQuestions - 1)
      onNavigate(currentQuestionIndex + 1);
  };
}
