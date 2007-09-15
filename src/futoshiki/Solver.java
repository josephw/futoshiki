package futoshiki;

import java.util.ArrayList;
import java.util.List;

/**
 * Recursive solver for Futoshiki puzzles.
 * 
 * @author Joseph Walton
 */
public class Solver
{
    private final SolutionTarget target;
    
    public Solver(SolutionTarget target)
    {
        this.target = target;
    }
    
    public void solve(Futoshiki f)
    {
        List<Futoshiki.CellPos> blanks = new ArrayList<Futoshiki.CellPos>(f.blankCells());
        solve(f, blanks);
    }
    
    /**
     * Accept a puzzle state and, if there are still blank squares, try every
     * number. Recurse for all attempts that are still valid. If there are
     * no blanks remaining then print what must be a solution.
     * 
     * @param f
     * @param blank
     */
    private boolean solve(Futoshiki f, List<Futoshiki.CellPos> blank)
    {
        if (blank.isEmpty()) {
            return target.solution(f);
        }
        
        Futoshiki.CellPos p = blank.get(0);
        List<Futoshiki.CellPos> remaining = blank.subList(1, blank.size());
        
        for (int v = 1; v <= 5; v++) {
            f.set(p.column, p.row, v);
            if (f.isValid()) {
                boolean more = solve(f.clone(), remaining);
                if (!more) {
                    return false;
                }
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
