const fs = require("fs");
const input = fs.readFileSync("input.txt", { encoding: "utf8" }).split("\r\n");

let highestFromTop = [];
let highestFromBottom = [];
let highestFromLeft = [];
let highestFromRight = [];
let trees = new Set();

input.forEach((line, row) => {
  line = line.split("");
  line.forEach((tree, col) => {
    tree = Number(tree);

    if (highestFromTop[col] < tree || row === 0) {
      highestFromTop[col] = tree;
      trees.add(`${row},${col}`);
    }
    if (highestFromLeft[row] < tree || col === 0) {
      highestFromLeft[row] = tree;
      trees.add(`${row},${col}`);
    }
  });
});
for (let row = input.length - 1; row >= 0; row--) {
  let line = input[row].split("");
  for (let col = line.length - 1; col >= 0; col--) {
    let tree = Number(line[col]);
    if (highestFromBottom[col] < tree || row === input.length - 1) {
      highestFromBottom[col] = tree;
      trees.add(`${row},${col}`);
    }
    if (highestFromRight[row] < tree || col === line.length - 1) {
      highestFromRight[row] = tree;
      trees.add(`${row},${col}`);
    }
  }
}

console.log(trees.size);
