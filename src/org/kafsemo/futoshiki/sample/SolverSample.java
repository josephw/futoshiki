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
import org.kafsemo.futoshiki.FutoshikiPrinter;
import org.kafsemo.futoshiki.Solver;

public class SolverSample
{
    public static void main(String[] args)
    {
        Futoshiki f = g36();
        
        System.out.print(FutoshikiPrinter.toString(f));
        
        new Solver(new Solver.PrintingSolutionTarget()).solve(f);
    }

    static Futoshiki g36()
    {
        Futoshiki f = new Futoshiki();
        
        /* Rules */
        f.addGtRule(3, 1, 4, 1);
        f.addGtRule(5, 1, 4, 1);
        f.addGtRule(3, 1, 3, 2);
        f.addGtRule(4, 1, 4, 2);
        f.addGtRule(1, 2, 2, 2);
        f.addGtRule(1, 3, 1, 2);
        f.addGtRule(1, 3, 2, 3);
        f.addGtRule(4, 3, 5, 3);
        f.addGtRule(5, 4, 5, 3);
        f.addGtRule(3, 4, 3, 5);
        f.addGtRule(2, 5, 1, 5);
        
        f.set(5, 1, 4);
        f.set(5, 2, 5);
        f.set(2, 4, 3);
        
        return f;
    }
    
    static Futoshiki g40()
    {
        Futoshiki f = new Futoshiki();

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
        
        /* Initial numbers */
        f.set(1, 1, 5);
        f.set(4, 4, 5);
        
        return f;
    }
}
