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

package org.kafsemo.futoshiki.test;

import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertFalse;
import static org.junit.Assert.assertTrue;

import java.math.BigInteger;

import org.junit.Test;
import org.kafsemo.futoshiki.Futoshiki;
import org.kafsemo.futoshiki.Possibilities;

public class TestPossibilities
{
    @Test
    public void emptyByDefault()
    {
        Possibilities p = new Possibilities(1);
        assertTrue(p.isPossible(1, 1, 1));
    }
    
    @Test
    public void notPossibleWhenUsed()
    {
        Possibilities p = new Possibilities(1);
        p.use(1, 1, 1);
        assertFalse(p.isPossible(1, 1, 1));
    }
    
    @Test
    public void usedNumberNotAvailableInSameRowOrColumn()
    {
        Possibilities p = new Possibilities(2);
        p.use(1, 1, 1);
        assertFalse(p.isPossible(1, 1, 1));
        assertFalse(p.isPossible(1, 2, 1));
        assertFalse(p.isPossible(2, 1, 1));
        assertTrue(p.isPossible(2, 2, 1));
    }
    
    @Test
    public void usedSquareNotAvailable()
    {
        Possibilities p = new Possibilities(2);
        p.use(1, 1, 1);
        assertFalse(p.isPossible(1, 1, 2));
    }
    
    @Test(expected = IllegalArgumentException.class)
    public void mayNotUseZeroValue()
    {
        Possibilities p = new Possibilities(1);
        p.use(1, 1, 0);
    }
    
    @Test(expected = IllegalArgumentException.class)
    public void mayNotUseInvalidValue()
    {
        Possibilities p = new Possibilities(1);
        p.use(1, 1, 2);
    }
    
    @Test
    public void totalNumberOfPossibilitiesKnown()
    {
        Possibilities p;
        
        p = new Possibilities(1);
        assertEquals(BigInteger.ONE, p.size());
        
        p = new Possibilities(2);
        assertEquals(BigInteger.valueOf(16), p.size());
        
        p = new Possibilities(3);
        assertEquals(BigInteger.valueOf(19683), p.size());
    }
    
    @Test
    public void totalNumberReducedWhenNumbersAreFixed()
    {
        Possibilities p;
        
        p = new Possibilities(1);
        p.use(1, 1, 1);
        assertEquals(BigInteger.ZERO, p.size());
        
        p = new Possibilities(2);
        p.use(1, 1, 1);
        assertFalse(p.isPossible(1, 1, 2));
        assertFalse(p.isPossible(2, 1, 1));
        assertTrue(p.isPossible(2, 1, 2));
        
        assertEquals(BigInteger.valueOf(2), p.size());
        p.use(2, 2, 1);
        assertEquals(BigInteger.ONE, p.size());
        
        p = new Possibilities(3);
        p.use(1, 1, 1);
        assertEquals(BigInteger.valueOf(16 * 81), p.size());
        p.use(2, 1, 2);
        assertEquals(BigInteger.valueOf(16 * 9), p.size());
        p.use(3, 1, 3);
        assertEquals(BigInteger.valueOf(64), p.size());
    }
    
    @Test
    public void useExistingPuzzleToReducePossibilities()
    {
        Possibilities p = new Possibilities(2);
        
        Futoshiki f = new Futoshiki(2);
        
        p.use(f);
        assertEquals(BigInteger.valueOf(16), p.size());
        
        f.set(1, 1, 1);
        p.use(f);
        assertEquals(BigInteger.valueOf(2), p.size());
    }
}
