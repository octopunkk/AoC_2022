const fs = require("fs");
const input = fs.readFileSync("input.txt", { encoding: "utf8" }).split("\r\n");

let head = [0, 0];
let tail = [0, 0];
let tailUniquePositions = new Set();

const moveTail = () => {
  let dist = [head[0] - tail[0], head[1] - tail[1]];
  if (Math.abs(dist[0]) + Math.abs(dist[1]) >= 3) {
    if (Math.abs(dist[0]) > Math.abs(dist[1])) {
      tail[0] += dist[0] - Math.sign(dist[0]);
      tail[1] = head[1];
    } else if (Math.abs(dist[0]) < Math.abs(dist[1])) {
      tail[0] = head[0];
      tail[1] += dist[1] - Math.sign(dist[1]);
    }
  } else {
    tail[0] += dist[0] - Math.sign(dist[0]);
    tail[1] += dist[1] - Math.sign(dist[1]);
  }
};

const moveHead = (dir) => {
  if (dir === "R") head[0] += 1;
  if (dir === "L") head[0] -= 1;
  if (dir === "U") head[1] += 1;
  if (dir === "D") head[1] -= 1;
};

input.forEach((move) => {
  move = move.split(" ");
  for (let i = 0; i < Number(move[1]); i++) {
    moveHead(move[0]);
    moveTail();
    tailUniquePositions.add(`${tail[0]}, ${tail[1]}`);
  }
});
console.log(tailUniquePositions.size);
