import { createReadStream } from "fs";
import * as readline from "readline";

const main = async () => {
  const stream = createReadStream("./test.txt");
  const lines = readline.createInterface(stream);
  const buffer: Array<string> = [];

  for await (let line of lines) buffer.push(line);

  const oxygen = determine(buffer, (a, b) => a.length >= b.length, 0);
  const co2 = determine(buffer, (a, b) => a.length < b.length, 0);

  console.log(parseInt(oxygen[0], 2) * parseInt(co2[0], 2));
};

const determine = (
  array: Array<string>,
  evaluation: (a: Array<string>, b: Array<string>) => boolean,
  pos: number
): Array<string> => {
  if (array.length == 1) return array;

  const positives: Array<string> = [];
  const negatives: Array<string> = [];

  for (let line of array) {
    const char = line[pos];
    const bit = Number(char);
    if (bit === 1) positives.push(line);
    else negatives.push(line);
  }

  if (evaluation(positives, negatives)) {
    return determine(positives, evaluation, ++pos);
  } else return determine(negatives, evaluation, ++pos);
};

main();
