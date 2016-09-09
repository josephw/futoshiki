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

package org.kafsemo.futoshiki.perf;

import java.io.IOException;
import java.io.InputStream;
import java.math.BigInteger;

import org.kafsemo.futoshiki.Futoshiki;
import org.kafsemo.futoshiki.Solver;
import org.kafsemo.futoshiki.sample.NineSample;

public class SolverBenchmark
{
    public static void main(String[] args) throws IOException
    {
        InputStream in = NineSample.class.getResourceAsStream("sample-9x9.txt");
        Futoshiki f = NineSample.fromStream(in);

        String version = "A";
        
        for (int iter = 0; iter < 4; iter++) {
            final int reps = 10;
            long start = System.currentTimeMillis();
    
            for (int i = 0; i < reps; i++) {
                DummySolutionTarget st = new DummySolutionTarget();
                new Solver(st).solve(f.clone());
                assert st.solved;
            }
            
            long end = System.currentTimeMillis();

            double duration = (end - start) / (double) reps;
            
            System.out.println(version + "," + (duration) / 1000);
        }
    }
    
    static class DummySolutionTarget implements Solver.SolutionTarget
    {
        boolean solved;
        
        public boolean remainingPossibilities(BigInteger count)
        {
            return true;
        }
        
        public boolean solution(Futoshiki f)
        {
            solved = true;
            return false;
        }
    }
}
