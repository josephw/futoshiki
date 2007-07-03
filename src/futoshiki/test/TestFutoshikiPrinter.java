package futoshiki.test;

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
}
