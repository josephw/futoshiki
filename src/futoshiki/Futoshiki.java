package futoshiki;

import java.util.ArrayList;
import java.util.Collection;

/**
 * A Futoshiki puzzle state, with any number of cells filled in and
 * a set of rules constraining the values. Methods allow for the manipulation
 * of state and validity checking.
 * 
 * @author Joseph Walton
 */
public class Futoshiki
{
    private final byte[] data = new byte[25];
    
    final Collection<GtRule> rules = new ArrayList<GtRule>();

    private static final int idx(int column, int row)
    {
        if (column < 1 || column > 5)
            throw new IllegalArgumentException("Bad column " + column);

        if (row < 1 || row > 5)
            throw new IllegalArgumentException("Bad row " + column);
        
        return (row - 1) * 5 + (column - 1);
    }
    
    public boolean isValid()
    {
        /* Check for duplicates */
        byte[] rows = new byte[5],
            columns = new byte[5];
        
        for (int row = 1; row <= 5; row++) {
            for (int column = 1; column <= 5; column++) {
                int v = data[idx(column, row)];
                if (v == 0)
                    continue;
                
                byte bit = (byte) (1 << v);
                if ((rows[row - 1] & bit) != 0)
                    return false;
                
                if ((columns[column - 1] & bit) != 0)
                    return false;
                
                rows[row - 1] |= bit;
                columns[column - 1] |= bit;
            }
        }
        
        /* Obey rules */
        for (GtRule r : rules) {
            if (!r.isValid(this))
                return false;
        }
        
        /* No violations, so valid */
        return true;
    }

    public boolean isFull()
    {
        for (byte b : data) {
            if (b == 0) {
                return false;
            }
        }
        return true;
    }

    public void set(int column, int row, int v)
    {
        if (v < 1 || v > 5)
            throw new IllegalArgumentException("Bad cell value " + v);
        
        data[idx(column, row)] = (byte) v;
    }

    public void addGtRule(int columnA, int rowA, int columnB, int rowB)
    {
        rules.add(new GtRule(columnA, rowA, columnB, rowB));
    }
    
    public Futoshiki clone()
    {
        Futoshiki f = new Futoshiki();
        System.arraycopy(data, 0, f.data, 0, data.length);
        f.rules.addAll(rules);
        return f;
    }

    public byte get(int column, int row)
    {
        return data[idx(column, row)];
    }
    
    public Collection<CellPos> blankCells()
    {
        Collection<CellPos> blank = new ArrayList<CellPos>(25);
        
        for (int row = 1; row <= 5; row++) {
            for (int column = 1; column <= 5; column++) {
                if (data[idx(column, row)] == 0) {
                    blank.add(new CellPos(column, row));
                }
            }
        }
        
        return blank;
    }

    static class GtRule
    {
        final int columnA, rowA, columnB, rowB;
        
        private final int idxA, idxB;
        
        GtRule(int columnA, int rowA, int columnB, int rowB)
        {
            idxA = idx(columnA, rowA);
            idxB = idx(columnB, rowB);
            
            this.columnA = columnA;
            this.rowA = rowA;
            this.columnB = columnB;
            this.rowB = rowB;
        }
        
        boolean isValid(Futoshiki f)
        {
            /* Is either cell blank? */
            if (f.data[idxA] == 0 || f.data[idxB] == 0)
                return true;

            return f.data[idxA] > f.data[idxB];
        }
    }
    
    public static class CellPos
    {
        final int column, row;
        
        private CellPos(int column, int row)
        {
            this.column = column;
            this.row = row;
        }
    }
}
