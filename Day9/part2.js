const fs = require("fs");
const input = fs.readFileSync("input.txt", { encoding: "utf8" }).split("\r\n");

const ropeSize = 10;
let rope = [
  [0, 0],
  [0, 0],
  [0, 0],
  [0, 0],
  [0, 0],
  [0, 0],
  [0, 0],
  [0, 0],
  [0, 0],
  [0, 0],
];

let tailUniquePositions = new Set();

const moveTail = (head, tail) => {
  let dist = [head[0] - tail[0], head[1] - tail[1]];
  if (
    Math.abs(dist[0]) + Math.abs(dist[1]) >= 3 &&
    Math.abs(dist[0]) !== Math.abs(dist[1])
  ) {
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
  return [...tail];
};

const moveHead = (head, dir) => {
  if (dir === "R") head[0] += 1;
  if (dir === "L") head[0] -= 1;
  if (dir === "U") head[1] -= 1;
  if (dir === "D") head[1] += 1;
  return [...head];
};

const displayRope = (canvasSize, rope) => {
  for (let i = 0; i < canvasSize; i++) {
    let string = "";
    for (let j = 0; j < canvasSize; j++) {
      let knotFound = rope.findIndex((knot) => knot[0] === j && knot[1] === i);
      if (knotFound >= 0) string += knotFound;
      else string += ".";
    }
    console.log(string);
  }
};

input.forEach((move) => {
  move = move.split(" ");
  for (let i = 0; i < Number(move[1]); i++) {
    rope[0] = [...moveHead(rope[0], move[0])];
    for (let knot = 1; knot < ropeSize; knot++) {
      rope[knot] = [...moveTail(rope[knot - 1], rope[knot])];
    }
    tailUniquePositions.add(
      `${rope[ropeSize - 1][0]}, ${rope[ropeSize - 1][1]}`
    );
  }
});

console.log(tailUniquePositions.size);
