import { createReadStream } from "fs";
import * as readline from "readline";

type Graph = { [key: string]: string[] };
type Visited = { [key: string]: boolean };
type Twice = { [key: string]: number };

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
  const graph: Graph = {};

  for await (let line of lines) {
    const [a, b] = line.split("-");
    if (!graph[a]) graph[a] = [];
    if (!graph[b]) graph[b] = [];
    graph[a].push(b);
    graph[b].push(a);
  }

  const stack = new Stack<[string, Visited, Twice, boolean]>();
  let numPaths = 0;

  for (let [key] of Object.entries(graph)) {
    if (key !== "start") continue;
    stack.push([key, { [key]: true }, {}, false]);
    while (stack.size()) {
      let [vertex, visited, t, twice] = stack.pop()!;
      if (vertex === "end") {
        numPaths++;
        continue;
      }

      if (vertex !== vertex.toUpperCase() && vertex !== "start") {
        t[vertex] = (t[vertex] || 0) + 1;
        twice = !!Object.values(t).find((value) => value >= 2);
        if (twice) {
          for (let v of Object.keys(t)) {
            visited[v] = true;
          }
        }
      }

      const vertices = graph[vertex];

      for (let value of vertices) {
        if (visited[value] === true) continue;
        stack.push([value, { ...visited }, { ...t }, twice]);
      }
    }
  }

  console.log(numPaths);
};

main();
