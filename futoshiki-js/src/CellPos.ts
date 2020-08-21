/* Generated from Java with JSweet 2.3.5 - http://www.jsweet.org */
/**
 * The position of a single numeric cell on a puzzle.
 *
 * @author Joseph Walton
 * @param {number} cellColumn
 * @param {number} cellRow
 * @class
 */
export class CellPos {
  column: number;

  row: number;

  public constructor(cellColumn: number, cellRow: number) {
    if (this.column === undefined) this.column = 0;
    if (this.row === undefined) this.row = 0;
    this.column = cellColumn;
    this.row = cellRow;
  }

  public toString(): string {
    return "(" + this.column + "," + this.row + ")";
  }
}
