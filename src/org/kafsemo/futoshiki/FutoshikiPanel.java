package org.kafsemo.futoshiki;

import java.awt.Color;
import java.awt.Dimension;
import java.awt.Event;
import java.awt.Font;
import java.awt.FontMetrics;
import java.awt.Graphics;
import java.awt.Graphics2D;
import java.awt.Point;
import java.awt.Rectangle;
import java.awt.RenderingHints;
import java.awt.Toolkit;
import java.awt.datatransfer.Clipboard;
import java.awt.datatransfer.StringSelection;
import java.awt.datatransfer.Transferable;
import java.awt.event.FocusEvent;
import java.awt.event.FocusListener;
import java.awt.event.KeyAdapter;
import java.awt.event.KeyEvent;
import java.awt.event.MouseAdapter;
import java.awt.event.MouseEvent;
import java.awt.geom.AffineTransform;
import java.awt.geom.GeneralPath;
import java.awt.geom.Rectangle2D;
import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

import javax.swing.JOptionPane;
import javax.swing.JPanel;

public class FutoshikiPanel extends JPanel implements FocusListener
{
    private static final String TITLE = "Futoshiki Solver";
 
    private static final int MAX_UNDO = 10;
    
    private Futoshiki futoshiki = new Futoshiki();
    private Boolean valid;
    private Boolean undoable;
//    private Map<CellPos, EditState> cellEditStates = new HashMap<CellPos, EditState>();
    private Set<CellPos> solvedCells = new HashSet<CellPos>();
    
    private CellPos selected;
    
    private List<Futoshiki> undoRecord = new ArrayList<Futoshiki>();
    
    public FutoshikiPanel()
    {
        addMouseListener(new ClickListener());
        addKeyListener(new TypedNumberListener());
        setFocusable(true);
        
        addFocusListener(this);
    }
    
    public void focusGained(FocusEvent e)
    {
        repaint();
    }
    
    public void focusLost(FocusEvent e)
    {
        repaint();
    }
    
    @Override
    public Dimension getPreferredSize()
    {
        int maxWidth = 0,
            maxHeight = 0;
        
        Font f = getFont();

        FontMetrics fm = getFontMetrics(f);

        Graphics g = getGraphics();
        
        for (int i = 0; i < 10; i++) {
            Rectangle bounds = fm.getStringBounds(Integer.toString(i), g).getBounds();

            maxWidth = Math.max(maxWidth, bounds.width);
            maxHeight = Math.max(maxHeight, bounds.height);
        }
        
        int m = Math.max(maxWidth, maxHeight);
        
        int l = (m + 10) * (Futoshiki.LENGTH * 3 + 1);
        
        return new Dimension(l, l);
    }
    
