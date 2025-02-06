// markQuestion.js
import { onNavigate } from "./main.js";

// Function to update the display and storage of marked questions.
export function updateMarkedQuestions(updatedList = [], questions) {
  console.log("Updating marked questions:", updatedList);

  // Select the HTML element where marked questions are displayed.
  const markedListElement = document.querySelector(".marked-list");
  if (!markedListElement) return; // If there's no .marked-list element, do nothing.

  // Clear the markedListElement before re-rendering
  markedListElement.innerHTML = "";

  // Store the updated list in localStorage
  localStorage.setItem("markedQuestions", JSON.stringify(updatedList));

  // Loop through each ID in updatedList and display them in the marked list
  updatedList.forEach((id) => {
    const question = questions.find((q) => q.id === id);
    if (question) {
      // Create a new list item for the marked question
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

      // Navigate to the question when the link is clicked
      li.querySelector(".question-link").addEventListener("click", () => {
        // onNavigate expects an index, here we assume (id - 1) for demonstration
        onNavigate(id - 1);
      });

      // When the delete icon is clicked, remove this question from the marked list
      li.querySelector(".delete-icon").addEventListener("click", () => {
        // Create a new list without the current question
        const newList = updatedList.filter((questionId) => questionId !== id);

        // Update localStorage with the new list
        localStorage.setItem("markedQuestions", JSON.stringify(newList));

        // Remove the "flagged" class from the question's flag icon if it exists
        const flagIcon = document.querySelector(`.flag-icon[data-id="${id}"]`);
        if (flagIcon) {
          flagIcon.classList.remove("flagged");
        }

        // Remove the item from the UI
        li.remove();

        // (Optional) If you want to re-render the entire list after removal:
        // updateMarkedQuestions(newList, questions);
      });

      // Finally, append the list item to the .marked-list container
      markedListElement.appendChild(li);
    }
  });
}
