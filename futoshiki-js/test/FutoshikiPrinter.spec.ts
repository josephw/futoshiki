import { CellPos } from "../src/CellPos";
import { GtRule } from "../src/GtRule";
import { Futoshiki } from "../src/Futoshiki";
import { FutoshikiPrinter } from "../src/FutoshikiPrinter";

/**
 * Tests for {@link FutoshikiPrinter}, converting puzzle state to
 * and from strings.
 *
 * @author Joseph Walton
 * @class
 * @extends junit.framework.TestCase
 */

test("Test empty", () => {
  let f: Futoshiki = new Futoshiki();
  let s: string = FutoshikiPrinter.toString(f);
  let lines: string[] = s.split("\n");
  expect(lines).toHaveLength(10);
  for (let index122 = 0; index122 < 9; index122++) {
    let l = lines[index122];
    expect(l).toBe("         ");
  }
  expect(lines[9]).toBe("");
});

test("Test with numbers", () => {
  let f: Futoshiki = new Futoshiki();
  let sample: number[][] = [
    [5, 1, 4, 3, 2],
    [3, 2, 5, 1, 4],
    [4, 5, 3, 2, 1],
    [2, 4, 1, 5, 3],
    [1, 3, 2, 4, 5],
  ];
  for (let row: number = 1; row <= 5; row++) {
    for (let column: number = 1; column <= 5; column++) {
      f.set(column, row, sample[row - 1][column - 1]);
    }
  }
  let expected: string =
    "5 1 4 3 2\n         \n3 2 5 1 4\n         \n4 5 3 2 1\n         \n2 4 1 5 3\n         \n1 3 2 4 5\n";
  expect(FutoshikiPrinter.toString(f)).toBe(expected);
});

test("Test with rules", () => {
  let f: Futoshiki = new Futoshiki();
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
  let expected: string =
    "         \n  ^   v  \n         \n         \n   > >   \nv        \n         \nv v ^    \n < > < < \n";
  expect(FutoshikiPrinter.toString(f)).toBe(expected);
});

test("Test full example", () => {
  let f: Futoshiki = new Futoshiki();
  let sample: number[][] = [
    [5, 1, 4, 3, 2],
    [3, 2, 5, 1, 4],
    [4, 5, 3, 2, 1],
    [2, 4, 1, 5, 3],
    [1, 3, 2, 4, 5],
  ];
  for (let row: number = 1; row <= 5; row++) {
    for (let column: number = 1; column <= 5; column++) {
      f.set(column, row, sample[row - 1][column - 1]);
    }
  }
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
  let expected: string =
    "5 1 4 3 2\n  ^   v  \n3 2 5 1 4\n         \n4 5>3>2 1\nv        \n2 4 1 5 3\nv v ^    \n1<3>2<4<5\n";
  expect(FutoshikiPrinter.toString(f)).toBe(expected);
});

function assertEquals(e: Futoshiki, f: Futoshiki) {
  expect(FutoshikiPrinter.toString(f)).toBe(FutoshikiPrinter.toString(e));
}

test("Test parse empty", () => {
  let emptyString: string =
    "         \n         \n         \n         \n         \n         \n         \n         \n         \n";
  let empty: Futoshiki = FutoshikiPrinter.parse(emptyString);
  expect(empty).toStrictEqual(new Futoshiki());
});

test("Test parse empty string", () => {
  let empty: Futoshiki = FutoshikiPrinter.parse("");
  expect(empty).toStrictEqual(new Futoshiki(1));
});

test("Test parse with numbers", () => {
  let withNumbersString: string =
    "5 1 4 3 2\n         \n3 2 5 1 4\n         \n4 5 3 2 1\n         \n2 4 1 5 3\n         \n1 3 2 4 5\n";
  let withNumbers: Futoshiki = FutoshikiPrinter.parse(withNumbersString);
  let expected: Futoshiki = new Futoshiki();
  let sample: number[][] = [
    [5, 1, 4, 3, 2],
    [3, 2, 5, 1, 4],
    [4, 5, 3, 2, 1],
    [2, 4, 1, 5, 3],
    [1, 3, 2, 4, 5],
  ];
  for (let row: number = 1; row <= 5; row++) {
    for (let column: number = 1; column <= 5; column++) {
      expected.set(column, row, sample[row - 1][column - 1]);
    }
  }
  expect(withNumbers).toStrictEqual(expected);
});

