// ==========================================================================
// Project:   NestedRecordsTest
// Copyright: @2011 My Company, Inc.
// ==========================================================================
/*globals NestedRecordsTest */

/** @namespace

  My cool new app.  Describe your application.
  
  @extends SC.Object
*/
NestedRecordsTest = SC.Application.create(
  /** @scope NestedRecordsTest.prototype */ {

  NAMESPACE: 'NestedRecordsTest',
  VERSION: '0.1.0',

  // This is your application store.  You will use this store to access all
  // of your model data.  You can also set a data source on this store to
  // connect to a backend server.  The default setup below connects the store
  // to any fixtures you define.
  store: SC.Store.create().from(SC.Record.fixtures),
  
  // TODO: Add global constants or singleton objects needed by your app here.

	getParent: function(){
		return NestedRecordsTest.store.find(NestedRecordsTest.Parent).objectAt(0);
	},
	
	createChild: function(){
		var newChild = NestedRecordsTest.store.createRecord(NestedRecordsTest.Child, {
			childName: 'Child' + jQuery.uuid++,
			grandChildren: this.createGrandChildren(3)
		});
		newChild.set('guid', SC.guidFor(newChild));
		return newChild;
	},
	
	createChildren: function(count){
		var newChildrenArray = [];
		for(var i = 0; i < count; i++){
			newChildrenArray.pushObject(this.createChild());
		}
		return newChildrenArray;
	},
	
	createGrandChild: function(){
		var newGrandChild = NestedRecordsTest.store.createRecord(NestedRecordsTest.Grandchild, {
			grandChildName: 'GrandChild' + jQuery.uuid++,
			greatGrandChildren: this.createGreatGrandChildren(3)
		});
		newGrandChild.set('guid', SC.guidFor(newGrandChild));
		return newGrandChild;
	},
	
	createGrandChildren: function(count){
		var newGrandChildrenArray = [];
		for(var i = 0; i < count; i++){
			newGrandChildrenArray.pushObject(this.createGrandChild());
		}
		return newGrandChildrenArray;	
	},
	
	createGreatGrandChild: function(){
		var newGreatGrandChild = NestedRecordsTest.store.createRecord(NestedRecordsTest.GreatGrandchild, {
			greatGrandChildName: 'GreatGrandChild' + jQuery.uuid++
		});
	},
	
	createGreatGrandChildren: function(count){
		var newGreatGrandChildrenArray = [];
		for(var i = 0; i < count; i++){
			newGreatGrandChildrenArray.pushObject(this.createGreatGrandChild());
		}
		return newGreatGrandChildrenArray;	
	},
	
	getChildren: function(){
		return this.getParent().get('testChildren');
	},
	
	getGrandChildren: function(){
		return this.getChildren().get('grandChildren');
	},
	
	getGreatGrandChildren: function(){
		return this.getGrandChild().get('greatGrandChildren');
	}

}) ;
