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

package org.kafsemo.futoshiki;

/**
 * A class to convert puzzle state to, and from, a textual representation.
 * 
 * @author Joseph Walton
 */
public class FutoshikiPrinter
{
    static final int STR_LENGTH = Futoshiki.LENGTH * 2 - 1;
    
    public static String toString(Futoshiki f)
    {
        String[][] caa = new String[STR_LENGTH][STR_LENGTH];

        /* Data */
        for (int row = 1; row <= Futoshiki.LENGTH; row++) {
            for (int column = 1; column <= Futoshiki.LENGTH; column++) {
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
        Futoshiki f = new Futoshiki();
        
        s = s.replaceAll("\r\n", "\n");

        String[] lines = s.split("[\r\n]");

        /* Number lines */
        for (int i = 0; i < Math.min(STR_LENGTH, lines.length); i += 2) {
            char[] ca = lines[i].toCharArray();
            for (int j = 0; j < Math.min(STR_LENGTH, ca.length); j++) {
                int column = (j / 2) + 1;
                int row = (i / 2) + 1;
                char c = ca[j];
                if (j % 2 == 0) {
                    int v = Character.digit(c, 10);
                    if (v >= 1 && v <= 5) {
                        f.set(column, row, v);
                    }
                } else {
                    if (c == '<') {
                        f.addGtRule(column + 1, row, column, row);
                    } else if (c == '>') {
                        f.addGtRule(column, row, column + 1, row);
                    }
                }
            }
        }
        
        /* Rule lines */
        for (int i = 1; i < Math.min(STR_LENGTH, lines.length); i += 2) {
            char[] ca = lines[i].toCharArray();
            for (int j = 0; j < Math.min(STR_LENGTH, ca.length); j += 2) {
                int column = (j / 2) + 1;
                int row = (i / 2) + 1;
                char c = ca[j];

                if (c == '^') {
                    f.addGtRule(column, row + 1, column, row);
                } else if (c == 'v' || c == 'V') {
                    f.addGtRule(column, row, column, row + 1);
                }
            }
        }
        
        return f;
    }
}
