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

package org.kafsemo.futoshiki.sample;

import org.kafsemo.futoshiki.Futoshiki;
import org.kafsemo.futoshiki.Solver;

/**
 * Generate latin squares by solving the degenerate case: empty puzzles
 * with no rules. This is a brute force technique to assess what feasible numbers
 * of search possibilities are.
 */
public class LatinSquares
{
    public static void main(String[] args)
    {
        for (int i = 1; i <= 9; i++) {
            long start = System.currentTimeMillis();
            
            long count = exhaustive(i);
            
            long end = System.currentTimeMillis();
            
            System.out.println(i + "," + count + "," + (end - start));
        }
    }
    
    static class SolutionCounter implements Solver.SolutionTarget
    {
        long count = 0;
        
        public boolean solution(Futoshiki f)
        {
            count++;
            
            if (count < 0) {
                throw new RuntimeException("Solution count overflow");
            }
            
//            if (count % 100 == 0) {
//                System.out.println("Solutions: " + count);
//            }
            
            return true;
        }
    }
    
    public static long exhaustive(int size)
    {
        Futoshiki f = new Futoshiki(size);
        
        SolutionCounter sc = new SolutionCounter();
        
        Solver s = new Solver(sc);
        
        s.solve(f);
        
        return sc.count;
    }
}
