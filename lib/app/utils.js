"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.shuffleArray = exports.randomFromArray = void 0;
function randomFromArray(arr, amount) {
    if (amount === void 0) { amount = 1; }
    var shuffledArray = shuffleArray(arr);
    return amount === 1 ? shuffledArray[0] : shuffledArray.slice(0, amount);
}
exports.randomFromArray = randomFromArray;
function shuffleArray(arr) {
    return arr.sort(function () { return Math.random() - 0.5; });
}
exports.shuffleArray = shuffleArray;
