import { createReadStream } from "fs";
import * as readline from "readline";

const main = async () => {
  const stream = createReadStream("./day_1.txt");
  const lines = readline.createInterface(stream);
  let measurements = 0;
  const buffer = [];
  for await (let line of lines) buffer.push(Number(line));
  for (let i = 0, prev = null; i < buffer.length - 2; i++) {
    const sum = buffer[i] + buffer[i + 1] + buffer[i + 2];
    if (prev && sum > prev) measurements++;
    prev = sum;
  }
  console.log(measurements);
};

main();
