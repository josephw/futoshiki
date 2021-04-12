import { Futoshiki } from "../../src/Futoshiki";
import { Solver, SolutionTarget } from "../../src/Solver";
import { FutoshikiPrinter } from "../../src/FutoshikiPrinter";

export class PrintingSolutionTarget implements SolutionTarget {
  total?: bigint;

  startTime?: [number, number];

  reports: number = 0;

  nextStats?: [number, number];

  public solution(f: Futoshiki): boolean {
    console.info("Solution:");
    console.info(FutoshikiPrinter.toString(f));
    return true;
  }

  static ONE_HUNDRED: bigint = BigInt(100);

  public remainingPossibilities(count: bigint): boolean {
    this.reports++;
    if (this.total) {
      let now: [number, number] = process.hrtime(this.nextStats);
      if (now[0] >= 0) {
        let eliminated: bigint = this.total - count;
        let duration = process.hrtime(this.startTime);
        console.info(this.reports + "," + duration[0] + "," + eliminated);
        this.nextStats = [now[0] + 5, now[1]];
      }
    } else {
      this.total = count;
      this.startTime = process.hrtime();
      this.nextStats = [this.startTime[0] + 5, this.startTime[1]];
    }
    return true;
  }
}
