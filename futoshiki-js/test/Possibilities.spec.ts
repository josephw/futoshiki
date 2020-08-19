/* Generated from Java with JSweet 2.3.5 - http://www.jsweet.org */
namespace org.kafsemo.futoshiki {
    export class TestPossibilities {
        public emptyByDefault() {
            let p : org.kafsemo.futoshiki.Possibilities = new org.kafsemo.futoshiki.Possibilities(1);
            org.junit.Assert.assertTrue(p.isPossible(1, 1, 1));
        }

        public stillPossibleWhenUsed() {
            let p : org.kafsemo.futoshiki.Possibilities = new org.kafsemo.futoshiki.Possibilities(1);
            p.use(1, 1, 1);
            org.junit.Assert.assertTrue(p.isPossible(1, 1, 1));
        }

        public usedNumberNotAvailableInSameRowOrColumn() {
            let p : org.kafsemo.futoshiki.Possibilities = new org.kafsemo.futoshiki.Possibilities(2);
            p.use(1, 1, 1);
            org.junit.Assert.assertTrue(p.isPossible(1, 1, 1));
            org.junit.Assert.assertFalse(p.isPossible(1, 2, 1));
            org.junit.Assert.assertFalse(p.isPossible(2, 1, 1));
            org.junit.Assert.assertTrue(p.isPossible(2, 2, 1));
        }

        public usedSquareNotAvailable() {
            let p : org.kafsemo.futoshiki.Possibilities = new org.kafsemo.futoshiki.Possibilities(2);
            p.use(1, 1, 1);
            org.junit.Assert.assertFalse(p.isPossible(1, 1, 2));
        }

        public mayNotUseZeroValue() {
            let p : org.kafsemo.futoshiki.Possibilities = new org.kafsemo.futoshiki.Possibilities(1);
            p.use(1, 1, 0);
        }

        public mayNotUseInvalidValue() {
            let p : org.kafsemo.futoshiki.Possibilities = new org.kafsemo.futoshiki.Possibilities(1);
            p.use(1, 1, 2);
        }

        public totalNumberOfPossibilitiesKnown() {
            let p : org.kafsemo.futoshiki.Possibilities;
            p = new org.kafsemo.futoshiki.Possibilities(1);
            org.junit.Assert.assertEquals(java.math.BigInteger.ONE, p.size());
            p = new org.kafsemo.futoshiki.Possibilities(2);
            org.junit.Assert.assertEquals(java.math.BigInteger.valueOf(16), p.size());
            p = new org.kafsemo.futoshiki.Possibilities(3);
            org.junit.Assert.assertEquals(java.math.BigInteger.valueOf(19683), p.size());
        }

        public totalPossibilitiesIsConstantForOneByOne() {
            let p : org.kafsemo.futoshiki.Possibilities;
            p = new org.kafsemo.futoshiki.Possibilities(1);
            org.junit.Assert.assertEquals(java.math.BigInteger.ONE, p.size());
            p.use(1, 1, 1);
            org.junit.Assert.assertEquals(java.math.BigInteger.ONE, p.size());
        }

        public totalNumberReducedWhenNumbersAreFixed() {
            let p : org.kafsemo.futoshiki.Possibilities;
            p = new org.kafsemo.futoshiki.Possibilities(2);
            p.use(1, 1, 1);
            org.junit.Assert.assertFalse(p.isPossible(1, 1, 2));
            org.junit.Assert.assertFalse(p.isPossible(2, 1, 1));
            org.junit.Assert.assertTrue(p.isPossible(2, 1, 2));
            org.junit.Assert.assertEquals(java.math.BigInteger.valueOf(2), p.size());
            p.use(2, 2, 1);
            org.junit.Assert.assertEquals(java.math.BigInteger.ONE, p.size());
            p = new org.kafsemo.futoshiki.Possibilities(3);
            p.use(1, 1, 1);
            org.junit.Assert.assertEquals(java.math.BigInteger.valueOf(16 * 81), p.size());
            p.use(2, 1, 2);
            org.junit.Assert.assertEquals(java.math.BigInteger.valueOf(16 * 9), p.size());
            p.use(3, 1, 3);
            org.junit.Assert.assertEquals(java.math.BigInteger.valueOf(64), p.size());
        }

        public useExistingPuzzleToReducePossibilities() {
            let p : org.kafsemo.futoshiki.Possibilities = new org.kafsemo.futoshiki.Possibilities(2);
            let f : org.kafsemo.futoshiki.Futoshiki = new org.kafsemo.futoshiki.Futoshiki(2);
            p.use(f);
            org.junit.Assert.assertEquals(java.math.BigInteger.valueOf(16), p.size());
            f.set(1, 1, 1);
            p.use(f);
            org.junit.Assert.assertEquals(java.math.BigInteger.valueOf(2), p.size());
        }

