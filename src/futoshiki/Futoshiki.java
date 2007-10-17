package futoshiki;

import java.util.ArrayList;
import java.util.Collection;
import java.util.HashMap;
import java.util.Iterator;
import java.util.Map;

/**
 * A Futoshiki puzzle state, with any number of cells filled in and
 * a set of rules constraining the values. Methods allow for the manipulation
 * of state and validity checking.
 * 
 * @author Joseph Walton
 */
public class Futoshiki
{
    public static final int LENGTH = 5;
    
    private final byte[] data = new byte[25];
    
    private final Map<GtRule, ValidatingRule> rules = new HashMap<GtRule, ValidatingRule>();
    private final Iterable<GtRule> origRuleIterable = new OrigRuleIterable();

    private static final int idx(int column, int row)
    {
        if (column < 1 || column > 5)
            throw new IllegalArgumentException("Bad column " + column);

        if (row < 1 || row > 5)
            throw new IllegalArgumentException("Bad row " + row);
        
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
        for (ValidatingRule r : rules.values()) {
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

    public void clear(int column, int row)
    {
        data[idx(column, row)] = 0;
    }
    
    public void addGtRule(int columnA, int rowA, int columnB, int rowB)
    {
        GtRule newRule = new GtRule(columnA, rowA, columnB, rowB);

        GtRule k = newRule.getCanonPosForm();
        
        rules.put(k, new ValidatingRule(newRule));
    }
    
    public Futoshiki clone()
    {
        Futoshiki f = new Futoshiki();
        System.arraycopy(data, 0, f.data, 0, data.length);
        f.rules.putAll(rules);
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

    public Iterable<? extends GtRule> getRules()
    {
        return origRuleIterable;
    }
    
    public GtRule getRule(GtRule ruleKey)
    {
        GtRule k = ruleKey.getCanonPosForm();

        ValidatingRule r = rules.get(k);
        if (r != null) {
            return r.getOrigRule();
        } else {
            return null;
        }
    }
    
    public void removeRule(GtRule ruleKey)
    {
        GtRule k = ruleKey.getCanonPosForm();
        
        rules.remove(k);
    }
    
    private static class ValidatingRule
    {
        private final int idxA, idxB;
        private final GtRule origRule;
        
        ValidatingRule(GtRule gtr)
        {
            idxA = idx(gtr.getGreaterColumn(), gtr.getGreaterRow());
            idxB = idx(gtr.getLesserColumn(), gtr.getLesserRow());
            origRule = gtr;
        }
        
        boolean isValid(Futoshiki f)
        {
            /* Is either cell blank? */
            if (f.data[idxA] == 0 || f.data[idxB] == 0)
                return true;

            return f.data[idxA] > f.data[idxB];
        }
        
        GtRule getOrigRule()
        {
            return origRule;
        }
    }
    
    private class OrigRuleIterable implements Iterable<GtRule>
    {
        public Iterator<GtRule> iterator()
        {
            final Iterator<ValidatingRule> i = rules.values().iterator();
            
            return new Iterator<GtRule>() {
                public boolean hasNext()
                {
                    return i.hasNext();
                }

                public GtRule next()
                {
                    return i.next().getOrigRule();
                }
                
                public void remove()
                {
                    throw new UnsupportedOperationException();
                }
            };
        }
    }
}
