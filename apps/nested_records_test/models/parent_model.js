// ==========================================================================
// Project:   NestedRecordsTest.Parent
// Copyright: @2011 My Company, Inc.
// ==========================================================================
/*globals NestedRecordsTest */

/** @class

  (Document your Model here)

  @extends SC.Record
  @version 0.1
*/
NestedRecordsTest.Parent = SC.Record.extend(
/** @scope NestedRecordsTest.Parent.prototype */ {

	parentName: SC.Record.attr(String),
	testChildren: SC.Record.toMany('NestedRecordsTest.Child', {isNested:YES})

}) ;
