import { createReadStream } from "fs";
import * as readline from "readline";

const main = async () => {
  const stream = createReadStream("./test.txt");
  const lines = readline.createInterface(stream);
  const positives: Array<number> = [];
  const negatives: Array<number> = [];
  const buffer = [];

  for await (let line of lines) {
    let i = 0;
    for (let char of line) {
      const bit = Number(char);
      if (bit === 1) positives[i] = (positives[i] || 0) + 1;
      else negatives[i] = (negatives[i] || 0) + 1;
      i++;
    }
    buffer.push(line);
  }

  let gamma = "";
  let epsilon = "";

  for (let i = 0; i < positives.length; i++) {
    const pos = positives[i];
    const neg = negatives[i];
    const bit = pos > neg ? 1 : 0;
    gamma += `${bit}`;
    epsilon += `${bit ^ 1}`;
  }

  console.log(parseInt(gamma, 2) * parseInt(epsilon, 2));
};

main();
