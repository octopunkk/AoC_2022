const fs = require("fs");
const input = fs.readFileSync("input.txt", { encoding: "utf8" }).split("\r\n");

let register = 1;
let cycles = 0;
let signalStrenghSum = 0;
const incrCycle = () => {
  cycles += 1;
  if (cycles === 20 || (cycles + 20) % 40 === 0) {
    signalStrenghSum += register * cycles;
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
console.log(signalStrenghSum);
