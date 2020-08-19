import { Possibilities } from '../src/Possibilities';
import { Futoshiki } from '../src/Futoshiki';

test('Empty by default', () => {
    let p : Possibilities = new Possibilities(1);
    expect(p.isPossible(1, 1, 1)).toBe(true);
});

test('Still possible when used', () => {
    let p : Possibilities = new Possibilities(1);
            p.use(1, 1, 1);
    expect(p.isPossible(1, 1, 1)).toBe(true);
});

test('Used number not available in same row or column', () => {
    let p : Possibilities = new Possibilities(2);
            p.use(1, 1, 1);
    expect(p.isPossible(1, 1, 1)).toBe(true);
    expect(p.isPossible(1, 2, 1)).toBe(false);
    expect(p.isPossible(2, 1, 1)).toBe(false);
    expect(p.isPossible(2, 2, 1)).toBe(true);
});

test('Used square not available', () => {
    let p : Possibilities = new Possibilities(2);
            p.use(1, 1, 1);
    expect(p.isPossible(1, 1, 2)).toBe(false);
});

test('May not use zero value', () => {
    let p : Possibilities = new Possibilities(2);
    expect(() => {
            p.use(1, 1, 0);
    }).toThrow();
});

test('May not use invalid value', () => {
    let p : Possibilities = new Possibilities(1);
    expect(() => {
            p.use(1, 1, 2);
    }).toThrow();
});

test('Total number of possibilities known', () => {
    let p : Possibilities;
    p = new Possibilities(1);
    expect(p.size()).toBe(BigInt(1));
    p = new Possibilities(2);
    expect(p.size()).toBe(BigInt(16));
    p = new Possibilities(3);
    expect(p.size()).toBe(BigInt(19683));
});

test('Total possibilities is constant for one by one', () => {
    let p : Possibilities = new Possibilities(1);
    expect(p.size()).toBe(BigInt(1));
            p.use(1, 1, 1);
    expect(p.size()).toBe(BigInt(1));
});

test('Total number reduced when numbers are fixed', () => {
    let p : Possibilities;
    p = new Possibilities(2);
            p.use(1, 1, 1);
    expect(p.isPossible(1, 1, 2)).toBe(false);
    expect(p.isPossible(2, 1, 1)).toBe(false);
    expect(p.isPossible(2, 1, 2)).toBe(true);
    expect(p.size()).toBe(BigInt(2));
            p.use(2, 2, 1);
    expect(p.size()).toBe(BigInt(1));
    p = new Possibilities(3);
            p.use(1, 1, 1);
    expect(p.size()).toBe(BigInt(16 * 81));
            p.use(2, 1, 2);
    expect(p.size()).toBe(BigInt(16 * 9));
            p.use(3, 1, 3);
    expect(p.size()).toBe(BigInt(64));
});

test('Use existing puzzle to reduce possibilities', () => {
    let p : Possibilities = new Possibilities(2);
    let f : Futoshiki = new Futoshiki(2);
            p.use(f);
    expect(p.size()).toBe(BigInt(16));
            f.set(1, 1, 1);
            p.use(f);
    expect(p.size()).toBe(BigInt(2));
});

test('Use existing puzzle rules to reduce possibilities', () => {
    let p : Possibilities = new Possibilities(2);
    let f : Futoshiki = new Futoshiki(2);
            f.addGtRule(1, 1, 2, 1);
            p.use(f);
    expect(p.isPossible(1, 1, 1)).toBe(false);
    expect(p.isPossible(1, 1, 2)).toBe(true);
    expect(p.isPossible(2, 1, 1)).toBe(true);
    expect(p.isPossible(2, 1, 2)).toBe(false);
});

test('Use existing puzzle rules with numbers to reduce possibilities', () => {
    let p : Possibilities = new Possibilities(3);
    let f : Futoshiki = new Futoshiki(3);
            f.set(1, 1, 2);
            f.addGtRule(2, 1, 1, 1);
            p.use(f);
    expect(p.isPossible(2, 1, 1)).toBe(false);
    expect(p.isPossible(2, 1, 2)).toBe(false);
    expect(p.isPossible(2, 1, 3)).toBe(true);
});

test('Get possibility count for specific cell', () => {
    let p : Possibilities = new Possibilities(1);
    p = new Possibilities(1);
    expect(p.possibleCount(1, 1)).toBe(1);
    p = new Possibilities(9);
    expect(p.possibleCount(1, 1)).toBe(9);
});

test('Specific cell possibility count is reduced', () => {
    let p : Possibilities;
    p = new Possibilities(2);
    expect(p.possibleCount(1, 1)).toBe(2);
            p.use(1, 1, 1);
    expect(p.possibleCount(1, 1)).toBe(1);
    expect(p.possibleCount(2, 1)).toBe(1);
    p = new Possibilities(9);
            p.use(1, 1, 1);
    expect(p.possibleCount(2, 1)).toBe(8);
});

test('Rule eliminations are propagated', () => {
    let p : Possibilities = new Possibilities(9);
    let f : Futoshiki = new Futoshiki(9);
    for(let gtColumn : number = 2; gtColumn <= 9; gtColumn++) {
                f.addGtRule(gtColumn, 1, gtColumn - 1, 1);
    }
            p.use(f);
    for(let column : number = 1; column <= 9; column++) {
        expect(p.maxPossible(column, 1)).toBe(column);
        expect(p.minPossible(column, 1)).toBe(column);
    }
});

/*
        public static toString(p : org.kafsemo.futoshiki.Possibilities) : string {
            let sb : java.lang.StringBuilder = new java.lang.StringBuilder();
            for(let r : number = 1; r <= p.getLength(); r++) {{
                for(let c : number = 1; c <= p.getLength(); c++) {{
                    let ts : java.util.TreeSet<number> = <any>(new java.util.TreeSet<number>());
                    for(let v : number = 1; v <= p.getLength(); v++) {{
                        if(p.isPossible(c, r, v)) {
                            ts.add(v);
                        }
                    };}
                    sb.append(ts);
                    sb.append(" | ");
                };}
                sb.append("\n");
            };}
            sb.append("--\n");
            return sb.toString();
        }
*/
test('Rule elimination succeeds even when puzzle cannot be solved', () => {
    let f : Futoshiki = new Futoshiki(2);
            f.addGtRule(1, 1, 2, 1);
            f.addGtRule(1, 2, 1, 1);
    new Possibilities(2).use(f);
});
