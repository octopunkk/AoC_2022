const fs = require("fs");
const input = fs.readFileSync("input.txt", { encoding: "utf8" }).split("\r\n");

const line = 2000000;
//const line = 10;

const getDistance = (x1, x2, y1, y2) => Math.abs(x1 - x2) + Math.abs(y1 - y2);

const sensors = input.map((sensor) => {
  let sensorMatch = sensor.match(/(-?\d+)+/g);
  return {
    x: Number(sensorMatch[0]),
    y: Number(sensorMatch[1]),
    beaconX: Number(sensorMatch[2]),
    beaconY: Number(sensorMatch[3]),
    distance: getDistance(
      Number(sensorMatch[0]),
      Number(sensorMatch[2]),
      Number(sensorMatch[1]),
      Number(sensorMatch[3])
    ),
  };
});
let notABeacon = new Set();

sensors.forEach((sensor) => {
  const a = sensor.distance - getDistance(0, 0, sensor.y, line);
  for (let x = sensor.x - a; x <= sensor.x + a; x++) {
    if (
      !(x === sensor.beaconX && line === sensor.beaconY) &&
      !(x === sensor.x && line === sensor.y)
    ) {
      notABeacon.add(x);
    }
  }
});
console.log(notABeacon.size);
// ans : 6275922
