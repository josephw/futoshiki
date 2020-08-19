/* Generated from Java with JSweet 2.3.5 - http://www.jsweet.org */
namespace org.kafsemo.futoshiki.sample {
    export class NineSample {
        public static main(args : string[]) {
            let __in : java.io.InputStream = NineSample.getResourceAsStream("sample-9x9.txt");
            let f : org.kafsemo.futoshiki.Futoshiki = NineSample.fromStream(__in);
            console.info(org.kafsemo.futoshiki.FutoshikiPrinter.toString(f));
            new org.kafsemo.futoshiki.Solver(new org.kafsemo.futoshiki.sample.SolverSample.PrintingSolutionTarget()).solve(f);
        }

        public static fromStream(__in : java.io.InputStream) : org.kafsemo.futoshiki.Futoshiki {
            let puzzle : java.lang.StringBuilder = new java.lang.StringBuilder();
            let br : java.io.BufferedReader = new java.io.BufferedReader(new java.io.InputStreamReader(__in, "us-ascii"));
            try {
                let s : string;
                while(((s = br.readLine()) != null)) {{
                    puzzle.append(s);
                    puzzle.append('\n');
                }};
            } finally {
                br.close();
            };
            return org.kafsemo.futoshiki.FutoshikiPrinter.parse(puzzle.toString());
        }
    }
    NineSample["__class"] = "org.kafsemo.futoshiki.sample.NineSample";

}


org.kafsemo.futoshiki.sample.NineSample.main(null);
