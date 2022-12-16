const fs = require("fs");
const input = fs.readFileSync("input.txt", { encoding: "utf8" }).split("\r\n");

const MIN = 0;
const MAX = 4000000;
// const MAX = 20;

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

let searchPosition = [0, 0];
let foundBeacon = false;
console.time("Beacon found in :");
while (!foundBeacon) {
  for (let s = 0; s <= sensors.length; s++) {
    if (s === sensors.length) {
      console.timeEnd("Beacon found in :");

      console.log(
        `tuning frequency : ${searchPosition[1] * 4000000 + searchPosition[0]}`
      );
      foundBeacon = true;
      break;
    } else {
      const sensor = sensors[s];
      const a =
        sensor.distance -
        getDistance(sensor.x, searchPosition[1], sensor.y, searchPosition[0]);

      if (a >= 0) {
        searchPosition[1] =
          sensor.x +
          sensor.distance -
          Math.abs(sensor.y - searchPosition[0]) +
          1;
        break;
      }
    }
    if (searchPosition[1] > MAX) {
      searchPosition[1] = 0;
      searchPosition[0] += 1;
      break;
    }
    if (searchPosition[0] > MAX) {
      throw new Error("beacon not found !");
    }
  }
}
