import { Futoshiki } from "./Futoshiki";
import { Possibilities } from "./Possibilities";
import { CellPos } from "./CellPos";

/**
 * Recursive solver for Futoshiki puzzles.
 *
 * @author Joseph Walton
 * @param {*} target
 * @class
 */
export class Solver {
  //        static CELLPOS_ARRAY : org.kafsemo.futoshiki.CellPos[]; public static CELLPOS_ARRAY_$LI$() : org.kafsemo.futoshiki.CellPos[] { if(Solver.CELLPOS_ARRAY == null) Solver.CELLPOS_ARRAY = []; return Solver.CELLPOS_ARRAY; };

  static FIVE_BY_FIVE_COMBINATIONS: BigInt = BigInt("298023223876953125");

  /*private*/ target: SolutionTarget;

  public constructor(target: SolutionTarget) {
    this.target = target;
  }

  public solve(f: Futoshiki) {
    let blanks: CellPos[] = Array.from(f.blankCells());
    let poss: Possibilities = new Possibilities(f.getLength());
    poss.use$org_kafsemo_futoshiki_Futoshiki(f);
    let count: BigInt = poss.size();
    if (count > Solver.FIVE_BY_FIVE_COMBINATIONS) {
      //                Solver.log_$LI$().fine("This may take an extremely long time");
    }
    if (!this.target.remainingPossibilities(count)) {
      return;
    }
    if (
      this.solve$org_kafsemo_futoshiki_Futoshiki$org_kafsemo_futoshiki_CellPos_A$int$org_kafsemo_futoshiki_Possibilities$java_math_BigInteger(
        f,
        blanks,
        0,
        poss,
        BigInt(0)
      )
    ) {
      this.target.remainingPossibilities(BigInt(0));
    }
  }
  public solve$org_kafsemo_futoshiki_Futoshiki$org_kafsemo_futoshiki_CellPos_A$int$org_kafsemo_futoshiki_Possibilities$java_math_BigInteger(
    f: Futoshiki,
    blank: CellPos[],
    nb: number,
    poss: Possibilities,
    possibilitiesAfter: bigint
  ): boolean {
    if (!f.isValid()) {
      return true;
    }
    if (nb >= blank.length) {
      return this.target.solution(f);
    }
    blank = this.moveBlankWithLeastPossibilitiesIntoPlace(blank, nb, poss);
    let p: CellPos = blank[nb];
    let possibleValues: number[] = ((s) => {
      let a = [];
      while (s-- > 0) a.push(0);
      return a;
    })(f.getLength());
    let possibilitiesForValue: bigint[] = ((s) => {
      let a = [];
      while (s-- > 0) a.push(null);
      return a;
    })(f.getLength());
    let possibilities: Possibilities[] = ((s) => {
      let a = [];
      while (s-- > 0) a.push(null);
      return a;
    })(f.getLength());
    let i: number = 0;
    for (let v: number = 1; v <= f.getLength(); v++) {
      if (poss.isPossible(p.column, p.row, v)) {
        possibleValues[i] = v;
        let ps: Possibilities = poss.clone();
        ps.use$int$int$int(p.column, p.row, v);
        possibilities[i] = ps;
        possibilitiesForValue[i] = ps.size();
        i++;
      }
    }
    let remainingPossibilities: bigint = Solver.sum(possibilitiesForValue, i);
    remainingPossibilities = remainingPossibilities + possibilitiesAfter;
    for (let j: number = 0; j < i; j++) {
      if (!this.target.remainingPossibilities(remainingPossibilities)) {
        return false;
      }
      let v: number = possibleValues[j];
      f.set(p.column, p.row, v);
      remainingPossibilities =
        remainingPossibilities - possibilitiesForValue[j];

      let more: boolean = this.solve$org_kafsemo_futoshiki_Futoshiki$org_kafsemo_futoshiki_CellPos_A$int$org_kafsemo_futoshiki_Possibilities$java_math_BigInteger(
        f.clone(),
        blank,
        nb + 1,
        possibilities[j],
        remainingPossibilities
      );
      if (!more) {
        return false;
      }
    }

    return true;
  }

  /**
   * Accept a puzzle state and, if it is valid and if there are still blank
   * squares, try every number. Recurse for all attempts. If there are no
   * blanks remaining then print what must be a solution.
   *
   * @param {org.kafsemo.futoshiki.Futoshiki} f
   * @param {Array} blank
   * @param {number} nb the index of the next remaining blank
   * @param {org.kafsemo.futoshiki.Possibilities} poss
   * @param {java.math.BigInteger} possibilitiesAfter
   * @return {boolean}
   * @private
   */
  //        public solve(f? : any, blank? : any, nb? : any, poss? : any, possibilitiesAfter? : any) : any {
  //            if(((f != null && f instanceof <any>org.kafsemo.futoshiki.Futoshiki) || f === null) && ((blank != null && blank instanceof <any>Array && (blank.length==0 || blank[0] == null ||(blank[0] != null && blank[0] instanceof <any>org.kafsemo.futoshiki.CellPos))) || blank === null) && ((typeof nb === 'number') || nb === null) && ((poss != null && poss instanceof <any>org.kafsemo.futoshiki.Possibilities) || poss === null) && ((possibilitiesAfter != null && possibilitiesAfter instanceof <any>java.math.BigInteger) || possibilitiesAfter === null)) {
  //                return <any>this.solve$org_kafsemo_futoshiki_Futoshiki$org_kafsemo_futoshiki_CellPos_A$int$org_kafsemo_futoshiki_Possibilities$java_math_BigInteger(f, blank, nb, poss, possibilitiesAfter);
  //            } else if(((f != null && f instanceof <any>org.kafsemo.futoshiki.Futoshiki) || f === null) && blank === undefined && nb === undefined && poss === undefined && possibilitiesAfter === undefined) {
  //                return <any>this.solve$org_kafsemo_futoshiki_Futoshiki(f);
  //            } else throw new Error('invalid overload');
  //        }

  moveBlankWithLeastPossibilitiesIntoPlace(
    blanks: CellPos[],
    p: number,
    poss: Possibilities
  ): CellPos[] {
    let fewestIdx: number = -1;
    for (let i: number = p; i < blanks.length; i++) {
      if (fewestIdx >= 0) {
        let p1: number = poss.possibleCount$org_kafsemo_futoshiki_CellPos(
          blanks[fewestIdx]
        );
        let p2: number = poss.possibleCount$org_kafsemo_futoshiki_CellPos(
          blanks[i]
        );
        if (p2 < p1) {
          fewestIdx = i;
        }
      } else {
        fewestIdx = i;
      }
    }
    if (fewestIdx >= 0 && fewestIdx !== p) {
      let cp: CellPos = blanks[p];
      blanks[p] = blanks[fewestIdx];
      blanks[fewestIdx] = cp;
    }
    return blanks;
  }

  static sum(a: bigint[], maxIndex: number): bigint {
    let total: bigint = BigInt(0);
    for (let i: number = 0; i < maxIndex; i++) {
      total = total + a[i];
    }
    return total;
  }
}

/**
 * A callback interface to receive complete puzzle solutions.
 * @class
 */
export interface SolutionTarget {
  /**
   * @param {org.kafsemo.futoshiki.Futoshiki} f
   * @return {boolean} whether or not more solutions are required
   */
  solution(f: Futoshiki): boolean;

  remainingPossibilities(count: BigInt): boolean;
}
