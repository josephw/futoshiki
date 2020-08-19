import { CellPos } from '../src/CellPos';
import { GtRule } from '../src/GtRule';
import { Futoshiki } from '../src/Futoshiki';

test('Test initial state', () => {
    let f : Futoshiki = new Futoshiki();
    expect(f.isValid()).toBe(true);
    expect(f.isFull()).toBe(false);
});


test('Test simple modification', () => {
    let f : Futoshiki = new Futoshiki();
            f.set(1, 1, 1);
    expect(f.get(1, 1)).toBe(1);
            f.set(1, 1, 2);
    expect(f.get(1, 1)).toBe(2);
    expect(() => {f.set(1, 1, 0);}).toThrow(); // Out of range numbers should fail
    expect(() => {f.set(0, 0, 1);}).toThrow(); // Out of range coordinates should fail
    expect(() => {f.set(6, 6, 1);}).toThrow(); // Out of range coordinates should fail
});

test('Test full', () => {
    let f : Futoshiki = new Futoshiki();
            for(let row : number = 1; row <= 5; row++) {{
                for(let column : number = 1; column <= 5; column++) {{
                    expect(f.isFull()).toBe(false);
                    f.set(column, row, 1);
                };}
            };}
    expect(f.isFull()).toBe(true);
});

test('Test simple invalidation', () => {
    let f : Futoshiki = new Futoshiki();
            f.set(1, 1, 1);
            f.set(2, 1, 1);
    expect(f.isValid()).toBe(false); // Two 1s in a line is invalid
});

test('Test simple rule violation', () => {
    let f : Futoshiki = new Futoshiki();
            f.set(1, 1, 1);
            f.set(2, 1, 2);
    expect(f.isValid()).toBe(true);
            f.addGtRule(1, 1, 2, 1);
    expect(f.isValid()).toBe(false); // 1 < 2 is invalid
});

test('Duplicate numbers in column are not valid', () => {
    let f : Futoshiki = new Futoshiki();
            f.set(1, 1, 1);
            f.set(1, 2, 1);
    expect(f.isValid()).toBe(false);
});

test('Test no rule violation without numbers', () => {
    let f : Futoshiki = new Futoshiki();
            f.addGtRule(1, 1, 2, 1);
    expect(f.isValid()).toBe(true); // No rule violation with blank numbers
            f.set(1, 1, 2); // No rule violation with blank numbers
    expect(f.isValid()).toBe(true);
            f.set(2, 1, 1); // No rule violation with 2 > 1
    expect(f.isValid()).toBe(true);
            f.set(2, 1, 3);
    expect(f.isValid()).toBe(false); // Rule violation with 2 < 3
});

test('Test clone', () => {
    let f : Futoshiki = new Futoshiki();
            f.set(1, 1, 1);
            f.set(2, 1, 2);
    let f2 : Futoshiki = f.clone();
    expect(f2).toBeTruthy();
    expect(f.get(1, 1)).toBe(1);
    expect(f.get(2, 1)).toBe(2);
            f2.set(1, 1, 3);
    expect(f2.get(1, 1)).toBe(3);
    expect(f.get(1, 1)).toBe(1);
});

test('Test clone rules', () => {
    let f : Futoshiki = new Futoshiki();
            f.set(1, 1, 1);
            f.set(2, 1, 2);
            f.addGtRule(1, 1, 2, 1);
    let f2 : Futoshiki = f.clone();
    expect(f2.isValid()).toBe(false); // Rules should also be cloned
});

test('Test full sample is valid', () => {
    let f : Futoshiki = new Futoshiki();
            let sample : number[][] = [[5, 1, 4, 3, 2], [3, 2, 5, 1, 4], [4, 5, 3, 2, 1], [2, 4, 1, 5, 3], [1, 3, 2, 4, 5]];
            for(let row : number = 1; row <= 5; row++) {{
                for(let column : number = 1; column <= 5; column++) {{
                    f.set(column, row, sample[row - 1][column - 1]);
            expect(f.isValid()).toBe(true);
                };}
            };}
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
    expect(f.isValid()).toBe(true);
});

