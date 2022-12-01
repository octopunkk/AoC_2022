const fs = require("fs");
const input = fs.readFileSync("input.txt", { encoding: "utf8" }).split("\r\n");
let elves = [0];
let elvesIdx = 0;
input.forEach((val) => {
  if (val === "") {
    elvesIdx += 1;
    elves.push(0);
  } else {
    elves[elvesIdx] += Number(val);
  }
});
console.log(Math.max(...elves));
