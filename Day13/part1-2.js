const fs = require("fs");
const input = fs
  .readFileSync("input.txt", { encoding: "utf8" })
  .split("\r\n\r\n")
  .map((a) => a.split("\r\n"));

const compare = (left, right) => {
  for (let i = 0; i < left.length; i++) {
    if (
      typeof left[i] === "number" &&
      typeof right[i] === "number" &&
      left[i] !== right[i]
    ) {
      return left[i] < right[i];
    }
    if (typeof right[i] === "undefined") {
      return false;
    }
    if (typeof left[i] === "object" && typeof right[i] === "object") {
      let out = compare(left[i], right[i]);
      if (out !== "continue") return out;
    }
    if (typeof left[i] === "object" && typeof right[i] === "number") {
      let out = compare(left[i], [right[i]]);
      if (out !== "continue") return out;
    }
    if (typeof left[i] === "number" && typeof right[i] === "object") {
      let out = compare([left[i]], right[i]);
      if (out !== "continue") return out;
    }
  }
  if (left.length < right.length) {
    return true;
  } else {
    return "continue";
  }
};

// PART 1
let sum = 0;
input.forEach((pair, pairIdx) => {
  const left = JSON.parse(pair[0]);
  const right = JSON.parse(pair[1]);
  if (compare(left, right)) {
    sum += pairIdx + 1;
  }
});
console.log(`Part 1 : ${sum}`);

// PART 2
let p2input = input.flat();
p2input.push("[[2]]", "[[6]]");
p2input.sort((a, b) => {
  let left = JSON.parse(a);
  let right = JSON.parse(b);
  if (compare(left, right)) return -1;
  else return 1;
});
console.log(
  `Part 2 : ${(p2input.indexOf("[[2]]") + 1) * (p2input.indexOf("[[6]]") + 1)}`
);
