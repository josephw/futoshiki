/* Generated from Java with JSweet 2.3.5 - http://www.jsweet.org */
namespace org.kafsemo.futoshiki {
    /**
     * Recursive solver for Futoshiki puzzles.
     * 
     * @author Joseph Walton
     * @param {*} target
     * @class
     */
    export class Solver {
        static log : java.util.logging.Logger; public static log_$LI$() : java.util.logging.Logger { if(Solver.log == null) Solver.log = java.util.logging.Logger.getLogger(/* getName */(c => c["__class"]?c["__class"]:c["name"])(Solver)); return Solver.log; };

        static CELLPOS_ARRAY : org.kafsemo.futoshiki.CellPos[]; public static CELLPOS_ARRAY_$LI$() : org.kafsemo.futoshiki.CellPos[] { if(Solver.CELLPOS_ARRAY == null) Solver.CELLPOS_ARRAY = []; return Solver.CELLPOS_ARRAY; };

        static FIVE_BY_FIVE_COMBINATIONS : java.math.BigInteger; public static FIVE_BY_FIVE_COMBINATIONS_$LI$() : java.math.BigInteger { if(Solver.FIVE_BY_FIVE_COMBINATIONS == null) Solver.FIVE_BY_FIVE_COMBINATIONS = new java.math.BigInteger("298023223876953125"); return Solver.FIVE_BY_FIVE_COMBINATIONS; };

        /*private*/ target : Solver.SolutionTarget;

        public constructor(target : Solver.SolutionTarget) {
            if(this.target===undefined) this.target = null;
            this.target = target;
        }

        public solve$org_kafsemo_futoshiki_Futoshiki(f : org.kafsemo.futoshiki.Futoshiki) {
            let blanks : org.kafsemo.futoshiki.CellPos[] = f.blankCells().toArray<any>(Solver.CELLPOS_ARRAY_$LI$());
            let poss : org.kafsemo.futoshiki.Possibilities = new org.kafsemo.futoshiki.Possibilities(f.getLength());
            poss.use$org_kafsemo_futoshiki_Futoshiki(f);
            let count : java.math.BigInteger = poss.size();
            Solver.log_$LI$().fine("Solution possibilities: " + poss.size());
            if(count.compareTo(Solver.FIVE_BY_FIVE_COMBINATIONS_$LI$()) > 0) {
                Solver.log_$LI$().fine("This may take an extremely long time");
            }
            if(!this.target.remainingPossibilities(count)) {
                return;
            }
            if(this.solve$org_kafsemo_futoshiki_Futoshiki$org_kafsemo_futoshiki_CellPos_A$int$org_kafsemo_futoshiki_Possibilities$java_math_BigInteger(f, blanks, 0, poss, java.math.BigInteger.ZERO)) {
                this.target.remainingPossibilities(java.math.BigInteger.ZERO);
            }
        }

        public solve$org_kafsemo_futoshiki_Futoshiki$org_kafsemo_futoshiki_CellPos_A$int$org_kafsemo_futoshiki_Possibilities$java_math_BigInteger(f : org.kafsemo.futoshiki.Futoshiki, blank : org.kafsemo.futoshiki.CellPos[], nb : number, poss : org.kafsemo.futoshiki.Possibilities, possibilitiesAfter : java.math.BigInteger) : boolean {
            if(!f.isValid()) {
                return true;
            }
            if(nb >= blank.length) {
                return this.target.solution(f);
            }
            blank = this.moveBlankWithLeastPossibilitiesIntoPlace(blank, nb, poss);
            let p : org.kafsemo.futoshiki.CellPos = blank[nb];
            let possibleValues : number[] = (s => { let a=[]; while(s-->0) a.push(0); return a; })(f.getLength());
            let possibilitiesForValue : java.math.BigInteger[] = (s => { let a=[]; while(s-->0) a.push(null); return a; })(f.getLength());
            let possibilities : org.kafsemo.futoshiki.Possibilities[] = (s => { let a=[]; while(s-->0) a.push(null); return a; })(f.getLength());
            let i : number = 0;
            for(let v : number = 1; v <= f.getLength(); v++) {{
                if(poss.isPossible(p.column, p.row, v)) {
                    possibleValues[i] = v;
                    let ps : org.kafsemo.futoshiki.Possibilities = /* clone */((o:any) => { if(o.clone!=undefined) { return (<any>o).clone(); } else { let clone = Object.create(o); for(let p in o) { if (o.hasOwnProperty(p)) clone[p] = o[p]; } return clone; } })(poss);
                    ps.use$int$int$int(p.column, p.row, v);
                    possibilities[i] = ps;
                    possibilitiesForValue[i] = ps.size();
                    i++;
                }
            };}
            let remainingPossibilities : java.math.BigInteger = Solver.sum(possibilitiesForValue, i);
            remainingPossibilities = remainingPossibilities.add(possibilitiesAfter);
            for(let j : number = 0; j < i; j++) {{
                if(!this.target.remainingPossibilities(remainingPossibilities)) {
                    return false;
                }
                let v : number = possibleValues[j];
                f.set(p.column, p.row, v);
                remainingPossibilities = remainingPossibilities.subtract(possibilitiesForValue[j]);
                let more : boolean = this.solve$org_kafsemo_futoshiki_Futoshiki$org_kafsemo_futoshiki_CellPos_A$int$org_kafsemo_futoshiki_Possibilities$java_math_BigInteger(/* clone */((o:any) => { if(o.clone!=undefined) { return (<any>o).clone(); } else { let clone = Object.create(o); for(let p in o) { if (o.hasOwnProperty(p)) clone[p] = o[p]; } return clone; } })(f), blank, nb + 1, possibilities[j], remainingPossibilities);
                if(!more) {
                    return false;
                }
            };}
            return true;
        }

