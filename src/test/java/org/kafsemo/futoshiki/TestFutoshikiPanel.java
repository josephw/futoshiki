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

import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertNotNull;
import static org.junit.Assert.assertNull;

import java.beans.PropertyChangeEvent;
import java.beans.PropertyChangeListener;

import org.junit.Test;
import org.mockito.ArgumentCaptor;
import org.mockito.Mockito;

/**
 * Tests for {@link FutoshikiPanel}, calculating positions for puzzle parts.
 * 
 * @author Joseph Walton
 */
public class TestFutoshikiPanel
{
    @Test
    public void testRulePositionInvalid()
    {
        GtRule r = new GtRule(1, 1, 3, 1);
        
        FutoshikiPanel.RulePos rp = FutoshikiPanel.rulePosition(r);
        assertNull(rp);
    }
    
    @Test
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

    @Test
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
    
    @Test
    public void clearKeepsTheSamePuzzleSize()
    {
        FutoshikiPanel fp = new FutoshikiPanel();

        Futoshiki f = new Futoshiki(1);
        f.set(1, 1, 1);
        fp.setFutoshiki(f);
        assertEquals(1, fp.getFutoshiki().getLength());
        
        fp.clearFutoshiki();
        assertEquals("The new puzzle is empty",
                0, fp.getFutoshiki().get(1, 1));
        assertEquals("The new puzzle is the same size",
                1, fp.getFutoshiki().getLength());
    }
    
    @Test
    public void puzzleSizeCausesPropertyChange()
    {
        FutoshikiPanel fp = new FutoshikiPanel();
        PropertyChangeListener pcl = Mockito.mock(PropertyChangeListener.class);
        fp.addPropertyChangeListener("futoshiki.size", pcl);
        fp.setFutoshiki(new Futoshiki(1));
        fp.setFutoshiki(new Futoshiki(2));
        
        ArgumentCaptor<PropertyChangeEvent> pceCaptor = ArgumentCaptor.forClass(PropertyChangeEvent.class);
        Mockito.verify(pcl, Mockito.times(2)).propertyChange(pceCaptor.capture());
        assertEquals(Integer.valueOf(5), pceCaptor.getAllValues().get(0).getOldValue());
        assertEquals(Integer.valueOf(1), pceCaptor.getAllValues().get(0).getNewValue());
        assertEquals(Integer.valueOf(1), pceCaptor.getAllValues().get(1).getOldValue());
        assertEquals(Integer.valueOf(2), pceCaptor.getAllValues().get(1).getNewValue());
    }
    
    @Test
    public void puzzleSizeCanBeSet()
    {
        FutoshikiPanel fp = new FutoshikiPanel();
        
        Futoshiki f = new Futoshiki(2);
        f.set(1, 1, 1);
        fp.setFutoshiki(f);
        
        fp.setFutoshikiSize(1);
        assertEquals("The puzzle size changes",
                1, fp.getFutoshiki().getLength());
        assertEquals("The puzzle is cleared after a size change",
                0, fp.getFutoshiki().get(1, 1));
        f = new Futoshiki(1);
        f.set(1, 1, 1);
        fp.setFutoshiki(f);
        fp.setFutoshikiSize(1);
        assertEquals("The puzzle is not cleared when the size does not change",
                1, fp.getFutoshiki().get(1, 1));
    }
    
    @Test
    public void undoingSendsEventsForSizeChanges()
    {
        FutoshikiPanel fp = new FutoshikiPanel();
        PropertyChangeListener pcl = Mockito.mock(PropertyChangeListener.class);
        fp.setFutoshiki(new Futoshiki(1));
        
        fp.addPropertyChangeListener("futoshiki.size", pcl);

        fp.setFutoshiki(new Futoshiki(2));
        fp.undo();
        
        ArgumentCaptor<PropertyChangeEvent> pceCaptor = ArgumentCaptor.forClass(PropertyChangeEvent.class);
        Mockito.verify(pcl, Mockito.times(2)).propertyChange(pceCaptor.capture());
        assertEquals(Integer.valueOf(1), pceCaptor.getAllValues().get(0).getOldValue());
        assertEquals(Integer.valueOf(2), pceCaptor.getAllValues().get(0).getNewValue());
        assertEquals(Integer.valueOf(2), pceCaptor.getAllValues().get(1).getOldValue());
        assertEquals(Integer.valueOf(1), pceCaptor.getAllValues().get(1).getNewValue());
    }
}
