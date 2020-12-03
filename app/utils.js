function randomFromArray(arr, amount = 1) {
  const shuffledArray = shuffleArray(arr);
  return amount === 1 ? shuffledArray[0] : shuffledArray.slice(0, amount);
}

function shuffleArray(arr) {
  return arr.sort(() => Math.random() - 0.5);
}

module.exports = {
  randomFromArray,
  shuffleArray,
};
