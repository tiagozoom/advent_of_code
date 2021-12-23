import { readFileSync } from "fs";

const main = async () => {
  const data = readFileSync("./test.txt", { flag: "r" });
  const diagram: number[] = [];
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

    let range: number[] = [];
    let stringify: (a: number) => number;
    let start: number = 0;
    let end: number = 0;

    if (y1 === y2) {
      [start, end] = x1 < x2 ? [x1, x2] : [x2, x1];
      stringify = (a) => Number(`${a}${y1}`);
    } else {
      [start, end] = y1 < y2 ? [y1, y2] : [y2, y1];
      stringify = (a) => Number(`${x1}${a}`);
    }

    for (let j = start; j <= end; j++) {
      range.push(stringify(j));
    }

    for (let j = 0; j < range.length; j++) {
      diagram[range[j]] = (diagram[range[j]] || 0) + 1;
    }
  }

  console.log(diagram.filter((item) => item && item >= 2).length);
};

main();
