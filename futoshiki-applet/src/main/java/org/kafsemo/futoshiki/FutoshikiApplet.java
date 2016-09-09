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

import java.awt.BorderLayout;

import javax.swing.JApplet;

/**
 * An applet containing a panel along with controls, to edit and solve
 * puzzles.
 * 
 * @author Joseph Walton
 */
public class FutoshikiApplet extends JApplet
{
    private final FutoshikiPanel fPanel;
    private final FutoshikiControls controls;
    
    public FutoshikiApplet() throws ClassNotFoundException
    {
        getContentPane().setLayout(new BorderLayout());

        fPanel = new FutoshikiPanel();
        controls = new FutoshikiControls(fPanel);
        
        getContentPane().add(fPanel, BorderLayout.CENTER);
        getContentPane().add(controls.getControlPanel(),
                                BorderLayout.AFTER_LINE_ENDS);
    }
}
