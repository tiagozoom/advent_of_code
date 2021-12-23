import { readFileSync } from "fs";

const main = async () => {
  const data = readFileSync("./test.txt", { flag: "r" });
  const diagram: number[][] = [];
  const coordinates = data
    .toString()
    .split("\n")
    .filter((item) => item !== "")
    .map((item) => item.split(" -> "));

  for (let k = 0; k < coordinates.length; k++) {
    const [[x1, y1], [x2, y2]] = coordinates[k].map((item) =>
      item.split(",").map((item) => Number(item))
    );

    if (x1 !== x2 && y1 !== y2) continue;

    let start: number = 0;
    let end: number = 0;

    if (y1 === y2) {
      [start, end] = x1 < x2 ? [x1, x2] : [x2, x1];
      for (let j = start; j <= end; j++) {
        if (!diagram[j]) diagram[j] = [];
        diagram[j][y1] = (diagram[j][y1] || 0) + 1;
      }
    } else {
      [start, end] = y1 < y2 ? [y1, y2] : [y2, y1];
      for (let j = start; j <= end; j++) {
        if (!diagram[x1]) diagram[x1] = [];
        diagram[x1][j] = (diagram[x1][j] || 0) + 1;
      }
    }
  }

  let sum = 0;
  for (let i = 0; i < diagram.length; i++) {
    for (let k = 0; k < diagram.length; k++) {
      if (diagram[i] && diagram[i][k] && diagram[i][k] >= 2) sum++;
    }
  }

  console.log(sum);
};

main();
