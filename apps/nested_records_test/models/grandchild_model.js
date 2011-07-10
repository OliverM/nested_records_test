// ==========================================================================
// Project:   NestedRecordsTest.Grandchild
// Copyright: @2011 My Company, Inc.
// ==========================================================================
/*globals NestedRecordsTest */

/** @class

  (Document your Model here)

  @extends SC.Record
  @version 0.1
*/
NestedRecordsTest.Grandchild = SC.Record.extend(
/** @scope NestedRecordsTest.Grandchild.prototype */ {

  grandchildName: SC.Record.attr(String),
	greatGrandChildren: SC.Record.toMany('NestedRecordsTest.GreatGrandchild', {isNested:YES})
  

}) ;
