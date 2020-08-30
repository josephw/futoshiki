/* Generated from Java with JSweet 2.3.5 - http://www.jsweet.org */

import { Grid } from "./Grid";
import { CellPos } from "./CellPos";
import { GtRule } from "./GtRule";

/**
 * A Futoshiki puzzle state, with any number of cells filled in and
 * a set of rules constraining the values. Methods allow for the manipulation
 * of state and validity checking.
 *
 * @author Joseph Walton
 * @param {number} length
 * @class
 * @extends Grid
 */
export class Futoshiki extends Grid {
  data: number[];

  rules: Map<string, GtRule>;

  public constructor(length: number = 5) {
    super(length);
    this.data = [];
    this.rules = new Map<string, GtRule>();
  }

  maxIdx(): number {
    return this.length * this.length;
  }

  /**
   * Is this puzzle state currently valid? Checks for duplicate numbers
   * in rows or columns and that all rules are followed.
   *
   * @return
   * @return {boolean}
   */
  public isValid(): boolean {
    let columnMask: Array<Set<number>> = [];
    for (let row: number = 1; row <= this.length; row++) {
      let rowMask: Set<number> = new Set();
      for (let column: number = 1; column <= this.length; column++) {
        let v: number = this.data[this.idxInternal(column, row)];
        if (!v) continue;
        if (rowMask.has(v)) {
          return false;
        }
        rowMask.add(v);
        let c = columnMask[column];
        if (c == null) {
          c = new Set();
          columnMask[column] = c;
        }
        if (c.has(v)) {
          return false;
        }
        c.add(v);
      }
    }

    for (let r of this.rules.values()) {
      let greater = this.get(r.getGreaterColumn(), r.getGreaterRow());
      let lesser = this.get(r.getLesserColumn(), r.getLesserRow());

      if (greater && lesser && greater <= lesser) {
        return false;
      }
    }

    return true;
  }

  public isFull(): any {
    //boolean {
    for (let index123 = 0; index123 < this.maxIdx(); index123++) {
      if (!this.data[index123]) {
        return false;
      }
    }
    return true;
  }

  public set(column: number, row: number, v: number) {
    if (v < 1 || v > this.length) throw new Error("Bad cell value " + v);
    this.data[this.idx(column, row)] = v;
  }

  public clear(column: number, row: number) {
    this.data[this.idx(column, row)] = 0;
  }

  public addGtRule(
    columnA: number,
    rowA: number,
    columnB: number,
    rowB: number
  ) {
    let newRule: GtRule = new GtRule(columnA, rowA, columnB, rowB);
    let k: GtRule = newRule.getCanonPosForm();
    this.rules.set(JSON.stringify(k), newRule);
  }

  public clone(): Futoshiki {
    let f: Futoshiki = new Futoshiki(this.length);
    f.data = Array.from(this.data);
    f.rules = new Map(this.rules);
    return f;
  }

  public get(column: number, row: number): number {
    return this.data[this.idx(column, row)] || 0;
  }

  public blankCells(): Array<CellPos> {
    let blank: Array<CellPos> = [];
    for (let row: number = 1; row <= this.length; row++) {
      for (let column: number = 1; column <= this.length; column++) {
        if (!this.data[this.idxInternal(column, row)]) {
          blank.push(new CellPos(column, row));
        }
      }
    }
    return blank;
  }

  public getRules(): Array<GtRule> {
    return Array.from(this.rules.values());
  }

  public getRule(ruleKey: GtRule): GtRule {
    return this.rules.get(JSON.stringify(ruleKey.getCanonPosForm()));
  }

  public removeRule(ruleKey: GtRule) {
    this.rules.delete(JSON.stringify(ruleKey.getCanonPosForm()));
  }
}
