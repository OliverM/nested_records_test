// ==========================================================================
// Project:   NestedRecordsTest.Child
// Copyright: @2011 My Company, Inc.
// ==========================================================================
/*globals NestedRecordsTest */

/** @class

  (Document your Model here)

  @extends SC.Record
  @version 0.1
*/
NestedRecordsTest.Child = SC.Record.extend(
/** @scope NestedRecordsTest.Child.prototype */ {

  childName: SC.Record.attr(String),
	grandChildren: SC.Record.toMany('NestedRecordsTest.Grandchild', {isNested:YES})

}) ;
