import { createReadStream, readFileSync } from "fs";
import * as readline from "readline";

type Position = { key: string; drawn: boolean };
type Hit = { [key: number]: Mark };
type Mark = { [key: number]: number };

const main = async () => {
  const data = readFileSync("./test.txt", { flag: "r" });
  const [numbers, ...rest] = data.toString().split("\n\n");

  const bingo = numbers.split(",");
  const boards: Array<Position[][]> = [];

  let rowHits: Hit = {};
  let columnHits: Hit = {};

  for (let k = 0; k < rest.length; k++) {
    const value = rest[k];
    let board: Position[][] = [];
    const rows = value.split("\n").filter((item) => item.length);
    rowHits[k] = {};
    columnHits[k] = {};

    for (let i = 0; i < rows.length; i++) {
      let row: Position[] = [];
      const values = rows[i].split(" ").filter((item) => item !== "");
      columnHits[k][i] = 0;

      for (let j = 0; j < values.length; j++) {
        rowHits[k][j] = 0;
        row.push({ key: values[j], drawn: false });
      }

      board.push(row);
    }

    boards.push(board);
  }

  const [winnerBoard, luckyNumber] = findBingo(
    bingo,
    boards,
    rowHits,
    columnHits
  );

  let unluckyNumbers: number = 0;
  if (winnerBoard && luckyNumber !== "") {
    for (let j = 0; j < winnerBoard.length; j++) {
      for (let k = 0; k < winnerBoard[j].length; k++) {
        if (!winnerBoard[j][k].drawn)
          unluckyNumbers += Number(winnerBoard[j][k].key);
      }
    }
  }

  console.log(Number(luckyNumber) * unluckyNumbers);
};

const findBingo = (
  bingo: string[],
  boards: Array<Position[][]>,
  rowHits: Hit,
  columnHits: Hit
): [Position[][], string] => {
  for (let n = 0; n < bingo.length; n++) {
    for (let f = 0; f < boards.length; f++) {
      const board = boards[f];
      for (let j = 0; j < board.length; j++) {
        for (let k = 0; k < board[j].length; k++) {
          if (board[j][k].key === bingo[n]) {
            board[j][k].drawn = true;
            rowHits[f][k] = (rowHits[f][k] || 0) + 1;
            if (j === 0) columnHits[f][j] = (columnHits[f][j] || 0) + 1;
          }
          if (rowHits[f][k] === board[j].length) {
            return [board, bingo[n]];
          }
        }

        if (columnHits[f][j] === board.length) {
          return [board, bingo[n]];
        }
      }
    }
  }

  return [[], ""];
};

main();