test("Test parse with rules", () => {
  let withRulesString: string =
    "         \n  ^   v  \n         \n         \n   > >   \nv        \n         \nv v ^    \n < > < < \n";
  let withRules: Futoshiki = FutoshikiPrinter.parse(withRulesString);
  let expected: Futoshiki = new Futoshiki();
  expected.addGtRule(2, 2, 2, 1);
  expected.addGtRule(4, 1, 4, 2);
  expected.addGtRule(2, 3, 3, 3);
  expected.addGtRule(3, 3, 4, 3);
  expected.addGtRule(1, 3, 1, 4);
  expected.addGtRule(1, 4, 1, 5);
  expected.addGtRule(2, 4, 2, 5);
  expected.addGtRule(3, 5, 3, 4);
  expected.addGtRule(2, 5, 1, 5);
  expected.addGtRule(2, 5, 3, 5);
  expected.addGtRule(4, 5, 3, 5);
  expected.addGtRule(5, 5, 4, 5);
  expect(withRules).toStrictEqual(expected);
});

test("Test parse full example", () => {
  let fullExampleString: string =
    "5 1 4 3 2\n  ^   v  \n3 2 5 1 4\n         \n4 5>3>2 1\nv        \n2 4 1 5 3\nv v ^    \n1<3>2<4<5\n";
  let fullExample: Futoshiki = FutoshikiPrinter.parse(fullExampleString);
  let expected: Futoshiki = new Futoshiki();
  let sample: number[][] = [
    [5, 1, 4, 3, 2],
    [3, 2, 5, 1, 4],
    [4, 5, 3, 2, 1],
    [2, 4, 1, 5, 3],
    [1, 3, 2, 4, 5],
  ];
  for (let row: number = 1; row <= 5; row++) {
    {
      for (let column: number = 1; column <= 5; column++) {
        {
          expected.set(column, row, sample[row - 1][column - 1]);
        }
      }
    }
  }
  expected.addGtRule(2, 2, 2, 1);
  expected.addGtRule(4, 1, 4, 2);
  expected.addGtRule(2, 3, 3, 3);
  expected.addGtRule(3, 3, 4, 3);
  expected.addGtRule(1, 3, 1, 4);
  expected.addGtRule(1, 4, 1, 5);
  expected.addGtRule(2, 4, 2, 5);
  expected.addGtRule(3, 5, 3, 4);
  expected.addGtRule(2, 5, 1, 5);
  expected.addGtRule(2, 5, 3, 5);
  expected.addGtRule(4, 5, 3, 5);
  expected.addGtRule(5, 5, 4, 5);
  expect(fullExample).toStrictEqual(expected);
});

test("Test parse with rules CRLF", () => {
  let withRulesString: string =
    "         \r\n  ^   v  \r\n         \r\n         \r\n   > >   \r\nv        \r\n         \r\nv v ^    \r\n < > < < \r\n";
  let withRules: Futoshiki = FutoshikiPrinter.parse(withRulesString);
  let expected: Futoshiki = new Futoshiki();
  expected.addGtRule(2, 2, 2, 1);
  expected.addGtRule(4, 1, 4, 2);
  expected.addGtRule(2, 3, 3, 3);
  expected.addGtRule(3, 3, 4, 3);
  expected.addGtRule(1, 3, 1, 4);
  expected.addGtRule(1, 4, 1, 5);
  expected.addGtRule(2, 4, 2, 5);
  expected.addGtRule(3, 5, 3, 4);
  expected.addGtRule(2, 5, 1, 5);
  expected.addGtRule(2, 5, 3, 5);
  expected.addGtRule(4, 5, 3, 5);
  expected.addGtRule(5, 5, 4, 5);
  expect(withRules).toStrictEqual(expected);
});

test("Test parse full example short lines", () => {
  let fullExampleString: string =
    "5 1 4 3 2\n  ^   v\n3 2 5 1 4\n\n4 5>3>2 1\nv\n2 4 1 5 3\nv v ^\n1<3>2<4<5\n";
  let fullExample: Futoshiki = FutoshikiPrinter.parse(fullExampleString);
  let expected: Futoshiki = new Futoshiki();
  let sample: number[][] = [
    [5, 1, 4, 3, 2],
    [3, 2, 5, 1, 4],
    [4, 5, 3, 2, 1],
    [2, 4, 1, 5, 3],
    [1, 3, 2, 4, 5],
  ];
  for (let row: number = 1; row <= 5; row++) {
    for (let column: number = 1; column <= 5; column++) {
      expected.set(column, row, sample[row - 1][column - 1]);
    }
  }
  expected.addGtRule(2, 2, 2, 1);
  expected.addGtRule(4, 1, 4, 2);
  expected.addGtRule(2, 3, 3, 3);
  expected.addGtRule(3, 3, 4, 3);
  expected.addGtRule(1, 3, 1, 4);
  expected.addGtRule(1, 4, 1, 5);
  expected.addGtRule(2, 4, 2, 5);
  expected.addGtRule(3, 5, 3, 4);
  expected.addGtRule(2, 5, 1, 5);
  expected.addGtRule(2, 5, 3, 5);
  expected.addGtRule(4, 5, 3, 5);
  expected.addGtRule(5, 5, 4, 5);
  expect(fullExample).toStrictEqual(expected);
});

