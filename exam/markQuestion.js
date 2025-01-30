import { onNavigate } from "./main.js";

export function updateMarkedQuestions(updatedList = [], questions) {
  const markedListElement = document.querySelector(".marked-list");
  // retrieve the marked questions from local
  const savedList = JSON.parse(localStorage.getItem("markedQuestions")) || [];

  updatedList.forEach((id) => {
    if (!markedListElement.querySelector(`[data-id="${id}"]`)) {
      const question = questions.find((q) => q.id === id);
      if (question) {
        const li = document.createElement("li");
        li.setAttribute("data-id", id);
        li.innerHTML = `
          <span class="question-link">Question ${id}</span>
          <svg 
            class="delete-icon"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 448 512"
            title="Delete"
          >
            <path 
              d="M135.2 17.7C140.6 6.8 151.7 0 163.8 0L284.2 0c12.1 0 23.2 6.8 28.6 17.7L320 32l96 0c17.7 0 32 14.3 32 32s-14.3 32-32 32L32 96C14.3 96 0 81.7 0 64S14.3 32 32 32l96 0 7.2-14.3zM32 128l384 0 0 320c0 35.3-28.7 64-64 64L96 512c-35.3 0-64-28.7-64-64l0-320zm96 64c-8.8 0-16 7.2-16 16l0 224c0 8.8 7.2 16 16 16s16-7.2 16-16l0-224c0-8.8-7.2-16-16-16zm96 0c-8.8 0-16 7.2-16 16l0 224c0 8.8 7.2 16 16 16s16-7.2 16-16l0-224c0-8.8-7.2-16-16-16zm96 0c-8.8 0-16 7.2-16 16l0 224c0 8.8 7.2 16 16 16s16-7.2 16-16l0-224c0-8.8-7.2-16-16-16z"
            />
          </svg>
        `;

        li.querySelector(".question-link").addEventListener("click", () => {
          onNavigate(id - 1);
        });

        li.querySelector(".delete-icon").addEventListener("click", () => {
          const newList = updatedList.filter((questionId) => questionId !== id);

          //     //  Save the updated flagged list in localStorage
          const updatedSavedList = savedList.filter((item) => item !== id);
          localStorage.setItem(
            "markedQuestions",
            JSON.stringify(updatedSavedList)
          );

          const flagIcon = document.querySelector(
            `.flag-icon[data-id="${id}"]`
          );
          if (flagIcon) {
            flagIcon.classList.remove("flagged");
          }

          markedListElement.querySelector(`[data-id="${id}"]`)?.remove();
        });

        markedListElement.appendChild(li);
      }
    }
  });
}
