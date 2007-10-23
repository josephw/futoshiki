package futoshiki;

public final class CellPos
{
    final int column, row;
    
    public CellPos(int column, int row)
    {
        this.column = column;
        this.row = row;
    }

    public String toString()
    {
        return "(" + column + "," + row + ")";
    }
    
    @Override
    public int hashCode()
    {
        return 31 * column + row;
    }

    @Override
    public boolean equals(Object obj)
    {
        if (this == obj)
            return true;
        if (obj == null)
            return false;
        if (!(obj instanceof CellPos))
            return false;
        final CellPos other = (CellPos) obj;
        if (column != other.column)
            return false;
        if (row != other.row)
            return false;
        return true;
    }
}