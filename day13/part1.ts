import { readFileSync } from "fs";

const main = async () => {
  const file = readFileSync("./test.txt");
  const folds: { [key: string]: number }[] = [];
  const vulcanos: boolean[][] = [];
  const { abs } = Math;
  let result: number = 0;

  const [coordinatesLine, foldsLine] = file.toString().split("\n\n");

  const coordinates = coordinatesLine
    .split("\n")
    .map((item) => item.split(",").map((item) => Number(item)));

  const [columns, rows] = coordinates.reduce(
    (acc, [x, y]) => {
      if (x > acc[0]) acc[0] = x;
      if (y > acc[1]) acc[1] = y;
      return acc;
    },
    [0, 0]
  );

  for (let i = 0; i < rows + 1; i++) {
    if (!vulcanos[i]) vulcanos[i] = [];
    for (let j = 0; j < columns + 1; j++) {
      vulcanos[i][j] = false;
    }
  }

  for (let i = 0; i < coordinates.length; i++) {
    const [y, x] = coordinates[i];
    if (!vulcanos[x]) vulcanos[x] = [];
    vulcanos[x][y] = true;
  }

  const f = foldsLine.split("\n").filter((item) => item);
  for (let i = 0; i < f.length; i++) {
    const [, , nFolds] = f[i].split(" ");
    const [axis, n] = nFolds.split("=");
    folds.push({ [axis]: Number(n) });
  }

  for (let i = 0; i < 1; i++) {
    const [axis, n] = Object.entries(folds[i])[0];
    if (axis === "y") {
      for (let j = 0; j < vulcanos.length - 1 - n; j++) {
        for (let k = 0; k < vulcanos[j].length; k++) {
          const x = abs(j - (vulcanos.length - 1));
          if (vulcanos[j][k] || vulcanos[x][k]) result++;
        }
      }
    }
    if (axis === "x") {
      for (let j = 0; j < vulcanos.length; j++) {
        for (let k = 0; k < vulcanos[j].length - 1 - n; k++) {
          const y = abs(k - (vulcanos[j].length - 1));
          if (vulcanos[j][k] || vulcanos[j][y]) result++;
        }
      }
    }
  }

  console.log(result);
};

main();
