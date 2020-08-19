import { Futoshiki } from "../../src/Futoshiki";
import { Solver, SolutionTarget } from "../../src/Solver";
import { FutoshikiPrinter } from "../../src/FutoshikiPrinter";
import { PrintingSolutionTarget } from "./PrintingSolutionTarget";

import * as fs from "fs";

let content = fs.readFileSync("test-resources/sample-9x9.txt", "utf-8");
let f: Futoshiki = FutoshikiPrinter.parse(content);

console.info(FutoshikiPrinter.toString(f));
new Solver(new PrintingSolutionTarget()).solve(f);
