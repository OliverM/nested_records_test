// ==========================================================================
// Project:   NestedRecordsTest.Parent Unit Test
// Copyright: @2011 My Company, Inc.
// ==========================================================================
/*globals NestedRecordsTest module test ok equals same stop start */

module("NestedRecordsTest.Parent");

// TODO: Replace with real unit test for Parent
test("test description", function() {
  var expected = "test";
  var result   = "test";
  equals(result, expected, "test should equal test");
});

// following all worked as they should:
// store = NestedRecordsTest.store
// var testParentA = store.createRecord(NestedRecordsTest.Parent, {
// 	parentName: 'ParentA', testChildren: 
// 	[{childName: 'KidA', guid: 1, grandChildren:
// 		[{grandChildName: 'grandChildA', guid: 11, greatGrandChildren:
// 			[{greatGrandChildName: 'greatGrandChildA', guid: 111}] 
// 			}]
// 		}]
// 	});

// testChildB = store.createRecord(NestedRecordsTest.Child, {childName: 'KidB', guid:2})
// testParentA.get('testChildren').pushObject(testChildB)
// testParentA.toString() // gave expected result of testChildren array of two children
// testChildB = store.createRecord(NestedRecordsTest.Child, {childName: 'KidC', guid:3})
// testParentA.get('testChildren').pushObject(testChildC)
// testParentA.toString() // gave expected result of three children. It's not them, it's me.