test('Test blank cells', () => {
    let f : Futoshiki = new Futoshiki();
    let blank : Array<CellPos> = f.blankCells();
    expect(blank).toHaveLength(25);
});

test('Only blank cells included', () => {
    let f : Futoshiki = new Futoshiki();
            f.set(1, 1, 1);
    let blank : Array<CellPos> = f.blankCells();
    expect(blank).toHaveLength(24);
    expect(blank).toEqual(expect.not.arrayContaining([new CellPos(1, 1)]));
});

test('Test clear', () => {
    let f : Futoshiki = new Futoshiki();
    expect(f.get(1, 1)).toEqual(0);
            f.set(1, 1, 5);
    expect(f.get(1, 1)).toEqual(5);
            f.clear(1, 1);
    expect(f.get(1, 1)).toEqual(0);
});

test('Test setting rules overwrites existing rules', () => {
    let f : Futoshiki = new Futoshiki();
            f.addGtRule(1, 1, 2, 1);
    let r : Array<GtRule>;
    r = f.getRules();
    expect(r).toHaveLength(1);
            f.addGtRule(1, 1, 2, 1);
    r = f.getRules();
    expect(r).toHaveLength(1); // A duplicate rule should have no effect
            f.addGtRule(2, 1, 1, 1);
    r = f.getRules();
    expect(r).toHaveLength(1); // A rule in the same position should replace the previous one
    let gtr : GtRule = r[0];
    expect(gtr.getGreaterColumn()).toEqual(2)
    expect(gtr.getGreaterRow()).toEqual(1)
    expect(gtr.getLesserColumn()).toEqual(1)
    expect(gtr.getLesserRow()).toEqual(1)
});

/*
test('unableToRemoveFromRuleIterator', () => {
    expect(() => {
        new Futoshiki().getRules().iterator().remove();
    }).toThrow();
});
*/

test('Test get rule by position', () => {
    let f : Futoshiki = new Futoshiki();
            f.addGtRule(1, 1, 2, 1);
    let r : GtRule = f.getRule(new GtRule(1, 1, 2, 1).getCanonPosForm());
    expect(r).toBeTruthy();
    let expected : GtRule = new GtRule(1, 1, 2, 1);
    expect(r).toEqual(expected);
});

test('Get rule returns null when no rule', () => {
    let f : Futoshiki = new Futoshiki(2);
    let r : GtRule = new GtRule(1, 1, 2, 1);
    expect(f.getRule(r)).toBeFalsy();
});

test('testRemoveRule', () => {
    let f : Futoshiki = new Futoshiki();
            f.addGtRule(1, 1, 2, 1);
    f.removeRule(new GtRule(1, 1, 2, 1).getCanonPosForm());
    expect(f.getRules()).toHaveLength(0); // Deleting a single rule should leave no rules
});

test('Test size defaults to five', () => {
    let f : Futoshiki = new Futoshiki();
    expect(f.getLength()).toEqual(5); // A default puzzle is 5 square
});

test('Test futoshiki size must be positive', () => {
    expect(() => {
        new Futoshiki(0);
    }).toThrow();
});

test('Test futoshiki size must not exceed number of digits', () => {
    expect(() => {
        new Futoshiki(10);
    }).toThrow();
});

test('Test futoshiki with size one behaves', () => {
    let f : Futoshiki = new Futoshiki(1);
    expect(f.getLength()).toEqual(1);
    expect(f.get(1, 1)).toEqual(0);
            f.set(1, 1, 1);
    expect(f.get(1, 1)).toEqual(1);
});

test('Futoshiki with size one respects bounds', () => {
    let f : Futoshiki = new Futoshiki(1);
    expect(() => {
        f.set(2, 1, 1);
    }).toThrow();
});

test('Futoshiki with size one rejects too large numbers', () => {
    let f : Futoshiki = new Futoshiki(1);
    expect(() => {
        f.set(1, 1, 2);
    }).toThrow();
});

test('Futoshiki with size one rejects too small numbers', () => {
    let f : Futoshiki = new Futoshiki(1);
    expect(() => {
        f.set(1, 1, -1);
    }).toThrow();
});

