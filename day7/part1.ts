import { createReadStream } from "fs";
import * as readline from "readline";

const main = async () => {
  const stream = createReadStream("./test.txt");
  const lines = readline.createInterface(stream);
  const crabs: number[] = [];
  const { abs } = Math;
  let answer: number = 0;

  for await (let line of lines) {
    crabs.push(...line.split(",").map((item: string) => Number(item)));
  }

  for (let i = 0; i < crabs.length; i++) {
    let sum = 0;
    for (let j = 0; j < crabs.length; j++) {
      sum += abs(crabs[j] - crabs[i]);
    }

    if (!answer || sum < answer) answer = sum;
  }

  console.log(answer);
};

main();
