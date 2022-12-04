const fs = require("fs");
const input = fs.readFileSync("input.txt", { encoding: "utf8" }).split("\r\n");

let sum = 0;
input.forEach((pair) => {
  pair = pair.split(",");
  pair[0] = pair[0].split("-");
  pair[1] = pair[1].split("-");
  if (
    (Number(pair[0][0]) >= Number(pair[1][0]) &&
      Number(pair[0][0]) <= Number(pair[1][1])) ||
    (Number(pair[1][0]) <= Number(pair[0][1]) &&
      Number(pair[1][0]) >= Number(pair[0][0]))
  ) {
    sum += 1;
  }
});

console.log(sum);
