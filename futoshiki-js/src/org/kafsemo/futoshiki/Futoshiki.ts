/* Generated from Java with JSweet 2.3.5 - http://www.jsweet.org */
namespace org.kafsemo.futoshiki {
    /**
     * A Futoshiki puzzle state, with any number of cells filled in and
     * a set of rules constraining the values. Methods allow for the manipulation
     * of state and validity checking.
     * 
     * @author Joseph Walton
     * @param {number} length
     * @class
     * @extends org.kafsemo.futoshiki.Grid
     */
    export class Futoshiki extends org.kafsemo.futoshiki.Grid {
        /*private*/ data : number[];

        /*private*/ rules : java.util.Map<org.kafsemo.futoshiki.GtRule, Futoshiki.ValidatingRule>;

        /*private*/ vraCache : java.lang.Iterable<Futoshiki.ValidatingRule>;

        /*private*/ origRuleIterable : java.lang.Iterable<org.kafsemo.futoshiki.GtRule>;

        public constructor(length? : any) {
            if(((typeof length === 'number') || length === null)) {
                let __args = arguments;
                super(length);
                if(this.data===undefined) this.data = null;
                if(this.rules===undefined) this.rules = null;
                if(this.vraCache===undefined) this.vraCache = null;
                if(this.origRuleIterable===undefined) this.origRuleIterable = null;
                if(this.data===undefined) this.data = null;
                if(this.rules===undefined) this.rules = null;
                if(this.vraCache===undefined) this.vraCache = null;
                if(this.origRuleIterable===undefined) this.origRuleIterable = null;
                (() => {
                    this.data = (s => { let a=[]; while(s-->0) a.push(0); return a; })(length * length);
                })();
            } else if(length === undefined) {
                let __args = arguments;
                {
                    let __args = arguments;
                    let length : any = 5;
                    super(length);
                    if(this.data===undefined) this.data = null;
                    if(this.rules===undefined) this.rules = null;
                    if(this.vraCache===undefined) this.vraCache = null;
                    if(this.origRuleIterable===undefined) this.origRuleIterable = null;
                    if(this.data===undefined) this.data = null;
                    if(this.rules===undefined) this.rules = null;
                    if(this.vraCache===undefined) this.vraCache = null;
                    if(this.origRuleIterable===undefined) this.origRuleIterable = null;
                    (() => {
                        this.data = (s => { let a=[]; while(s-->0) a.push(0); return a; })(length * length);
                    })();
                }
            } else throw new Error('invalid overload');
        }

        getValidatingRules() : java.lang.Iterable<Futoshiki.ValidatingRule> {
            if(this.vraCache == null) {
                if(this.rules != null) {
                    this.vraCache = <any>(new java.util.ArrayList<Futoshiki.ValidatingRule>(this.rules.values()));
                } else {
                    this.vraCache = java.util.Collections.emptyList<any>();
                }
            }
            return this.vraCache;
        }

        ruleMap() : java.util.Map<org.kafsemo.futoshiki.GtRule, Futoshiki.ValidatingRule> {
            if(this.rules == null) {
                this.rules = <any>(new java.util.HashMap<org.kafsemo.futoshiki.GtRule, Futoshiki.ValidatingRule>());
                if(this.vraCache != null) {
                    for(let index121=this.vraCache.iterator();index121.hasNext();) {
                        let vr = index121.next();
                        {
                            this.rules.put(vr.getOrigRule().getCanonPosForm(), vr);
                        }
                    }
                }
            }
            return this.rules;
        }

        /**
         * Is this puzzle state currently valid? Checks for duplicate numbers
         * in rows or columns and that all rules are followed.
         * 
         * @return
         * @return {boolean}
         */
        public isValid() : boolean {
            let columnMask : java.util.BitSet = new java.util.BitSet(this.length * this.length);
            for(let row : number = 1; row <= this.length; row++) {{
                let rowMask : number = 0;
                for(let column : number = 1; column <= this.length; column++) {{
                    let v : number = this.data[this.idxInternal(column, row)];
                    if(v === 0) continue;
                    let bit : number = (1 << v);
                    if((rowMask & bit) !== 0) return false;
                    let columnContainsValueBit : number = (column - 1) * this.length + v;
                    if(columnMask.get(columnContainsValueBit)) return false;
                    rowMask |= bit;
                    columnMask.set(columnContainsValueBit);
                };}
            };}
            for(let index122=this.getValidatingRules().iterator();index122.hasNext();) {
                let r = index122.next();
                {
                    if(!r.isValid(this)) return false;
                }
            }
            return true;
        }

        public isFull() : boolean {
            for(let index123=0; index123 < this.data.length; index123++) {
                let b = this.data[index123];
                {
                    if(b === 0) {
                        return false;
                    }
                }
            }
            return true;
        }

        public set(column : number, row : number, v : number) {
            if(v < 1 || v > this.length) throw new java.lang.IllegalArgumentException("Bad cell value " + v);
            this.data[this.idx(column, row)] = (<number>v|0);
        }

        public clear(column : number, row : number) {
            this.data[this.idx(column, row)] = 0;
        }

        public addGtRule(columnA : number, rowA : number, columnB : number, rowB : number) {
            let newRule : org.kafsemo.futoshiki.GtRule = new org.kafsemo.futoshiki.GtRule(columnA, rowA, columnB, rowB);
            let k : org.kafsemo.futoshiki.GtRule = newRule.getCanonPosForm();
            this.ruleMap().put(k, new Futoshiki.ValidatingRule(newRule, this));
            this.vraCache = null;
            this.origRuleIterable = null;
        }

