export function createPagination(
  currentQuestionIndex,
  totalQuestions,
  onNavigate
) {
  const pageInfo = document.querySelector(".page-info");
  const prevArrow = document.querySelector(".prev-arrow");
  const nextArrow = document.querySelector(".next-arrow");

  pageInfo.textContent = `${currentQuestionIndex + 1} out of ${totalQuestions}`;

  prevArrow.style.visibility =
    currentQuestionIndex === 0 ? "hidden" : "visible";
  nextArrow.style.visibility =
    currentQuestionIndex === totalQuestions - 1 ? "hidden" : "visible";

  prevArrow.onclick = () => {
    if (currentQuestionIndex > 0) onNavigate(currentQuestionIndex - 1);
  };

  nextArrow.onclick = () => {
    if (currentQuestionIndex < totalQuestions - 1)
      onNavigate(currentQuestionIndex + 1);
  };
}
