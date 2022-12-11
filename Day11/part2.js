const fs = require("fs");
const input = fs.readFileSync("input.txt", { encoding: "utf8" }).split("\r\n");

const ROUNDS = 10000;
// Parse input
let monkeys = [];
let currentMonkey = 0;
input.forEach((line) => {
  const monkeyRegex = /Monkey (\d+)/;
  const monkeyMatch = line.match(monkeyRegex);
  if (monkeyMatch) currentMonkey = Number(monkeyMatch[1]);
  const itemsRegex = /Starting items: ((\d+(?:, )?)+)/;
  const itemsMatch = line.match(itemsRegex);
  if (itemsMatch)
    monkeys[currentMonkey] = {
      inspectedItems: 0,
      startingItems: itemsMatch[1].split(", ").map((n) => Number(n)),
    };
  const opRegex = /Operation: new = old (.) (\w+)/;
  const opMatch = line.match(opRegex);
  if (opMatch) {
    if (opMatch[1] === "+") {
      monkeys[currentMonkey].operation = (old) =>
        old + (opMatch[2] === "old" ? old : Number(opMatch[2]));
    }
    if (opMatch[1] === "*") {
      monkeys[currentMonkey].operation = (old) =>
        old * (opMatch[2] === "old" ? old : Number(opMatch[2]));
    }
  }
  const testRegex = /Test: divisible by (\d+)/;
  const testMatch = line.match(testRegex);
  if (testMatch) monkeys[currentMonkey].test = Number(testMatch[1]);

  const trueRegex = /If true: throw to monkey (\d+)/;
  const trueMatch = line.match(trueRegex);
  if (trueMatch) monkeys[currentMonkey].true = Number(trueMatch[1]);

  const falseRegex = /If false: throw to monkey (\d+)/;
  const falseMatch = line.match(falseRegex);
  if (falseMatch) monkeys[currentMonkey].false = Number(falseMatch[1]);
});

let alltests = 1;
monkeys.forEach((monkey) => (alltests *= monkey.test));

for (let i = 0; i < ROUNDS; i++) {
  monkeys.forEach((monkey) => {
    monkey.startingItems.forEach((item) => {
      monkey.inspectedItems += 1;
      let worryLevel = monkey.operation(item) % alltests;

      if (worryLevel % monkey.test === 0) {
        monkeys[monkey.true].startingItems.push(worryLevel);
      } else {
        monkeys[monkey.false].startingItems.push(worryLevel);
      }
    });
    monkey.startingItems = [];
  });
}

let result = 0;
let maxMonkey = 0;
monkeys.forEach((monkey) => {
  if (monkey.inspectedItems > maxMonkey) maxMonkey = monkey.inspectedItems;
});
result += maxMonkey;
maxMonkey = 0;
monkeys.forEach((monkey) => {
  if (monkey.inspectedItems > maxMonkey && monkey.inspectedItems < result)
    maxMonkey = monkey.inspectedItems;
});
result *= maxMonkey;
console.log(result);