    @Override
    public void paint(Graphics origGfx)
    {
        Graphics2D g = (Graphics2D) origGfx;

        g.setRenderingHint(RenderingHints.KEY_ANTIALIASING, RenderingHints.VALUE_ANTIALIAS_ON);
        Dimension d = getSize();

//        if (hasFocus()) {
            g.setColor(Color.LIGHT_GRAY);
//        } else {
//            g.setColor(Color.DARK_GRAY);
//        }
        
        g.fillRect(0, 0, d.width, d.height);

        int px = d.width / (Futoshiki.LENGTH * 3 + 1),
            py = d.height / (Futoshiki.LENGTH * 3 + 1);
        
        
        Font f = getFont();

        f = f.deriveFont((float)py);
        
        g.setFont(f);
        FontMetrics fm = g.getFontMetrics();

        Font bf = g.getFont().deriveFont(Font.BOLD);
        
        /* Numbers */
        for (int row = 1; row <= Futoshiki.LENGTH; row++) {
            for (int column = 1; column <= Futoshiki.LENGTH; column++) {
                
                int x = (column * 3 - 2) * px,
                    y = (row * 3 - 2) * py;
                
                g.setColor(Color.WHITE);
                g.fillRect(x, y, px * 2, py * 2);

                boolean isSelected = hasFocus()
                        && selected != null
                        && (column == selected.column && row == selected.row);
                
                if (isSelected) {
                    g.setColor(Color.RED);
                } else {
                    g.setColor(Color.BLACK);
                }
                
                g.drawRect(x, y, px * 2, py * 2);
                
                int v = futoshiki.get(column, row);
                EditState es;
                if (solvedCells.contains(new CellPos(column, row))) {
                    es = EditState.AUTOMATIC;
                } else {
                    es = EditState.DESIGNED;
                }
                
                if (v > 0) {
                    String s = Integer.toString(v);
                    
                    Rectangle2D sb = fm.getStringBounds(s, g);
                    
                    int cx = (column * 3 - 1) * px,
                        cy = (row * 3 - 1) * py;
                    
                    float tx = (float) (cx - sb.getCenterX()),
                        ty = (float) (cy - sb.getCenterY());

                    switch (es) {
                        case DESIGNED:
                            g.setColor(Color.BLACK);
                            g.setFont(bf);
                            break;
                            
//                        case MANUAL:
//                            g.setColor(Color.DARK_GRAY);
//                            g.setColor(Color.YELLOW);
//                            g.setFont(f);
//                            break;
                            
                        case AUTOMATIC:
                            g.setColor(Color.BLUE);
                            g.setFont(f);
                            break;
                    }
                    
                    if (isSelected) {
                        g.setColor(Color.RED);
                    }
                    
                    g.drawString(s, tx, ty);
                }
            }
        }

//        g.setStroke(new BasicStroke(Math.min(px, py) / 10));

        final int LW = 3;
        GeneralPath gp = new GeneralPath();
        gp.moveTo(10, 40 - LW);
        gp.lineTo(40, 50 - LW);
        gp.lineTo(40, 50 + LW);
        gp.lineTo(10, 60 + LW);
        gp.lineTo(10, 60 - LW);
        gp.lineTo(30, 50);
        gp.lineTo(10, 40 + LW);
        gp.closePath();
        
        GeneralPath gp2 = new GeneralPath(gp);
        gp2.transform(AffineTransform.getScaleInstance(-1, 1));
        gp2.transform(AffineTransform.getTranslateInstance(50, 0));
        
        g.setColor(Color.BLACK);

        for (GtRule r : futoshiki.getRules()) {
            RulePos rp = rulePosition(r);
            if (rp == null)
                continue;
            
            AffineTransform t;
            
            if (rp.horizontal) {
                int x = (0 + rp.column * 3) * px,
                    y = (-2 + rp.row * 3) * py;
                
                t = AffineTransform.getTranslateInstance(x, y);
                t.scale(px / 50.0, (py * 2) / 100.0);
            } else {
                int x = (-2 + rp.column * 3) * px,
                    y = (0 + rp.row * 3) * py;
                
                t = AffineTransform.getTranslateInstance(x + px * 2, y);;
                t.scale((px * 2) / 100.0, py / 50.0);
                t.rotate(Math.PI / 2.0);
            }
            
//            if (clickedRule != null
//                && rp.column == clickedRule.column
//                && rp.row == clickedRule.row
//                && rp.horizontal == clickedRule.horizontal)
//            {
//                g.setColor(Color.YELLOW);
//            } else {
                g.setColor(Color.BLACK);
//            }
            
            AffineTransform ot = g.getTransform();
            g.transform(t);
            g.fill(rp.gt ? gp : gp2);
            g.setTransform(ot);
        }
        
    }
    
    public void setFutoshiki(Futoshiki f)
    {
        clearSolutionCells();
        recordHistory();
        this.futoshiki = f.clone();
        changed();
    }
    
    public Futoshiki getFutoshiki()
    {
        return this.futoshiki.clone();
    }
    
    private void clearSolutionCells()
    {
        /* After a change, clear all transient solution cells */
        for (CellPos ecp : solvedCells) {
            futoshiki.clear(ecp.column, ecp.row);
        }
        
        solvedCells.clear();
    }
    
