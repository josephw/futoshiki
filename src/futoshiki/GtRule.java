package futoshiki;

public final class GtRule
{
    final int columnA, rowA, columnB, rowB;
    
    public GtRule(int columnA, int rowA, int columnB, int rowB)
    {
        this.columnA = columnA;
        this.rowA = rowA;
        this.columnB = columnB;
        this.rowB = rowB;
    }
    
    public int getGreaterColumn()
    {
        return columnA;
    }
    
    public int getGreaterRow()
    {
        return rowA;
    }
    
    public int getLesserColumn()
    {
        return columnB;
    }
    
    public int getLesserRow()
    {
        return rowB;
    }
    
    public GtRule getCanonPosForm()
    {
        if (rowB < rowA || (rowB == rowA && columnB < columnA)) {
            return new GtRule(columnB, rowB, columnA, rowA);
        } else {
            return this;
        }
    }
    
    @Override
    public int hashCode()
    {
        final int prime = 31;
        int result = 1;
        result = prime * result + columnA;
        result = prime * result + columnB;
        result = prime * result + rowA;
        result = prime * result + rowB;
        return result;
    }

    public boolean equals(Object o)
    {
        if (o instanceof GtRule) {
            GtRule r = (GtRule) o;
            
            return columnA == r.columnA
                && rowA == r.rowA
                && columnB == r.columnB
                && rowB == r.rowB;
        } else {
            return false;
        }
    }
}
