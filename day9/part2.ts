import { createReadStream } from "fs";
import * as readline from "readline";

interface IStack<T> {
  push(item: T): void;
  pop(): T | undefined;
  peek(): T | undefined;
  size(): number;
}

class Stack<T> implements IStack<T> {
  private storage: T[] = [];

  constructor(private capacity: number = Infinity) {}

  push(item: T): void {
    if (this.size() === this.capacity) {
      throw Error("Stack has reached max capacity, you cannot add more items");
    }
    this.storage.push(item);
  }

  pop(): T | undefined {
    return this.storage.pop();
  }

  peek(): T | undefined {
    return this.storage[this.size() - 1];
  }

  size(): number {
    return this.storage.length;
  }
}

const main = async () => {
  const stream = createReadStream("./test.txt");
  const lines = readline.createInterface(stream);
  const matrix: number[][] = [];
  const basins: number[] = [];
  const visited: boolean[][] = [];

  let i = 0;
  for await (let line of lines) {
    const values = line.split("").map((item) => Number(item));
    matrix[i] = values;
    i++;
  }

  for (let i = 0; i < matrix.length; i++) {
    for (let j = 0; j < matrix[i].length; j++) {
      if (!visited[i]) visited[i] = [];
      visited[i][j] = false;
    }
  }

  // Right, Down, Left, Up
  const xDirections = [1, 0, -1, 0];
  const yDirections = [0, -1, 0, 1];

  const stack = new Stack<[number, number]>();

  for (let i = 0; i < matrix.length; i++) {
    for (let j = 0; j < matrix[i].length; j++) {
      if (matrix[i][j] === 9 || visited[i][j]) continue;
      stack.push([i, j]);
      let basin = 1;
      visited[i][j] = true;
      while (stack.size()) {
        const [x, y] = stack.pop()!;
        for (let k = 0; k < xDirections.length; k++) {
          const xx = x + xDirections[k];
          const yy = y + yDirections[k];
          const xValid = xx >= 0 && xx < matrix.length;
          const yValid = yy >= 0 && yy < matrix[x].length;
          if (xValid && yValid && matrix[xx][yy] !== 9 && !visited[xx][yy]) {
            stack.push([xx, yy]);
            visited[xx][yy] = true;
            basin++;
          }
        }
      }
      basins.push(basin);
    }
  }

  const ordered = basins.sort((a, b) => (a < b ? 1 : -1));

  console.log(ordered[0] * ordered[1] * ordered[2]);
};

main();
