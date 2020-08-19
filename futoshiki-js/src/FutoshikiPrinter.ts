import { Futoshiki } from './Futoshiki';
import { CellPos } from './CellPos';
import { GtRule } from './GtRule';

    /**
     * A class to convert puzzle state to, and from, a textual representation.
     * 
     * @author Joseph Walton
     * @class
     */
    export class FutoshikiPrinter {
        static stringLength(f : Futoshiki) : number {
            return f.getLength() * 2 - 1;
        }

        public static toString(f : Futoshiki) : string {
            let stringLength : number = FutoshikiPrinter.stringLength(f);
            let caa : string[][] = <any> (function(dims) { let allocate = function(dims) { if(dims.length==0) { return null; } else { let array = []; for(let i = 0; i < dims[0]; i++) { array.push(allocate(dims.slice(1))); } return array; }}; return allocate(dims);})([stringLength, stringLength]);
            for(let row : number = 1; row <= f.getLength(); row++) {{
                for(let column : number = 1; column <= f.getLength(); column++) {{
                    let v : number = f.get(column, row);
                    let s : string;
                    if(v !== 0) {
                        s = /* toString */(''+(v));
                    } else {
                        s = null;
                    }
                    caa[(row - 1) * 2][(column - 1) * 2] = s;
                };}
            };}
	    for (let r of f.getRules()) {
                    let row : number = r.rowA + r.rowB - 2;
                    let column : number = r.columnA + r.columnB - 2;
                    let s : string;
                    if(r.rowB > r.rowA) {
                        s = "v";
                    } else if(r.rowB < r.rowA) {
                        s = "^";
                    } else if(r.columnB > r.columnA) {
                        s = ">";
                    } else {
                        s = "<";
                    }
                    caa[row][column] = s;
            }
            let sb : string = "";
            for(let index126=0; index126 < caa.length; index126++) {
                let row = caa[index126];
                {
                    for(let index127=0; index127 < row.length; index127++) {
                        let c = row[index127];
                        {
                            if(c != null) sb = sb + c; else sb = sb + " ";
                        }
                    }
                    sb = sb + "\n";
                }
            }
            return sb;
        }

        public static parse(s : string) : Futoshiki {
            s = /* replaceAll */s.replace(new RegExp("\r\n", 'g'),"\n");
            let lines : string[] = s.split("\n");
            let filledCells : Map<CellPos, number> = new Map<CellPos, number>();
            let rules : GtRule[] = [];
            let knownSize : number = 0;
            for(let i : number = 0; i < lines.length; i += 2) {
                let row : number = (i / 2) + 1;
                knownSize = Math.max(knownSize, row);
                let ca : string[] = /* toCharArray */(lines[i]).split('');
                for(let j : number = 0; j < ca.length; j++) {
                    let column : number = Math.floor((j / 2) + 1);
                    knownSize = Math.max(knownSize, column);
                    let c : string = ca[j];
                    if(j % 2 === 0) {
                        let v : number = parseInt(c, 10);
                        if(v >= 0) {
                            filledCells.set(new CellPos(column, row), v);
                        }
                    } else {
                        if(c == '<') {
                            rules.push(new GtRule(column + 1, row, column, row));
                            knownSize = Math.max(knownSize, column + 1);
                        } else if(c == '>') {
                            rules.push(new GtRule(column, row, column + 1, row));
                            knownSize = Math.max(knownSize, column + 1);
                        }
                    }
                }
            }
            for(let i : number = 1; i < lines.length; i += 2) {
                let ca : string[] = /* toCharArray */(lines[i]).split('');
                for(let j : number = 0; j < ca.length; j += 2) {
                    let column : number = (j / 2) + 1;
                    let row : number = Math.floor((i / 2) + 1);
                    let c : string = ca[j];
                    if(c == '^') {
                        rules.push(new GtRule(column, row + 1, column, row));
                        knownSize = Math.max(knownSize, row + 1);
                    } else if(c == 'v' || c == 'V') {
                        rules.push(new GtRule(column, row, column, row + 1));
                        knownSize = Math.max(knownSize, row + 1);
                    }
                }
            }
            let size : number = 1;
            size = Math.max(size, knownSize);
            if(filledCells.size > 0) {
                size = Math.max(size, ...filledCells.values());
            }
            let f : Futoshiki = new Futoshiki(size);
	    for (let p of filledCells.keys()) {
                    f.set(p.column, p.row, filledCells.get(p));
            }
	    for (let gtr of rules) {
                    f.addGtRule(gtr.columnA, gtr.rowA, gtr.columnB, gtr.rowB);
            }
            return f;
        }
    }
