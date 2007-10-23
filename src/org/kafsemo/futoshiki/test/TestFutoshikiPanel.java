package org.kafsemo.futoshiki.test;

import junit.framework.TestCase;
import futoshiki.FutoshikiPanel;
import futoshiki.GtRule;

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
