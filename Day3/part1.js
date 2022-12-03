const fs = require("fs");
const input = fs.readFileSync("input.txt", { encoding: "utf8" }).split("\r\n");

let errors = [];

input.forEach((bag) => {
  bag = bag.split("");
  const len = bag.length / 2;
  cpt1 = bag.splice(len, len);
  cpt2 = bag.splice(0, len);
  cpt1.every((item) => {
    if (cpt2.includes(item)) {
      errors.push(item);
      return false;
    }
    return true;
  });
});

let sum = 0;
errors.forEach((e) => {
  charCode = e.charCodeAt(0);
  if (charCode >= 97) sum += charCode - 96;
  else sum += charCode - 64 + 26;
});

console.log(sum);