        /**
         * Accept a puzzle state and, if it is valid and if there are still blank
         * squares, try every number. Recurse for all attempts. If there are no
         * blanks remaining then print what must be a solution.
         * 
         * @param {org.kafsemo.futoshiki.Futoshiki} f
         * @param {Array} blank
         * @param {number} nb the index of the next remaining blank
         * @param {org.kafsemo.futoshiki.Possibilities} poss
         * @param {java.math.BigInteger} possibilitiesAfter
         * @return {boolean}
         * @private
         */
        public solve(f? : any, blank? : any, nb? : any, poss? : any, possibilitiesAfter? : any) : any {
            if(((f != null && f instanceof <any>org.kafsemo.futoshiki.Futoshiki) || f === null) && ((blank != null && blank instanceof <any>Array && (blank.length==0 || blank[0] == null ||(blank[0] != null && blank[0] instanceof <any>org.kafsemo.futoshiki.CellPos))) || blank === null) && ((typeof nb === 'number') || nb === null) && ((poss != null && poss instanceof <any>org.kafsemo.futoshiki.Possibilities) || poss === null) && ((possibilitiesAfter != null && possibilitiesAfter instanceof <any>java.math.BigInteger) || possibilitiesAfter === null)) {
                return <any>this.solve$org_kafsemo_futoshiki_Futoshiki$org_kafsemo_futoshiki_CellPos_A$int$org_kafsemo_futoshiki_Possibilities$java_math_BigInteger(f, blank, nb, poss, possibilitiesAfter);
            } else if(((f != null && f instanceof <any>org.kafsemo.futoshiki.Futoshiki) || f === null) && blank === undefined && nb === undefined && poss === undefined && possibilitiesAfter === undefined) {
                return <any>this.solve$org_kafsemo_futoshiki_Futoshiki(f);
            } else throw new Error('invalid overload');
        }

        moveBlankWithLeastPossibilitiesIntoPlace(blanks : org.kafsemo.futoshiki.CellPos[], p : number, poss : org.kafsemo.futoshiki.Possibilities) : org.kafsemo.futoshiki.CellPos[] {
            let fewestIdx : number = -1;
            for(let i : number = p; i < blanks.length; i++) {{
                if(fewestIdx >= 0) {
                    let p1 : number = poss.possibleCount$org_kafsemo_futoshiki_CellPos(blanks[fewestIdx]);
                    let p2 : number = poss.possibleCount$org_kafsemo_futoshiki_CellPos(blanks[i]);
                    if(p2 < p1) {
                        fewestIdx = i;
                    }
                } else {
                    fewestIdx = i;
                }
            };}
            if(fewestIdx >= 0 && fewestIdx !== p) {
                let cp : org.kafsemo.futoshiki.CellPos = blanks[p];
                blanks[p] = blanks[fewestIdx];
                blanks[fewestIdx] = cp;
            }
            return blanks;
        }

        static sum(a : java.math.BigInteger[], maxIndex : number) : java.math.BigInteger {
            let total : java.math.BigInteger = java.math.BigInteger.ZERO;
            for(let i : number = 0; i < maxIndex; i++) {{
                total = total.add(a[i]);
            };}
            return total;
        }
    }
    Solver["__class"] = "org.kafsemo.futoshiki.Solver";


    export namespace Solver {

        /**
         * A callback interface to receive complete puzzle solutions.
         * @class
         */
        export interface SolutionTarget {
            /**
             * @param {org.kafsemo.futoshiki.Futoshiki} f
             * @return {boolean} whether or not more solutions are required
             */
            solution(f : org.kafsemo.futoshiki.Futoshiki) : boolean;

            remainingPossibilities(count : java.math.BigInteger) : boolean;
        }
    }

}


org.kafsemo.futoshiki.Solver.FIVE_BY_FIVE_COMBINATIONS_$LI$();

org.kafsemo.futoshiki.Solver.CELLPOS_ARRAY_$LI$();

org.kafsemo.futoshiki.Solver.log_$LI$();
