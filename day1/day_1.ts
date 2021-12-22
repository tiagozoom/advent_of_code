import { createReadStream } from "fs";
import * as readline from "readline";

const main = async () => {
  const stream = createReadStream("./day_1.txt");
  const lines = readline.createInterface(stream);
  let measurements = 0;
  const buffer = [];
  for await (let line of lines) buffer.push(Number(line));
  for (let i = 0, prev = null; i < buffer.length; i++) {
    if (prev && buffer[i] > prev) measurements++;
    prev = buffer[i];
  }
  console.log(measurements);
};

main();
