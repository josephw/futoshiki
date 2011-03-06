/*
 *  A Futoshiki puzzle editor and solver.
 *  Copyright © 2007, 2011 Joseph Walton
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
import java.awt.GridBagConstraints;
import java.awt.GridBagLayout;
import java.awt.Insets;
import java.awt.event.ActionEvent;
import java.awt.event.ActionListener;
import java.beans.PropertyChangeEvent;
import java.beans.PropertyChangeListener;

import javax.swing.BorderFactory;
import javax.swing.Box;
import javax.swing.JButton;
import javax.swing.JComboBox;
import javax.swing.JComponent;
import javax.swing.JLabel;
import javax.swing.JOptionPane;
import javax.swing.JPanel;
import javax.swing.JScrollPane;
import javax.swing.JTextArea;
import javax.swing.border.Border;
import javax.swing.border.EtchedBorder;

/**
 * A set of control buttons for a graphical puzzle panel.
 * 
 * @author Joseph Walton
 */
public class FutoshikiControls
{
    private final FutoshikiPanel fp;
    
    private final JLabel vlcLabel = new JLabel("(Unknown)");
    
    private final JButton solve = new JButton("Solve");
    private final JButton undo = new JButton("Undo");
    private final JButton clear = new JButton("Clear");
    private final JButton editButton = new JButton("Edit...");
    private final JComboBox size = new JComboBox(sizeNames());
    
    private final JComponent futoshikiControlPanel;
    
    public FutoshikiControls(FutoshikiPanel futoshikiPanel)
    {
        this.fp = futoshikiPanel;
        
        futoshikiControlPanel = createControlPanel();
        
        ValidityLabelChanger vlc = new ValidityLabelChanger(vlcLabel);

        solve.addActionListener(new ActionListener() {
            public void actionPerformed(ActionEvent e)
            {
                fp.solve();
            }
        });

        clear.addActionListener(new ActionListener() {
            public void actionPerformed(ActionEvent e)
            {
               fp.clearFutoshiki();
            }
        });
        
        undo.addActionListener(new ActionListener() {
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
        
        PuzzleSizeListener psl = new PuzzleSizeListener(size);
        psl.setSize(fp.getFutoshiki().getLength());
        fp.addPropertyChangeListener("futoshiki.size", psl);
        size.addActionListener(new ActionListener() {
            public void actionPerformed(ActionEvent arg0)
            {
                int newSize = size.getSelectedIndex() + 1;
                fp.setFutoshikiSize(newSize);
            }
        });
    }
    
    public JComponent getControlPanel()
    {
        return futoshikiControlPanel;
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
    
    private static class PuzzleSizeListener implements PropertyChangeListener
    {
        private final JComboBox sizeControl;
        
        public PuzzleSizeListener(JComboBox sizeControl)
        {
            this.sizeControl = sizeControl;
        }
        
        public void propertyChange(PropertyChangeEvent evt)
        {
            if (evt.getPropertyName().equals("futoshiki.size")) {
                setSize(((Integer) evt.getNewValue()).intValue());
            }
        }
        
        public void setSize(int length)
        {
            sizeControl.setSelectedIndex(length - 1);
        }
    }
    
    private static void attemptEdit(FutoshikiPanel fp)
    {
        int stringLength = FutoshikiPrinter.stringLength(fp.getFutoshiki());
        
        JTextArea jta = new JTextArea(stringLength,
                                        stringLength + 1);
        
        String s = FutoshikiPrinter.toString(fp.getFutoshiki());
        
        /* Trim a trailing newline on the last line */
        if (s.endsWith("\n")) {
            s = s.substring(0, s.length() - 1);
        }
        
        jta.setText(s);
        
        jta.setFont(new Font("Monospaced", 0, jta.getFont().getSize()));
        JComponent jc = new JScrollPane(jta);
        
        int res = JOptionPane.showConfirmDialog(fp, jc,
                            "Edit Puzzle", JOptionPane.OK_CANCEL_OPTION);
        
        if (res == JOptionPane.OK_OPTION) {
            fp.setFutoshiki(FutoshikiPrinter.parse(jta.getText()));
        }
    }
    
    private static final int PAD = 6;

    private JComponent createControlPanel()
    {
        JPanel panel = new JPanel(new GridBagLayout());

        GridBagConstraints gbc = new GridBagConstraints();
        gbc.insets = new Insets(PAD, PAD, PAD, PAD);

        gbc.gridwidth = 2;
        gbc.fill = GridBagConstraints.BOTH;
        panel.add(createStatusPanel(), gbc);

        gbc.gridy = 1;
        gbc.gridwidth = 1;
        panel.add(solve, gbc);
        panel.add(undo, gbc);
        
        gbc.gridy = 2;
        panel.add(clear, gbc);
        panel.add(editButton, gbc);
        
        gbc.gridy = 3;
        gbc.fill = GridBagConstraints.NONE;
        panel.add(size, gbc);
        
        return panel;
    }

    private JComponent createStatusPanel()
    {
        Box b = Box.createHorizontalBox();
        
        Border bdr = BorderFactory.createCompoundBorder(
                BorderFactory.createTitledBorder(
                        BorderFactory.createEtchedBorder(EtchedBorder.RAISED),
                        "Current state"),
                BorderFactory.createEmptyBorder(PAD, PAD, PAD, PAD));
        b.setBorder(bdr);

        b.add(Box.createHorizontalGlue());
        b.add(vlcLabel);
        b.add(Box.createHorizontalGlue());
        return b;
    }
    
    private static String[] sizeNames()
    {
        String[] sa = new String[9];
        for (int s = 1; s <= sa.length; s++) {
            sa[s - 1] = s + "x" + s;
        }
        return sa;
    }
}
