const fs = require("fs");
const input = fs.readFileSync("input.txt", { encoding: "utf8" }).split("\r\n");

let bestView = 0;
input.forEach((line, row) => {
  if (row !== 0 && row !== input.length - 1) {
    line = line.split("");
    line.forEach((tree, col) => {
      if (col !== 0 && col !== line.length - 1) {
        tree = Number(tree);
        let treeView = 1;
        let viewingDistRight = 0;
        for (let i = col + 1; i < line.length; i++) {
          viewingDistRight += 1;
          if (Number(line[i]) >= tree) {
            break;
          }
        }
        let viewingDistLeft = 0;
        for (let i = col - 1; i >= 0; i--) {
          viewingDistLeft += 1;
          if (Number(line[i]) >= tree) {
            break;
          }
        }
        let viewingDistDown = 0;
        for (let i = row + 1; i < input.length; i++) {
          viewingDistDown += 1;
          if (Number(input[i][col]) >= tree) {
            break;
          }
        }
        let viewingDistUp = 0;
        for (let i = row - 1; i >= 0; i--) {
          viewingDistUp += 1;
          if (Number(input[i][col]) >= tree) {
            break;
          }
        }
        treeView =
          viewingDistDown * viewingDistLeft * viewingDistRight * viewingDistUp;
        if (treeView > bestView) {
          bestView = treeView;
        }
      }
    });
  }
});
console.log(bestView);
