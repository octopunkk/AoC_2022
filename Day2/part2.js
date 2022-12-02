const fs = require("fs");
const input = fs.readFileSync("input.txt", { encoding: "utf8" }).split("\r\n");

// A = rock 1pt, B = paper 2pts, C = scissors 3pts
// X = lose, Y = draw, Z = win

let score = 0;
input.forEach((round) => {
  // rock
  if (round === "A Y" || round === "B X" || round === "C Z") {
    score += 1;
  }
  // paper
  if (round === "A Z" || round === "B Y" || round === "C X") {
    score += 2;
  }
  // scissors
  if (round === "A X" || round === "B Z" || round === "C Y") {
    score += 3;
  }
  //outcome
  if (round[2] === "Y") {
    score += 3;
  }
  if (round[2] === "Z") {
    score += 6;
  }
});

console.log(score);
