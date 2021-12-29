import { createReadStream } from "fs";
import * as readline from "readline";

const main = async () => {
  const stream = createReadStream("./test.txt");
  const lines = readline.createInterface(stream);
  const matrix: number[][] = [];
  const basins: number[] = [];
  let sum = 1;

  const findBasin = (
    points: number[][],
    x: number,
    y: number,
    found: { [key: string]: number } = {}
  ): number => {
    const nextPoint = matrix[x][y] + 1;
    found[`${x}${y}`] = 1;
    if (
      x + 1 < points.length &&
      points[x + 1][y] === points[x][y] + 1 &&
      points[x + 1][y] < 9
    ) {
      findBasin(points, x + 1, y, found);
    }
    if (x - 1 >= 0 && points[x - 1][y] === nextPoint && points[x - 1][y] < 9) {
      findBasin(points, x - 1, y, found);
    }
    if (y - 1 >= 0 && points[x][y - 1] === nextPoint && points[x][y - 1] < 9) {
      findBasin(points, x, y - 1, found);
    }
    if (
      y + 1 < points[x].length &&
      points[x][y + 1] === nextPoint &&
      points[x][y + 1] < 9
    ) {
      findBasin(points, x, y + 1, found);
    }
    return Object.keys(found).length;
  };

  let i = 0;
  for await (let line of lines) {
    const values = line.split("").map((item) => Number(item));
    matrix[i] = values;
    i++;
  }

  for (let i = 0; i < matrix.length; i++) {
    for (let j = 0; j < matrix[i].length; j++) {
      if (matrix[i][j] < 9) basins.push(findBasin(matrix, i, j));
    }
  }

  const ordered = basins.sort((a, b) => (a < b ? 1 : -1));

  for (let i = 0; i < ordered.length && i <= 2; i++) {
    sum *= ordered[i];
  }

  console.log(sum);
};

main();
