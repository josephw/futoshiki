/* Generated from Java with JSweet 2.3.5 - http://www.jsweet.org */
namespace org.kafsemo.futoshiki.sample {
    /**
     * Generate latin squares by solving the degenerate case: empty puzzles
     * with no rules. This is a brute force technique to assess what feasible numbers
     * of search possibilities are.
     * @class
     */
    export class LatinSquares {
        public static main(args : string[]) {
            for(let i : number = 1; i <= 9; i++) {{
                let start : number = java.lang.System.currentTimeMillis();
                let count : number = LatinSquares.exhaustive(i);
                let end : number = java.lang.System.currentTimeMillis();
                console.info(i + "," + count + "," + (end - start));
            };}
        }

        public static exhaustive(size : number) : number {
            let f : org.kafsemo.futoshiki.Futoshiki = new org.kafsemo.futoshiki.Futoshiki(size);
            let sc : LatinSquares.SolutionCounter = new LatinSquares.SolutionCounter();
            let s : org.kafsemo.futoshiki.Solver = new org.kafsemo.futoshiki.Solver(sc);
            s.solve(f);
            return sc.count;
        }
    }
    LatinSquares["__class"] = "org.kafsemo.futoshiki.sample.LatinSquares";


    export namespace LatinSquares {

        export class SolutionCounter implements org.kafsemo.futoshiki.Solver.SolutionTarget {
            count : number = 0;

            public solution(f : org.kafsemo.futoshiki.Futoshiki) : boolean {
                this.count++;
                if(this.count < 0) {
                    throw new java.lang.RuntimeException("Solution count overflow");
                }
                return true;
            }

            public remainingPossibilities(count : java.math.BigInteger) : boolean {
                return true;
            }

            constructor() {
            }
        }
        SolutionCounter["__class"] = "org.kafsemo.futoshiki.sample.LatinSquares.SolutionCounter";
        SolutionCounter["__interfaces"] = ["org.kafsemo.futoshiki.Solver.SolutionTarget"];


    }

}


org.kafsemo.futoshiki.sample.LatinSquares.main(null);
