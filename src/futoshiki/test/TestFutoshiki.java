package futoshiki.test;

import java.util.Collection;

import junit.framework.TestCase;
import futoshiki.Futoshiki;

public class TestFutoshiki extends TestCase
{
    public void testInitialState()
    {
        Futoshiki f = new Futoshiki();
        assertTrue(f.isValid());
        assertFalse(f.isFull());
    }
    
    public void testSimpleModification()
    {
        Futoshiki f = new Futoshiki();
        f.set(1, 1, 1);
        assertEquals(1, f.get(1, 1));
        f.set(1, 1, 2);
        assertEquals(2, f.get(1, 1));
        
        try
        {
            f.set(1, 1, 0);
            fail("Out of range numbers should fail");
        }
        catch (IllegalArgumentException iae)
        {
            // Okay
        }

        try
        {
            f.set(0, 0, 1);
            fail("Out of range coordinates should fail");
        }
        catch (IllegalArgumentException iae)
        {
            // Okay
        }

        try
        {
            f.set(6, 6, 1);
            fail("Out of range coordinates should fail");
        }
        catch (IllegalArgumentException iae)
        {
            // Okay
        }
    }
    
    public void testFull()
    {
        Futoshiki f = new Futoshiki();
        
        for (int row = 1; row <= 5; row++) {
            for (int column = 1; column <= 5; column++) {
                assertFalse(f.isFull());
                f.set(column, row, 1);
            }
        }
        
        assertTrue(f.isFull());
    }
    
    public void testSimpleInvalidation()
    {
        Futoshiki f = new Futoshiki();
        f.set(1, 1, 1);
        f.set(2, 1, 1);
        assertFalse("Two 1s in a line is invalid", f.isValid());
    }
    
    public void testSimpleRuleViolation()
    {
        Futoshiki f = new Futoshiki();
        f.set(1, 1, 1);
        f.set(2, 1, 2);
        assertTrue(f.isValid());
        
        f.addGtRule(1, 1, 2, 1);
        assertFalse("1 < 2 is invalid", f.isValid());
    }
    
    public void testNoRuleViolationWithoutNumbers()
    {
        Futoshiki f = new Futoshiki();
        f.addGtRule(1, 1, 2, 1);
        assertTrue("No rule violation with blank numbers", f.isValid());
        
        f.set(1, 1, 2);
        assertTrue("No rule violation with blank numbers", f.isValid());

        f.set(2, 1, 1);
        assertTrue("No rule violation with 2 > 1", f.isValid());

        f.set(2, 1, 3);
        assertFalse("Rule violation with 2 < 3", f.isValid());
    }
    
    public void testClone()
    {
        Futoshiki f = new Futoshiki();
        f.set(1, 1, 1);
        f.set(2, 1, 2);
        
        Futoshiki f2 = f.clone();
        assertNotNull(f2);
        assertEquals(1, f.get(1, 1));
        assertEquals(2, f.get(2, 1));
        
        f2.set(1, 1, 3);
        assertEquals(3, f2.get(1, 1));
        assertEquals(1, f.get(1, 1));
    }
    
    public void testCloneRules()
    {
        Futoshiki f = new Futoshiki();
        f.set(1, 1, 1);
        f.set(2, 1, 2);
        f.addGtRule(1, 1, 2, 1);

        Futoshiki f2 = f.clone();
        assertFalse("Rules should also be cloned", f2.isValid());
    }
    
    public void testFullSampleIsValid()
    {
        Futoshiki f = new Futoshiki();

        int[][] sample = {
                {5, 1, 4, 3, 2},
                {3, 2, 5, 1, 4},
                {4, 5, 3, 2, 1},
                {2, 4, 1, 5, 3},
                {1, 3, 2, 4, 5}
        };
        
        for (int row = 1; row <= 5; row++) {
            for (int column = 1; column <= 5; column++) {
                f.set(column, row, sample[row - 1][column - 1]);
                assertTrue(f.isValid());
            }
        }
        
        /* Include rules */
        f.addGtRule(2, 2, 2, 1);
        f.addGtRule(4, 1, 4, 2);
        f.addGtRule(2, 3, 3, 3);
        f.addGtRule(3, 3, 4, 3);
        f.addGtRule(1, 3, 1, 4);
        f.addGtRule(1, 4, 1, 5);
        f.addGtRule(2, 4, 2, 5);
        f.addGtRule(3, 5, 3, 4);
        f.addGtRule(2, 5, 1, 5);
        f.addGtRule(2, 5, 3, 5);
        f.addGtRule(4, 5, 3, 5);
        f.addGtRule(5, 5, 4, 5);
        
        assertTrue(f.isValid());
    }
    
    public void testBlankCells()
    {
        Futoshiki f = new Futoshiki();
        
        Collection<Futoshiki.CellPos> blank = f.blankCells();
        assertEquals(25, blank.size());
    }
}
