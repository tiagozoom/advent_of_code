import { createReadStream } from "fs";
import * as readline from "readline";

const main = async () => {
  const stream = createReadStream("./test.txt");
  const lines = readline.createInterface(stream);
  let sum = 0;

  for await (let line of lines) {
    const valids: { [key: string]: boolean } = {};
    const [chars, numbers] = line.split(" | ");
    for (let word of chars.split(" ")) {
      if (
        word.length === 2 ||
        word.length === 3 ||
        word.length === 4 ||
        word.length === 7
      )
        valids[word.length] = true;
    }

    for (let word of numbers.split(" ")) {
      if (valids[word.length]) sum++;
    }
  }

  console.log(sum);
};

main();
