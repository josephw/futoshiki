import { Futoshiki } from '../../src/Futoshiki';
import { Solver, SolutionTarget } from '../../src/Solver';
import { FutoshikiPrinter } from '../../src/FutoshikiPrinter';
import { PrintingSolutionTarget } from './PrintingSolutionTarget';

function solveAndPrint(f : Futoshiki) {
    console.info(FutoshikiPrinter.toString(f));
    new Solver(new PrintingSolutionTarget()).solve(f);
}

test('g36', () => {
    let f : Futoshiki = new Futoshiki();
            f.addGtRule(3, 1, 4, 1);
            f.addGtRule(5, 1, 4, 1);
            f.addGtRule(3, 1, 3, 2);
            f.addGtRule(4, 1, 4, 2);
            f.addGtRule(1, 2, 2, 2);
            f.addGtRule(1, 3, 1, 2);
            f.addGtRule(1, 3, 2, 3);
            f.addGtRule(4, 3, 5, 3);
            f.addGtRule(5, 4, 5, 3);
            f.addGtRule(3, 4, 3, 5);
            f.addGtRule(2, 5, 1, 5);
            f.set(5, 1, 4);
            f.set(5, 2, 5);
            f.set(2, 4, 3);
    solveAndPrint(f);
});

test('g40', () => {
    let f : Futoshiki = new Futoshiki();
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
            f.set(1, 1, 5);
            f.set(4, 4, 5);
    solveAndPrint(f);
});
