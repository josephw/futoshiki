package futoshiki;

import java.awt.Color;
import java.awt.Dimension;
import java.awt.Font;
import java.awt.FontMetrics;
import java.awt.Graphics;
import java.awt.Graphics2D;
import java.awt.Rectangle;
import java.awt.geom.AffineTransform;
import java.awt.geom.GeneralPath;
import java.awt.geom.Line2D;
import java.awt.geom.Rectangle2D;

import javax.swing.JPanel;

public class FutoshikiPanel extends JPanel
{
    private Futoshiki futoshiki = new Futoshiki();
    
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
        
        Dimension d = getSize();

        g.setColor(Color.LIGHT_GRAY);
        g.fillRect(0, 0, d.width, d.height);

        Font f = getFont();
        g.setFont(f);

        
        int px = d.width / (Futoshiki.LENGTH * 3 + 1),
            py = d.height / (Futoshiki.LENGTH * 3 + 1);

        g.setFont(f.deriveFont((float)py));
        FontMetrics fm = g.getFontMetrics();

        /* Numbers */
        for (int row = 0; row < Futoshiki.LENGTH; row++) {
            for (int column = 0; column < Futoshiki.LENGTH; column++) {
                
                int x = (1 + column * 3) * px,
                    y = (1 + row * 3) * py;
                
                g.setColor(Color.WHITE);
                g.fillRect(x, y, px * 2, py * 2);
                g.setColor(Color.BLACK);
                g.drawRect(x, y, px * 2, py * 2);
                
                int v = futoshiki.get(column + 1, row + 1);
                String s = Integer.toString(v);
                
                Rectangle2D sb = fm.getStringBounds(s, g);
                
                int cx = (2 + column * 3) * px,
                    cy = (2 + row * 3) * py;
                
                float tx = (float) (cx - sb.getCenterX()),
                    ty = (float) (cy - sb.getCenterY());
                
                g.drawString(s, tx, ty);
            }
        }

//        g.setStroke(new BasicStroke(Math.min(px, py) / 10));

        GeneralPath gp = new GeneralPath();
        gp.append(new Line2D.Float(10, 40, 40, 50), false);
        gp.append(new Line2D.Float(40, 50, 10, 60), false);
//        gp.append(new Rectangle(0, 0, 50, 100), false);
        
        GeneralPath gp2 = new GeneralPath(gp);
        gp2.transform(AffineTransform.getScaleInstance(-1, 1));
        gp2.transform(AffineTransform.getTranslateInstance(50, 0));
        
//        Collection<GtRule> rules = new ArrayList<GtRule>();
//        
//        /* Rules - horizontal */
//        for (int row = 1; row <= LENGTH; row++) {
//            for (int firstColumn = 1; firstColumn < LENGTH; firstColumn++) {
//                boolean gt = (row + firstColumn) % 2 == 0;
//
//                GtRule r;
//                
//                if (gt) {
//                    r = new GtRule(row, firstColumn, row, firstColumn + 1);
//                } else {
//                    r = new GtRule(row, firstColumn + 1, row, firstColumn);
//                }
//
//                rules.add(r);
//            }
//        }
//        
//        /* Rules - vertical */
//        for (int firstRow = 1; firstRow < LENGTH; firstRow++) {
//            for (int column = 1; column <= LENGTH; column++) {
//                boolean gt = (firstRow + column) % 2 == 0;
//
//                GtRule r;
//                
//                if (gt) {
//                    r = new GtRule(firstRow, column, firstRow + 1, column);
//                } else {
//                    r = new GtRule(firstRow, column, firstRow + 1, column);
//                }
//
//                rules.add(r);
//            }
//        }

        for (GtRule r : futoshiki.rules) {
            RulePos rp = rulePosition(r);
            if (rp == null)
                continue;
            
            AffineTransform t;
            
            if (rp.horizontal) {
                int x = (0 + rp.column * 3) * px,
                    y = (-2 + rp.row * 3) * py;
                
                t = AffineTransform.getTranslateInstance(x, y);
                t.scale(px / 50.0, (py * 2) / 100.0);

//                g.setColor(Color.RED);
//                g.fillRect(x, y, px, py * 2);
//                g.setColor(Color.BLACK);
//                g.drawRect(x, y, px, py * 2);
            } else {
                int x = (-2 + rp.column * 3) * px,
                    y = (0 + rp.row * 3) * py;
                
                t = AffineTransform.getTranslateInstance(x + px * 2, y);;
                t.scale((px * 2) / 100.0, py / 50.0);
                t.rotate(Math.PI / 2.0);

//                g.setColor(Color.BLUE);
//                g.fillRect(x, y, px * 2, py);
//                g.setColor(Color.BLACK);
//                g.drawRect(x, y, px * 2, py);
            }
            
            AffineTransform ot = g.getTransform();
            g.transform(t);
            g.draw(rp.gt ? gp : gp2);
            g.setTransform(ot);
        }
        
    }
    
    public void setFutoshiki(Futoshiki f)
    {
        this.futoshiki = f.clone();
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
}
