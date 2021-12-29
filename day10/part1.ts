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
  let errorSum = 0;
  const stack = new Stack<string>();

  for await (let line of lines) {
    const values = line.split("");
    for (let i = 0; i < values.length; i++) {
      if (opens[values[i]]) stack.push(values[i]);
      else {
        const close = stack.pop()!;
        if (close && values[i] !== opens[close]) {
          if (values[i] === ")") errorSum += 3;
          else if (values[i] === "]") errorSum += 57;
          else if (values[i] === "}") errorSum += 1197;
          else if (values[i] === ">") errorSum += 25137;
        }
      }
    }
  }

  console.log(errorSum);
};

main();
