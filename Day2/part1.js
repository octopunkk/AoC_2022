const fs = require("fs");
const input = fs.readFileSync("input.txt", { encoding: "utf8" }).split("\r\n");

// A || X = rock 1pt, B || Y = paper 2pts, C || Z = scissors 3pts

let score = 0;
input.forEach((round) => {
  // draw
  if (round === "A X" || round === "B Y" || round === "C Z") {
    score += 3;
  }
  // win
  if (round === "A Y" || round === "B Z" || round === "C X") {
    score += 6;
  }
  //points
  if (round[2] === "X") {
    score += 1;
  }
  if (round[2] === "Y") {
    score += 2;
  }
  if (round[2] === "Z") {
    score += 3;
  }
});

console.log(score);
