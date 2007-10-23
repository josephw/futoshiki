/*
 *  A Futoshiki puzzle editor and solver.
 *  Copyright © 2007 Joseph Walton
 *
 *  This program is free software: you can redistribute it and/or modify
 *  it under the terms of the GNU General Public License as published by
 *  the Free Software Foundation, either version 3 of the License, or
 *  (at your option) any later version.
 *
 *  This program is distributed in the hope that it will be useful,
 *  but WITHOUT ANY WARRANTY; without even the implied warranty of
 *  MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 *  GNU General Public License for more details.
 *
 *  You should have received a copy of the GNU General Public License
 *  along with this program.  If not, see <http://www.gnu.org/licenses/>.
 */

package org.kafsemo.futoshiki;

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
import javax.swing.JLabel;
import javax.swing.JOptionPane;
import javax.swing.JScrollPane;
import javax.swing.JTextArea;
import javax.swing.border.Border;
import javax.swing.border.EtchedBorder;

public class FutoshikiControls
{
    private final FutoshikiPanel fp;
    
    private final JLabel vlcLabel = new JLabel("(Unknown)");
    
    private final JButton solve = new JButton("Solve");
    private final JButton undo = new JButton("Undo");
    private final JButton clear = new JButton("Clear");
    private final JButton editButton = new JButton("Edit...");
    
    private final JComponent futoshikiControlPanel;
    
    public FutoshikiControls(FutoshikiPanel futoshikiPanel)
    {
        this.fp = futoshikiPanel;
        
        futoshikiControlPanel = createControlPanel();
        
        ValidityLabelChanger vlc = new ValidityLabelChanger(vlcLabel);

        solve.addActionListener(new ActionListener(){
            public void actionPerformed(ActionEvent e)
            {
                fp.solve();
            }
        });

        clear.addActionListener(new ActionListener(){
           public void actionPerformed(ActionEvent e)
            {
               fp.setFutoshiki(new Futoshiki());
            } 
        });
        
        undo.addActionListener(new ActionListener(){
           public void actionPerformed(ActionEvent e)
            {
               fp.undo();
            } 
        });

        undo.setEnabled(false);
        fp.addPropertyChangeListener("futoshiki.undoable",
                new UndoabilityListener(undo));
 
        editButton.addActionListener(new ActionListener() {
            public void actionPerformed(ActionEvent e)
            {
                attemptEdit(fp);
            }
        });

        vlc.setValid(fp.getFutoshiki().isValid());
        fp.addPropertyChangeListener("futoshiki.valid", vlc);
    }
    
    JComponent getControlPanel()
    {
        return futoshikiControlPanel;
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

    private JComponent createControlPanel()
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
