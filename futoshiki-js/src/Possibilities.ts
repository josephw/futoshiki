import { Grid } from "./Grid";
import { CellPos } from "./CellPos";
import { Futoshiki } from "./Futoshiki";

/**
 * Moves that are still possible given the current numbers.
 *
 * @author Joseph Walton
 * @param {number} length
 * @class
 * @extends org.kafsemo.futoshiki.Grid
 */
export class Possibilities extends Grid {
  /*private*/ possibilities: Set<number>;

  public constructor(length: any) {
    super(length);
    this.possibilities = new Set();
  }

  bit(column: number, row: number, value: number): number {
    return ((column - 1) * this.length + row - 1) * this.length + value - 1;
  }

  public use$int$int$int(column: number, row: number, value: number) {
    if (value < 1 || value > this.length)
      throw new Error("Bad cell value " + value);
    for (let c: number = 1; c <= this.length; c++) {
      if (c !== column) {
        this.possibilities.add(this.bit(c, row, value));
      }
    }
    for (let r: number = 1; r <= this.length; r++) {
      if (r !== row) {
        this.possibilities.add(this.bit(column, r, value));
      }
    }
    for (let v: number = 1; v <= this.length; v++) {
      if (v !== value) {
        this.possibilities.add(this.bit(column, row, v));
      }
    }
  }

  public use(column: number | Futoshiki, row?: any, value?: any): number {
    if (
      typeof column === "number" &&
      (typeof row === "number" || row === null) &&
      (typeof value === "number" || value === null)
    ) {
      return <any>this.use$int$int$int(column, row, value);
    } else if (
      column instanceof Futoshiki &&
      row === undefined &&
      value === undefined
    ) {
      return <any>this.use$org_kafsemo_futoshiki_Futoshiki(column);
    } else throw new Error("invalid overload");
  }

  minPossible(column: number, row: number): number {
    for (let v: number = 1; v <= this.length; v++) {
      if (this.isPossible(column, row, v)) {
        return v;
      }
    }
    return 0;
  }

  maxPossible(column: number, row: number): number {
    for (let v: number = this.length; v >= 1; v--) {
      if (this.isPossible(column, row, v)) {
        return v;
      }
    }
    return 0;
  }

  public use$org_kafsemo_futoshiki_Futoshiki(f: Futoshiki) {
    for (let r: number = 1; r <= this.length; r++) {
      for (let c: number = 1; c <= this.length; c++) {
        let v: number = f.get(c, r);
        if (v !== 0) {
          this.use$int$int$int(c, r, v);
        }
      }
    }
    let learnedSomething: boolean;
    do {
      {
        learnedSomething = false;
        for (let r of f.getRules()) {
          let greatestMoreThan: number = this.minPossible(
            r.getLesserColumn(),
            r.getLesserRow()
          );
          if (greatestMoreThan > 0) {
            for (let v: number = 1; v <= greatestMoreThan; v++) {
              {
                learnedSomething =
                  !this.possibilities.has(
                    this.bit(r.getGreaterColumn(), r.getGreaterRow(), v)
                  ) || learnedSomething;
                this.possibilities.add(
                  this.bit(r.getGreaterColumn(), r.getGreaterRow(), v)
                );
              }
            }
          } else {
            for (let v: number = 1; v <= this.length; v++) {
              {
                learnedSomething =
                  !this.possibilities.has(
                    this.bit(r.getGreaterColumn(), r.getGreaterRow(), v)
                  ) || learnedSomething;
                this.possibilities.add(
                  this.bit(r.getGreaterColumn(), r.getGreaterRow(), v)
                );
              }
            }
          }
          let leastLessThan: number = this.maxPossible(
            r.getGreaterColumn(),
            r.getGreaterRow()
          );
          if (leastLessThan > 0) {
            for (let v: number = leastLessThan; v <= this.length; v++) {
              {
                learnedSomething =
                  !this.possibilities.has(
                    this.bit(r.getLesserColumn(), r.getLesserRow(), v)
                  ) || learnedSomething;
                this.possibilities.add(
                  this.bit(r.getLesserColumn(), r.getLesserRow(), v)
                );
              }
            }
          } else {
            for (let v: number = 1; v <= this.length; v++) {
              {
                learnedSomething =
                  !this.possibilities.has(
                    this.bit(r.getLesserColumn(), r.getLesserRow(), v)
                  ) || learnedSomething;
                this.possibilities.add(
                  this.bit(r.getLesserColumn(), r.getLesserRow(), v)
                );
              }
            }
          }
        }
      }
    } while (learnedSomething);
  }

  public isPossible(column: number, row: number, value: number): boolean {
    return !this.possibilities.has(this.bit(column, row, value));
  }

  public clone(): Possibilities {
    let p = new Possibilities(this.length);
    p.possibilities = new Set(this.possibilities);
    return p;
  }

  public size(): bigint {
    let total: bigint = BigInt(1);
    for (let r: number = 1; r <= this.length; r++) {
      for (let c: number = 1; c <= this.length; c++) {
        let available: number = this.possibleCount$int$int(c, r);
        total = total * BigInt(available);
      }
    }
    return total;
  }

  public possibleCount$int$int(column: number, row: number): number {
    let available: number = 0;
    for (let v: number = 1; v <= this.length; v++) {
      if (this.isPossible(column, row, v)) {
        available++;
      }
    }
    return available;
  }

  public possibleCount(column: number | CellPos, row?: any): number {
    if (
      typeof column === "number" &&
      (typeof row === "number" || row === null)
    ) {
      return <any>this.possibleCount$int$int(column, row);
    } else if (column instanceof CellPos && row === undefined) {
      return <any>this.possibleCount$org_kafsemo_futoshiki_CellPos(column);
    } else throw new Error("invalid overload");
  }

  public possibleCount$org_kafsemo_futoshiki_CellPos(cell: CellPos): number {
    return this.possibleCount$int$int(cell.column, cell.row);
  }
}
