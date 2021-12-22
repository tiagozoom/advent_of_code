import { createReadStream } from "fs";
import * as readline from "readline";

const main = async () => {
  const stream = createReadStream("./day2.txt");
  const lines = readline.createInterface(stream);
  let horizontalPostiion = 0;
  let depth = 0;
  let aim = 0;
  for await (let line of lines) {
    const [command, unit] = line.split(" ");
    switch (command) {
      case "forward":
        horizontalPostiion += Number(unit);
        depth += aim * Number(unit);
        break;
      case "down":
        aim += Number(unit);
        break;
      case "up":
        aim -= Number(unit);
        break;
    }
  }
  console.log(horizontalPostiion * depth);
};

main();
