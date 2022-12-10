const fs = require("fs");
const { createCanvas } = require("canvas");

const input = fs.readFileSync("input.txt", { encoding: "utf8" }).split("\r\n");

const ropeSize = 10;
let rope = new Array(ropeSize).fill(null).map(() => [15, 15]);
const canvasSize = 200;
const pixelSize = 4;
const COLORS = {
  0: "black",
  1: "#80ffdb",
  2: "#72efdd",
  3: "#64dfdf",
  4: "#56cfe1",
  5: "#48bfe3",
  6: "#4ea8de",
  7: "#5390d9",
  8: "#5e60ce",
  9: "#6930c3",
  10: "#7400b8",
};
const canvas = createCanvas(canvasSize, canvasSize);
const ctx = canvas.getContext("2d");

const paintState = (rope, it, i) => {
  for (let i = 0; i < canvasSize; i++) {
    for (let j = 0; j < canvasSize; j++) {
      let knotFound = rope.findIndex((knot) => knot[0] === j && knot[1] === i);
      ctx.fillStyle = COLORS[knotFound + 1];
      ctx.fillRect(pixelSize * j, pixelSize * i, pixelSize, pixelSize);
    }
  }
  if (it < 100) {
    if (it < 10) {
      const buffer = canvas.toBuffer("image/png");
      fs.writeFileSync(`./visualisationFrames/img00${it}-${i}.png`, buffer);
      return;
    }
    const buffer = canvas.toBuffer("image/png");
    fs.writeFileSync(`./visualisationFrames/img0${it}-${i}.png`, buffer);
    return;
  } else {
    const buffer = canvas.toBuffer("image/png");
    fs.writeFileSync(`./visualisationFrames/img${it}-${i}.png`, buffer);
    return;
  }
};
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
  return tail;
};

const moveHead = (head, dir) => {
  if (dir === "R") head[0] += 1;
  if (dir === "L") head[0] -= 1;
  if (dir === "U") head[1] -= 1;
  if (dir === "D") head[1] += 1;
  return head;
};

input.forEach((move, it) => {
  move = move.split(" ");
  for (let i = 0; i < Number(move[1]); i++) {
    rope[0] = moveHead(rope[0], move[0]);
    for (let knot = 1; knot < ropeSize; knot++) {
      rope[knot] = moveTail(rope[knot - 1], rope[knot]);
    }
    paintState(rope, it, i);
  }
});
