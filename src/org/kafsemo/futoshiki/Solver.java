package org.kafsemo.futoshiki;


/**
 * Recursive solver for Futoshiki puzzles.
 * 
 * @author Joseph Walton
 */
public class Solver
{
    private static final CellPos[] CELLPOS_ARRAY = {};
    
    private final SolutionTarget target;
    
    public Solver(SolutionTarget target)
    {
        this.target = target;
    }
    
    public void solve(Futoshiki f)
    {
        CellPos[] blanks = f.blankCells().toArray(CELLPOS_ARRAY);
//        List<CellPos> blanks = new ArrayList<CellPos>(f.blankCells());
        solve(f, blanks, 0);
    }
    
    /**
     * Accept a puzzle state and, if it is valid and if there are still blank
     * squares, try every number. Recurse for all attempts. If there are no
     * blanks remaining then print what must be a solution.
     * 
     * @param f
     * @param blank
     * @param nb the index of the next remaining blank
     */
    private boolean solve(Futoshiki f, CellPos[] blank, int nb)
    {
        if (!f.isValid()) {
            return true;
        }
        
        if (nb >= blank.length) {
            return target.solution(f);
        }
        
        CellPos p = blank[nb];
        
        for (int v = 1; v <= 5; v++) {
            f.set(p.column, p.row, v);
            boolean more = solve(f.clone(), blank, nb + 1);
            if (!more) {
                return false;
            }
        }
        
        return true;
    }
    
    public interface SolutionTarget
    {
        /**
         * @param f
         * @return whether or not more solutions are required
         */
        boolean solution(Futoshiki f);
    }
    
    public static class PrintingSolutionTarget implements SolutionTarget
    {
        public boolean solution(Futoshiki f)
        {
            System.out.println("Solution:");
            System.out.println(FutoshikiPrinter.toString(f));
            return true;
        }
    }
}
