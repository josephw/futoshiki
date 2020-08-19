/* Generated from Java with JSweet 2.3.5 - http://www.jsweet.org */
namespace org.kafsemo.futoshiki.sample {
    /**
     * Scratch code to benchmark {@link Solver}.
     * 
     * @author Joseph Walton
     * @class
     */
    export class PerfSample {
        public static main(args : string[]) {
            console.info("Starting...");
            let start : number = java.lang.System.currentTimeMillis();
            PerfSample.exhaustive();
            let end : number = java.lang.System.currentTimeMillis();
            console.info("Time: " + (end - start));
        }

        public static exhaustive() {
            let f : org.kafsemo.futoshiki.Futoshiki = new org.kafsemo.futoshiki.Futoshiki();
            let s : org.kafsemo.futoshiki.Solver = new org.kafsemo.futoshiki.Solver(new PerfSample.PerfSample$0());
            s.solve(f);
        }

        public static realCase() {
            let f : org.kafsemo.futoshiki.Futoshiki = new org.kafsemo.futoshiki.Futoshiki();
            let sample : number[][] = [[5, 1, 4, 3, 2], [3, 2, 5, 1, 4], [4, 5, 3, 2, 1], [2, 4, 1, 5, 3], [1, 3, 2, 4, 5]];
            for(let row : number = 1; row <= 5; row++) {{
                for(let column : number = 1; column <= 5; column++) {{
                    f.set(column, row, sample[row - 1][column - 1]);
                };}
            };}
            f.addGtRule(2, 2, 2, 1);
            f.addGtRule(4, 1, 4, 2);
            f.addGtRule(2, 3, 3, 3);
            f.addGtRule(3, 3, 4, 3);
            f.addGtRule(1, 3, 1, 4);
            f.addGtRule(1, 4, 1, 5);
            f.addGtRule(2, 4, 2, 5);
            f.addGtRule(3, 5, 3, 4);
            f.addGtRule(2, 5, 1, 5);
            f.addGtRule(2, 5, 3, 5);
            f.addGtRule(4, 5, 3, 5);
            f.addGtRule(5, 5, 4, 5);
            for(let i : number = 0; i < 10000000; i++) {{
                let s : org.kafsemo.futoshiki.Solver = new org.kafsemo.futoshiki.Solver(new PerfSample.PerfSample$1());
                s.solve(f);
            };}
        }
    }
    PerfSample["__class"] = "org.kafsemo.futoshiki.sample.PerfSample";


    export namespace PerfSample {

        export class PerfSample$0 implements org.kafsemo.futoshiki.Solver.SolutionTarget {
            i : number = 0;

            public solution(f : org.kafsemo.futoshiki.Futoshiki) : boolean {
                if(this.i++ % 100 === 0) {
                    console.info("Solutions: " + this.i);
                }
                return true;
            }

            public remainingPossibilities(count : java.math.BigInteger) : boolean {
                return true;
            }

            constructor() {
            }
        }
        PerfSample$0["__interfaces"] = ["org.kafsemo.futoshiki.Solver.SolutionTarget"];



        export class PerfSample$1 implements org.kafsemo.futoshiki.Solver.SolutionTarget {
            public solution(f : org.kafsemo.futoshiki.Futoshiki) : boolean {
                return false;
            }

            public remainingPossibilities(count : java.math.BigInteger) : boolean {
                return true;
            }

            constructor() {
            }
        }
        PerfSample$1["__interfaces"] = ["org.kafsemo.futoshiki.Solver.SolutionTarget"];


    }

}


org.kafsemo.futoshiki.sample.PerfSample.main(null);
