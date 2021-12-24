import { createReadStream } from "fs";
import * as readline from "readline";

const main = async () => {
  const stream = createReadStream("./test.txt");
  const lines = readline.createInterface(stream);
  const { max, abs } = Math;
  const coordinates: number[][] = [];

  for await (let line of lines) {
    const [start, end] = line.toString().split(" -> ");
    const [x1, y1] = start.split(",").map((item) => Number(item));
    const [x2, y2] = end.split(",").map((item) => Number(item));

    const h = x2 - x1;
    const v = y2 - y1;

    const distance = max(abs(h), abs(v));

    const [x, y] = h < v ? [x1, y1] : [x2, y2];

    for (let i = 0; i <= distance; i++) {
      const dx = x + abs((h === 0 ? 0 : h > 0 ? 1 : -1) * i);
      const dy = y + abs((v === 0 ? 0 : v > 0 ? 1 : -1) * i);

      if (!coordinates[dx]) coordinates[dx] = [];
      coordinates[dx][dy] = (coordinates[dx][dy] || 0) + 1;
    }
  }

  let sum = 0;
  const array = coordinates.filter((item) => item);

  for (let i = 0; i < array.length; i++) {
    for (let j = 0; j < array[i].length; j++) {
      if (array[i][j] >= 2) sum++;
    }
  }

  console.log(sum);
};

main();