    private void changed()
    {
        Boolean wasValid = valid;
        valid = Boolean.valueOf(futoshiki.isValid());
        firePropertyChange("futoshiki.valid", wasValid, valid);
        
        Boolean wasUndoable = undoable;
        undoable = Boolean.valueOf(isUndoable());
        firePropertyChange("futoshiki.undoable", wasUndoable, undoable);
        
        repaint();
    }
    
    public void cellClicked(int column, int row)
    {
//        System.out.println("Cell column " + column + ", row " + row);
        
        selected = new CellPos(column, row);
        requestFocus();
        repaint();
    }
    
    public void ruleClicked(RulePos rp)
    {
//        System.out.println("Rule " + rp.column + ", " + rp.row + ", " + rp.horizontal);
     
        clearSolutionCells();
        recordHistory();
        
        GtRule rk;
        
        if (rp.horizontal) {
            rk = new GtRule(rp.column, rp.row, rp.column + 1, rp.row);
        } else {
            rk = new GtRule(rp.column, rp.row, rp.column, rp.row + 1);
        }
        
        rk = rk.getCanonPosForm();
        
        GtRule rule = futoshiki.getRule(rk);
        
        if (rule == null) {
            futoshiki.addGtRule(rk.getGreaterColumn(), rk.getGreaterRow(),
                    rk.getLesserColumn(), rk.getLesserRow());
        } else if (rk.equals(rule)) {
            futoshiki.addGtRule(rk.getLesserColumn(), rk.getLesserRow(),
                    rk.getGreaterColumn(), rk.getGreaterRow());
        } else {
            futoshiki.removeRule(rk);
        }
        
//        clickedRule = rp;
        changed();
    }
    
    public void numberTyped(int n)
    {
//        System.out.println("Number " + n);
        if (selected != null) {
            clearSolutionCells();
            recordHistory();

            futoshiki.set(selected.column, selected.row, n);
            changed();
        }
    }
    
    public void numberCleared()
    {
//        System.out.println("Number cleared");
        if (selected != null) {
            clearSolutionCells();
            recordHistory();
            
            futoshiki.clear(selected.column, selected.row);
            clearSolutionCells();
            changed();
        }
    }
    
    public void solve()
    {
        SolutionInProgress sip = new SolutionInProgress();

        // Do this in another thread?
        new Solver(sip).solve(futoshiki.clone());
        
        if (sip.solution != null) {
            for (CellPos cp : futoshiki.blankCells()) {
                solvedCells.add(cp);
            }
            futoshiki = sip.solution;
            selected = null;
            changed();
            
            if (sip.multipleSolutions) {
                JOptionPane.showMessageDialog(this,
                        "There are multiple solutions.", TITLE,
                        JOptionPane.INFORMATION_MESSAGE);
            }
        } else {
            JOptionPane.showMessageDialog(this, "There are no solutions.",
                    TITLE, JOptionPane.WARNING_MESSAGE);
        }
    }
    
    private boolean isUndoable()
    {
        return !solvedCells.isEmpty() || !undoRecord.isEmpty();
    }
    
    private void recordHistory()
    {
        if (undoRecord.size() >= MAX_UNDO) {
            undoRecord.remove(0);
        }
        
        undoRecord.add(futoshiki.clone());
    }
    
    void undo()
    {
        if (!solvedCells.isEmpty()) {
            clearSolutionCells();
            changed();
        } else {
            if (!undoRecord.isEmpty()) {
                Futoshiki f = undoRecord.remove(undoRecord.size() - 1);

                this.futoshiki = f;
                changed();
            }
        }
    }
    
    public static RulePos rulePosition(GtRule r)
    {
        /* Horizontal rule? */
        if (r.rowA == r.rowB) {
            if (r.columnA + 1 == r.columnB) {
                return new RulePos(r.columnA, r.rowA, true, true);
            } else if (r.columnA == r.columnB + 1) {
                return new RulePos(r.columnB, r.rowA, true, false);
            } else {
                /* These are not adjacent squares */
                return null;
            }
            
        } else if (r.columnA == r.columnB) { // Vertical
            if (r.rowA + 1 == r.rowB) {
                return new RulePos(r.columnA, r.rowA, false, true);
            } else if (r.rowA == r.rowB + 1) {
                return new RulePos(r.columnA, r.rowB, false, false);
            } else {
                /* These are not adjacent squares */
                return null;
            }
        } else {
            /* Not a valid rule */
            return null;
        }
    }
    
