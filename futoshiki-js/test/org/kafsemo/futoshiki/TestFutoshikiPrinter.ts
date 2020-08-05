/* Generated from Java with JSweet 2.3.5 - http://www.jsweet.org */
namespace org.kafsemo.futoshiki {
    /**
     * Tests for {@link FutoshikiPrinter}, converting puzzle state to
     * and from strings.
     * 
     * @author Joseph Walton
     * @class
     * @extends junit.framework.TestCase
     */
    export class TestFutoshikiPrinter extends junit.framework.TestCase {
        public testEmpty() {
            let f : org.kafsemo.futoshiki.Futoshiki = new org.kafsemo.futoshiki.Futoshiki();
            let s : string = org.kafsemo.futoshiki.FutoshikiPrinter.toString(f);
            let lines : string[] = s.split("\n");
            TestCase.assertEquals(9, lines.length);
            for(let index122=0; index122 < lines.length; index122++) {
                let l = lines[index122];
                TestCase.assertEquals("         ", l)
            }
        }

        public testWithNumbers() {
            let f : org.kafsemo.futoshiki.Futoshiki = new org.kafsemo.futoshiki.Futoshiki();
            let sample : number[][] = [[5, 1, 4, 3, 2], [3, 2, 5, 1, 4], [4, 5, 3, 2, 1], [2, 4, 1, 5, 3], [1, 3, 2, 4, 5]];
            for(let row : number = 1; row <= 5; row++) {{
                for(let column : number = 1; column <= 5; column++) {{
                    f.set(column, row, sample[row - 1][column - 1]);
                };}
            };}
            let expected : string = "5 1 4 3 2\n         \n3 2 5 1 4\n         \n4 5 3 2 1\n         \n2 4 1 5 3\n         \n1 3 2 4 5\n";
            TestCase.assertEquals(expected, org.kafsemo.futoshiki.FutoshikiPrinter.toString(f));
        }

        public testWithRules() {
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
            let expected : string = "         \n  ^   v  \n         \n         \n   > >   \nv        \n         \nv v ^    \n < > < < \n";
            TestCase.assertEquals(expected, org.kafsemo.futoshiki.FutoshikiPrinter.toString(f));
        }

        public testFullExample() {
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
            let expected : string = "5 1 4 3 2\n  ^   v  \n3 2 5 1 4\n         \n4 5>3>2 1\nv        \n2 4 1 5 3\nv v ^    \n1<3>2<4<5\n";
            TestCase.assertEquals(expected, org.kafsemo.futoshiki.FutoshikiPrinter.toString(f));
        }

        /*private*/ assertEquals(e : org.kafsemo.futoshiki.Futoshiki, f : org.kafsemo.futoshiki.Futoshiki) {
            TestCase.assertEquals(org.kafsemo.futoshiki.FutoshikiPrinter.toString(e), org.kafsemo.futoshiki.FutoshikiPrinter.toString(f));
        }

        public testParseEmpty() {
            let emptyString : string = "         \n         \n         \n         \n         \n         \n         \n         \n         \n";
            let empty : org.kafsemo.futoshiki.Futoshiki = org.kafsemo.futoshiki.FutoshikiPrinter.parse(emptyString);
            this.assertEquals(new org.kafsemo.futoshiki.Futoshiki(), empty);
        }

        public testParseEmptyString() {
            let empty : org.kafsemo.futoshiki.Futoshiki = org.kafsemo.futoshiki.FutoshikiPrinter.parse("");
            this.assertEquals(new org.kafsemo.futoshiki.Futoshiki(1), empty);
        }

        public testParseWithNumbers() {
            let withNumbersString : string = "5 1 4 3 2\n         \n3 2 5 1 4\n         \n4 5 3 2 1\n         \n2 4 1 5 3\n         \n1 3 2 4 5\n";
            let withNumbers : org.kafsemo.futoshiki.Futoshiki = org.kafsemo.futoshiki.FutoshikiPrinter.parse(withNumbersString);
            let expected : org.kafsemo.futoshiki.Futoshiki = new org.kafsemo.futoshiki.Futoshiki();
            let sample : number[][] = [[5, 1, 4, 3, 2], [3, 2, 5, 1, 4], [4, 5, 3, 2, 1], [2, 4, 1, 5, 3], [1, 3, 2, 4, 5]];
            for(let row : number = 1; row <= 5; row++) {{
                for(let column : number = 1; column <= 5; column++) {{
                    expected.set(column, row, sample[row - 1][column - 1]);
                };}
            };}
            this.assertEquals(expected, withNumbers);
        }

