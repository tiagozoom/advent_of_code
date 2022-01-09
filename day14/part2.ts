import { readFileSync } from "fs";

const main = async () => {
  const file = readFileSync("./test.txt");
  let [line, templates] = file.toString().split("\n\n");
  const polymers = templates
    .split("\n")
    .reduce((acc: { [key: string]: string }, item) => {
      if (item === "") return acc;
      const [s, a] = item.split(" -> ");
      acc[s] = a;
      return acc;
    }, {});

  for (let i = 0; i < 10; i++) {
    let completed = "";

    for (let j = 0; j < line.length - 1; j++) {
      completed += line[j];
      const found = polymers[line[j] + line[j + 1]];
      if (found) completed += found;
    }

    completed += line[line.length - 1];

    line = completed;
  }

  const elements: { [key: string]: number } = {};

  for (let j = 0; j < line.length; j++) {
    elements[line[j]] = (elements[line[j]] || 0) + 1;
  }

  let min: number | undefined = undefined;
  let max = 0;

  for (let i of Object.values(elements)) {
    if (!min || min > i) min = i;
    if (max < i) max = i;
  }

  console.log(max - min!);
};

main();