        public clone() : Futoshiki {
            let f : Futoshiki = new Futoshiki(this.length);
            java.lang.System.arraycopy(this.data, 0, f.data, 0, this.data.length);
            f.vraCache = this.getValidatingRules();
            f.origRuleIterable = this.origRuleIterable;
            return f;
        }

        public get(column : number, row : number) : number {
            return this.data[this.idx(column, row)];
        }

        public blankCells() : java.util.Collection<org.kafsemo.futoshiki.CellPos> {
            let blank : java.util.Collection<org.kafsemo.futoshiki.CellPos> = <any>(new java.util.ArrayList<org.kafsemo.futoshiki.CellPos>(this.length * this.length));
            for(let row : number = 1; row <= this.length; row++) {{
                for(let column : number = 1; column <= this.length; column++) {{
                    if(this.data[this.idxInternal(column, row)] === 0) {
                        blank.add(new org.kafsemo.futoshiki.CellPos(column, row));
                    }
                };}
            };}
            return blank;
        }

        public hashCode() : number {
            return this.length ^ java.util.Arrays.hashCode(this.data) ^ /* hashCode */(<any>((o: any) => { if(o.hashCode) { return o.hashCode(); } else { return o.toString().split('').reduce((prevHash, currVal) => (((prevHash << 5) - prevHash) + currVal.charCodeAt(0))|0, 0); }})(this.ruleMap()));
        }

        public equals(o : any) : boolean {
            if(o != null && o instanceof <any>org.kafsemo.futoshiki.Futoshiki) {
                let f : Futoshiki = <Futoshiki>o;
                return this.length === f.length && java.util.Arrays.equals(this.data, f.data) && /* equals */(<any>((o1: any, o2: any) => { if(o1 && o1.equals) { return o1.equals(o2); } else { return o1 === o2; } })(this.ruleMap().keySet(),f.ruleMap().keySet()));
            } else {
                return false;
            }
        }

        public toString() : string {
            return org.kafsemo.futoshiki.FutoshikiPrinter.toString(this);
        }

        public getRules() : java.lang.Iterable<any> {
            this.origRuleIterable = null;
            if(this.origRuleIterable == null || this.vraCache == null) {
                this.origRuleIterable = new Futoshiki.OrigRuleIterable(this.getValidatingRules());
            }
            return this.origRuleIterable;
        }

        public getRule(ruleKey : org.kafsemo.futoshiki.GtRule) : org.kafsemo.futoshiki.GtRule {
            let k : org.kafsemo.futoshiki.GtRule = ruleKey.getCanonPosForm();
            let r : Futoshiki.ValidatingRule = this.ruleMap().get(k);
            if(r != null) {
                return r.getOrigRule();
            } else {
                return null;
            }
        }

        public removeRule(ruleKey : org.kafsemo.futoshiki.GtRule) {
            let k : org.kafsemo.futoshiki.GtRule = ruleKey.getCanonPosForm();
            this.ruleMap().remove(k);
            this.vraCache = null;
            this.origRuleIterable = null;
        }
    }
    Futoshiki["__class"] = "org.kafsemo.futoshiki.Futoshiki";


    export namespace Futoshiki {

        export class ValidatingRule {
            idxA : number;

            idxB : number;

            origRule : org.kafsemo.futoshiki.GtRule;

            constructor(gtr : org.kafsemo.futoshiki.GtRule, f : org.kafsemo.futoshiki.Futoshiki) {
                if(this.idxA===undefined) this.idxA = 0;
                if(this.idxB===undefined) this.idxB = 0;
                if(this.origRule===undefined) this.origRule = null;
                this.idxA = f.idx(gtr.getGreaterColumn(), gtr.getGreaterRow());
                this.idxB = f.idx(gtr.getLesserColumn(), gtr.getLesserRow());
                this.origRule = gtr;
            }

            isValid(f : org.kafsemo.futoshiki.Futoshiki) : boolean {
                if(f.data[this.idxA] === 0 || f.data[this.idxB] === 0) return true;
                return f.data[this.idxA] > f.data[this.idxB];
            }

            getOrigRule() : org.kafsemo.futoshiki.GtRule {
                return this.origRule;
            }
        }
        ValidatingRule["__class"] = "org.kafsemo.futoshiki.Futoshiki.ValidatingRule";


        export class OrigRuleIterable implements java.lang.Iterable<org.kafsemo.futoshiki.GtRule> {
            vra : java.lang.Iterable<Futoshiki.ValidatingRule>;

            constructor(vra : java.lang.Iterable<Futoshiki.ValidatingRule>) {
                if(this.vra===undefined) this.vra = null;
                this.vra = vra;
            }

            public iterator() : java.util.Iterator<org.kafsemo.futoshiki.GtRule> {
                let i : java.util.Iterator<Futoshiki.ValidatingRule> = this.vra.iterator();
                return new OrigRuleIterable.OrigRuleIterable$0(this, i);
            }
        }
        OrigRuleIterable["__class"] = "org.kafsemo.futoshiki.Futoshiki.OrigRuleIterable";
        OrigRuleIterable["__interfaces"] = ["java.lang.Iterable"];



        export namespace OrigRuleIterable {

            export class OrigRuleIterable$0 implements java.util.Iterator<org.kafsemo.futoshiki.GtRule> {
                public __parent: any;
                public hasNext() : boolean {
                    return this.i.hasNext();
                }

                public next() : org.kafsemo.futoshiki.GtRule {
                    return this.i.next().getOrigRule();
                }

                public remove() {
                    throw new java.lang.UnsupportedOperationException();
                }

                constructor(__parent: any, private i: any) {
                    this.__parent = __parent;
                }
            }
            OrigRuleIterable$0["__interfaces"] = ["java.util.Iterator"];


        }

    }

}

