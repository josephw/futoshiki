/* Generated from Java with JSweet 2.3.5 - http://www.jsweet.org */
namespace org.kafsemo.futoshiki {
    /**
     * Tests for {@link Futoshiki}, modifying and examining puzzle state.
     * 
     * @author Joseph Walton
     * @class
     */
    export class TestFutoshiki {
        public testInitialState() {
            let f : org.kafsemo.futoshiki.Futoshiki = new org.kafsemo.futoshiki.Futoshiki();
            org.junit.Assert.assertTrue(f.isValid());
            org.junit.Assert.assertFalse(f.isFull());
        }

        public testSimpleModification() {
            let f : org.kafsemo.futoshiki.Futoshiki = new org.kafsemo.futoshiki.Futoshiki();
            f.set(1, 1, 1);
            org.junit.Assert.assertEquals(1, f.get(1, 1));
            f.set(1, 1, 2);
            org.junit.Assert.assertEquals(2, f.get(1, 1));
            try {
                f.set(1, 1, 0);
                org.junit.Assert.fail("Out of range numbers should fail");
            } catch(iae) {
            };
            try {
                f.set(0, 0, 1);
                org.junit.Assert.fail("Out of range coordinates should fail");
            } catch(iae) {
            };
            try {
                f.set(6, 6, 1);
                org.junit.Assert.fail("Out of range coordinates should fail");
            } catch(iae) {
            };
        }

        public testFull() {
            let f : org.kafsemo.futoshiki.Futoshiki = new org.kafsemo.futoshiki.Futoshiki();
            for(let row : number = 1; row <= 5; row++) {{
                for(let column : number = 1; column <= 5; column++) {{
                    org.junit.Assert.assertFalse(f.isFull());
                    f.set(column, row, 1);
                };}
            };}
            org.junit.Assert.assertTrue(f.isFull());
        }

        public testSimpleInvalidation() {
            let f : org.kafsemo.futoshiki.Futoshiki = new org.kafsemo.futoshiki.Futoshiki();
            f.set(1, 1, 1);
            f.set(2, 1, 1);
            org.junit.Assert.assertFalse("Two 1s in a line is invalid", f.isValid());
        }

        public testSimpleRuleViolation() {
            let f : org.kafsemo.futoshiki.Futoshiki = new org.kafsemo.futoshiki.Futoshiki();
            f.set(1, 1, 1);
            f.set(2, 1, 2);
            org.junit.Assert.assertTrue(f.isValid());
            f.addGtRule(1, 1, 2, 1);
            org.junit.Assert.assertFalse("1 < 2 is invalid", f.isValid());
        }

        public duplicateNumbersInColumnAreNotValid() {
            let f : org.kafsemo.futoshiki.Futoshiki = new org.kafsemo.futoshiki.Futoshiki(2);
            f.set(1, 1, 1);
            f.set(1, 2, 1);
            org.junit.Assert.assertFalse(f.isValid());
        }

        public testNoRuleViolationWithoutNumbers() {
            let f : org.kafsemo.futoshiki.Futoshiki = new org.kafsemo.futoshiki.Futoshiki();
            f.addGtRule(1, 1, 2, 1);
            org.junit.Assert.assertTrue("No rule violation with blank numbers", f.isValid());
            f.set(1, 1, 2);
            org.junit.Assert.assertTrue("No rule violation with blank numbers", f.isValid());
            f.set(2, 1, 1);
            org.junit.Assert.assertTrue("No rule violation with 2 > 1", f.isValid());
            f.set(2, 1, 3);
            org.junit.Assert.assertFalse("Rule violation with 2 < 3", f.isValid());
        }

        public testClone() {
            let f : org.kafsemo.futoshiki.Futoshiki = new org.kafsemo.futoshiki.Futoshiki();
            f.set(1, 1, 1);
            f.set(2, 1, 2);
            let f2 : org.kafsemo.futoshiki.Futoshiki = /* clone */((o:any) => { if(o.clone!=undefined) { return (<any>o).clone(); } else { let clone = Object.create(o); for(let p in o) { if (o.hasOwnProperty(p)) clone[p] = o[p]; } return clone; } })(f);
            org.junit.Assert.assertNotNull(f2);
            org.junit.Assert.assertEquals(1, f.get(1, 1));
            org.junit.Assert.assertEquals(2, f.get(2, 1));
            f2.set(1, 1, 3);
            org.junit.Assert.assertEquals(3, f2.get(1, 1));
            org.junit.Assert.assertEquals(1, f.get(1, 1));
        }

