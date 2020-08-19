import { Futoshiki } from '../../src/Futoshiki';
import { Solver, SolutionTarget } from '../../src/Solver';
import { FutoshikiPrinter } from '../../src/FutoshikiPrinter';

import * as fs from 'fs';

let content = fs.readFileSync('test-resources/sample-9x9.txt', 'utf-8');
let orig : Futoshiki = FutoshikiPrinter.parse(content);

let reps : number = 1;

class DummySolutionTarget implements SolutionTarget {
    solved : boolean = false;

    public remainingPossibilities(count : bigint) : boolean {
        return true;
    }

    public solution(f : Futoshiki) : boolean {
        this.solved = true;
        return false;
    }
}

let f : Futoshiki = orig.clone();
        let version : string = "A";
for(let iter : number = 0; iter < 4; iter++) {
    let start = process.hrtime();
    for(let i : number = 0; i < reps; i++) {
        let st : DummySolutionTarget = new DummySolutionTarget();
        new Solver(st).solve(orig.clone());
    }
    let end = process.hrtime(start);
    let duration : number = (end[0] + end[1] / 1000000000) / reps;
    console.info(version + "," + duration);
}

