import { createReadStream } from "fs";
import * as readline from "readline";

const main = async () => {
  const stream = createReadStream("./test.txt");
  const lines = readline.createInterface(stream);
  const fishes: number[] = [];
  const days: number = 80;
  for await (let line of lines) {
    fishes.push(...line.split(",").map((item) => Number(item)));
  }

  for (let i = 0; i < days; i++) {
    for (let j = 0; j < fishes.length; j++) {
      fishes[j] = fishes[j] - 1;
      if (fishes[j] < 0) {
        fishes[j] = 6;
        fishes.push(9);
      }
    }
  }

  console.log(fishes);

  console.log(fishes.length);
};

main();