        public testParseWithRules() {
            let withRulesString : string = "         \n  ^   v  \n         \n         \n   > >   \nv        \n         \nv v ^    \n < > < < \n";
            let withRules : org.kafsemo.futoshiki.Futoshiki = org.kafsemo.futoshiki.FutoshikiPrinter.parse(withRulesString);
            let expected : org.kafsemo.futoshiki.Futoshiki = new org.kafsemo.futoshiki.Futoshiki();
            expected.addGtRule(2, 2, 2, 1);
            expected.addGtRule(4, 1, 4, 2);
            expected.addGtRule(2, 3, 3, 3);
            expected.addGtRule(3, 3, 4, 3);
            expected.addGtRule(1, 3, 1, 4);
            expected.addGtRule(1, 4, 1, 5);
            expected.addGtRule(2, 4, 2, 5);
            expected.addGtRule(3, 5, 3, 4);
            expected.addGtRule(2, 5, 1, 5);
            expected.addGtRule(2, 5, 3, 5);
            expected.addGtRule(4, 5, 3, 5);
            expected.addGtRule(5, 5, 4, 5);
            this.assertEquals(expected, withRules);
        }

        public testParseFullExample() {
            let fullExampleString : string = "5 1 4 3 2\n  ^   v  \n3 2 5 1 4\n         \n4 5>3>2 1\nv        \n2 4 1 5 3\nv v ^    \n1<3>2<4<5\n";
            let fullExample : org.kafsemo.futoshiki.Futoshiki = org.kafsemo.futoshiki.FutoshikiPrinter.parse(fullExampleString);
            let expected : org.kafsemo.futoshiki.Futoshiki = new org.kafsemo.futoshiki.Futoshiki();
            let sample : number[][] = [[5, 1, 4, 3, 2], [3, 2, 5, 1, 4], [4, 5, 3, 2, 1], [2, 4, 1, 5, 3], [1, 3, 2, 4, 5]];
            for(let row : number = 1; row <= 5; row++) {{
                for(let column : number = 1; column <= 5; column++) {{
                    expected.set(column, row, sample[row - 1][column - 1]);
                };}
            };}
            expected.addGtRule(2, 2, 2, 1);
            expected.addGtRule(4, 1, 4, 2);
            expected.addGtRule(2, 3, 3, 3);
            expected.addGtRule(3, 3, 4, 3);
            expected.addGtRule(1, 3, 1, 4);
            expected.addGtRule(1, 4, 1, 5);
            expected.addGtRule(2, 4, 2, 5);
            expected.addGtRule(3, 5, 3, 4);
            expected.addGtRule(2, 5, 1, 5);
            expected.addGtRule(2, 5, 3, 5);
            expected.addGtRule(4, 5, 3, 5);
            expected.addGtRule(5, 5, 4, 5);
            this.assertEquals(expected, fullExample);
        }

        public testParseWithRulesCRLF() {
            let withRulesString : string = "         \r\n  ^   v  \r\n         \r\n         \r\n   > >   \r\nv        \r\n         \r\nv v ^    \r\n < > < < \r\n";
            let withRules : org.kafsemo.futoshiki.Futoshiki = org.kafsemo.futoshiki.FutoshikiPrinter.parse(withRulesString);
            let expected : org.kafsemo.futoshiki.Futoshiki = new org.kafsemo.futoshiki.Futoshiki();
            expected.addGtRule(2, 2, 2, 1);
            expected.addGtRule(4, 1, 4, 2);
            expected.addGtRule(2, 3, 3, 3);
            expected.addGtRule(3, 3, 4, 3);
            expected.addGtRule(1, 3, 1, 4);
            expected.addGtRule(1, 4, 1, 5);
            expected.addGtRule(2, 4, 2, 5);
            expected.addGtRule(3, 5, 3, 4);
            expected.addGtRule(2, 5, 1, 5);
            expected.addGtRule(2, 5, 3, 5);
            expected.addGtRule(4, 5, 3, 5);
            expected.addGtRule(5, 5, 4, 5);
            this.assertEquals(expected, withRules);
        }

        public testParseFullExampleShortLines() {
            let fullExampleString : string = "5 1 4 3 2\n  ^   v\n3 2 5 1 4\n\n4 5>3>2 1\nv\n2 4 1 5 3\nv v ^\n1<3>2<4<5\n";
            let fullExample : org.kafsemo.futoshiki.Futoshiki = org.kafsemo.futoshiki.FutoshikiPrinter.parse(fullExampleString);
            let expected : org.kafsemo.futoshiki.Futoshiki = new org.kafsemo.futoshiki.Futoshiki();
            let sample : number[][] = [[5, 1, 4, 3, 2], [3, 2, 5, 1, 4], [4, 5, 3, 2, 1], [2, 4, 1, 5, 3], [1, 3, 2, 4, 5]];
            for(let row : number = 1; row <= 5; row++) {{
                for(let column : number = 1; column <= 5; column++) {{
                    expected.set(column, row, sample[row - 1][column - 1]);
                };}
            };}
            expected.addGtRule(2, 2, 2, 1);
            expected.addGtRule(4, 1, 4, 2);
            expected.addGtRule(2, 3, 3, 3);
            expected.addGtRule(3, 3, 4, 3);
            expected.addGtRule(1, 3, 1, 4);
            expected.addGtRule(1, 4, 1, 5);
            expected.addGtRule(2, 4, 2, 5);
            expected.addGtRule(3, 5, 3, 4);
            expected.addGtRule(2, 5, 1, 5);
            expected.addGtRule(2, 5, 3, 5);
            expected.addGtRule(4, 5, 3, 5);
            expected.addGtRule(5, 5, 4, 5);
            this.assertEquals(expected, fullExample);
        }

