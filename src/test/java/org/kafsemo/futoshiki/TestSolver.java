/*
 *  A Futoshiki puzzle editor and solver.
 *  Copyright © 2007, 2011 Joseph Walton
 *
 *  This program is free software: you can redistribute it and/or modify
 *  it under the terms of the GNU General Public License as published by
 *  the Free Software Foundation, either version 3 of the License, or
 *  (at your option) any later version.
 *
 *  This program is distributed in the hope that it will be useful,
 *  but WITHOUT ANY WARRANTY; without even the implied warranty of
 *  MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 *  GNU General Public License for more details.
 *
 *  You should have received a copy of the GNU General Public License
 *  along with this program.  If not, see <http://www.gnu.org/licenses/>.
 */

package org.kafsemo.futoshiki;

import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertTrue;

import java.math.BigInteger;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Collection;
import java.util.Collections;
import java.util.List;
import java.util.logging.Level;
import java.util.logging.Logger;

import org.junit.BeforeClass;
import org.junit.Test;
import org.kafsemo.futoshiki.Futoshiki;
import org.kafsemo.futoshiki.Solver;
import org.kafsemo.futoshiki.Solver.SolutionTarget;
import org.mockito.Mockito;

public class TestSolver
{
    private static final Logger logToSilence = Logger.getLogger(Solver.class.getName());
    
    @BeforeClass
    public static void silenceLogger()
    {
        logToSilence.setLevel(Level.OFF);
    }
    
    @Test
    public void solverReportsSolution()
    {
        Futoshiki f = new Futoshiki(1);

        Futoshiki expectedSolution = new Futoshiki(1);
        expectedSolution.set(1, 1, 1);
        
        SolutionGatherer sg = new SolutionGatherer();
        
        new Solver(sg).solve(f);

        assertEquals(Collections.singletonList(expectedSolution), sg.solutions);
    }
    
    @Test
    public void solverReportsMultipleSolutions()
    {
        Futoshiki f = new Futoshiki(2);

        Futoshiki expectedSolution1 = new Futoshiki(2);
        expectedSolution1.set(1, 1, 1);
        expectedSolution1.set(2, 1, 2);
        expectedSolution1.set(1, 2, 2);
        expectedSolution1.set(2, 2, 1);
        
        Futoshiki expectedSolution2 = new Futoshiki(2);
        expectedSolution2.set(1, 1, 2);
        expectedSolution2.set(2, 1, 1);
        expectedSolution2.set(1, 2, 1);
        expectedSolution2.set(2, 2, 2);

        SolutionGatherer sg = new SolutionGatherer();
        
        new Solver(sg).solve(f);
        
        // Exactly the solutions we expect, no duplicates
        assertEquals(2, sg.solutions.size());
        assertTrue(sg.solutions.contains(expectedSolution1));
        assertTrue(sg.solutions.contains(expectedSolution2));
    }
    
    static class SolutionGatherer implements SolutionTarget
    {
        Collection<Futoshiki> solutions = new ArrayList<Futoshiki>();
        
        public boolean solution(Futoshiki f)
        {
            solutions.add(f);
            return true;
        }
        
        public boolean remainingPossibilities(BigInteger count)
        {
            return true;
        }
    }
    
    @Test
    public void remainingSearchCountIsProvided()
    {
        Futoshiki f = new Futoshiki(1);

        SolutionTarget mockTarget = Mockito.mock(SolutionTarget.class);
        Mockito.when(mockTarget.remainingPossibilities(BigInteger.ONE)).thenReturn(false);
        
        new Solver(mockTarget).solve(f);

        Mockito.verify(mockTarget).remainingPossibilities(Mockito.<BigInteger>any());
        Mockito.verifyNoMoreInteractions(mockTarget);
    }
    
    @Test(timeout = 1000)
    public void returningFalseFromRemainingPossibilitiesTargetCancelsSearches()
    {
        Futoshiki f = new Futoshiki(9);

        SolutionTarget mockTarget;
        
        mockTarget = Mockito.mock(SolutionTarget.class);
        Mockito.when(mockTarget.solution(Mockito.<Futoshiki>any())).thenReturn(true);
        Mockito.when(mockTarget.remainingPossibilities(Mockito.<BigInteger>any())).thenReturn(false);
        new Solver(mockTarget).solve(f);

        mockTarget = Mockito.mock(SolutionTarget.class);
        Mockito.when(mockTarget.solution(Mockito.<Futoshiki>any())).thenReturn(true);
        Mockito.when(mockTarget.remainingPossibilities(Mockito.<BigInteger>any())).thenReturn(true).thenReturn(false);
        new Solver(mockTarget).solve(f);
    }
    
    static class PossibilityCountGatherer implements SolutionTarget
    {
        List<BigInteger> counts = new ArrayList<BigInteger>();
        
        public boolean solution(Futoshiki f)
        {
            return true;
        }
        
        public boolean remainingPossibilities(BigInteger count)
        {
            counts.add(count);
            return true;
        }
    }
    
    @Test
    public void currentPossibilityCountIsReported()
    {
        Futoshiki f = new Futoshiki(2);

        PossibilityCountGatherer pcg = new PossibilityCountGatherer();

        new Solver(pcg).solve(f);

        BigInteger sixteen = BigInteger.valueOf(16),
            four = BigInteger.valueOf(4),
            three = BigInteger.valueOf(3),
            two = BigInteger.valueOf(2);
        
        List<BigInteger> expected = Arrays.asList(
                sixteen,
                four, three, three, three, two,
                BigInteger.ONE, BigInteger.ONE, BigInteger.ONE,
                BigInteger.ZERO);
        
        assertEquals(expected, pcg.counts);
    }
    
    @Test
    public void zeroPossibilityCountIsNotProvidedForCancelledSearch()
    {
        Futoshiki f = new Futoshiki(2);

        SolutionTarget mockTarget;
        
        mockTarget = Mockito.mock(SolutionTarget.class);
        Mockito.when(mockTarget.solution(Mockito.<Futoshiki>any())).thenReturn(true);
        Mockito.when(mockTarget.remainingPossibilities(Mockito.<BigInteger>any())).thenReturn(false);
        new Solver(mockTarget).solve(f);
        
        Mockito.verify(mockTarget, Mockito.never()).remainingPossibilities(BigInteger.ZERO);
    }
}
