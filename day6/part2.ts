import { createReadStream } from "fs";
import * as readline from "readline";

const main = async () => {
  const stream = createReadStream("./test.txt");
  const lines = readline.createInterface(stream);
  const fishes: number[] = [];
  const days: number = 256;

  for await (let line of lines) {
    let values = line.split(",").map((item) => Number(item));
    for (let value of values) {
      fishes[value] = (fishes[value] || 0) + 1;
    }
  }

  for (let i = 0; i < days; i++) {
    for (let j = 0; j < fishes.length; j++) {
      if (!fishes[j]) continue;
      const prevIndex = j - 1;
      if (prevIndex < 0) {
        fishes[7] = (fishes[7] || 0) + fishes[j];
        fishes[9] = (fishes[9] || 0) + fishes[j];
        fishes[j] = 0;
      } else {
        fishes[prevIndex] = (fishes[prevIndex] || 0) + fishes[j];
        fishes[j] = 0;
      }
    }
  }

  console.log(
    fishes.filter((item) => item).reduce((acc, item) => acc + item, 0)
  );
};

main();
