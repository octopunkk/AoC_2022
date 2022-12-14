const fs = require("fs");
const input = fs.readFileSync("input.txt", { encoding: "utf8" }).split("\r\n");
let cave = [];
let bottomRock = -Infinity;

input.forEach((element) => {
  let regex = /(\d+)/g;
  let match = element.match(regex);
  let rockLines = [];
  for (let i = 0; i < match.length; i += 2) {
    rockLines.push([Number(match[i + 1]), Number(match[i])]);
  }
  for (let i = 0; i < rockLines.length - 1; i++) {
    for (
      let y = Math.min(rockLines[i + 1][0], rockLines[i][0]);
      y <= Math.max(rockLines[i + 1][0], rockLines[i][0]);
      y++
    ) {
      if (!cave[y]) {
        cave[y] = [];
      }
      for (
        let x = Math.min(rockLines[i + 1][1], rockLines[i][1]);
        x <= Math.max(rockLines[i + 1][1], rockLines[i][1]);
        x++
      ) {
        cave[y][x] = "#";
        if (y > bottomRock) bottomRock = y;
      }
    }
  }
});

let reachedTop = false;

const sandDestination = (x, y) => {
  if (x === bottomRock + 1) {
    return [x, y];
  }
  if (!cave[x + 1]?.[y]) {
    return sandDestination(x + 1, y);
  } else if (!cave[x + 1]?.[y - 1]) {
    return sandDestination(x + 1, y - 1);
  } else if (!cave[x + 1]?.[y + 1]) {
    return sandDestination(x + 1, y + 1);
  }
  return [x, y];
};

let sumOfSand = 0;
while (!reachedTop) {
  let sand = [0, 500];
  let sandStop = sandDestination(sand[0], sand[1]);
  sumOfSand += 1;
  if (sandStop[0] === 0 && sandStop[1] === 500) {
    reachedTop = true;
  } else {
    if (!cave[sandStop[0]]) {
      cave[sandStop[0]] = [];
    }
    cave[sandStop[0]][sandStop[1]] = "o";
  }
}
console.log(sumOfSand);
