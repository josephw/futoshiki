package org.kafsemo.futoshiki.test;

import futoshiki.Futoshiki;
import futoshiki.FutoshikiPrinter;
import junit.framework.TestCase;

public class TestFutoshikiPrinter extends TestCase
{
    public void testEmpty()
    {
        Futoshiki f = new Futoshiki();
        
        String s = FutoshikiPrinter.toString(f);
        
        String[] lines = s.split("\n");
        assertEquals(9, lines.length);
        for (String l : lines)
            assertEquals("         ", l);
    }
    
    public void testWithNumbers()
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
            }
        }
        
        String expected = 
              "5 1 4 3 2\n"
            + "         \n"
            + "3 2 5 1 4\n"
            + "         \n"
            + "4 5 3 2 1\n"
            + "         \n"
            + "2 4 1 5 3\n"
            + "         \n"
            + "1 3 2 4 5\n";

        assertEquals(expected, FutoshikiPrinter.toString(f));
    }
    
    public void testWithRules()
    {
        Futoshiki f = new Futoshiki();
        
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
        
        String expected = 
            "         \n"
          + "  ^   v  \n"
          + "         \n"
          + "         \n"
          + "   > >   \n"
          + "v        \n"
          + "         \n"
          + "v v ^    \n"
          + " < > < < \n";

      assertEquals(expected, FutoshikiPrinter.toString(f));
    }
    
    public void testFullExample()
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
        
        String expected = 
            "5 1 4 3 2\n"
          + "  ^   v  \n"
          + "3 2 5 1 4\n"
          + "         \n"
          + "4 5>3>2 1\n"
          + "v        \n"
          + "2 4 1 5 3\n"
          + "v v ^    \n"
          + "1<3>2<4<5\n";

      assertEquals(expected, FutoshikiPrinter.toString(f));
    }

    private void assertEquals(Futoshiki e, Futoshiki f)
    {
        assertEquals(FutoshikiPrinter.toString(e), FutoshikiPrinter.toString(f));
    }
    
    public void testParseEmpty()
    {
        String emptyString =
              "         \n"
            + "         \n"
            + "         \n"
            + "         \n"
            + "         \n"
            + "         \n"
            + "         \n"
            + "         \n"
            + "         \n";
        
        Futoshiki empty = FutoshikiPrinter.parse(emptyString);
        
        assertEquals(new Futoshiki(), empty);
    }
    
    public void testParseEmptyString()
    {
        Futoshiki empty = FutoshikiPrinter.parse("");
        
        assertEquals(new Futoshiki(), empty);
    }
    
    public void testParseWithNumbers()
    {
        String withNumbersString = 
            "5 1 4 3 2\n"
          + "         \n"
          + "3 2 5 1 4\n"
          + "         \n"
          + "4 5 3 2 1\n"
          + "         \n"
          + "2 4 1 5 3\n"
          + "         \n"
          + "1 3 2 4 5\n";
        
        Futoshiki withNumbers = FutoshikiPrinter.parse(withNumbersString);
        
        Futoshiki expected = new Futoshiki();

        int[][] sample = {
                {5, 1, 4, 3, 2},
                {3, 2, 5, 1, 4},
                {4, 5, 3, 2, 1},
                {2, 4, 1, 5, 3},
                {1, 3, 2, 4, 5}
        };
        
        for (int row = 1; row <= 5; row++) {
            for (int column = 1; column <= 5; column++) {
                expected.set(column, row, sample[row - 1][column - 1]);
            }
        }
        

        assertEquals(expected, withNumbers);
    }
    
    public void testParseWithRules()
    {
        String withRulesString = 
            "         \n"
            + "  ^   v  \n"
            + "         \n"
            + "         \n"
            + "   > >   \n"
            + "v        \n"
            + "         \n"
            + "v v ^    \n"
            + " < > < < \n";
        
        Futoshiki withRules = FutoshikiPrinter.parse(withRulesString);
        
        Futoshiki expected = new Futoshiki();
        
        /* Include rules */
        expected.addGtRule(2, 2, 2, 1);
        expected.addGtRule(4, 1, 4, 2);
        expected.addGtRule(2, 3, 3, 3);
        expected.addGtRule(3, 3, 4, 3);
        expected.addGtRule(1, 3, 1, 4);
        expected.addGtRule(1, 4, 1, 5);
        expected.addGtRule(2, 4, 2, 5);
        expected.addGtRule(3, 5, 3, 4);
        expected.addGtRule(2, 5, 1, 5);
        expected.addGtRule(2, 5, 3, 5);
        expected.addGtRule(4, 5, 3, 5);
        expected.addGtRule(5, 5, 4, 5);
        
      
        assertEquals(expected, withRules);
    }
    
    public void testParseFullExample()
    {
        String fullExampleString = 
              "5 1 4 3 2\n"
            + "  ^   v  \n"
            + "3 2 5 1 4\n"
            + "         \n"
            + "4 5>3>2 1\n"
            + "v        \n"
            + "2 4 1 5 3\n"
            + "v v ^    \n"
            + "1<3>2<4<5\n";
        
        Futoshiki fullExample = FutoshikiPrinter.parse(fullExampleString);
        
        Futoshiki expected = new Futoshiki();

        int[][] sample = {
                {5, 1, 4, 3, 2},
                {3, 2, 5, 1, 4},
                {4, 5, 3, 2, 1},
                {2, 4, 1, 5, 3},
                {1, 3, 2, 4, 5}
        };
        
        for (int row = 1; row <= 5; row++) {
            for (int column = 1; column <= 5; column++) {
                expected.set(column, row, sample[row - 1][column - 1]);
            }
        }

        /* Include rules */
        expected.addGtRule(2, 2, 2, 1);
        expected.addGtRule(4, 1, 4, 2);
        expected.addGtRule(2, 3, 3, 3);
        expected.addGtRule(3, 3, 4, 3);
        expected.addGtRule(1, 3, 1, 4);
        expected.addGtRule(1, 4, 1, 5);
        expected.addGtRule(2, 4, 2, 5);
        expected.addGtRule(3, 5, 3, 4);
        expected.addGtRule(2, 5, 1, 5);
        expected.addGtRule(2, 5, 3, 5);
        expected.addGtRule(4, 5, 3, 5);
        expected.addGtRule(5, 5, 4, 5);
        
      assertEquals(expected, fullExample);
    }
    
    public void testParseWithRulesCRLF()
    {
        String withRulesString = 
            "         \r\n"
            + "  ^   v  \r\n"
            + "         \r\n"
            + "         \r\n"
            + "   > >   \r\n"
            + "v        \r\n"
            + "         \r\n"
            + "v v ^    \r\n"
            + " < > < < \r\n";
        
        Futoshiki withRules = FutoshikiPrinter.parse(withRulesString);
        
        Futoshiki expected = new Futoshiki();
        
        /* Include rules */
        expected.addGtRule(2, 2, 2, 1);
        expected.addGtRule(4, 1, 4, 2);
        expected.addGtRule(2, 3, 3, 3);
        expected.addGtRule(3, 3, 4, 3);
        expected.addGtRule(1, 3, 1, 4);
        expected.addGtRule(1, 4, 1, 5);
        expected.addGtRule(2, 4, 2, 5);
        expected.addGtRule(3, 5, 3, 4);
        expected.addGtRule(2, 5, 1, 5);
        expected.addGtRule(2, 5, 3, 5);
        expected.addGtRule(4, 5, 3, 5);
        expected.addGtRule(5, 5, 4, 5);
        
      
        assertEquals(expected, withRules);
    }
    
    public void testParseFullExampleShortLines()
    {
        String fullExampleString = 
              "5 1 4 3 2\n"
            + "  ^   v\n"
            + "3 2 5 1 4\n"
            + "\n"
            + "4 5>3>2 1\n"
            + "v\n"
            + "2 4 1 5 3\n"
            + "v v ^\n"
            + "1<3>2<4<5\n";
        
        Futoshiki fullExample = FutoshikiPrinter.parse(fullExampleString);
        
        Futoshiki expected = new Futoshiki();

        int[][] sample = {
                {5, 1, 4, 3, 2},
                {3, 2, 5, 1, 4},
                {4, 5, 3, 2, 1},
                {2, 4, 1, 5, 3},
                {1, 3, 2, 4, 5}
        };
        
        for (int row = 1; row <= 5; row++) {
            for (int column = 1; column <= 5; column++) {
                expected.set(column, row, sample[row - 1][column - 1]);
            }
        }

        /* Include rules */
        expected.addGtRule(2, 2, 2, 1);
        expected.addGtRule(4, 1, 4, 2);
        expected.addGtRule(2, 3, 3, 3);
        expected.addGtRule(3, 3, 4, 3);
        expected.addGtRule(1, 3, 1, 4);
        expected.addGtRule(1, 4, 1, 5);
        expected.addGtRule(2, 4, 2, 5);
        expected.addGtRule(3, 5, 3, 4);
        expected.addGtRule(2, 5, 1, 5);
        expected.addGtRule(2, 5, 3, 5);
        expected.addGtRule(4, 5, 3, 5);
        expected.addGtRule(5, 5, 4, 5);
        
      assertEquals(expected, fullExample);
    }
    
    public void testParseIncomplete()
    {
        String fullExampleString = 
              "5 1 4\n"
            + "  ^   v\n"
            + "\n"
            + "\n"
            + "4 5>3>2 1\n"
            + "v\n"
            + "2 4 1 5 3\n"
            + "v v ^\n"
            + "1<3>2<4<5\n";
        
        Futoshiki fullExample = FutoshikiPrinter.parse(fullExampleString);
        
        Futoshiki expected = new Futoshiki();

        int[][] sample = {
                {5, 1, 4},
                {},
                {4, 5, 3, 2, 1},
                {2, 4, 1, 5, 3},
                {1, 3, 2, 4, 5}
        };
        
        for (int row = 1; row <= 5; row++) {
            for (int column = 1; column <= sample[row - 1].length; column++) {
                expected.set(column, row, sample[row - 1][column - 1]);
            }
        }

        /* Include rules */
        expected.addGtRule(2, 2, 2, 1);
        expected.addGtRule(4, 1, 4, 2);
        expected.addGtRule(2, 3, 3, 3);
        expected.addGtRule(3, 3, 4, 3);
        expected.addGtRule(1, 3, 1, 4);
        expected.addGtRule(1, 4, 1, 5);
        expected.addGtRule(2, 4, 2, 5);
        expected.addGtRule(3, 5, 3, 4);
        expected.addGtRule(2, 5, 1, 5);
        expected.addGtRule(2, 5, 3, 5);
        expected.addGtRule(4, 5, 3, 5);
        expected.addGtRule(5, 5, 4, 5);
        
        assertEquals(expected, fullExample);
    }
}
