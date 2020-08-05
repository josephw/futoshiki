/* Generated from Java with JSweet 2.3.5 - http://www.jsweet.org */
namespace org.kafsemo.futoshiki {
    /**
     * A class to convert puzzle state to, and from, a textual representation.
     * 
     * @author Joseph Walton
     * @class
     */
    export class FutoshikiPrinter {
        static stringLength(f : org.kafsemo.futoshiki.Futoshiki) : number {
            return f.getLength() * 2 - 1;
        }

        public static toString(f : org.kafsemo.futoshiki.Futoshiki) : string {
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
            for(let index125=f.getRules().iterator();index125.hasNext();) {
                let r = index125.next();
                {
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
            }
            let sb : java.lang.StringBuilder = new java.lang.StringBuilder(9 * 9 + 9);
            for(let index126=0; index126 < caa.length; index126++) {
                let row = caa[index126];
                {
                    for(let index127=0; index127 < row.length; index127++) {
                        let c = row[index127];
                        {
                            if(c != null) sb.append(c); else sb.append(" ");
                        }
                    }
                    sb.append("\n");
                }
            }
            return sb.toString();
        }

        public static parse(s : string) : org.kafsemo.futoshiki.Futoshiki {
            s = /* replaceAll */s.replace(new RegExp("\r\n", 'g'),"\n");
            let lines : string[] = s.split("[\r\n]", -1);
            let filledCells : java.util.Map<org.kafsemo.futoshiki.CellPos, number> = <any>(new java.util.HashMap<org.kafsemo.futoshiki.CellPos, number>());
            let rules : java.util.Collection<org.kafsemo.futoshiki.GtRule> = <any>(new java.util.ArrayList<org.kafsemo.futoshiki.GtRule>());
            let knownSize : number = 0;
            for(let i : number = 0; i < lines.length; i += 2) {{
                let row : number = ((i / 2|0)) + 1;
                knownSize = Math.max(knownSize, row);
                let ca : string[] = /* toCharArray */(lines[i]).split('');
                for(let j : number = 0; j < ca.length; j++) {{
                    let column : number = ((j / 2|0)) + 1;
                    knownSize = Math.max(knownSize, column);
                    let c : string = ca[j];
                    if(j % 2 === 0) {
                        let v : number = javaemul.internal.CharacterHelper.digit(c, 10);
                        if(v >= 0) {
                            filledCells.put(new org.kafsemo.futoshiki.CellPos(column, row), javaemul.internal.IntegerHelper.valueOf(v));
                        }
                    } else {
                        if((c => c.charCodeAt==null?<any>c:c.charCodeAt(0))(c) == '<'.charCodeAt(0)) {
                            rules.add(new org.kafsemo.futoshiki.GtRule(column + 1, row, column, row));
                            knownSize = Math.max(knownSize, column + 1);
                        } else if((c => c.charCodeAt==null?<any>c:c.charCodeAt(0))(c) == '>'.charCodeAt(0)) {
                            rules.add(new org.kafsemo.futoshiki.GtRule(column, row, column + 1, row));
                            knownSize = Math.max(knownSize, column + 1);
                        }
                    }
                };}
            };}
            for(let i : number = 1; i < lines.length; i += 2) {{
                let ca : string[] = /* toCharArray */(lines[i]).split('');
                for(let j : number = 0; j < ca.length; j += 2) {{
                    let column : number = ((j / 2|0)) + 1;
                    let row : number = ((i / 2|0)) + 1;
                    let c : string = ca[j];
                    if((c => c.charCodeAt==null?<any>c:c.charCodeAt(0))(c) == '^'.charCodeAt(0)) {
                        rules.add(new org.kafsemo.futoshiki.GtRule(column, row + 1, column, row));
                        knownSize = Math.max(knownSize, row + 1);
                    } else if((c => c.charCodeAt==null?<any>c:c.charCodeAt(0))(c) == 'v'.charCodeAt(0) || (c => c.charCodeAt==null?<any>c:c.charCodeAt(0))(c) == 'V'.charCodeAt(0)) {
                        rules.add(new org.kafsemo.futoshiki.GtRule(column, row, column, row + 1));
                        knownSize = Math.max(knownSize, row + 1);
                    }
                };}
            };}
            let size : number = 1;
            size = Math.max(size, knownSize);
            if(filledCells.size() > 0) {
                size = Math.max(size, java.util.Collections.max<any>(filledCells.values()));
            }
            let f : org.kafsemo.futoshiki.Futoshiki = new org.kafsemo.futoshiki.Futoshiki(size);
            for(let index128=filledCells.keySet().iterator();index128.hasNext();) {
                let p = index128.next();
                {
                    f.set(p.column, p.row, filledCells.get(p));
                }
            }
            for(let index129=rules.iterator();index129.hasNext();) {
                let gtr = index129.next();
                {
                    f.addGtRule(gtr.columnA, gtr.rowA, gtr.columnB, gtr.rowB);
                }
            }
            return f;
        }
    }
    FutoshikiPrinter["__class"] = "org.kafsemo.futoshiki.FutoshikiPrinter";

}

