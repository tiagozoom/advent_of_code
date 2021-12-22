import { readFileSync } from "fs";

const main = async () => {
  const data = readFileSync("./test.txt", { flag: "r" });
  const [values, ...r] = data.toString().split("\n\n");

  const numbers = values.split(",");
  const boards: string[][][] = [];
  const hits: boolean[][][] = [];
  let sum: number = 0;

  for (let n = 0; n < r.length; n++) {
    boards[n] = [];
    hits[n] = [];
    const rows = r[n].split("\n").filter((item) => item.length);
    for (let i = 0; i < rows.length; i++) {
      const values = rows[i].split(" ").filter((item) => item !== "");
      boards[n][i] = [];
      hits[n][i] = [];
      for (let j = 0; j < values.length; j++) {
        boards[n][i][j] = values[j];
        hits[n][i][j] = false;
      }
    }
  }

  const [winnerBoard, luckyNumber, hitPos] = findWinner(numbers, boards, hits);

  for (let j = 0; j < winnerBoard.length; j++) {
    for (let k = 0; k < winnerBoard[j].length; k++) {
      if (!hits[hitPos][j][k]) sum += Number(winnerBoard[j][k]);
    }
  }

  console.log(sum * Number(luckyNumber));
};

const findWinner = (
  numbers: Array<string>,
  boards: string[][][],
  hits: boolean[][][]
): [string[][], string, number] => {
  let wonLines = true;
  let wonColumns = true;

  for (let n = 0; n < numbers.length; n++) {
    for (let i = 0; i < boards.length; i++) {
      for (let j = 0; j < boards[i].length; j++) {
        for (let k = 0; k < boards[i][j].length; k++) {
          if (boards[i][j][k] === numbers[n]) hits[i][j][k] = true;
        }
      }

      for (let j = 0; j < hits[i].length; j++) {
        wonLines = true;
        wonColumns = true;
        for (let k = 0; k < hits[i][j].length; k++) {
          if (!hits[i][j][k]) wonLines = false;
          if (!hits[i][k][j]) wonColumns = false;
        }
        if (wonLines || wonColumns) {
          return [boards[i], numbers[n], i];
        }
      }
    }
  }

  return [[], "", 0];
};

main();
