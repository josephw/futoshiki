/* Generated from Java with JSweet 2.3.5 - http://www.jsweet.org */
namespace org.kafsemo.futoshiki {
    /**
     * The position of a single numeric cell on a puzzle.
     * 
     * @author Joseph Walton
     * @param {number} cellColumn
     * @param {number} cellRow
     * @class
     */
    export class CellPos {
        column : number;

        row : number;

        public constructor(cellColumn : number, cellRow : number) {
            if(this.column===undefined) this.column = 0;
            if(this.row===undefined) this.row = 0;
            this.column = cellColumn;
            this.row = cellRow;
        }

        public toString() : string {
            return "(" + this.column + "," + this.row + ")";
        }

        /**
         * 
         * @return {number}
         */
        public hashCode() : number {
            return 31 * this.column + this.row;
        }

        /**
         * 
         * @param {*} obj
         * @return {boolean}
         */
        public equals(obj : any) : boolean {
            if(this === obj) return true;
            if(obj == null) return false;
            if(!(obj != null && obj instanceof <any>org.kafsemo.futoshiki.CellPos)) return false;
            let other : CellPos = <CellPos>obj;
            if(this.column !== other.column) return false;
            if(this.row !== other.row) return false;
            return true;
        }
    }
    CellPos["__class"] = "org.kafsemo.futoshiki.CellPos";

}

