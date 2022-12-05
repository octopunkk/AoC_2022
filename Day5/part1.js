const fs = require("fs");
const input = fs.readFileSync("input.txt", { encoding: "utf8" }).split("\r\n");

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
});
const message = stacks.map((stack) => stack[0]);
console.log(message.join(""));
