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
  const numbers: number[][] = [];
  //Up, Up/Right, Right, Right/Down, Down, Down/Left, Left, Left/Up
  const xDirections = [-1, -1, 0, 1, 1, 1, 0, -1];
  const yDirections = [0, 1, 1, 1, 0, -1, -1, -1];

  let i = 0;
  for await (let line of lines) {
    const values = line.split("").map((item) => Number(item));
    numbers[i] = values;
    i++;
  }

  for (let k = 0; ; k++) {
    const stack = new Stack<[number, number]>();
    const visited: boolean[][] = [];
    let flashes = 0;
    for (let i = 0; i < numbers.length; i++) {
      if (visited[i] === undefined) visited[i] = [];
      for (let j = 0; j < numbers[i].length; j++) {
        if (visited[i][j]) continue;
        else if (numbers[i][j] === 9) {
          numbers[i][j] = 0;
          stack.push([i, j]);
          visited[i][j] = true;
          flashes++;
          while (stack.size()) {
            const [x, y] = stack.pop()!;
            for (let m = 0; m < xDirections.length; m++) {
              const xd = x + xDirections[m];
              const yd = y + yDirections[m];
              const validx = xd >= 0 && xd < numbers.length;
              const validy = yd >= 0 && yd < numbers[y].length;
              if (validx && validy) {
                if (visited[xd] === undefined) visited[xd] = [];
                if (visited[xd][yd]) continue;
                else if (numbers[xd][yd] === 9) {
                  stack.push([xd, yd]);
                  numbers[xd][yd] = 0;
                  visited[xd][yd] = true;
                  flashes++;
                } else numbers[xd][yd] += 1;
              }
            }
          }
        } else numbers[i][j] += 1;
      }
    }
    if (flashes === numbers.length * numbers[0].length) {
      console.log(k + 1);
      break;
    }
  }
};

main();
