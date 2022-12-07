const fs = require("fs");
const input = fs.readFileSync("input.txt", { encoding: "utf8" }).split("\r\n");

let root = {
  name: "root",
  files: 0, // size of its files and its childrens files
  children: [],
};

let currentPath = [];

input.forEach((line) => {
  currentDir = currentPath[currentPath.length - 1];
  const instruction = /\$ (\w+) *(\w+|\/|..)*/;
  const match = line.match(instruction);
  if (match && match[2]) {
    if (match[2] === "..") {
      currentPath.pop();
    } else if (match[2] == "/") {
      currentPath = [root];
    } else {
      nextNode = currentDir.children.find((c) => c.name === match[2]);
      currentPath.push(nextNode);
    }
  } else {
    const fileMatch = /^(\d+)/;
    const dirMatch = /dir (\w+)/;
    const file = line.match(fileMatch);
    const dir = line.match(dirMatch);
    if (file) {
      //currentDir.files += Number(file[0]);
      currentPath.forEach((node) => (node.files += Number(file[0])));
    } else if (dir) {
      currentDir.children.push({
        name: `${dir[1]}`,
        files: 0,
        children: [],
      });
    }
  }
});

// PART 1

// let sum = 0;

// const addToSum = (dir) => {
//   if (dir.files <= 100000) {
//     sum += dir.files;
//   }
//   if (dir.children) {
//     dir.children.forEach((child) => addToSum(child));
//   } else {
//     return;
//   }
// };

// addToSum(root);
// console.log(sum);

// PART 2

let unusedSpace = 70000000 - root.files;
let spaceToFree = 30000000 - unusedSpace;
let bestMatch = root.files;

const findSmallestMatch = (dir) => {
  if (dir.files >= spaceToFree && dir.files <= bestMatch) {
    bestMatch = dir.files;
  }
  if (dir.children) {
    dir.children.forEach((child) => findSmallestMatch(child));
  } else {
    return;
  }
};
findSmallestMatch(root);
console.log(bestMatch);
