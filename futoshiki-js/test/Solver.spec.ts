/* Generated from Java with JSweet 2.3.5 - http://www.jsweet.org */
namespace org.kafsemo.futoshiki {
    export class TestSolver {
        static logToSilence : java.util.logging.Logger; public static logToSilence_$LI$() : java.util.logging.Logger { if(TestSolver.logToSilence == null) TestSolver.logToSilence = java.util.logging.Logger.getLogger(/* getName */(c => c["__class"]?c["__class"]:c["name"])(org.kafsemo.futoshiki.Solver)); return TestSolver.logToSilence; };

        public static silenceLogger() {
            TestSolver.logToSilence_$LI$().setLevel(java.util.logging.Level.OFF);
        }

        public solverReportsSolution() {
            let f : org.kafsemo.futoshiki.Futoshiki = new org.kafsemo.futoshiki.Futoshiki(1);
            let expectedSolution : org.kafsemo.futoshiki.Futoshiki = new org.kafsemo.futoshiki.Futoshiki(1);
            expectedSolution.set(1, 1, 1);
            let sg : TestSolver.SolutionGatherer = new TestSolver.SolutionGatherer();
            new org.kafsemo.futoshiki.Solver(sg).solve(f);
            org.junit.Assert.assertEquals(java.util.Collections.singletonList<any>(expectedSolution), sg.solutions);
        }

        public solverReportsMultipleSolutions() {
            let f : org.kafsemo.futoshiki.Futoshiki = new org.kafsemo.futoshiki.Futoshiki(2);
            let expectedSolution1 : org.kafsemo.futoshiki.Futoshiki = new org.kafsemo.futoshiki.Futoshiki(2);
            expectedSolution1.set(1, 1, 1);
            expectedSolution1.set(2, 1, 2);
            expectedSolution1.set(1, 2, 2);
            expectedSolution1.set(2, 2, 1);
            let expectedSolution2 : org.kafsemo.futoshiki.Futoshiki = new org.kafsemo.futoshiki.Futoshiki(2);
            expectedSolution2.set(1, 1, 2);
            expectedSolution2.set(2, 1, 1);
            expectedSolution2.set(1, 2, 1);
            expectedSolution2.set(2, 2, 2);
            let sg : TestSolver.SolutionGatherer = new TestSolver.SolutionGatherer();
            new org.kafsemo.futoshiki.Solver(sg).solve(f);
            org.junit.Assert.assertEquals(2, sg.solutions.size());
            org.junit.Assert.assertTrue(sg.solutions.contains(expectedSolution1));
            org.junit.Assert.assertTrue(sg.solutions.contains(expectedSolution2));
        }

        public remainingSearchCountIsProvided() {
            let f : org.kafsemo.futoshiki.Futoshiki = new org.kafsemo.futoshiki.Futoshiki(1);
            let mockTarget : org.kafsemo.futoshiki.Solver.SolutionTarget = <any>(org.mockito.Mockito.mock<any>("org.kafsemo.futoshiki.Solver.SolutionTarget"));
            org.mockito.Mockito.when<any>(mockTarget.remainingPossibilities(java.math.BigInteger.ONE)).thenReturn(false);
            new org.kafsemo.futoshiki.Solver(mockTarget).solve(f);
            org.mockito.Mockito.verify<any>(mockTarget).remainingPossibilities(<any>(org.mockito.Mockito.any<java.math.BigInteger>()));
            org.mockito.Mockito.verifyNoMoreInteractions(mockTarget);
        }

        public returningFalseFromRemainingPossibilitiesTargetCancelsSearches() {
            let f : org.kafsemo.futoshiki.Futoshiki = new org.kafsemo.futoshiki.Futoshiki(9);
            let mockTarget : org.kafsemo.futoshiki.Solver.SolutionTarget;
            mockTarget = <any>(org.mockito.Mockito.mock<any>("org.kafsemo.futoshiki.Solver.SolutionTarget"));
            org.mockito.Mockito.when<any>(mockTarget.solution(<any>(org.mockito.Mockito.any<org.kafsemo.futoshiki.Futoshiki>()))).thenReturn(true);
            org.mockito.Mockito.when<any>(mockTarget.remainingPossibilities(<any>(org.mockito.Mockito.any<java.math.BigInteger>()))).thenReturn(false);
            new org.kafsemo.futoshiki.Solver(mockTarget).solve(f);
            mockTarget = <any>(org.mockito.Mockito.mock<any>("org.kafsemo.futoshiki.Solver.SolutionTarget"));
            org.mockito.Mockito.when<any>(mockTarget.solution(<any>(org.mockito.Mockito.any<org.kafsemo.futoshiki.Futoshiki>()))).thenReturn(true);
            org.mockito.Mockito.when<any>(mockTarget.remainingPossibilities(<any>(org.mockito.Mockito.any<java.math.BigInteger>()))).thenReturn(true).thenReturn(false);
            new org.kafsemo.futoshiki.Solver(mockTarget).solve(f);
        }

