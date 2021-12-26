import { createReadStream } from "fs";
import * as readline from "readline";

const main = async () => {
  const stream = createReadStream("./test.txt");
  const lines = readline.createInterface(stream);
  let sum = 0;

  for await (let line of lines) {
    const [chars, numbers] = line.split(" | ");
    let words = chars.split(" ");
    let zero: string[] = [];
    let one: string[] = [];
    let two: string[] = [];
    let three: string[] = [];
    let four: string[] = [];
    let five: string[] = [];
    let six: string[] = [];
    let nine: string[] = [];
    let answer = "";

    for (let i = 0; i < words.length; i++) {
      const word = words[i];
      if (word.length === 2) {
        one = word.split("").sort();
        delete words[i];
      } else if (word.length === 4) {
        four = word.split("").sort();
        delete words[i];
      }
    }

    words = words.filter((item) => item);

    for (let i = 0; i < words.length; i++) {
      const word = words[i];
      if (word.length === 5) {
        const unknown = word.split("").sort();
        let loses = 0;
        let isThree = true;
        for (let i = 0; i < one.length; i++) {
          if (!unknown.includes(one[i])) isThree = false;
        }
        for (let i = 0; i < four.length; i++) {
          if (!unknown.includes(four[i])) loses++;
        }
        if (isThree) three = unknown;
        else if (loses === 1) five = unknown;
        else two = unknown;
        delete words[i];
      }
    }

    words = words.filter((item) => item);

    for (let i = 0; i < words.length; i++) {
      const word = words[i];
      if (word.length === 6) {
        const unknown = word.split("").sort();
        let isNine = true;
        let isSix = true;
        for (let i = 0; i < three.length; i++) {
          if (!unknown.includes(three[i])) isNine = false;
        }
        for (let i = 0; i < five.length; i++) {
          if (!unknown.includes(five[i])) isSix = false;
        }

        if (isNine) nine = unknown;
        else if (isSix) six = unknown;
        else zero = unknown;
        delete words[i];
      }
    }

    for (let number of numbers.split(" ")) {
      const unknown = number.split("").sort();
      if (unknown.length === 4) answer = `${answer}4`;
      else if (unknown.length === 2) answer = `${answer}1`;
      else if (unknown.length === 3) answer = `${answer}7`;
      else if (unknown.length === 7) answer = `${answer}8`;
      else {
        let isThree = true;
        let isTwo = true;
        let isFive = true;
        let isSix = true;
        let isNine = true;
        let isZero = true;

        for (let i = 0; i < unknown.length; i++) {
          if (!unknown.includes(zero[i])) isZero = false;
          if (!unknown.includes(two[i])) isTwo = false;
          if (!unknown.includes(three[i])) isThree = false;
          if (!unknown.includes(five[i])) isFive = false;
          if (!unknown.includes(six[i])) isSix = false;
          if (!unknown.includes(nine[i])) isNine = false;
        }

        if (isZero) answer = `${answer}0`;
        else if (isTwo) answer = `${answer}2`;
        else if (isThree) answer = `${answer}3`;
        else if (isFive) answer = `${answer}5`;
        else if (isSix) answer = `${answer}6`;
        else answer = `${answer}9`;
      }
    }

    sum += Number(answer);
  }

  console.log(sum);
};

main();
