import { createReadStream } from "fs";
import * as readline from "readline";

const main = async () => {
  const stream = createReadStream("./day2.txt");
  const lines = readline.createInterface(stream);
  let horizontalPostiion = 0;
  let depth = 0;
  for await (let line of lines) {
    const [command, unit] = line.split(" ");
    switch (command) {
      case "forward":
        horizontalPostiion += Number(unit);
        break;
      case "down":
        depth += Number(unit);
        break;
      case "up":
        depth -= Number(unit);
        break;
    }
  }
  console.log(horizontalPostiion * depth);
};

main();
