[
  [1, 1],
  [2, 2],
  [3, 12],
  [4, 576],
  //  [5, 161280],
].forEach((k) => {
  test(`Size ${k[0]}`, () => {
    expect(exhaustive(k[0])).toBe(k[1]);
  });
});

import { CellPos } from "../../src/CellPos";
import { GtRule } from "../../src/GtRule";
import { Futoshiki } from "../../src/Futoshiki";
import { Solver, SolutionTarget } from "../../src/Solver";

/**
 * Generate latin squares by solving the degenerate case: empty puzzles
 * with no rules. This is a brute force technique to assess what feasible numbers
 * of search possibilities are.
 */
function exhaustive(size: number): number {
  let f: Futoshiki = new Futoshiki(size);
  let sc: SolutionCounter = new SolutionCounter();
  let s: Solver = new Solver(sc);
  s.solve(f);
  return sc.count;
}

export class SolutionCounter implements SolutionTarget {
  count: number = 0;

  public solution(f: Futoshiki): boolean {
    this.count++;
    if (this.count < 0) {
      throw new Error("Solution count overflow");
    }
    return true;
  }

  public remainingPossibilities(count: BigInt): boolean {
    return true;
  }
}
