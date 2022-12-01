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
let top3 = 0;
for (let i = 0; i < 3; i++) {
  const max = Math.max(...elves);
  top3 += max;
  elves.splice(elves.indexOf(max), 1);
}
console.log(top3);
