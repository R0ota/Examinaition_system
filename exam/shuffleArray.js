export function shuffleArray(array) {
  const shuffled = [...array]; // Clone the array to avoid mutating the original array

  // Perform the shuffle
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]; // Swap elements
  }

  // Reassign IDs based on the new order
  shuffled.forEach((item, index) => {
    item.id = index + 1; // Assign new IDs starting from 1
  });

  console.log("Shuffled with new IDs:", shuffled);
  return shuffled;
}
