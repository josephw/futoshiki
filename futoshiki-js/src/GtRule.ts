/* Generated from Java with JSweet 2.3.5 - http://www.jsweet.org */
namespace org.kafsemo.futoshiki {
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
        columnA : number;

        rowA : number;

        columnB : number;

        rowB : number;

        public constructor(columnA : number, rowA : number, columnB : number, rowB : number) {
            if(this.columnA===undefined) this.columnA = 0;
            if(this.rowA===undefined) this.rowA = 0;
            if(this.columnB===undefined) this.columnB = 0;
            if(this.rowB===undefined) this.rowB = 0;
            this.columnA = columnA;
            this.rowA = rowA;
            this.columnB = columnB;
            this.rowB = rowB;
        }

        public getGreaterColumn() : number {
            return this.columnA;
        }

        public getGreaterRow() : number {
            return this.rowA;
        }

        public getLesserColumn() : number {
            return this.columnB;
        }

        public getLesserRow() : number {
            return this.rowB;
        }

        public getCanonPosForm() : GtRule {
            if(this.rowB < this.rowA || (this.rowB === this.rowA && this.columnB < this.columnA)) {
                return new GtRule(this.columnB, this.rowB, this.columnA, this.rowA);
            } else {
                return this;
            }
        }

        /**
         * 
         * @return {number}
         */
        public hashCode() : number {
            let prime : number = 31;
            let result : number = 1;
            result = prime * result + this.columnA;
            result = prime * result + this.columnB;
            result = prime * result + this.rowA;
            result = prime * result + this.rowB;
            return result;
        }

        public equals(o : any) : boolean {
            if(o != null && o instanceof <any>org.kafsemo.futoshiki.GtRule) {
                let r : GtRule = <GtRule>o;
                return this.columnA === r.columnA && this.rowA === r.rowA && this.columnB === r.columnB && this.rowB === r.rowB;
            } else {
                return false;
            }
        }
    }
    GtRule["__class"] = "org.kafsemo.futoshiki.GtRule";

}

