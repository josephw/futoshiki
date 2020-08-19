import { Futoshiki } from "../../src/Futoshiki";
import { Solver, SolutionTarget } from "../../src/Solver";
import { FutoshikiPrinter } from "../../src/FutoshikiPrinter";
import { PrintingSolutionTarget } from "./PrintingSolutionTarget";

/**
 * Scratch code to benchmark {@link Solver}.
 *
 * @author Joseph Walton
 * @class
 */
export class PerfSample {
  public static main(args: string[]) {
    console.info("Starting...");
    let start = process.hrtime();
    PerfSample.exhaustive();
    let end = process.hrtime(start);
    console.info("Time: " + end[0]);
  }

  public static exhaustive() {
    let f: Futoshiki = new Futoshiki();
    let s: Solver = new Solver(new PerfSample$0());
    s.solve(f);
  }

  public static realCase() {
    let f: Futoshiki = new Futoshiki();
    let sample: number[][] = [
      [5, 1, 4, 3, 2],
      [3, 2, 5, 1, 4],
      [4, 5, 3, 2, 1],
      [2, 4, 1, 5, 3],
      [1, 3, 2, 4, 5],
    ];
    for (let row: number = 1; row <= 5; row++) {
      for (let column: number = 1; column <= 5; column++) {
        f.set(column, row, sample[row - 1][column - 1]);
      }
    }
    f.addGtRule(2, 2, 2, 1);
    f.addGtRule(4, 1, 4, 2);
    f.addGtRule(2, 3, 3, 3);
    f.addGtRule(3, 3, 4, 3);
    f.addGtRule(1, 3, 1, 4);
    f.addGtRule(1, 4, 1, 5);
    f.addGtRule(2, 4, 2, 5);
    f.addGtRule(3, 5, 3, 4);
    f.addGtRule(2, 5, 1, 5);
    f.addGtRule(2, 5, 3, 5);
    f.addGtRule(4, 5, 3, 5);
    f.addGtRule(5, 5, 4, 5);
    for (let i: number = 0; i < 10000000; i++) {
      let s: Solver = new Solver(new PerfSample$1());
      s.solve(f);
    }
  }
}

export class PerfSample$0 implements SolutionTarget {
  i: number = 0;

  public solution(f: Futoshiki): boolean {
    if (this.i++ % 100 === 0) {
      console.info("Solutions: " + this.i);
    }
    return true;
  }

  public remainingPossibilities(count: bigint): boolean {
    return true;
  }
}

export class PerfSample$1 implements SolutionTarget {
  public solution(f: Futoshiki): boolean {
    return false;
  }

  public remainingPossibilities(count: bigint): boolean {
    return true;
  }
}

PerfSample.main(null);