        public useExistingPuzzleRulesToReducePossibilities() {
            let p : org.kafsemo.futoshiki.Possibilities = new org.kafsemo.futoshiki.Possibilities(2);
            let f : org.kafsemo.futoshiki.Futoshiki = new org.kafsemo.futoshiki.Futoshiki(2);
            f.addGtRule(1, 1, 2, 1);
            p.use(f);
            org.junit.Assert.assertFalse(p.isPossible(1, 1, 1));
            org.junit.Assert.assertTrue(p.isPossible(1, 1, 2));
            org.junit.Assert.assertTrue(p.isPossible(2, 1, 1));
            org.junit.Assert.assertFalse(p.isPossible(2, 1, 2));
        }

        public useExistingPuzzleRulesWithNumbersToReducePossibilities() {
            let p : org.kafsemo.futoshiki.Possibilities = new org.kafsemo.futoshiki.Possibilities(3);
            let f : org.kafsemo.futoshiki.Futoshiki = new org.kafsemo.futoshiki.Futoshiki(3);
            f.set(1, 1, 2);
            f.addGtRule(2, 1, 1, 1);
            p.use(f);
            org.junit.Assert.assertFalse(p.isPossible(2, 1, 1));
            org.junit.Assert.assertFalse(p.isPossible(2, 1, 2));
            org.junit.Assert.assertTrue(p.isPossible(2, 1, 3));
        }

        public getPossibilityCountForSpecificCell() {
            let p : org.kafsemo.futoshiki.Possibilities;
            p = new org.kafsemo.futoshiki.Possibilities(1);
            org.junit.Assert.assertEquals(1, p.possibleCount(1, 1));
            p = new org.kafsemo.futoshiki.Possibilities(9);
            org.junit.Assert.assertEquals(9, p.possibleCount(1, 1));
        }

        public specificCellPossibilityCountIsReduced() {
            let p : org.kafsemo.futoshiki.Possibilities;
            p = new org.kafsemo.futoshiki.Possibilities(2);
            org.junit.Assert.assertEquals(2, p.possibleCount(1, 1));
            p.use(1, 1, 1);
            org.junit.Assert.assertEquals(1, p.possibleCount(1, 1));
            org.junit.Assert.assertEquals(1, p.possibleCount(2, 1));
            p = new org.kafsemo.futoshiki.Possibilities(9);
            p.use(1, 1, 1);
            org.junit.Assert.assertEquals(8, p.possibleCount(2, 1));
        }

        public ruleEliminationsArePropagated() {
            let p : org.kafsemo.futoshiki.Possibilities = new org.kafsemo.futoshiki.Possibilities(9);
            let f : org.kafsemo.futoshiki.Futoshiki = new org.kafsemo.futoshiki.Futoshiki(9);
            for(let gtColumn : number = 2; gtColumn <= 9; gtColumn++) {{
                f.addGtRule(gtColumn, 1, gtColumn - 1, 1);
            };}
            p.use(f);
            for(let column : number = 1; column <= 9; column++) {{
                org.junit.Assert.assertEquals(column, p.maxPossible(column, 1));
                org.junit.Assert.assertEquals(column, p.minPossible(column, 1));
            };}
        }

        public static toString(p : org.kafsemo.futoshiki.Possibilities) : string {
            let sb : java.lang.StringBuilder = new java.lang.StringBuilder();
            for(let r : number = 1; r <= p.getLength(); r++) {{
                for(let c : number = 1; c <= p.getLength(); c++) {{
                    let ts : java.util.TreeSet<number> = <any>(new java.util.TreeSet<number>());
                    for(let v : number = 1; v <= p.getLength(); v++) {{
                        if(p.isPossible(c, r, v)) {
                            ts.add(v);
                        }
                    };}
                    sb.append(ts);
                    sb.append(" | ");
                };}
                sb.append("\n");
            };}
            sb.append("--\n");
            return sb.toString();
        }

        public ruleEliminationsSucceedEvenWhenPuzzleCannotBeSolved() {
            let f : org.kafsemo.futoshiki.Futoshiki = new org.kafsemo.futoshiki.Futoshiki(2);
            f.addGtRule(1, 1, 2, 1);
            f.addGtRule(1, 2, 1, 1);
            new org.kafsemo.futoshiki.Possibilities(2).use(f);
        }
    }
    TestPossibilities["__class"] = "org.kafsemo.futoshiki.TestPossibilities";

}