        public currentPossibilityCountIsReported() {
            let f : org.kafsemo.futoshiki.Futoshiki = new org.kafsemo.futoshiki.Futoshiki(2);
            let pcg : TestSolver.PossibilityCountGatherer = new TestSolver.PossibilityCountGatherer();
            new org.kafsemo.futoshiki.Solver(pcg).solve(f);
            let sixteen : java.math.BigInteger = java.math.BigInteger.valueOf(16);
            let four : java.math.BigInteger = java.math.BigInteger.valueOf(4);
            let three : java.math.BigInteger = java.math.BigInteger.valueOf(3);
            let two : java.math.BigInteger = java.math.BigInteger.valueOf(2);
            let expected : java.util.List<java.math.BigInteger> = java.util.Arrays.asList<any>(sixteen, four, three, three, three, two, java.math.BigInteger.ONE, java.math.BigInteger.ONE, java.math.BigInteger.ONE, java.math.BigInteger.ZERO);
            org.junit.Assert.assertEquals(expected, pcg.counts);
        }

        public zeroPossibilityCountIsNotProvidedForCancelledSearch() {
            let f : org.kafsemo.futoshiki.Futoshiki = new org.kafsemo.futoshiki.Futoshiki(2);
            let mockTarget : org.kafsemo.futoshiki.Solver.SolutionTarget;
            mockTarget = <any>(org.mockito.Mockito.mock<any>("org.kafsemo.futoshiki.Solver.SolutionTarget"));
            org.mockito.Mockito.when<any>(mockTarget.solution(<any>(org.mockito.Mockito.any<org.kafsemo.futoshiki.Futoshiki>()))).thenReturn(true);
            org.mockito.Mockito.when<any>(mockTarget.remainingPossibilities(<any>(org.mockito.Mockito.any<java.math.BigInteger>()))).thenReturn(false);
            new org.kafsemo.futoshiki.Solver(mockTarget).solve(f);
            org.mockito.Mockito.verify<any>(mockTarget, org.mockito.Mockito.never()).remainingPossibilities(java.math.BigInteger.ZERO);
        }

        public puzzleWithImpossibleCellIsDetected() {
            let f : org.kafsemo.futoshiki.Futoshiki = new org.kafsemo.futoshiki.Futoshiki(2);
            f.set(1, 1, 1);
            f.addGtRule(1, 1, 2, 1);
            let pcg : TestSolver.PossibilityCountGatherer = new TestSolver.PossibilityCountGatherer();
            new org.kafsemo.futoshiki.Solver(pcg).solve(f);
            org.junit.Assert.assertEquals(java.util.Arrays.asList<any>(java.math.BigInteger.ZERO, java.math.BigInteger.ZERO), pcg.counts);
        }
    }
    TestSolver["__class"] = "org.kafsemo.futoshiki.TestSolver";


    export namespace TestSolver {

        export class SolutionGatherer implements org.kafsemo.futoshiki.Solver.SolutionTarget {
            solutions : java.util.Collection<org.kafsemo.futoshiki.Futoshiki> = <any>(new java.util.ArrayList<org.kafsemo.futoshiki.Futoshiki>());

            public solution(f : org.kafsemo.futoshiki.Futoshiki) : boolean {
                this.solutions.add(f);
                return true;
            }

            public remainingPossibilities(count : java.math.BigInteger) : boolean {
                return true;
            }

            constructor() {
            }
        }
        SolutionGatherer["__class"] = "org.kafsemo.futoshiki.TestSolver.SolutionGatherer";
        SolutionGatherer["__interfaces"] = ["org.kafsemo.futoshiki.Solver.SolutionTarget"];



        export class PossibilityCountGatherer implements org.kafsemo.futoshiki.Solver.SolutionTarget {
            counts : java.util.List<java.math.BigInteger> = <any>(new java.util.ArrayList<java.math.BigInteger>());

            public solution(f : org.kafsemo.futoshiki.Futoshiki) : boolean {
                return true;
            }

            public remainingPossibilities(count : java.math.BigInteger) : boolean {
                this.counts.add(count);
                return true;
            }

            constructor() {
            }
        }
        PossibilityCountGatherer["__class"] = "org.kafsemo.futoshiki.TestSolver.PossibilityCountGatherer";
        PossibilityCountGatherer["__interfaces"] = ["org.kafsemo.futoshiki.Solver.SolutionTarget"];


    }

}


org.kafsemo.futoshiki.TestSolver.logToSilence_$LI$();
