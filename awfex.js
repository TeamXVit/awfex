import { config } from "dotenv";
config();

import { add, addDescription } from "./functions/add.js";
import { sub, subDescription } from "./functions/sub.js";
import { mul, mulDescription } from "./functions/mul.js";
import { div, divDescription } from "./functions/div.js";
import { print, printDescription } from "./functions/print.js";

export const FUNCTIONS = {
  add: add,
  sub: sub,
  mul: mul,
  div: div,
  print: print
};

export const DESCRIPTIONS = {
  add: addDescription,
  sub: subDescription,
  mul: mulDescription,
  div: divDescription,
  print: printDescription
}

function convertIfNumeric(str) {
  const num = Number(str);
  if (!isNaN(num) && String(num) === str) {
    return num;
  } else {
    return str;
  }
}

function resolveSpecial(value, ctx) {
  if (typeof value !== "string") return value;
  if (value.startsWith("$query:")) {
    const key = value.split(":")[1];
    return convertIfNumeric(ctx[key]);
  }
  if (value.startsWith("$env:")) {
    const key = value.split(":")[1];
    return process.env[key];
  }
  return value;
}

export function engine(node, ctx) {
  if (typeof node === "number" || typeof node === "string") { 
    return resolveSpecial(node, ctx); 
  }
  if (Array.isArray(node)) {
    return node.map(n => engine(n, ctx));
  }
  if (typeof node === "object" && node !== null) {
    const funcName = Object.keys(node)[0];
    const args = node[funcName];
    if (!FUNCTIONS[funcName]) {
      throw new Error(`Unknown function: ${funcName}`);
    }
    const resolvedArgs = args.map(a => engine(a, ctx));
    return FUNCTIONS[funcName](...resolvedArgs);
  }
  throw new Error(`Invalid node type: ${typeof node}`);
}

if (import.meta.main) {
  const workflow = {
    print: [
      {
        sub: [
          {
            add: [2, 3]
          },
          4
        ]
      }
    ]
  };
  engine(workflow, {});
}