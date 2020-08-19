import { Futoshiki } from '../src/Futoshiki';
import { Solver, SolutionTarget } from '../src/Solver';

test('Solver reports solution', () => {
    let f : Futoshiki = new Futoshiki(1);
    let expectedSolution : Futoshiki = new Futoshiki(1);
            expectedSolution.set(1, 1, 1);
    let sg : SolutionGatherer = new SolutionGatherer();
    new Solver(sg).solve(f);
    expect(sg.solutions).toStrictEqual([expectedSolution]);
});

test('Solver reports multiple solutions', () => {
    let f : Futoshiki = new Futoshiki(2);
    let expectedSolution1 : Futoshiki = new Futoshiki(2);
            expectedSolution1.set(1, 1, 1);
            expectedSolution1.set(2, 1, 2);
            expectedSolution1.set(1, 2, 2);
            expectedSolution1.set(2, 2, 1);
    let expectedSolution2 : Futoshiki = new Futoshiki(2);
            expectedSolution2.set(1, 1, 2);
            expectedSolution2.set(2, 1, 1);
            expectedSolution2.set(1, 2, 1);
            expectedSolution2.set(2, 2, 2);
    let sg : SolutionGatherer = new SolutionGatherer();
    new Solver(sg).solve(f);
    expect(sg.solutions).toHaveLength(2);
    expect(sg.solutions).toContainEqual(expectedSolution1);
    expect(sg.solutions).toContainEqual(expectedSolution2);
});

test('Remaining search count is provided', () => {
    let f : Futoshiki = new Futoshiki(1);
    let mockTarget = {
        remainingPossibilities: jest.fn((n: bigint) => {return false;}),
        solution: function (f: Futoshiki) {return true;}
    };
    new Solver(mockTarget).solve(f);
    expect(mockTarget.remainingPossibilities.mock.calls).toHaveLength(1);
    expect(mockTarget.remainingPossibilities.mock.calls[0][0]).toBe(BigInt(1));
});

test('Returning false from remaining possibilities target cancels searches', () => {
    let f : Futoshiki = new Futoshiki(9);
    let mockTarget = {
        remainingPossibilities: jest.fn((n: bigint) => {return false;}),
        solution: function (f: Futoshiki) {return true;}
    };
    new Solver(mockTarget).solve(f);

    mockTarget.remainingPossibilities.mockReturnValueOnce(true).mockReturnValueOnce(false);
    new Solver(mockTarget).solve(f);
});

test('Current possibility count is reported', () => {
    let f : Futoshiki = new Futoshiki(2);
    let pcg : PossibilityCountGatherer = new PossibilityCountGatherer();
    new Solver(pcg).solve(f);
    let sixteen : bigint = BigInt(16);
    let four : bigint = BigInt(4);
    let three : bigint = BigInt(3);
    let two : bigint = BigInt(2);
    let expected : bigint[] = [sixteen, four, three, three, three, two, BigInt(1), BigInt(1), BigInt(1), BigInt(0)];
    expect(pcg.counts).toStrictEqual(expected);
});

test('Zero possibility count is not provided for cancelled search', () => {
    let f : Futoshiki = new Futoshiki(2);
    let mockTarget = {
        remainingPossibilities: jest.fn((n: bigint) => {return false;}),
        solution: function (f: Futoshiki) {return true;}
    };

    new Solver(mockTarget).solve(f);
    expect(mockTarget.remainingPossibilities.mock.calls).toHaveLength(1);
    expect(mockTarget.remainingPossibilities.mock.calls).not.toContainEqual([BigInt(0)]);
});

test('Puzzle with impossible cell is detected', () => {
    let f : Futoshiki = new Futoshiki(2);
            f.set(1, 1, 1);
            f.addGtRule(1, 1, 2, 1);
    let pcg : PossibilityCountGatherer = new PossibilityCountGatherer();
    new Solver(pcg).solve(f);
    expect(pcg.counts).toStrictEqual([BigInt(0), BigInt(0)]);
});


        class SolutionGatherer implements SolutionTarget {
            solutions : Futoshiki[] = [];

            public solution(f : Futoshiki) : boolean {
                this.solutions.push(f);
                return true;
            }

            public remainingPossibilities(count : bigint) : boolean {
                return true;
            }
        }


        class PossibilityCountGatherer implements SolutionTarget {
            counts : bigint[] = [];

            public solution(f : Futoshiki) : boolean {
                return true;
            }

            public remainingPossibilities(count : bigint) : boolean {
                this.counts.push(count);
                return true;
            }
        }
