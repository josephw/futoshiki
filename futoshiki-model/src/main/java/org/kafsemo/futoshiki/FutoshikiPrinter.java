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

import java.util.ArrayList;
import java.util.Collection;
import java.util.Collections;
import java.util.HashMap;
import java.util.Map;

/**
 * A class to convert puzzle state to, and from, a textual representation.
 * 
 * @author Joseph Walton
 */
public class FutoshikiPrinter
{
    static int stringLength(Futoshiki f)
    {
        return f.getLength() * 2 - 1;
    }
    
    public static String toString(Futoshiki f)
    {
        final int stringLength = stringLength(f);
        
        String[][] caa = new String[stringLength][stringLength];

        /* Data */
        for (int row = 1; row <= f.getLength(); row++) {
            for (int column = 1; column <= f.getLength(); column++) {
                int v = f.get(column, row);
                
                String s;
                if (v != 0) {
                    s = Integer.toString(v);
                } else {
                    s = null; //" ";
                }
                caa[(row - 1) * 2][(column - 1) * 2] = s;
            }
        }

        /* Rules */
        // XXX
        
        for (GtRule r : f.getRules()) {
            int row = r.rowA + r.rowB - 2,
                column = r.columnA + r.columnB - 2;

            String s;
            /* Choose the symbol */
            if (r.rowB > r.rowA) {
                s = "v";
            } else if (r.rowB < r.rowA) {
                s = "^";
            } else if (r.columnB > r.columnA) {
                s = ">";
            } else {
                s = "<";
            }
            caa[row][column] = s;
        }
        
        StringBuilder sb = new StringBuilder(9 * 9 + 9);
        
        for (String[] row : caa) {
            for (String c : row) {
                if (c != null)
                    sb.append(c);
                else
                    sb.append(" ");
            }
            sb.append("\n");
        }
        
        return sb.toString();
    }

    public static Futoshiki parse(String s)
    {
        s = s.replaceAll("\r\n", "\n");

        String[] lines = s.split("[\r\n]", -1);

        Map<CellPos, Integer> filledCells = new HashMap<CellPos, Integer>();
        Collection<GtRule> rules = new ArrayList<GtRule>();

        int knownSize = 0;
        
        /* Number lines */
        for (int i = 0; i < lines.length; i += 2) {
            int row = (i / 2) + 1;
            knownSize = Math.max(knownSize, row);
            char[] ca = lines[i].toCharArray();
            for (int j = 0; j < ca.length; j++) {
                int column = (j / 2) + 1;
                knownSize = Math.max(knownSize, column);
                char c = ca[j];
                if (j % 2 == 0) {
                    int v = Character.digit(c, 10);
                    if (v >= 0) {
                        filledCells.put(new CellPos(column, row),
                                        Integer.valueOf(v));
                    }
                } else {
                    if (c == '<') {
                        rules.add(new GtRule(column + 1, row, column, row));
                        knownSize = Math.max(knownSize, column + 1);
                    } else if (c == '>') {
                        rules.add(new GtRule(column, row, column + 1, row));
                        knownSize = Math.max(knownSize, column + 1);
                    }
                }
            }
        }
        
        /* Rule lines */
        for (int i = 1; i < lines.length; i += 2) {
            char[] ca = lines[i].toCharArray();
            for (int j = 0; j < ca.length; j += 2) {
                int column = (j / 2) + 1;
                int row = (i / 2) + 1;
                char c = ca[j];

                if (c == '^') {
                    rules.add(new GtRule(column, row + 1, column, row));
                    knownSize = Math.max(knownSize, row + 1);
                } else if (c == 'v' || c == 'V') {
                    rules.add(new GtRule(column, row, column, row + 1));
                    knownSize = Math.max(knownSize, row + 1);
                }
            }
        }

        /* How big must the puzzle be? */
        int size = 1;

        size = Math.max(size, knownSize);
        
        if (filledCells.size() > 0) {
            size = Math.max(size, Collections.max(filledCells.values()));
        }

        /* Fill it in */
        Futoshiki f = new Futoshiki(size);
        
        for (CellPos p : filledCells.keySet()) {
            f.set(p.column, p.row, filledCells.get(p));
        }
        
        for (GtRule gtr : rules) {
            f.addGtRule(gtr.columnA, gtr.rowA, gtr.columnB, gtr.rowB);
        }
        
        return f;
    }
}
