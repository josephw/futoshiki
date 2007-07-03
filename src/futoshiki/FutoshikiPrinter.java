package futoshiki;

public class FutoshikiPrinter
{

    public static String toString(Futoshiki f)
    {
        String[][] caa = new String[9][9];

        /* Data */
        for (int row = 1; row <= 5; row++) {
            for (int column = 1; column <= 5; column++) {
                int v = f.get(column, row);
                
                String s;
                if (v != 0) {
                    s = Integer.toString(v);
                } else {
                    s = null; //" ";
                }
                caa[(row - 1) * 2][(column - 1) * 2] = s;
            }
        }

        /* Rules */
        // XXX
        
        for (Futoshiki.GtRule r : f.rules) {
            int row = r.rowA + r.rowB - 2,
                column = r.columnA + r.columnB - 2;

            String s;
            /* Choose the symbol */
            if (r.rowB > r.rowA) {
                s = "v";
            } else if (r.rowB < r.rowA) {
                s = "^";
            } else if (r.columnB > r.columnA) {
                s = ">";
            } else {
                s = "<";
            }
            caa[row][column] = s;
        }
        
        StringBuilder sb = new StringBuilder(9 * 9 + 9);
        
        for (String[] row : caa) {
            for (String c : row) {
                if (c != null)
                    sb.append(c);
                else
                    sb.append(" ");
            }
            sb.append("\n");
        }
        
        return sb.toString();
    }
}
