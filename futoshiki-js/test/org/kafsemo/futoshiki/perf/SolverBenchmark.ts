/* Generated from Java with JSweet 2.3.5 - http://www.jsweet.org */
namespace org.kafsemo.futoshiki.perf {
    export class SolverBenchmark {
        public static main(args : string[]) {
            let __in : java.io.InputStream = org.kafsemo.futoshiki.sample.NineSample.getResourceAsStream("sample-9x9.txt");
            let f : org.kafsemo.futoshiki.Futoshiki = org.kafsemo.futoshiki.sample.NineSample.fromStream(__in);
            let version : string = "A";
            for(let iter : number = 0; iter < 4; iter++) {{
                let reps : number = 10;
                let start : number = java.lang.System.currentTimeMillis();
                for(let i : number = 0; i < reps; i++) {{
                    let st : SolverBenchmark.DummySolutionTarget = new SolverBenchmark.DummySolutionTarget();
                    new org.kafsemo.futoshiki.Solver(st).solve(/* clone */((o:any) => { if(o.clone!=undefined) { return (<any>o).clone(); } else { let clone = Object.create(o); for(let p in o) { if (o.hasOwnProperty(p)) clone[p] = o[p]; } return clone; } })(f));
                };}
                let end : number = java.lang.System.currentTimeMillis();
                let duration : number = (end - start) / <number>reps;
                console.info(version + "," + (duration) / 1000);
            };}
        }
    }
    SolverBenchmark["__class"] = "org.kafsemo.futoshiki.perf.SolverBenchmark";


    export namespace SolverBenchmark {

        export class DummySolutionTarget implements org.kafsemo.futoshiki.Solver.SolutionTarget {
            solved : boolean;

            public remainingPossibilities(count : java.math.BigInteger) : boolean {
                return true;
            }

            public solution(f : org.kafsemo.futoshiki.Futoshiki) : boolean {
                this.solved = true;
                return false;
            }

            constructor() {
                if(this.solved===undefined) this.solved = false;
            }
        }
        DummySolutionTarget["__class"] = "org.kafsemo.futoshiki.perf.SolverBenchmark.DummySolutionTarget";
        DummySolutionTarget["__interfaces"] = ["org.kafsemo.futoshiki.Solver.SolutionTarget"];


    }

}


org.kafsemo.futoshiki.perf.SolverBenchmark.main(null);
