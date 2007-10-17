package futoshiki;

import java.awt.BorderLayout;
import java.awt.Color;
import java.awt.event.ActionEvent;
import java.awt.event.ActionListener;
import java.beans.PropertyChangeEvent;
import java.beans.PropertyChangeListener;

import javax.swing.Box;
import javax.swing.JButton;
import javax.swing.JComponent;
import javax.swing.JFrame;
import javax.swing.JLabel;
import javax.swing.JPanel;
import javax.swing.WindowConstants;

public class FutoshikiPanelSample
{
    public static void main(String[] args)
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

//        f = new Futoshiki();
        
        SolutionCatcher sc = new SolutionCatcher();
        
        new Solver(sc).solve(f);
        
        if (sc.f == null) {
            System.err.println("No solutions");
        } else  {
            f = sc.f;
            if (sc.multiple) {
                System.out.println("Multiple solutions");
            }
        }
        
        final FutoshikiPanel fp = new FutoshikiPanel();
        
        JFrame jf = new JFrame();
        jf.setDefaultCloseOperation(WindowConstants.DISPOSE_ON_CLOSE);
        
        JPanel jp = new JPanel(new BorderLayout());
        jp.add(BorderLayout.CENTER, fp);

        final int PAD = 10;
        
        Box buttonPanel = Box.createVerticalBox();

        buttonPanel.add(Box.createGlue());
        buttonPanel.add(Box.createVerticalStrut(PAD));
//        JComboBox solveMode = new JComboBox(new String[]{"Solve", "Design"});
//        solveMode.setEditable(false);
//        solveMode.setFocusable(false);
//        buttonPanel.add(solveMode);
        
        ValidityLabelChanger vlc = new ValidityLabelChanger();
        buttonPanel.add(vlc.label);
        
        
        JButton jb = new JButton("Solve");
        jb.addActionListener(new ActionListener(){
            public void actionPerformed(ActionEvent e)
            {
                fp.solve();
            }
        });
        
//        jb.setFocusable(false);
        
        buttonPanel.add(jb);

        buttonPanel.add(Box.createVerticalStrut(PAD));
        JButton cb = new JButton("Clear");
//        cb.setFocusable(false);
        cb.addActionListener(new ActionListener(){
           public void actionPerformed(ActionEvent e)
            {
               fp.setFutoshiki(new Futoshiki());
            } 
        });
        buttonPanel.add(cb);
        
        buttonPanel.add(Box.createVerticalStrut(PAD));
        JButton undoButton = new JButton("Undo");
        
//        cb.setFocusable(false);
        undoButton.addActionListener(new ActionListener(){
           public void actionPerformed(ActionEvent e)
            {
               fp.undo();
            } 
        });
        buttonPanel.add(undoButton);

        undoButton.setEnabled(false);
        fp.addPropertyChangeListener("futoshiki.undoable",
                new UndoabilityListener(undoButton));
        
        buttonPanel.add(Box.createVerticalStrut(PAD));
        buttonPanel.add(Box.createGlue());
        
        
        fp.setFutoshiki(f);
        vlc.setValid(f.isValid());
        fp.addPropertyChangeListener("futoshiki.valid", vlc);

        jp.add(BorderLayout.AFTER_LINE_ENDS, buttonPanel);
        
        jf.getContentPane().add(jp);
        
        jf.pack();
        
        jf.setVisible(true);
    }
    
    private static class SolutionCatcher implements Solver.SolutionTarget
    {
        Futoshiki f;
        boolean multiple;
        
        public boolean solution(Futoshiki f)
        {
            if (this.f == null) {
                this.f = f;
                return true;
            } else {
                multiple = true;
                return false;
            }
        }
    }
    
    private static class ValidityLabelChanger implements PropertyChangeListener
    {
        private final JLabel label = new JLabel();
        
        public void propertyChange(PropertyChangeEvent evt)
        {
            if (evt.getPropertyName().equals("futoshiki.valid")) {
//                System.err.println(evt.getNewValue());
                setValid(Boolean.TRUE.equals(evt.getNewValue()));
            }
        }
        
        void setValid(boolean v)
        {
            if (v) {
                label.setText("Valid");
                label.setForeground(null);
            } else {
                label.setText("Invalid");
                label.setForeground(Color.RED);
            }
        }
    }
    
    private static class UndoabilityListener implements PropertyChangeListener
    {
        private final JComponent comp;
        
        public UndoabilityListener(JComponent c)
        {
            this.comp = c;
        }
        
        public void propertyChange(PropertyChangeEvent evt)
        {
            if (evt.getPropertyName().equals("futoshiki.undoable")) {
                comp.setEnabled(Boolean.TRUE.equals(evt.getNewValue()));
            }
        }
    }
}
