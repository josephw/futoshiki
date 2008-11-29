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

package org.kafsemo.futoshiki.sample;

import java.awt.BorderLayout;

import javax.swing.JFrame;
import javax.swing.SwingUtilities;
import javax.swing.WindowConstants;

import org.kafsemo.futoshiki.Futoshiki;
import org.kafsemo.futoshiki.FutoshikiControls;
import org.kafsemo.futoshiki.FutoshikiPanel;

/**
 * A puzzle along with controls in a JFrame, with a sample puzzle state
 * to begin.
 * 
 * @author Joseph Walton
 */
public class FutoshikiPanelSample
{
    public static void main(String[] args)
    {
        final Futoshiki f = new Futoshiki();

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

        SwingUtilities.invokeLater(new Runnable() {
            public void run()
            {
                FutoshikiPanel fp = new FutoshikiPanel();
                FutoshikiControls fc = new FutoshikiControls(fp);
                fp.setFutoshiki(f);
                
                JFrame jf = new JFrame();
                jf.getContentPane().setLayout(new BorderLayout());
        
                jf.add(BorderLayout.CENTER, fp);
                jf.add(BorderLayout.AFTER_LINE_ENDS, fc.getControlPanel());
                
                jf.pack();
                jf.setDefaultCloseOperation(WindowConstants.DISPOSE_ON_CLOSE);
                
                jf.setVisible(true);
            }
        });
    }
}
