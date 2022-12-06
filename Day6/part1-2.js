const fs = require("fs");
const input = fs.readFileSync("input.txt", { encoding: "utf8" }).split("");

let buffer = [];
const size = 14; // 4 for part 1
for (let i = 0; i <= input.length; i++) {
  if (buffer.length < size) {
    buffer.push(input[i]);
  } else {
    const duplicates = buffer.filter(
      (item, index) => buffer.indexOf(item) !== index
    );
    if (duplicates.length === 0) {
      console.log(i);
      return i;
    } else {
      buffer.push(input[i]);
      buffer.shift();
    }
  }
}