    public static class RulePos
    {
        public final int row, column;
        public final boolean horizontal, gt;
        
        private RulePos(int column, int row, boolean horizontal, boolean gt)
        {
            this.row = row;
            this.column = column;
            this.horizontal = horizontal;
            this.gt = gt;
        }
    }
    
    private class ClickListener extends MouseAdapter
    {
        @Override
        public void mouseClicked(MouseEvent e)
        {
            Point p = e.getPoint();
            
            Dimension d = getSize();

            int px = d.width / (Futoshiki.LENGTH * 3 + 1),
            py = d.height / (Futoshiki.LENGTH * 3 + 1);
            
            int x = p.x / px,
                y = p.y / py;
            
            /* Out of bounds in a way that messes up arithmetic? */
            if (x == 0 || y == 0) {
                return;
            }
            
            if ((x - 1) % 3 != 2) {
                int column = ((x - 1) / 3) + 1;

                if (column >= 1 && column <= Futoshiki.LENGTH) {
                    if ((y - 1) % 3 != 2) {
                        int row = ((y - 1) / 3) + 1;
                        
                        if (row >= 1 && row <= Futoshiki.LENGTH) {
                            cellClicked(column, row);
                        }
                    } else {
                        int rowAfter = ((y - 1) / 3) + 1;
                        
                        if (rowAfter >= 1 && rowAfter < Futoshiki.LENGTH) {
                            RulePos rp = new RulePos(column, rowAfter, false, false);
                            ruleClicked(rp);
                        }
                    }
                }
            } else {
                int columnAfter = ((x - 1) / 3) + 1;
                if (columnAfter >= 1 && columnAfter < Futoshiki.LENGTH) {
                    if ((y - 1) % 3 != 2) {
                        int row = ((y - 1) / 3) + 1;
                        
                        if (row >= 1 && row <= Futoshiki.LENGTH) {
                            RulePos rp = new RulePos(columnAfter, row, true, false);
                            ruleClicked(rp);
                        }
                    }
                }
            }
        }
    }
    
    private class TypedNumberListener extends KeyAdapter
    {
        @Override
        public void keyTyped(KeyEvent e)
        {
            char c = e.getKeyChar();
            
            int n = Character.digit(c, 10);
            if (n == 0) {
                numberCleared();
            } else if (n > 0) {
                numberTyped(n);
            }
        }
        
        public void keyPressed(KeyEvent e)
        {
            if (e.getKeyCode() == KeyEvent.VK_DELETE
                || e.getKeyCode() == KeyEvent.VK_BACK_SPACE
                || e.getKeyCode() == KeyEvent.VK_SPACE)
            {
                numberCleared();
            } else if (e.getKeyCode() == KeyEvent.VK_C && ((e.getModifiers() & Event.CTRL_MASK) != 0))
            {
                Clipboard cb = Toolkit.getDefaultToolkit().getSystemClipboard();

                Transferable trans = new StringSelection(FutoshikiPrinter.toString(futoshiki));
                
                cb.setContents(trans, null);
            } else if (e.getKeyCode() == KeyEvent.VK_Z && ((e.getModifiers() & Event.CTRL_MASK) != 0))
            {
                // attemptUndo();
            }
            
        }
    }
    
    private class SolutionInProgress implements Solver.SolutionTarget
    {
        Futoshiki solution;
        boolean multipleSolutions = false;
        
        public boolean solution(Futoshiki f)
        {
            if (solution == null) {
                solution = f;
                return true;
            } else {
                multipleSolutions = true;
                return false;
            }
        }
    }
    
    private enum EditState
    {
        DESIGNED,
//        MANUAL,
        AUTOMATIC;
    }
}
