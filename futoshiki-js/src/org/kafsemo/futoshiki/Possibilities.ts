/* Generated from Java with JSweet 2.3.5 - http://www.jsweet.org */
namespace org.kafsemo.futoshiki {
    /**
     * Moves that are still possible given the current numbers.
     * 
     * @author Joseph Walton
     * @param {number} length
     * @class
     * @extends org.kafsemo.futoshiki.Grid
     */
    export class Possibilities extends org.kafsemo.futoshiki.Grid {
        /*private*/ possibilities : java.util.BitSet;

        public constructor(length? : any, p? : any) {
            if(((typeof length === 'number') || length === null) && ((p != null && p instanceof <any>java.util.BitSet) || p === null)) {
                let __args = arguments;
                super(length);
                if(this.possibilities===undefined) this.possibilities = null;
                if(this.possibilities===undefined) this.possibilities = null;
                (() => {
                    this.possibilities = p;
                })();
            } else if(((typeof length === 'number') || length === null) && p === undefined) {
                let __args = arguments;
                super(length);
                if(this.possibilities===undefined) this.possibilities = null;
                if(this.possibilities===undefined) this.possibilities = null;
                (() => {
                    this.possibilities = new java.util.BitSet(length * length * length);
                })();
            } else throw new Error('invalid overload');
        }

        bit(column : number, row : number, value : number) : number {
            return (((column - 1) * this.length) + row - 1) * this.length + value - 1;
        }

        public use$int$int$int(column : number, row : number, value : number) {
            if(value < 1 || value > this.length) throw new java.lang.IllegalArgumentException("Bad cell value " + value);
            for(let c : number = 1; c <= this.length; c++) {{
                if(c !== column) {
                    this.possibilities.set(this.bit(c, row, value));
                }
            };}
            for(let r : number = 1; r <= this.length; r++) {{
                if(r !== row) {
                    this.possibilities.set(this.bit(column, r, value));
                }
            };}
            for(let v : number = 1; v <= this.length; v++) {{
                if(v !== value) {
                    this.possibilities.set(this.bit(column, row, v));
                }
            };}
        }

        public use(column? : any, row? : any, value? : any) : any {
            if(((typeof column === 'number') || column === null) && ((typeof row === 'number') || row === null) && ((typeof value === 'number') || value === null)) {
                return <any>this.use$int$int$int(column, row, value);
            } else if(((column != null && column instanceof <any>org.kafsemo.futoshiki.Futoshiki) || column === null) && row === undefined && value === undefined) {
                return <any>this.use$org_kafsemo_futoshiki_Futoshiki(column);
            } else throw new Error('invalid overload');
        }

        minPossible(column : number, row : number) : number {
            for(let v : number = 1; v <= this.length; v++) {{
                if(this.isPossible(column, row, v)) {
                    return v;
                }
            };}
            return 0;
        }

        maxPossible(column : number, row : number) : number {
            for(let v : number = this.length; v >= 1; v--) {{
                if(this.isPossible(column, row, v)) {
                    return v;
                }
            };}
            return 0;
        }

        public use$org_kafsemo_futoshiki_Futoshiki(f : org.kafsemo.futoshiki.Futoshiki) {
            for(let r : number = 1; r <= this.length; r++) {{
                for(let c : number = 1; c <= this.length; c++) {{
                    let v : number = f.get(c, r);
                    if(v !== 0) {
                        this.use$int$int$int(c, r, v);
                    }
                };}
            };}
            let learnedSomething : boolean;
            do {{
                learnedSomething = false;
                for(let index124=f.getRules().iterator();index124.hasNext();) {
                    let r = index124.next();
                    {
                        let greatestMoreThan : number = this.minPossible(r.getLesserColumn(), r.getLesserRow());
                        if(greatestMoreThan > 0) {
                            for(let v : number = 1; v <= greatestMoreThan; v++) {{
                                learnedSomething = !this.possibilities.get(this.bit(r.getGreaterColumn(), r.getGreaterRow(), v)) || learnedSomething;
                                this.possibilities.set(this.bit(r.getGreaterColumn(), r.getGreaterRow(), v));
                            };}
                        } else {
                            for(let v : number = 1; v <= this.length; v++) {{
                                learnedSomething = !this.possibilities.get(this.bit(r.getGreaterColumn(), r.getGreaterRow(), v)) || learnedSomething;
                                this.possibilities.set(this.bit(r.getGreaterColumn(), r.getGreaterRow(), v));
                            };}
                        }
                        let leastLessThan : number = this.maxPossible(r.getGreaterColumn(), r.getGreaterRow());
                        if(leastLessThan > 0) {
                            for(let v : number = leastLessThan; v <= this.length; v++) {{
                                learnedSomething = !this.possibilities.get(this.bit(r.getLesserColumn(), r.getLesserRow(), v)) || learnedSomething;
                                this.possibilities.set(this.bit(r.getLesserColumn(), r.getLesserRow(), v));
                            };}
                        } else {
                            for(let v : number = 1; v <= this.length; v++) {{
                                learnedSomething = !this.possibilities.get(this.bit(r.getLesserColumn(), r.getLesserRow(), v)) || learnedSomething;
                                this.possibilities.set(this.bit(r.getLesserColumn(), r.getLesserRow(), v));
                            };}
                        }
                    }
                }
            }} while((learnedSomething));
        }

        public isPossible(column : number, row : number, value : number) : boolean {
            return !this.possibilities.get(this.bit(column, row, value));
        }

        public clone() : Possibilities {
            return new Possibilities(this.length, <java.util.BitSet>/* clone */((o:any) => { if(o.clone!=undefined) { return (<any>o).clone(); } else { let clone = Object.create(o); for(let p in o) { if (o.hasOwnProperty(p)) clone[p] = o[p]; } return clone; } })(this.possibilities));
        }

        public size() : java.math.BigInteger {
            let total : java.math.BigInteger = java.math.BigInteger.ONE;
            for(let r : number = 1; r <= this.length; r++) {{
                for(let c : number = 1; c <= this.length; c++) {{
                    let available : number = this.possibleCount$int$int(c, r);
                    total = total.multiply(java.math.BigInteger.valueOf(available));
                };}
            };}
            return total;
        }

        public possibleCount$int$int(column : number, row : number) : number {
            let available : number = 0;
            for(let v : number = 1; v <= this.length; v++) {{
                if(this.isPossible(column, row, v)) {
                    available++;
                }
            };}
            return available;
        }

        public possibleCount(column? : any, row? : any) : any {
            if(((typeof column === 'number') || column === null) && ((typeof row === 'number') || row === null)) {
                return <any>this.possibleCount$int$int(column, row);
            } else if(((column != null && column instanceof <any>org.kafsemo.futoshiki.CellPos) || column === null) && row === undefined) {
                return <any>this.possibleCount$org_kafsemo_futoshiki_CellPos(column);
            } else throw new Error('invalid overload');
        }

        public possibleCount$org_kafsemo_futoshiki_CellPos(cell : org.kafsemo.futoshiki.CellPos) : number {
            return this.possibleCount$int$int(cell.column, cell.row);
        }
    }
    Possibilities["__class"] = "org.kafsemo.futoshiki.Possibilities";

}

