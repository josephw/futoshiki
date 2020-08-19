/* Generated from Java with JSweet 2.3.5 - http://www.jsweet.org */
namespace org.kafsemo.futoshiki.sample {
    /**
     * Simple command-line sample to demonstrate solving a puzzle.
     * 
     * @author Joseph Walton
     * @class
     */
    export class SolverSample {
        public static main(args : string[]) {
            let f : org.kafsemo.futoshiki.Futoshiki = SolverSample.g36();
            console.info(org.kafsemo.futoshiki.FutoshikiPrinter.toString(f));
            new org.kafsemo.futoshiki.Solver(new SolverSample.PrintingSolutionTarget()).solve(f);
        }

        static g36() : org.kafsemo.futoshiki.Futoshiki {
            let f : org.kafsemo.futoshiki.Futoshiki = new org.kafsemo.futoshiki.Futoshiki();
            f.addGtRule(3, 1, 4, 1);
            f.addGtRule(5, 1, 4, 1);
            f.addGtRule(3, 1, 3, 2);
            f.addGtRule(4, 1, 4, 2);
            f.addGtRule(1, 2, 2, 2);
            f.addGtRule(1, 3, 1, 2);
            f.addGtRule(1, 3, 2, 3);
            f.addGtRule(4, 3, 5, 3);
            f.addGtRule(5, 4, 5, 3);
            f.addGtRule(3, 4, 3, 5);
            f.addGtRule(2, 5, 1, 5);
            f.set(5, 1, 4);
            f.set(5, 2, 5);
            f.set(2, 4, 3);
            return f;
        }

        static g40() : org.kafsemo.futoshiki.Futoshiki {
            let f : org.kafsemo.futoshiki.Futoshiki = new org.kafsemo.futoshiki.Futoshiki();
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
            f.set(1, 1, 5);
            f.set(4, 4, 5);
            return f;
        }
    }
    SolverSample["__class"] = "org.kafsemo.futoshiki.sample.SolverSample";


    export namespace SolverSample {

        export class PrintingSolutionTarget implements org.kafsemo.futoshiki.Solver.SolutionTarget {
            total : java.math.BigInteger;

            startTime : number;

            reports : number = 0;

            nextStats : number;

            public solution(f : org.kafsemo.futoshiki.Futoshiki) : boolean {
                console.info("Solution:");
                console.info(org.kafsemo.futoshiki.FutoshikiPrinter.toString(f));
                return true;
            }

            static ONE_HUNDRED : java.math.BigInteger; public static ONE_HUNDRED_$LI$() : java.math.BigInteger { if(PrintingSolutionTarget.ONE_HUNDRED == null) PrintingSolutionTarget.ONE_HUNDRED = java.math.BigInteger.valueOf(100); return PrintingSolutionTarget.ONE_HUNDRED; };

            public remainingPossibilities(count : java.math.BigInteger) : boolean {
                this.reports++;
                if(this.total != null) {
                    let now : number = java.lang.System.currentTimeMillis();
                    if(now >= this.nextStats) {
                        let eliminated : java.math.BigInteger = this.total.subtract(count);
                        let duration : number = now - this.startTime;
                        console.info(this.reports + "," + duration + "," + eliminated);
                        this.nextStats = now + 5000;
                    }
                } else {
                    this.total = count;
                    this.startTime = java.lang.System.currentTimeMillis();
                    this.nextStats = javaemul.internal.LongHelper.MIN_VALUE;
                }
                return true;
            }

            constructor() {
                if(this.total===undefined) this.total = null;
                if(this.startTime===undefined) this.startTime = 0;
                if(this.nextStats===undefined) this.nextStats = 0;
            }
        }
        PrintingSolutionTarget["__class"] = "org.kafsemo.futoshiki.sample.SolverSample.PrintingSolutionTarget";
        PrintingSolutionTarget["__interfaces"] = ["org.kafsemo.futoshiki.Solver.SolutionTarget"];


    }

}


org.kafsemo.futoshiki.sample.SolverSample.PrintingSolutionTarget.ONE_HUNDRED_$LI$();

org.kafsemo.futoshiki.sample.SolverSample.main(null);
