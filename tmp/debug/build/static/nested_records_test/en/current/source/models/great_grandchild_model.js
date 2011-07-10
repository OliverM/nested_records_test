// ==========================================================================
// Project:   NestedRecordsTest.GreatGrandchild
// Copyright: @2011 My Company, Inc.
// ==========================================================================
/*globals NestedRecordsTest */

/** @class

  (Document your Model here)

  @extends SC.Record
  @version 0.1
*/
NestedRecordsTest.GreatGrandchild = SC.Record.extend(
/** @scope NestedRecordsTest.GreatGrandchild.prototype */ {

  greatGrandChildName: SC.Record.attr(String)

}) ;

; if ((typeof SC !== 'undefined') && SC && SC.Module && SC.Module.scriptDidLoad) SC.Module.scriptDidLoad('nested_records_test');