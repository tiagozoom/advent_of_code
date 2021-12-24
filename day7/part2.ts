import { createReadStream } from "fs";
import * as readline from "readline";

const main = async () => {
  const stream = createReadStream("./test.txt");
  const lines = readline.createInterface(stream);
  const crabs: number[] = [];
  const { abs, max } = Math;
  let answer: number = 0;

  for await (let line of lines) {
    crabs.push(...line.split(",").map((item: string) => Number(item)));
  }

  const lastIndex = max(...crabs);

  for (let g = 0; g < lastIndex; g++) {
    for (let i = 0; i < crabs.length; i++) {
      let sum = 0;
      for (let j = 0; j < crabs.length; j++) {
        const triangular = abs(crabs[j] - g);
        sum += (triangular * (triangular + 1)) / 2;
      }
      if (!answer || answer > sum) answer = sum;
    }
  }

  console.log(answer);
};

main();
