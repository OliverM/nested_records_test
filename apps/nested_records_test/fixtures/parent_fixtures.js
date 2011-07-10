// ==========================================================================
// Project:   NestedRecordsTest.Parent Fixtures
// Copyright: @2011 My Company, Inc.
// ==========================================================================
/*globals NestedRecordsTest */

sc_require('models/parent_model');

NestedRecordsTest.Parent.FIXTURES = [
	{
	parentName: 'ParentA', 
	testChildren: [{
		childName: 'KidA', 
		guid: 1, 
		grandChildren: [{
			grandChildName: 'grandChildA', 
			guid: 11, 
			greatGrandChildren: [{
				greatGrandChildName: 'greatGrandChildA', 
				guid: 111}]
			}]
		}] 
	}
];


// var testParentA = store.createRecord(NestedRecordsTest.Parent, {
// 	parentName: 'ParentA', testChildren: 
// 	[{childName: 'KidA', guid: 1, grandChildren:
// 		[{grandChildName: 'grandChildA', guid: 11, greatGrandChildren:
// 			[{greatGrandChildName: 'greatGrandChildA', guid: 111}] 
// 			}]
// 		}]
// 	});
