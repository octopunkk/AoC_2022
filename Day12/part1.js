const fs = require("fs");
const input = fs.readFileSync("input.txt", { encoding: "utf8" }).split("\r\n");

console.time("Part 1");

let start = {
  x: 0,
  y: 0,
  neighbors: [],
};
let end = {
  x: 0,
  y: 0,
  neighbors: [],
};

let visitedNodes = new Set();

input.forEach((line, row) => {
  line = line.split("");
  line.forEach((node, col) => {
    if (node === "S") {
      start.x = col;
      start.y = row;
    }
    if (node === "E") {
      end.x = col;
      end.y = row;
    }
  });
});

const movePossible = (next, prev) => {
  if (prev === "S") prev = "a";
  if (next === "S") next = "a";
  if (prev === "E") prev = "z";
  if (next === "E") next = "z";

  return next.charCodeAt(0) - prev.charCodeAt(0) <= 1;
};
const neighborDirections = [
  [-1, 0],
  [1, 0],
  [0, -1],
  [0, 1],
];
const getNeighbors = (node) => {
  let neighbors = [];
  neighborDirections.forEach((direction) => {
    const x = node.x + direction[0];
    const y = node.y + direction[1];
    if (
      input[y] &&
      input[y][x] &&
      (x !== node.x || y !== node.y) &&
      movePossible(input[y][x], input[node.y][node.x]) &&
      !visitedNodes.has(`${x}, ${y}`)
    ) {
      neighbors.push({ x: x, y: y });
    }
  });

  return neighbors;
};

const dijkstra = (start, end) => {
  start.dist = 0;
  let toVisit = [start];
  while (toVisit.length) {
    let currentNode = toVisit.shift();
    if (!visitedNodes.has(`${currentNode.x}, ${currentNode.y}`)) {
      if (currentNode.x === end.x && currentNode.y === end.y) {
        return currentNode.dist;
      } else {
        visitedNodes.add(`${currentNode.x}, ${currentNode.y}`);
        currentNode.neighbors = getNeighbors(currentNode);
        currentNode.neighbors.forEach((neighbor) => {
          if (!visitedNodes.has(`${neighbor.x}, ${neighbor.y}`)) {
            neighbor.dist = currentNode.dist + 1;
            toVisit.push(neighbor);
          }
        });
      }
    }
  }
};

console.log(dijkstra(start, end));
console.timeEnd("Part 1");