test("Test parse incomplete", () => {
  let fullExampleString: string =
    "5 1 4\n  ^   v\n\n\n4 5>3>2 1\nv\n2 4 1 5 3\nv v ^\n1<3>2<4<5\n";
  let fullExample: Futoshiki = FutoshikiPrinter.parse(fullExampleString);
  let expected: Futoshiki = new Futoshiki();
  let sample: number[][] = [
    [5, 1, 4],
    [],
    [4, 5, 3, 2, 1],
    [2, 4, 1, 5, 3],
    [1, 3, 2, 4, 5],
  ];
  for (let row: number = 1; row <= 5; row++) {
    for (let column: number = 1; column <= sample[row - 1].length; column++) {
      expected.set(column, row, sample[row - 1][column - 1]);
    }
  }
  expected.addGtRule(2, 2, 2, 1);
  expected.addGtRule(4, 1, 4, 2);
  expected.addGtRule(2, 3, 3, 3);
  expected.addGtRule(3, 3, 4, 3);
  expected.addGtRule(1, 3, 1, 4);
  expected.addGtRule(1, 4, 1, 5);
  expected.addGtRule(2, 4, 2, 5);
  expected.addGtRule(3, 5, 3, 4);
  expected.addGtRule(2, 5, 1, 5);
  expected.addGtRule(2, 5, 3, 5);
  expected.addGtRule(4, 5, 3, 5);
  expected.addGtRule(5, 5, 4, 5);
  expect(fullExample).toStrictEqual(expected);
});

test("Test smallest to string", () => {
  let f: Futoshiki = new Futoshiki(1);
  expect(FutoshikiPrinter.toString(f)).toBe(" \n");
  f.set(1, 1, 1);
  expect(FutoshikiPrinter.toString(f)).toBe("1\n");
});

test("Test parsing smallest puzzle", () => {
  let f: Futoshiki;
  f = FutoshikiPrinter.parse(" \n");
  expect(f.getLength()).toBe(1);
  expect(f.get(1, 1)).toBe(0);
  f = FutoshikiPrinter.parse("1");
  expect(f.getLength()).toBe(1);
  expect(f.get(1, 1)).toBe(1);
});

test("Test parsed result large enough to hold digit", () => {
  let f: Futoshiki;
  f = FutoshikiPrinter.parse("9");
  expect(f.getLength()).toBe(9);
  expect(f.get(1, 1)).toBe(9);
});

test("Test parse tall empty puzzle", () => {
  let s: string = "\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n";
  expect(s).toHaveLength(17);
  let f: Futoshiki;
  f = FutoshikiPrinter.parse(s);
  expect(f.getLength()).toBe(9);
  expect(f).toStrictEqual(new Futoshiki(9));
});

test("Test empty puzzle with number in final square", () => {
  let s: string = "\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n                1";
  let f: Futoshiki;
  f = FutoshikiPrinter.parse(s);
  expect(f.getLength()).toBe(9);
  expect(f.get(9, 9)).toBe(1);
});

test("Test puzzle with no cell after rule", () => {
  let f: Futoshiki = FutoshikiPrinter.parse(" <");
  expect(f.getLength()).toBe(2);
  expect(f.getRules()[0]).toStrictEqual(new GtRule(2, 1, 1, 1));
});

test("Test upper and lowercase Vs acceptable as rules", () => {
  let expectedRule: GtRule = new GtRule(1, 1, 1, 2);
  let s1: string = "   \nv  \n   \n";
  let f1: Futoshiki = FutoshikiPrinter.parse(s1);
  expect(f1.getRules()[0]).toStrictEqual(expectedRule);
  expect(FutoshikiPrinter.parse(s1.toUpperCase())).toStrictEqual(f1);
});
