// src/utils/usernameGenerator.js
const adjectives = [
  "Cosmic", "Wobbly", "Sneaky", "Bouncy", "Sleepy", "Spicy", "Giggly", "Epic", "Grumpy", "Funky"
];

const nouns = [
  "Banana", "Penguin", "Taco", "Unicorn", "Pickle", "Noodle", "Sloth", "Donut", "Otter", "Robot"
];

function getRandomElement(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

export function generateFunnyName() {
  const adjective = getRandomElement(adjectives);
  const noun = getRandomElement(nouns);
  const number = Math.floor(Math.random() * 100); // add randomness
  return `${adjective}${noun}${number}`;
}
