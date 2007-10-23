package org.kafsemo.futoshiki;

import java.awt.BorderLayout;
import java.awt.Color;
import java.awt.Font;
import java.awt.event.ActionEvent;
import java.awt.event.ActionListener;
import java.beans.PropertyChangeEvent;
import java.beans.PropertyChangeListener;

import javax.swing.BorderFactory;
import javax.swing.Box;
import javax.swing.JButton;
import javax.swing.JComponent;
import javax.swing.JFrame;
import javax.swing.JLabel;
import javax.swing.JOptionPane;
import javax.swing.JPanel;
import javax.swing.JScrollPane;
import javax.swing.JTextArea;
import javax.swing.WindowConstants;
import javax.swing.border.Border;
import javax.swing.border.EtchedBorder;

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
        
        final FutoshikiPanel fp = new FutoshikiPanel();
        
        JFrame jf = new JFrame();
        jf.setDefaultCloseOperation(WindowConstants.DISPOSE_ON_CLOSE);
        
        JPanel jp = new JPanel(new BorderLayout());
        jp.add(BorderLayout.CENTER, fp);

        FPControls controls = new FPControls();
        
        JComponent controlPanel = controls.createControlPanel();
        
        
        ValidityLabelChanger vlc = new ValidityLabelChanger(controls.vlcLabel);

        controls.solve.addActionListener(new ActionListener(){
            public void actionPerformed(ActionEvent e)
            {
                fp.solve();
            }
        });

        controls.clear.addActionListener(new ActionListener(){
           public void actionPerformed(ActionEvent e)
            {
               fp.setFutoshiki(new Futoshiki());
            } 
        });
        
        controls.undo.addActionListener(new ActionListener(){
           public void actionPerformed(ActionEvent e)
            {
               fp.undo();
            } 
        });

        controls.undo.setEnabled(false);
        fp.addPropertyChangeListener("futoshiki.undoable",
                new UndoabilityListener(controls.undo));
 
        controls.editButton.addActionListener(new ActionListener() {
            public void actionPerformed(ActionEvent e)
            {
                attemptEdit(fp);
            }
        });

        fp.setFutoshiki(f);
        vlc.setValid(f.isValid());
        fp.addPropertyChangeListener("futoshiki.valid", vlc);

        jp.add(BorderLayout.AFTER_LINE_ENDS, controlPanel);
        
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
        private final JLabel label;
        
        public ValidityLabelChanger(JLabel label)
        {
            this.label = label;
        }
        
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
    
    private static void attemptEdit(FutoshikiPanel fp)
    {
        JTextArea jta = new JTextArea(FutoshikiPrinter.STR_LENGTH, FutoshikiPrinter.STR_LENGTH + 1);
        
        jta.setText(FutoshikiPrinter.toString(fp.getFutoshiki()).trim());
        
        jta.setFont(new Font("Monospaced", 0, jta.getFont().getSize()));
        JComponent jc = new JScrollPane(jta);
        
        int res = JOptionPane.showConfirmDialog(fp, jc, "Title", JOptionPane.OK_CANCEL_OPTION);
        
        if (res == JOptionPane.OK_OPTION) {
            fp.setFutoshiki(FutoshikiPrinter.parse(jta.getText()));
        }
    }
    
    private static final int PAD = 6;

    private static class FPControls
    {
        JLabel vlcLabel = new JLabel("(Unknown)");
        
        JButton solve = new JButton("Solve");
        JButton undo = new JButton("Undo");
        JButton clear = new JButton("Clear");
        JButton editButton = new JButton("Edit...");
        
    
        JComponent createControlPanel()
        {
            Box b = Box.createHorizontalBox();
            
            Border bdr = BorderFactory.createCompoundBorder(
                    BorderFactory.createTitledBorder(BorderFactory.createEtchedBorder(EtchedBorder.RAISED), "Current state"),
                    BorderFactory.createEmptyBorder(PAD, PAD, PAD, PAD));
            b.setBorder(bdr);

            b.add(Box.createHorizontalGlue());
            b.add(vlcLabel);
            b.add(Box.createHorizontalGlue());
            
            Box bba = Box.createHorizontalBox();
            
            bba.add(Box.createHorizontalStrut(PAD));
            bba.add(solve);
    
            bba.add(Box.createHorizontalStrut(PAD));
            bba.add(undo);
            bba.add(Box.createHorizontalStrut(PAD));
            
            
            Box bbb = Box.createHorizontalBox();
            
            bbb.add(Box.createHorizontalStrut(PAD));
            bbb.add(clear);
            
            bbb.add(Box.createHorizontalStrut(PAD));
    
            bbb.add(editButton);
            bbb.add(Box.createHorizontalStrut(PAD));
            
            Box b2 = Box.createVerticalBox();
            b2.add(Box.createVerticalGlue());
            b2.add(bba);
            b2.add(Box.createVerticalStrut(PAD));
            b2.add(bbb);
            b2.add(Box.createVerticalGlue());
            
    
            Box buttonPanel;
            buttonPanel = Box.createVerticalBox();
            buttonPanel.add(Box.createVerticalGlue());
            buttonPanel.add(Box.createVerticalStrut(PAD));
            buttonPanel.add(b);
            buttonPanel.add(Box.createVerticalStrut(PAD));
            buttonPanel.add(b2);
            buttonPanel.add(Box.createVerticalStrut(PAD));
            buttonPanel.add(Box.createVerticalGlue());
    
            return buttonPanel;
        }
    }
}
