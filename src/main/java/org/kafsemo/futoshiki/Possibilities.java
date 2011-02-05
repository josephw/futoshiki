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
import java.util.BitSet;

public class Possibilities extends Grid
{
    final BitSet possibilities;

    public Possibilities(int length)
    {
        super(length);
        this.possibilities = new BitSet(length * length * 3);
    }
    
    private Possibilities(int length, BitSet p)
    {
        super(length);
        this.possibilities = p;
    }

    int bit(boolean isRow, int pos, int value)
    {
        return ((pos - 1) * length) + (value - 1)
            + (isRow ? 0 : length * length);
    }
    
    int usedBit(int column, int row)
    {
        return length * length * 2 + idxInternal(column, row);
    }
    
    public void use(int column, int row, int value)
    {
        if (value < 1 || value > length)
            throw new IllegalArgumentException("Bad cell value " + value);
        possibilities.set(bit(false, column, value));
        possibilities.set(bit(true, row, value));
        possibilities.set(usedBit(column,row));
    }
    
    public void use(Futoshiki f)
    {
        for (int r = 1; r <= length; r++) {
            for (int c = 1; c <= length; c++) {
                int v = f.get(c, r);
                if (v != 0) {
                    use(c, r, v);
                }
            }
        }
    }
    
    public boolean isPossible(int column, int row, int value)
    {
        return !(possibilities.get(usedBit(column, row))
                || possibilities.get(bit(false, column, value))
                || possibilities.get(bit(true, row, value)));
    }
    
    public Possibilities clone()
    {
        return new Possibilities(length, (BitSet) possibilities.clone());
    }

    public BigInteger size()
    {
        BigInteger total = BigInteger.ONE;
        int blankCount = 0;
        
        for (int r = 1; r <= length; r++) {
            for (int c = 1; c <= length; c++) {
                if (!possibilities.get(usedBit(c,r))) {
                    blankCount++;
                    int available = 0;
                    
                    for (int v = 1; v <= length; v++) {
                        if (isPossible(c, r, v)) {
                            available++;
                        }
                    }

                    total = total.multiply(BigInteger.valueOf(available));
                }
            }
        }

        if (blankCount > 0) {
            return total;
        } else {
            return BigInteger.ZERO;
        }
    }
}
