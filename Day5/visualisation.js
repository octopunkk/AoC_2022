const fs = require("fs");
const { createCanvas } = require("canvas");
const GIFEncoder = require("gifencoder");
const input = fs.readFileSync("input.txt", { encoding: "utf8" }).split("\r\n");

const COLORS = {
  A: "#ffadad",
  B: "#ffadad",
  C: "#ffadad",
  D: "#ffd6a5",
  E: "#ffd6a5",
  F: "#ffd6a5",
  G: "#fdffb6",
  H: "#fdffb6",
  I: "#fdffb6",
  J: "#caffbf",
  K: "#caffbf",
  L: "#caffbf",
  M: "#9bf6ff",
  N: "#9bf6ff",
  O: "#9bf6ff",
  P: "#a0c4ff",
  Q: "#a0c4ff",
  R: "#a0c4ff",
  S: "#bdb2ff",
  T: "#bdb2ff",
  U: "#bdb2ff",
  V: "#ffc6ff",
  W: "#ffc6ff",
  X: "#ffc6ff",
  Y: "#fffffc",
  Z: "#fffffc",
};

const canvas = createCanvas(600, 600);
const ctx = canvas.getContext("2d");

const encoder = new GIFEncoder(600, 600);
encoder.createReadStream().pipe(fs.createWriteStream("day5.gif"));

encoder.start();
encoder.setRepeat(0); // 0 for repeat, -1 for no-repeat
encoder.setDelay(100); // frame delay in ms
encoder.setQuality(10); // image quality. 10 is default.

const paintStacks = (stacks, ctx) => {
  ctx.fillStyle = "black";
  ctx.fillRect(0, 0, 600, 600);
  ctx.font = " 10pt ";
  ctx.textAlign = "center";
  ctx.fillStyle = "white";
  stacks.forEach((stack, i) => {
    x = 30 + i * 60;
    containerWidth = 50;
    containerHeight = 20;
    stack.forEach((container, j) => {
      y = 600 - (25 + j * 30);
      ctx.fillStyle = COLORS[container];
      ctx.fillRect(x, y, containerWidth, containerHeight);
      ctx.fillStyle = "black";

      ctx.fillText(
        `${container}`,
        x + containerWidth / 2,
        y + containerHeight / 2 + 5
      );
    });
  });
  // encoder.addFrame(ctx);
};

let stacks = [];
input.forEach((line) => {
  // create stacks array
  const cratesRegex = /[A-Z]/g;
  const crates = [...line.matchAll(cratesRegex)];
  crates.forEach((crate) => {
    stackIndex = Math.floor(crate.index / 4);
    stacks[stackIndex]
      ? stacks[stackIndex].push(crate[0])
      : (stacks[stackIndex] = [crate[0]]);
  });
  // start moving crates
  const moveRegex = /move (\d+) from (\d+) to (\d+)/g;
  const moves = [...line.matchAll(moveRegex)];
  moves.forEach((move) => {
    const numOfCrates = Number(move[1]);
    const from = Number(move[2]) - 1;
    const to = Number(move[3]) - 1;
    for (i = 0; i < numOfCrates; i++) {
      stacks[to]
        ? stacks[to].unshift(stacks[from].shift())
        : (stacks[to] = [stacks[from].shift()]);
    }
  });
  paintStacks(stacks, ctx);
});
encoder.finish();
const message = stacks.map((stack) => stack[0]);
// console.log(message.join(""));
