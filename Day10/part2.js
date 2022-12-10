const fs = require("fs");
const input = fs.readFileSync("input.txt", { encoding: "utf8" }).split("\r\n");

let register = 1;
let cycles = 0;
let render = [[]];
let currentLine = 0;
let CRT = 0;

const incrCycle = () => {
  if (CRT === register - 1 || CRT === register || CRT === register + 1) {
    render[currentLine].push("▮");
  } else {
    render[currentLine].push(" ");
  }
  cycles += 1;
  CRT += 1;
  if (cycles % 40 === 0) {
    currentLine += 1;
    CRT = 0;
    render.push([]);
  }
};

input.forEach((line) => {
  if (line === "noop") {
    incrCycle();
  } else {
    let addXRegex = /addx ([-]?\d+)/;
    let xValue = Number(line.match(addXRegex)[1]);
    incrCycle();
    incrCycle();
    register += xValue;
  }
});
render.forEach((line) => {
  console.log(line.join(""));
});
