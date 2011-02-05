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

public class Grid
{
    protected final int length;

    public Grid(int length)
    {
        if ((length < 1) || (length > 9)) {
            throw new IllegalArgumentException("Size must be 1 to 9");
        }
        
        this.length = length;
    }
    public int getLength()
    {
        return length;
    }
    
    protected int idx(int column, int row)
    {
        if (column < 1 || column > length)
            throw new IllegalArgumentException("Bad column " + column);

        if (row < 1 || row > length)
            throw new IllegalArgumentException("Bad row " + row);

        return idxInternal(column, row);
    }

    protected int idxInternal(int column, int row)
    {
        return (row - 1) * length + (column - 1);
    }
}
