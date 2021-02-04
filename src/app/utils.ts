export function randomFromArray(arr: Array<unknown>, amount:number = 1) {
  const shuffledArray = shuffleArray(arr);
  return amount === 1 ? shuffledArray[0] : shuffledArray.slice(0, amount);
}

export function shuffleArray(arr: Array<unknown>) {
  return arr.sort(() => Math.random() - 0.5);
}