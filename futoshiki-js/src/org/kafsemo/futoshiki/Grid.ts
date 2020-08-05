/* Generated from Java with JSweet 2.3.5 - http://www.jsweet.org */
namespace org.kafsemo.futoshiki {
    /**
     * A square grid of between one and nine squares across.
     * 
     * @author Joseph Walton
     * @param {number} length
     * @class
     */
    export class Grid {
        length : number;

        public constructor(length : number) {
            if(this.length===undefined) this.length = 0;
            if((length < 1) || (length > 9)) {
                throw new java.lang.IllegalArgumentException("Size must be 1 to 9: " + length);
            }
            this.length = length;
        }

        public getLength() : number {
            return this.length;
        }

        idx(column : number, row : number) : number {
            if(column < 1 || column > this.length) throw new java.lang.IllegalArgumentException("Bad column " + column);
            if(row < 1 || row > this.length) throw new java.lang.IllegalArgumentException("Bad row " + row);
            return this.idxInternal(column, row);
        }

        idxInternal(column : number, row : number) : number {
            return (row - 1) * this.length + (column - 1);
        }
    }
    Grid["__class"] = "org.kafsemo.futoshiki.Grid";

}

