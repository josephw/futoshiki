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

import java.math.BigInteger;
import java.util.logging.Logger;


/**
 * Recursive solver for Futoshiki puzzles.
 * 
 * @author Joseph Walton
 */
public class Solver
{
    private static final Logger log = Logger.getLogger(Solver.class.getName());
    private static final CellPos[] CELLPOS_ARRAY = {};
    private static final BigInteger FIVE_BY_FIVE_COMBINATIONS =
        new BigInteger("298023223876953125");
    
    private final SolutionTarget target;
    
    public Solver(SolutionTarget target)
    {
        this.target = target;
    }
    
    public void solve(Futoshiki f)
    {
        CellPos[] blanks = f.blankCells().toArray(CELLPOS_ARRAY);
        Possibilities poss = new Possibilities(f.getLength());
        poss.use(f);
        BigInteger count = poss.size();
        log.info("Solution possibilities: " + poss.size());
        if (count.compareTo(FIVE_BY_FIVE_COMBINATIONS) > 0) {
            log.warning("This may take an extremely long time");
        }
        solve(f, blanks, 0, poss);
    }
    
    /**
     * Accept a puzzle state and, if it is valid and if there are still blank
     * squares, try every number. Recurse for all attempts. If there are no
     * blanks remaining then print what must be a solution.
     * 
     * @param f
     * @param blank
     * @param nb the index of the next remaining blank
     */
    private boolean solve(Futoshiki f, CellPos[] blank, int nb, Possibilities poss)
    {
        if (!f.isValid()) {
            return true;
        }
        
        if (nb >= blank.length) {
            return target.solution(f);
        }
        
        CellPos p = blank[nb];
        
        for (int v = 1; v <= f.getLength(); v++) {
            if (poss.isPossible(p.column, p.row, v)) {
                f.set(p.column, p.row, v);
                Possibilities ps = poss.clone();
                ps.use(p.column, p.row, v);
                boolean more = solve(f.clone(), blank, nb + 1, ps);
                if (!more) {
                    return false;
                }
            }
        }
        
        return true;
    }

    /**
     * A callback interface to receive complete puzzle solutions.
     */
    public interface SolutionTarget
    {
        /**
         * @param f
         * @return whether or not more solutions are required
         */
        boolean solution(Futoshiki f);
    }
}
