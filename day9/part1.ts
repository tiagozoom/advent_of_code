import { createReadStream } from "fs";
import * as readline from "readline";

const main = async () => {
  const stream = createReadStream("./test.txt");
  const lines = readline.createInterface(stream);
  const matrix: number[][] = [];
  const lowPoints: number[] = [];

  {
    let i = 0;
    for await (let line of lines) {
      const values = line.split("").map((item) => Number(item));
      matrix[i] = values;
      i++;
    }
  }

  for (let i = 0; i < matrix.length; i++) {
    for (let j = 0; j < matrix[i].length; j++) {
      if (i + 1 < matrix.length && matrix[i][j] >= matrix[i + 1][j]) {
        continue;
      } else if (i - 1 >= 0 && matrix[i][j] >= matrix[i - 1][j]) {
        continue;
      } else if (j - 1 >= 0 && matrix[i][j] >= matrix[i][j - 1]) {
        continue;
      } else if (j + 1 < matrix[i].length && matrix[i][j] >= matrix[i][j + 1]) {
        continue;
      }
      lowPoints.push(matrix[i][j]);
    }
  }

  console.log(lowPoints.reduce((acc, item) => acc + item + 1, 0));
};

main();
