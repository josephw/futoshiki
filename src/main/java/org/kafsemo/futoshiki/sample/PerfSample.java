/*
 *  A Futoshiki puzzle editor and solver.
 *  Copyright © 2007 Joseph Walton
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
 * Scratch code to benchmark {@link Solver}.
 * 
 * @author Joseph Walton
 */
public class PerfSample
{
    public static void main(String[] args)
    {
        System.out.println("Starting...");
        
        long start = System.currentTimeMillis();
        
        exhaustive();
        
//        realCase();
        
        long end = System.currentTimeMillis();
        
        System.out.println("Time: " + (end - start));
    }
    
    // Time: 15872, 15592, 15983
    // Java 6: 13580, 13530
    // Use array for blanks: 11136
    // Remove range checks on idx: 8963
    // Use a single int for row and column bitmasks: 7732
    public static void exhaustive()
    {
        Futoshiki f = new Futoshiki();
        
        Solver s = new Solver(new Solver.SolutionTarget() {
            int i = 0;
            
            public boolean solution(Futoshiki f)
            {
                if (i++ % 100 == 0) {
                    System.out.println("Solutions: " + i);
                }
                
                return true;
            }
        });
        
        s.solve(f);
    }
    
    // Time: 2684, 3084, 4076, 3145
    // Increase count: 18607
    // Rules in an array: 12738
    public static void realCase()
    {
        Futoshiki f = new Futoshiki();

        int[][] sample = {
                {5, 1, 4, 3, 2},
                {3, 2, 5, 1, 4},
                {4, 5, 3, 2, 1},
                {2, 4, 1, 5, 3},
                {1, 3, 2, 4, 5}
        };
        
        for (int row = 1; row <= 5; row++) {
            for (int column = 1; column <= 5; column++) {
                f.set(column, row, sample[row - 1][column - 1]);
            }
        }

        /* Include rules */
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

        for (int i = 0; i < 10000000; i++) {
            Solver s = new Solver(new Solver.SolutionTarget() {
                public boolean solution(Futoshiki f)
                {
                    return false;
                }
            });
            
            s.solve(f);
        }
    }
}
