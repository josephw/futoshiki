/* Generated from Java with JSweet 2.3.5 - http://www.jsweet.org */
/**
 * A puzzle rule requiring that one cell be greater than another.
 *
 * @author Joseph Walton
 * @param {number} columnA
 * @param {number} rowA
 * @param {number} columnB
 * @param {number} rowB
 * @class
 */
export class GtRule {
  columnA: number;

  rowA: number;

  columnB: number;

  rowB: number;

  public constructor(
    columnA: number,
    rowA: number,
    columnB: number,
    rowB: number,
  ) {
    this.columnA = columnA;
    this.rowA = rowA;
    this.columnB = columnB;
    this.rowB = rowB;
  }

  public getGreaterColumn(): number {
    return this.columnA;
  }

  public getGreaterRow(): number {
    return this.rowA;
  }

  public getLesserColumn(): number {
    return this.columnB;
  }

  public getLesserRow(): number {
    return this.rowB;
  }

  public getCanonPosForm(): GtRule {
    if (
      this.rowB < this.rowA ||
      (this.rowB === this.rowA && this.columnB < this.columnA)
    ) {
      return new GtRule(this.columnB, this.rowB, this.columnA, this.rowA);
    } else {
      return this;
    }
  }
}
