package org.kafsemo.futoshiki.sample;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;

import org.kafsemo.futoshiki.Futoshiki;
import org.kafsemo.futoshiki.FutoshikiPrinter;
import org.kafsemo.futoshiki.Solver;

public class NineSample
{
    public static void main(String[] args) throws IOException
    {
        InputStream in = NineSample.class.getResourceAsStream("sample-9x9.txt");

        Futoshiki f = fromStream(in);
        System.out.println(FutoshikiPrinter.toString(f));

        new Solver(new SolverSample.PrintingSolutionTarget()).solve(f);
    }
    
    public static Futoshiki fromStream(InputStream in) throws IOException
    {
        StringBuilder puzzle = new StringBuilder();
        
        BufferedReader br = new BufferedReader(new InputStreamReader(in, "us-ascii"));

        try {
            String s;
            
            while ((s = br.readLine()) != null) {
                puzzle.append(s);
                puzzle.append('\n');
            }
        } finally {
            br.close();
        }

        return FutoshikiPrinter.parse(puzzle.toString());
    }
}
