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
import java.util.Arrays;
import java.util.BitSet;
import java.util.Collection;
import java.util.Collections;
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
public class Futoshiki extends Grid
{
    private final byte[] data;
    
    private Map<GtRule, ValidatingRule> rules;
    private Iterable<ValidatingRule> vraCache;
    private Iterable<GtRule> origRuleIterable;
    
    public Futoshiki()
    {
        this(5);
    }
    
    public Futoshiki(int length)
    {
        super(length);
        this.data = new byte[length * length];
    }
    
    private Iterable<ValidatingRule> getValidatingRules()
    {
        if (vraCache == null) {
            if (rules != null) {
                vraCache = new ArrayList<ValidatingRule>(rules.values());
            } else {
                vraCache = Collections.emptyList();
            }
            
        }
        return vraCache;
    }
    
    private Map<GtRule, ValidatingRule> ruleMap()
    {
        if (rules == null) {
            rules = new HashMap<GtRule, ValidatingRule>();
            if (vraCache != null) {
                for (ValidatingRule vr : vraCache) {
                    rules.put(vr.getOrigRule().getCanonPosForm(), vr);
                }
            }
        }
        
        return rules;
    }
    
    /**
     * Is this puzzle state currently valid? Checks for duplicate numbers
     * in rows or columns and that all rules are followed.
     * 
     * @return
     */
    public boolean isValid()
    {
        /* Check for duplicates */
        
        BitSet columnMask = new BitSet(length * length);

        assert (length * length) <= columnMask.size();
        
        for (int row = 1; row <= length; row++) {
            int rowMask = 0;

            assert length < 32;
            
            for (int column = 1; column <= length; column++) {
                int v = data[idxInternal(column, row)];
                if (v == 0)
                    continue;
                
                int bit = (1 << v);
                if ((rowMask & bit) != 0)
                    return false;
                
                int columnContainsValueBit = (column - 1) * length + v;
                
                if (columnMask.get(columnContainsValueBit))
                    return false;
                
                rowMask |= bit;
                columnMask.set(columnContainsValueBit);
            }
        }
        
        /* Obey rules */
        for (ValidatingRule r : getValidatingRules()) {
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
        if (v < 1 || v > length)
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
        
        ruleMap().put(k, new ValidatingRule(newRule, this));
        vraCache = null;
        origRuleIterable = null;
    }
    
    public Futoshiki clone()
    {
        Futoshiki f = new Futoshiki(length);
        System.arraycopy(data, 0, f.data, 0, data.length);
        f.vraCache = getValidatingRules();
        f.origRuleIterable = origRuleIterable;
        return f;
    }

    public byte get(int column, int row)
    {
        return data[idx(column, row)];
    }
    
    public Collection<CellPos> blankCells()
    {
        Collection<CellPos> blank = new ArrayList<CellPos>(length * length);
        
        for (int row = 1; row <= length; row++) {
            for (int column = 1; column <= length; column++) {
                if (data[idxInternal(column, row)] == 0) {
                    blank.add(new CellPos(column, row));
                }
            }
        }
        
        return blank;
    }

    public int hashCode()
    {
        return length ^ Arrays.hashCode(data) ^ ruleMap().hashCode();
    }
    
    public boolean equals(Object o)
    {
        if (o instanceof Futoshiki) {
            Futoshiki f = (Futoshiki) o;
            
            return length == f.length
                && Arrays.equals(data, f.data)
                && ruleMap().keySet().equals(f.ruleMap().keySet());
        } else {
            return false;
        }
    }
    
    public String toString()
    {
        return FutoshikiPrinter.toString(this);
    }
    
    public Iterable<? extends GtRule> getRules()
    {
        origRuleIterable = null;
        if (origRuleIterable == null || vraCache == null) {
            origRuleIterable = new OrigRuleIterable(getValidatingRules());
        }
        return origRuleIterable;
    }
    
    public GtRule getRule(GtRule ruleKey)
    {
        GtRule k = ruleKey.getCanonPosForm();

        ValidatingRule r = ruleMap().get(k);
        if (r != null) {
            return r.getOrigRule();
        } else {
            return null;
        }
    }
    
    public void removeRule(GtRule ruleKey)
    {
        GtRule k = ruleKey.getCanonPosForm();
        
        ruleMap().remove(k);
        vraCache = null;
        origRuleIterable = null;
    }
    
    private static class ValidatingRule
    {
        private final int idxA, idxB;
        private final GtRule origRule;
        
        ValidatingRule(GtRule gtr, Futoshiki f)
        {
            idxA = f.idx(gtr.getGreaterColumn(), gtr.getGreaterRow());
            idxB = f.idx(gtr.getLesserColumn(), gtr.getLesserRow());
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
    
    private static class OrigRuleIterable implements Iterable<GtRule>
    {
        private final Iterable<ValidatingRule> vra;
        
        private OrigRuleIterable(Iterable<ValidatingRule> vra)
        {
            this.vra = vra;
        }
        
        public Iterator<GtRule> iterator()
        {
            final Iterator<ValidatingRule> i = vra.iterator();
            
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
