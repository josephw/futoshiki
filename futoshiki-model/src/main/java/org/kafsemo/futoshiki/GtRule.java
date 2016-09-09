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

/**
 * A puzzle rule requiring that one cell be greater than another.
 * 
 * @author Joseph Walton
 */
public final class GtRule
{
    final int columnA, rowA, columnB, rowB;
    
    public GtRule(int columnA, int rowA, int columnB, int rowB)
    {
        this.columnA = columnA;
        this.rowA = rowA;
        this.columnB = columnB;
        this.rowB = rowB;
    }
    
    public int getGreaterColumn()
    {
        return columnA;
    }
    
    public int getGreaterRow()
    {
        return rowA;
    }
    
    public int getLesserColumn()
    {
        return columnB;
    }
    
    public int getLesserRow()
    {
        return rowB;
    }
    
    public GtRule getCanonPosForm()
    {
        if (rowB < rowA || (rowB == rowA && columnB < columnA)) {
            return new GtRule(columnB, rowB, columnA, rowA);
        } else {
            return this;
        }
    }
    
    @Override
    public int hashCode()
    {
        final int prime = 31;
        int result = 1;
        result = prime * result + columnA;
        result = prime * result + columnB;
        result = prime * result + rowA;
        result = prime * result + rowB;
        return result;
    }

    public boolean equals(Object o)
    {
        if (o instanceof GtRule) {
            GtRule r = (GtRule) o;
            
            return columnA == r.columnA
                && rowA == r.rowA
                && columnB == r.columnB
                && rowB == r.rowB;
        } else {
            return false;
        }
    }
}
