
const submitButton = document.querySelector(".submit-button");
// Submit button handler
export function submitAction() {
  submitButton.addEventListener("click", () => {
    // alert("Submit functionality not implemented yet!");
    // let score = localStorage.getItem("score");
      window.location.href = "./result/index.html";
  });
};
