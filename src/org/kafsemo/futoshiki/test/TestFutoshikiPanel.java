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

package org.kafsemo.futoshiki.test;

import junit.framework.TestCase;

import org.kafsemo.futoshiki.FutoshikiPanel;
import org.kafsemo.futoshiki.GtRule;

/**
 * Tests for {@link FutoshikiPanel}, calculating positions for puzzle parts.
 * 
 * @author Joseph Walton
 */
public class TestFutoshikiPanel extends TestCase
{
    public void testRulePositionInvalid()
    {
        GtRule r = new GtRule(1, 1, 3, 1);
        
        FutoshikiPanel.RulePos rp = FutoshikiPanel.rulePosition(r);
        assertNull(rp);
    }
    
    public void testRulePositionHorizontal()
    {
        GtRule r;
        FutoshikiPanel.RulePos rp;
        
        r = new GtRule(1, 1, 2, 1);
        rp = FutoshikiPanel.rulePosition(r);

        assertNotNull(rp);
        assertEquals(1, rp.column);
        assertEquals(1, rp.row);
        assertEquals(true, rp.horizontal);
        assertEquals(true, rp.gt);
        
        r = new GtRule(2, 1, 1, 1);
        rp = FutoshikiPanel.rulePosition(r);

        assertNotNull(rp);
        assertEquals(1, rp.column);
        assertEquals(1, rp.row);
        assertEquals(true, rp.horizontal);
        assertEquals(false, rp.gt);
    }

    public void testRulePositionVertical()
    {
        GtRule r;
        FutoshikiPanel.RulePos rp;
        
        r = new GtRule(1, 1, 1, 2);
        rp = FutoshikiPanel.rulePosition(r);

        assertNotNull(rp);
        assertEquals(1, rp.column);
        assertEquals(1, rp.row);
        assertEquals(false, rp.horizontal);
        assertEquals(true, rp.gt);
        
        r = new GtRule(1, 2, 1, 1);
        rp = FutoshikiPanel.rulePosition(r);

        assertNotNull(rp);
        assertEquals(1, rp.column);
        assertEquals(1, rp.row);
        assertEquals(false, rp.horizontal);
        assertEquals(false, rp.gt);
    }
}