        public testCloneRules() {
            let f : org.kafsemo.futoshiki.Futoshiki = new org.kafsemo.futoshiki.Futoshiki();
            f.set(1, 1, 1);
            f.set(2, 1, 2);
            f.addGtRule(1, 1, 2, 1);
            let f2 : org.kafsemo.futoshiki.Futoshiki = /* clone */((o:any) => { if(o.clone!=undefined) { return (<any>o).clone(); } else { let clone = Object.create(o); for(let p in o) { if (o.hasOwnProperty(p)) clone[p] = o[p]; } return clone; } })(f);
            org.junit.Assert.assertFalse("Rules should also be cloned", f2.isValid());
        }

        public testFullSampleIsValid() {
            let f : org.kafsemo.futoshiki.Futoshiki = new org.kafsemo.futoshiki.Futoshiki();
            let sample : number[][] = [[5, 1, 4, 3, 2], [3, 2, 5, 1, 4], [4, 5, 3, 2, 1], [2, 4, 1, 5, 3], [1, 3, 2, 4, 5]];
            for(let row : number = 1; row <= 5; row++) {{
                for(let column : number = 1; column <= 5; column++) {{
                    f.set(column, row, sample[row - 1][column - 1]);
                    org.junit.Assert.assertTrue(f.isValid());
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
            org.junit.Assert.assertTrue(f.isValid());
        }

        public testBlankCells() {
            let f : org.kafsemo.futoshiki.Futoshiki = new org.kafsemo.futoshiki.Futoshiki();
            let blank : java.util.Collection<org.kafsemo.futoshiki.CellPos> = f.blankCells();
            org.junit.Assert.assertEquals(25, blank.size());
        }

        public onlyBlankCellsIncluded() {
            let f : org.kafsemo.futoshiki.Futoshiki = new org.kafsemo.futoshiki.Futoshiki();
            f.set(1, 1, 1);
            let blank : java.util.Collection<org.kafsemo.futoshiki.CellPos> = f.blankCells();
            org.junit.Assert.assertEquals(24, blank.size());
            org.junit.Assert.assertFalse(blank.contains(new org.kafsemo.futoshiki.CellPos(1, 1)));
        }

        public testClear() {
            let f : org.kafsemo.futoshiki.Futoshiki = new org.kafsemo.futoshiki.Futoshiki();
            org.junit.Assert.assertEquals(0, f.get(1, 1));
            f.set(1, 1, 5);
            org.junit.Assert.assertEquals(5, f.get(1, 1));
            f.clear(1, 1);
            org.junit.Assert.assertEquals(0, f.get(1, 1));
        }

        /*private*/ static gather(rules : java.lang.Iterable<any>) : java.util.List<org.kafsemo.futoshiki.GtRule> {
            let c : java.util.List<org.kafsemo.futoshiki.GtRule> = <any>(new java.util.ArrayList<org.kafsemo.futoshiki.GtRule>());
            for(let index121=rules.iterator();index121.hasNext();) {
                let r = index121.next();
                {
                    c.add(r);
                }
            }
            return c;
        }

        public testSettingRulesOverwritesExistingRules() {
            let f : org.kafsemo.futoshiki.Futoshiki = new org.kafsemo.futoshiki.Futoshiki();
            f.addGtRule(1, 1, 2, 1);
            let r : java.util.List<org.kafsemo.futoshiki.GtRule>;
            r = TestFutoshiki.gather(f.getRules());
            org.junit.Assert.assertEquals(1, r.size());
            f.addGtRule(1, 1, 2, 1);
            r = TestFutoshiki.gather(f.getRules());
            org.junit.Assert.assertEquals("A duplicate rule should have no effect", 1, r.size());
            f.addGtRule(2, 1, 1, 1);
            r = TestFutoshiki.gather(f.getRules());
            org.junit.Assert.assertEquals("A rule in the same position should replace the previous one", 1, r.size());
            let gtr : org.kafsemo.futoshiki.GtRule = r.get(0);
            org.junit.Assert.assertEquals(2, gtr.getGreaterColumn());
            org.junit.Assert.assertEquals(1, gtr.getGreaterRow());
            org.junit.Assert.assertEquals(1, gtr.getLesserColumn());
            org.junit.Assert.assertEquals(1, gtr.getLesserRow());
        }

        public unableToRemoveFromRuleIterator() {
            new org.kafsemo.futoshiki.Futoshiki().getRules().iterator().remove();
        }

        public testGetRuleByPosition() {
            let f : org.kafsemo.futoshiki.Futoshiki = new org.kafsemo.futoshiki.Futoshiki();
            f.addGtRule(1, 1, 2, 1);
            let r : org.kafsemo.futoshiki.GtRule = f.getRule(new org.kafsemo.futoshiki.GtRule(1, 1, 2, 1).getCanonPosForm());
            org.junit.Assert.assertNotNull(r);
            let expected : org.kafsemo.futoshiki.GtRule = new org.kafsemo.futoshiki.GtRule(1, 1, 2, 1);
            org.junit.Assert.assertEquals(expected, r);
        }

        public getRuleReturnsNullWhenNoRule() {
            let f : org.kafsemo.futoshiki.Futoshiki = new org.kafsemo.futoshiki.Futoshiki(2);
            let r : org.kafsemo.futoshiki.GtRule = new org.kafsemo.futoshiki.GtRule(1, 1, 2, 1);
            org.junit.Assert.assertNull(f.getRule(r));
        }

        public testRemoveRule() {
            let f : org.kafsemo.futoshiki.Futoshiki = new org.kafsemo.futoshiki.Futoshiki();
            f.addGtRule(1, 1, 2, 1);
            f.removeRule(new org.kafsemo.futoshiki.GtRule(1, 1, 2, 1).getCanonPosForm());
            org.junit.Assert.assertFalse("Deleting a single rule should leave no rules", f.getRules().iterator().hasNext());
        }

        public testSizeDefaultsToFive() {
            let f : org.kafsemo.futoshiki.Futoshiki = new org.kafsemo.futoshiki.Futoshiki();
            org.junit.Assert.assertEquals("A default puzzle is 5 square", 5, f.getLength());
        }

        public testFutoshikiSizeMustBePositive() {
            new org.kafsemo.futoshiki.Futoshiki(0);
        }

        public testFutoshikiSizeMustNotExceedNumberOfDigits() {
            new org.kafsemo.futoshiki.Futoshiki(10);
        }

        public testFutoshikiWithSizeOneBehaves() {
            let f : org.kafsemo.futoshiki.Futoshiki = new org.kafsemo.futoshiki.Futoshiki(1);
            org.junit.Assert.assertEquals(1, f.getLength());
            org.junit.Assert.assertEquals(0, f.get(1, 1));
            f.set(1, 1, 1);
            org.junit.Assert.assertEquals(1, f.get(1, 1));
        }

        public futoshikiWithSizeOneRespectsBounds() {
            let f : org.kafsemo.futoshiki.Futoshiki = new org.kafsemo.futoshiki.Futoshiki(1);
            f.set(2, 1, 1);
        }

        public futoshikiWithSizeOneRejectsTooLargeNumbers() {
            let f : org.kafsemo.futoshiki.Futoshiki = new org.kafsemo.futoshiki.Futoshiki(1);
            f.set(1, 1, 2);
        }

        public futoshikiWithSizeOneRejectsTooSmallNumbers() {
            let f : org.kafsemo.futoshiki.Futoshiki = new org.kafsemo.futoshiki.Futoshiki(1);
            f.set(1, 1, -1);
        }

        public largeFutoshikiCanBeSet() {
            let f : org.kafsemo.futoshiki.Futoshiki = new org.kafsemo.futoshiki.Futoshiki(9);
            f.set(9, 9, 9);
            org.junit.Assert.assertEquals(9, f.get(9, 9));
        }

        public largeFutoshikiCanBeCloned() {
            let f : org.kafsemo.futoshiki.Futoshiki = new org.kafsemo.futoshiki.Futoshiki(9);
            f.set(9, 9, 9);
            f = /* clone */((o:any) => { if(o.clone!=undefined) { return (<any>o).clone(); } else { let clone = Object.create(o); for(let p in o) { if (o.hasOwnProperty(p)) clone[p] = o[p]; } return clone; } })(f);
            org.junit.Assert.assertEquals(9, f.get(9, 9));
            f.set(9, 9, 8);
            org.junit.Assert.assertEquals(8, f.get(9, 9));
        }

        public largeFutoshikiIsValid() {
            let f : org.kafsemo.futoshiki.Futoshiki = new org.kafsemo.futoshiki.Futoshiki(9);
            f.set(1, 1, 9);
            f.set(9, 1, 1);
            org.junit.Assert.assertTrue(f.isValid());
        }

        public puzzlesAreEqualIfSameSize() {
            let f1 : org.kafsemo.futoshiki.Futoshiki = new org.kafsemo.futoshiki.Futoshiki(1);
            org.junit.Assert.assertFalse(f1.equals(new org.kafsemo.futoshiki.Futoshiki(2)));
            org.junit.Assert.assertTrue(f1.equals(new org.kafsemo.futoshiki.Futoshiki(1)));
            org.junit.Assert.assertEquals(/* hashCode */(<any>((o: any) => { if(o.hashCode) { return o.hashCode(); } else { return o.toString().split('').reduce((prevHash, currVal) => (((prevHash << 5) - prevHash) + currVal.charCodeAt(0))|0, 0); }})(f1)), /* hashCode */(<any>((o: any) => { if(o.hashCode) { return o.hashCode(); } else { return o.toString().split('').reduce((prevHash, currVal) => (((prevHash << 5) - prevHash) + currVal.charCodeAt(0))|0, 0); }})(new org.kafsemo.futoshiki.Futoshiki(1))));
        }

        public puzzlesAreEqualIfInSameState() {
            let f1 : org.kafsemo.futoshiki.Futoshiki = new org.kafsemo.futoshiki.Futoshiki(1);
            f1.set(1, 1, 1);
            org.junit.Assert.assertFalse(f1.equals(new org.kafsemo.futoshiki.Futoshiki(1)));
            let f2 : org.kafsemo.futoshiki.Futoshiki = new org.kafsemo.futoshiki.Futoshiki(1);
            f2.set(1, 1, 1);
            org.junit.Assert.assertTrue(f1.equals(f2));
        }

        public puzzlesAreEqualIfSameRule() {
            let f1 : org.kafsemo.futoshiki.Futoshiki = new org.kafsemo.futoshiki.Futoshiki(2);
            f1.addGtRule(1, 1, 2, 1);
            let f2 : org.kafsemo.futoshiki.Futoshiki = new org.kafsemo.futoshiki.Futoshiki(2);
            org.junit.Assert.assertFalse(f1.equals(f2));
            f2.addGtRule(1, 1, 2, 1);
            org.junit.Assert.assertTrue(f1.equals(f2));
            f2.removeRule(new org.kafsemo.futoshiki.GtRule(1, 1, 2, 1));
            org.junit.Assert.assertTrue(f2.equals(new org.kafsemo.futoshiki.Futoshiki(2)));
        }

        public puzzlesAreEqualIfSameMultipleRules() {
            let f1 : org.kafsemo.futoshiki.Futoshiki = new org.kafsemo.futoshiki.Futoshiki(2);
            f1.addGtRule(1, 1, 2, 1);
            f1.addGtRule(1, 1, 1, 2);
            f1.addGtRule(2, 2, 2, 1);
            f1.addGtRule(2, 2, 1, 2);
            let f2 : org.kafsemo.futoshiki.Futoshiki = new org.kafsemo.futoshiki.Futoshiki(2);
            org.junit.Assert.assertFalse(f1.equals(f2));
            f2.addGtRule(1, 1, 2, 1);
            org.junit.Assert.assertFalse(f1.equals(f2));
            f2.addGtRule(1, 1, 1, 2);
            org.junit.Assert.assertFalse(f1.equals(f2));
            f2.addGtRule(2, 2, 2, 1);
            org.junit.Assert.assertFalse(f1.equals(f2));
            f2.addGtRule(2, 2, 1, 2);
            org.junit.Assert.assertTrue("Puzzles are equal when all rules match", f1.equals(f2));
        }

        public puzzlesAreNotEqualToNull() {
            org.junit.Assert.assertFalse(new org.kafsemo.futoshiki.Futoshiki().equals(null));
        }

        public ruleIteratorReflectsChangedRules() {
            let f : org.kafsemo.futoshiki.Futoshiki = new org.kafsemo.futoshiki.Futoshiki();
            let o : any = f.getRules();
            f.addGtRule(1, 1, 2, 1);
            org.junit.Assert.assertNotSame(o, f.getRules());
        }

        public rulesAddedToCloneAreImmediatelyReturned() {
            let f : org.kafsemo.futoshiki.Futoshiki = new org.kafsemo.futoshiki.Futoshiki();
            f.addGtRule(1, 1, 2, 1);
            f = /* clone */((o:any) => { if(o.clone!=undefined) { return (<any>o).clone(); } else { let clone = Object.create(o); for(let p in o) { if (o.hasOwnProperty(p)) clone[p] = o[p]; } return clone; } })(f);
            f.addGtRule(2, 1, 3, 1);
            org.junit.Assert.assertEquals(2, TestFutoshiki.gather(f.getRules()).size());
        }

        public ruleIteratorIsCurrentAfterValidityCheck() {
            let f : org.kafsemo.futoshiki.Futoshiki = new org.kafsemo.futoshiki.Futoshiki();
            f.getRules();
            f.addGtRule(1, 1, 2, 1);
            f.isValid();
            org.junit.Assert.assertEquals(1, TestFutoshiki.gather(f.getRules()).size());
        }
    }
    TestFutoshiki["__class"] = "org.kafsemo.futoshiki.TestFutoshiki";

}

