const fs = require("fs");
const input = fs.readFileSync("input.txt", { encoding: "utf8" }).split("\r\n");

let badges = [];

for (i = 0; i < input.length; i += 3) {
  const bags = [
    input[i].split(""),
    input[i + 1].split(""),
    input[i + 2].split(""),
  ];
  bags[0].every((item) => {
    if (bags[1].includes(item) && bags[2].includes(item)) {
      badges.push(item);
      return false;
    }
    return true;
  });
}

let sum = 0;
badges.forEach((badge) => {
  charCode = badge.charCodeAt(0);
  if (charCode >= 97) sum += charCode - 96;
  else sum += charCode - 64 + 26;
});

console.log(sum);