        public testParseIncomplete() {
            let fullExampleString : string = "5 1 4\n  ^   v\n\n\n4 5>3>2 1\nv\n2 4 1 5 3\nv v ^\n1<3>2<4<5\n";
            let fullExample : org.kafsemo.futoshiki.Futoshiki = org.kafsemo.futoshiki.FutoshikiPrinter.parse(fullExampleString);
            let expected : org.kafsemo.futoshiki.Futoshiki = new org.kafsemo.futoshiki.Futoshiki();
            let sample : number[][] = [[5, 1, 4], [], [4, 5, 3, 2, 1], [2, 4, 1, 5, 3], [1, 3, 2, 4, 5]];
            for(let row : number = 1; row <= 5; row++) {{
                for(let column : number = 1; column <= sample[row - 1].length; column++) {{
                    expected.set(column, row, sample[row - 1][column - 1]);
                };}
            };}
            expected.addGtRule(2, 2, 2, 1);
            expected.addGtRule(4, 1, 4, 2);
            expected.addGtRule(2, 3, 3, 3);
            expected.addGtRule(3, 3, 4, 3);
            expected.addGtRule(1, 3, 1, 4);
            expected.addGtRule(1, 4, 1, 5);
            expected.addGtRule(2, 4, 2, 5);
            expected.addGtRule(3, 5, 3, 4);
            expected.addGtRule(2, 5, 1, 5);
            expected.addGtRule(2, 5, 3, 5);
            expected.addGtRule(4, 5, 3, 5);
            expected.addGtRule(5, 5, 4, 5);
            this.assertEquals(expected, fullExample);
        }

        public testSmallestToString() {
            let f : org.kafsemo.futoshiki.Futoshiki = new org.kafsemo.futoshiki.Futoshiki(1);
            TestCase.assertEquals(" \n", org.kafsemo.futoshiki.FutoshikiPrinter.toString(f));
            f.set(1, 1, 1);
            TestCase.assertEquals("1\n", org.kafsemo.futoshiki.FutoshikiPrinter.toString(f));
        }

        public testParsingSmallestPuzzle() {
            let f : org.kafsemo.futoshiki.Futoshiki;
            f = org.kafsemo.futoshiki.FutoshikiPrinter.parse(" \n");
            TestCase.assertEquals(1, f.getLength());
            TestCase.assertEquals(0, f.get(1, 1));
            f = org.kafsemo.futoshiki.FutoshikiPrinter.parse("1");
            TestCase.assertEquals(1, f.getLength());
            TestCase.assertEquals(1, f.get(1, 1));
        }

        public testParsedResultLargeEnoughToHoldDigit() {
            let f : org.kafsemo.futoshiki.Futoshiki;
            f = org.kafsemo.futoshiki.FutoshikiPrinter.parse("9");
            TestCase.assertEquals(9, f.getLength());
            TestCase.assertEquals(9, f.get(1, 1));
        }

        public testParseTallEmptyPuzzle() {
            let s : string = "\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n";
            TestCase.assertEquals(17, s.length);
            let f : org.kafsemo.futoshiki.Futoshiki;
            f = org.kafsemo.futoshiki.FutoshikiPrinter.parse(s);
            TestCase.assertEquals(9, f.getLength());
            this.assertEquals(new org.kafsemo.futoshiki.Futoshiki(9), f);
        }

        public testEmptyPuzzleWithNumberInFinalSquare() {
            let s : string = "\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n                1";
            let f : org.kafsemo.futoshiki.Futoshiki;
            f = org.kafsemo.futoshiki.FutoshikiPrinter.parse(s);
            TestCase.assertEquals(9, f.getLength());
            TestCase.assertEquals(1, f.get(9, 9));
        }

        public testPuzzleWithNoCellAfterRule() {
            let f : org.kafsemo.futoshiki.Futoshiki = org.kafsemo.futoshiki.FutoshikiPrinter.parse(" <");
            TestCase.assertEquals(2, f.getLength());
            TestCase.assertEquals(new org.kafsemo.futoshiki.GtRule(2, 1, 1, 1), f.getRules().iterator().next());
        }

        public testUpperAndLowercaseVsAcceptableAsRules() {
            let expectedRule : org.kafsemo.futoshiki.GtRule = new org.kafsemo.futoshiki.GtRule(1, 1, 1, 2);
            let s1 : string = "   \nv  \n   \n";
            let f1 : org.kafsemo.futoshiki.Futoshiki = org.kafsemo.futoshiki.FutoshikiPrinter.parse(s1);
            TestCase.assertEquals(expectedRule, f1.getRules().iterator().next());
            this.assertEquals(f1, org.kafsemo.futoshiki.FutoshikiPrinter.parse(s1.toUpperCase()));
        }

        constructor() {
            super();
        }
    }
    TestFutoshikiPrinter["__class"] = "org.kafsemo.futoshiki.TestFutoshikiPrinter";
    TestFutoshikiPrinter["__interfaces"] = ["junit.framework.Test"];


}

