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
  const opens: { [key: string]: string } = {
    "{": "}",
    "[": "]",
    "(": ")",
    "<": ">",
  };
  let errorSum: number[] = [];

  for await (let line of lines) {
    const stack = new Stack<string>();
    const values = line.split("");
    let errorFound = false;

    for (let i = 0; i < values.length; i++) {
      if (opens[values[i]]) stack.push(values[i]);
      else {
        const close = stack.pop()!;
        if (close && values[i] !== opens[close]) {
          errorFound = true;
        }
      }
    }

    if (!errorFound) {
      let score = 0;
      while (stack.size()) {
        const value = stack.pop()!;
        let completionValue = 0;
        if (opens[value] === ")") completionValue = 1;
        else if (opens[value] === "]") completionValue = 2;
        else if (opens[value] === "}") completionValue = 3;
        else if (opens[value] === ">") completionValue = 4;
        score = score * 5 + completionValue;
      }

      errorSum.push(score);
    }
  }

  const ordered = errorSum.sort((a, b) => (a > b ? 1 : -1));

  console.log(ordered[Math.floor(ordered.length / 2)]);
};

main();