test('Large futoshiki can be set', () => {
    let f : Futoshiki = new Futoshiki(9);
            f.set(9, 9, 9);
    expect(f.get(9, 9)).toEqual(9);
});

test('Large futoshiki can be cloned', () => {
    let f : Futoshiki = new Futoshiki(9);
            f.set(9, 9, 9);
            f = /* clone */((o:any) => { if(o.clone!=undefined) { return (<any>o).clone(); } else { let clone = Object.create(o); for(let p in o) { if (o.hasOwnProperty(p)) clone[p] = o[p]; } return clone; } })(f);
    expect(f.get(9, 9)).toEqual(9);
            f.set(9, 9, 8);
    expect(f.get(9, 9)).toEqual(8);
});

test('Large futoshiki is valid', () => {
    let f : Futoshiki = new Futoshiki(9);
            f.set(1, 1, 9);
            f.set(9, 1, 1);
    expect(f.isValid()).toBe(true);
});

/*
test('puzzlesAreEqualIfSameSize', () => {
    let f1 : Futoshiki = new Futoshiki(1);
    expect(f1).not.toEqual(new Futoshiki(2));
    expect(f1).toEqual(new Futoshiki(1));
    expect(f1.hashCode()).toBe(new Futoshiki(1).hashCode());
});
*/

test('Puzzles are equal if in same state', () => {
    let f1 : Futoshiki = new Futoshiki(1);
            f1.set(1, 1, 1);
    expect(f1).not.toEqual(new Futoshiki(1));
    let f2 : Futoshiki = new Futoshiki(1);
            f2.set(1, 1, 1);
    expect(f1).toEqual(f2);
});

test('Puzzles are equal if same rule', () => {
    let f1 : Futoshiki = new Futoshiki(2);
            f1.addGtRule(1, 1, 2, 1);
    let f2 : Futoshiki = new Futoshiki(2);
    expect(f1).not.toEqual(f2);
            f2.addGtRule(1, 1, 2, 1);
    expect(f1).toEqual(f2);
    f2.removeRule(new GtRule(1, 1, 2, 1));
    expect(f2).toEqual(new Futoshiki(2));
});

test('Puzzles are equal if same multiple rules', () => {
    let f1 : Futoshiki = new Futoshiki(2);
            f1.addGtRule(1, 1, 2, 1);
            f1.addGtRule(1, 1, 1, 2);
            f1.addGtRule(2, 2, 2, 1);
            f1.addGtRule(2, 2, 1, 2);
    let f2 : Futoshiki = new Futoshiki(2);
    expect(f1).not.toEqual(f2);
            f2.addGtRule(1, 1, 2, 1);
    expect(f1).not.toEqual(f2);
            f2.addGtRule(1, 1, 1, 2);
    expect(f1).not.toEqual(f2);
            f2.addGtRule(2, 2, 2, 1);
    expect(f1).not.toEqual(f2);
            f2.addGtRule(2, 2, 1, 2);
    expect(f1).toEqual(f2); // Puzzles are equal when all rules match
});

test('Puzzles are not equal to null', () => {
    expect(new Futoshiki().equals(null)).toBe(false);
});

test('Rule iterator reflects changed rules', () => {
    let f : Futoshiki = new Futoshiki();
            let o : any = f.getRules();
            f.addGtRule(1, 1, 2, 1);
    expect(f.getRules()).not.toBe(o);
});

test('Rules added to clone are immediately returned', () => {
    let f : Futoshiki = new Futoshiki();
            f.addGtRule(1, 1, 2, 1);
            f = /* clone */((o:any) => { if(o.clone!=undefined) { return (<any>o).clone(); } else { let clone = Object.create(o); for(let p in o) { if (o.hasOwnProperty(p)) clone[p] = o[p]; } return clone; } })(f);
            f.addGtRule(2, 1, 3, 1);
    expect(f.getRules()).toHaveLength(2);
});

test('Rule iterator is current after validity check', () => {
    let f : Futoshiki = new Futoshiki();
            f.getRules();
            f.addGtRule(1, 1, 2, 1);
    expect(f.isValid()).toBe(true);
    expect(f.getRules()).toHaveLength(1);
});
