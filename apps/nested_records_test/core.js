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
	},
	
	// series of tests displaying the issue
	runTests: function(){ // includes my utility record creation fns defined above, which is where the problem lies.
		
		// name the objects of interest
		var parent = NestedRecordsTest.store.find(NestedRecordsTest.Parent).objectAt(0);
		var children = parent.get('testChildren');
		var grandChildren = children.objectAt(0).get('grandChildren');
		
		console.log('Test adding objects with one level of nesting to collection of an object with two levels of nesting.');
		console.log('Pushing three grandchildren...');
		grandChildren.pushObject(NestedRecordsTest.createGrandChild());
		grandChildren.pushObject(NestedRecordsTest.createGrandChild());
		grandChildren.pushObject(NestedRecordsTest.createGrandChild());
		console.log('Total number of grandchildren should be 4. Actual number: %@'.fmt(grandChildren.get('length')));
		
		console.log('Test adding objects with two level of nesting to collection of an object with three levels of nesting.');
		console.log('Pushing three children...');
		children.pushObject(NestedRecordsTest.createChild());
		children.pushObject(NestedRecordsTest.createChild()); // fails
		children.pushObject(NestedRecordsTest.createChild()); // fails
		console.log('Total number of children should be 4. Actual number: %@'.fmt(grandChildren.get('length')));
	},
	
	runCreatedTests:function(){		
		// name the objects of interest
		var parent = NestedRecordsTest.store.createRecord(NestedRecordsTest.Parent, {parentName:'createdParent', testChildren:[]});
		
		var children = parent.get('testChildren');
		children.pushObject(NestedRecordsTest.store.createRecord(NestedRecordsTest.Child, {childName:'createdChild', grandChildren:[]}));
		
		var grandChildren = children.objectAt(0).get('grandChildren');
		grandChildren.pushObject(NestedRecordsTest.store.createRecord(NestedRecordsTest.Grandchild, {grandchildName:'createdGrandchild', greatGrandChildren:[]}));
		
		console.log('Test adding objects with one level of nesting to collection of an object with two levels of nesting.');
		console.log('Pushing three grandchildren...');
		grandChildren.pushObject(NestedRecordsTest.createGrandChild());
		grandChildren.pushObject(NestedRecordsTest.createGrandChild());
		grandChildren.pushObject(NestedRecordsTest.createGrandChild());
		console.log('Total number of grandchildren should be 4. Actual number: %@'.fmt(grandChildren.get('length')));
		
		console.log('Test adding objects with two level of nesting to collection of an object with three levels of nesting.');
		console.log('Pushing three children...');
		children.pushObject(NestedRecordsTest.createChild());
		children.pushObject(NestedRecordsTest.createChild()); // passes
		children.pushObject(NestedRecordsTest.createChild()); // passes
		console.log('Total number of children should be 4. Actual number: %@'.fmt(grandChildren.get('length')));
	}
	
}) ;

// //create parent
// parent2 = NestedRecordsTest.store.createRecord(NestedRecordsTest.Parent, {parentName:'ParentB', testChildren: []})
// 
// //add several children to parent
// parent2.get('testChildren').pushObject(NestedRecordsTest.store.createRecord(NestedRecordsTest.Child, {childName:'ChildB', grandChildren:[]}))
// parent2.get('testChildren').pushObject(NestedRecordsTest.store.createRecord(NestedRecordsTest.Child, {childName:'ChildC', grandChildren:[]}))
// parent2.get('testChildren').pushObject(NestedRecordsTest.store.createRecord(NestedRecordsTest.Child, {childName:'ChildD', grandChildren:[]}))
// parent2.get('testChildren').pushObject(NestedRecordsTest.store.createRecord(NestedRecordsTest.Child, {childName:'ChildE', grandChildren:[]}))
// 
// // add grandchildren to the third child
// parent2.get('testChildren').objectAt(2).get('grandChildren').pushObject(NestedRecordsTest.store.createRecord(NestedRecordsTest.Grandchild, {grandchildName:'GrandchildC', greatGrandChildren:[]}))
// parent2.get('testChildren').objectAt(2).get('grandChildren').pushObject(NestedRecordsTest.store.createRecord(NestedRecordsTest.Grandchild, {grandchildName:'GrandchildD', greatGrandChildren:[]}))
// parent2.get('testChildren').objectAt(2).get('grandChildren').pushObject(NestedRecordsTest.store.createRecord(NestedRecordsTest.Grandchild, {grandchildName:'GrandchildE', greatGrandChildren:[]}))
// parent2.get('testChildren').objectAt(2).get('grandChildren').pushObject(NestedRecordsTest.store.createRecord(NestedRecordsTest.Grandchild, {grandchildName:'GrandchildF', greatGrandChildren:[]}))
// 
// //check number of third child's grandchildren = 4
// parent2.get('testChildren').objectAt(2).get('grandChildren').get('length')
// 
// //add great-grandchildren to the third child's third grandchild
// parent2.get('testChildren').objectAt(2).get('grandChildren').objectAt(2).get('greatGrandChildren').pushObject(NestedRecordsTest.store.createRecord(NestedRecordsTest.GreatGrandchild,{greatGrandchildName: 'Great-grandchildB'}))
// parent2.get('testChildren').objectAt(2).get('grandChildren').objectAt(2).get('greatGrandChildren').pushObject(NestedRecordsTest.store.createRecord(NestedRecordsTest.GreatGrandchild,{greatGrandchildName: 'Great-grandchildC'}))
// parent2.get('testChildren').objectAt(2).get('grandChildren').objectAt(2).get('greatGrandChildren').pushObject(NestedRecordsTest.store.createRecord(NestedRecordsTest.GreatGrandchild,{greatGrandchildName: 'Great-grandchildD'}))
// 
// // add grandchildren to the fourth child
// parent2.get('testChildren').objectAt(3).get('grandChildren').pushObject(NestedRecordsTest.store.createRecord(NestedRecordsTest.Grandchild, {grandchildName:'GrandchildG', greatGrandChildren:[]}))
// parent2.get('testChildren').objectAt(3).get('grandChildren').pushObject(NestedRecordsTest.store.createRecord(NestedRecordsTest.Grandchild, {grandchildName:'GrandchildH', greatGrandChildren:[]}))
// parent2.get('testChildren').objectAt(3).get('grandChildren').pushObject(NestedRecordsTest.store.createRecord(NestedRecordsTest.Grandchild, {grandchildName:'GrandchildI', greatGrandChildren:[]}))
// parent2.get('testChildren').objectAt(3).get('grandChildren').pushObject(NestedRecordsTest.store.createRecord(NestedRecordsTest.Grandchild, {grandchildName:'GrandchildJ', greatGrandChildren:[]}))
// 
// //add great-grandchildren to the fourth child's third grandchild
// parent2.get('testChildren').objectAt(3).get('grandChildren').objectAt(2).get('greatGrandChildren').pushObject(NestedRecordsTest.store.createRecord(NestedRecordsTest.GreatGrandchild,{greatGrandchildName: 'Great-grandchildE'}))
// parent2.get('testChildren').objectAt(3).get('grandChildren').objectAt(2).get('greatGrandChildren').pushObject(NestedRecordsTest.store.createRecord(NestedRecordsTest.GreatGrandchild,{greatGrandchildName: 'Great-grandchildF'}))
// parent2.get('testChildren').objectAt(3).get('grandChildren').objectAt(2).get('greatGrandChildren').pushObject(NestedRecordsTest.store.createRecord(NestedRecordsTest.GreatGrandchild,{greatGrandchildName: 'Great-grandchildG'}))


//attempt to co-alesce the above into three function calls:

// create the parent (as previously)
// failParent = NestedRecordsTest.store.createRecord(NestedRecordsTest.Parent, {parentName:'failParent', testChildren: []})
// 
// // create the third child structure
// failChild1 = NestedRecordsTest.store.createRecord(NestedRecordsTest.Child, {childName:'failChildA', 
//   grandChildren:[
//     NestedRecordsTest.store.createRecord(NestedRecordsTest.Grandchild, {grandchildName:'failGrandchildA', greatGrandChildren:[]}), 
//     NestedRecordsTest.store.createRecord(NestedRecordsTest.Grandchild, {grandchildName:'failGrandchildB', greatGrandChildren:[]}), 
//     NestedRecordsTest.store.createRecord(NestedRecordsTest.Grandchild, {grandchildName:'failGrandchildC', greatGrandChildren:[
// 	    NestedRecordsTest.store.createRecord(NestedRecordsTest.GreatGrandchild,{greatGrandchildName: 'failGreat-grandchildA'}),
// 	    NestedRecordsTest.store.createRecord(NestedRecordsTest.GreatGrandchild,{greatGrandchildName: 'failGreat-grandchildB'}),
// 	    NestedRecordsTest.store.createRecord(NestedRecordsTest.GreatGrandchild,{greatGrandchildName: 'failGreat-grandchildC'})]}), 
//     NestedRecordsTest.store.createRecord(NestedRecordsTest.Grandchild, {grandchildName:'failGrandchildD', greatGrandChildren:[]})]})
// 
// // create the third child structure
// failChild2 = NestedRecordsTest.store.createRecord(NestedRecordsTest.Child, {childName:'failChildB', 
//   grandChildren:[
//     NestedRecordsTest.store.createRecord(NestedRecordsTest.Grandchild, {grandchildName:'failGrandchildE', greatGrandChildren:[]}), 
//     NestedRecordsTest.store.createRecord(NestedRecordsTest.Grandchild, {grandchildName:'failGrandchildF', greatGrandChildren:[]}), 
//     NestedRecordsTest.store.createRecord(NestedRecordsTest.Grandchild, {grandchildName:'failGrandchildG', greatGrandChildren:[
// 	    NestedRecordsTest.store.createRecord(NestedRecordsTest.GreatGrandchild,{greatGrandchildName: 'failGreat-grandchildD'}),
// 	    NestedRecordsTest.store.createRecord(NestedRecordsTest.GreatGrandchild,{greatGrandchildName: 'failGreat-grandchildE'}),
// 	    NestedRecordsTest.store.createRecord(NestedRecordsTest.GreatGrandchild,{greatGrandchildName: 'failGreat-grandchildF'})]}), 
//     NestedRecordsTest.store.createRecord(NestedRecordsTest.Grandchild, {grandchildName:'failGrandchildH', greatGrandChildren:[]})]})
// 
// failChild3 = NestedRecordsTest.store.createRecord(NestedRecordsTest.Child, {childName:'failChildC', 
//   grandChildren:[
//     NestedRecordsTest.store.createRecord(NestedRecordsTest.Grandchild, {grandchildName:'failGrandchildA', greatGrandChildren:[
// 	    NestedRecordsTest.store.createRecord(NestedRecordsTest.GreatGrandchild,{greatGrandchildName: 'failGreat-grandchildA'}),
// 	    NestedRecordsTest.store.createRecord(NestedRecordsTest.GreatGrandchild,{greatGrandchildName: 'failGreat-grandchildB'}),
// 	    NestedRecordsTest.store.createRecord(NestedRecordsTest.GreatGrandchild,{greatGrandchildName: 'failGreat-grandchildC'})]}), 
//     NestedRecordsTest.store.createRecord(NestedRecordsTest.Grandchild, {grandchildName:'failGrandchildB', greatGrandChildren:[]}), 
//     NestedRecordsTest.store.createRecord(NestedRecordsTest.Grandchild, {grandchildName:'failGrandchildC', greatGrandChildren:[]}), 
//     NestedRecordsTest.store.createRecord(NestedRecordsTest.Grandchild, {grandchildName:'failGrandchildD', greatGrandChildren:[]})]})
// 
// failChild4 = 	NestedRecordsTest.store.createRecord(NestedRecordsTest.Child, {childName:'failChildC', 
//   grandChildren:[
//     NestedRecordsTest.store.createRecord(NestedRecordsTest.Grandchild, {grandchildName:'failGrandchildA', greatGrandChildren:[
// 	    NestedRecordsTest.store.createRecord(NestedRecordsTest.GreatGrandchild,{greatGrandchildName: 'failGreat-grandchildA'}),
// 	    NestedRecordsTest.store.createRecord(NestedRecordsTest.GreatGrandchild,{greatGrandchildName: 'failGreat-grandchildB'}),
// 	    NestedRecordsTest.store.createRecord(NestedRecordsTest.GreatGrandchild,{greatGrandchildName: 'failGreat-grandchildC'})]}), 
//     NestedRecordsTest.store.createRecord(NestedRecordsTest.Grandchild, {grandchildName:'failGrandchildB', greatGrandChildren:[]}), 
//     NestedRecordsTest.store.createRecord(NestedRecordsTest.Grandchild, {grandchildName:'failGrandchildC', greatGrandChildren:[]}), 
//     NestedRecordsTest.store.createRecord(NestedRecordsTest.Grandchild, {grandchildName:'failGrandchildD', greatGrandChildren:[]})]})
// 
// 
// // attempt to pin down where in the record creation utility fns we're going wrong
// failChild5 = 	NestedRecordsTest.store.createRecord(NestedRecordsTest.Child, {childName:'failChildC', 
//   grandChildren:[
//     NestedRecordsTest.store.createRecord(NestedRecordsTest.Grandchild, {grandchildName:'failGrandchildA', greatGrandChildren:NestedRecordsTest.createGreatGrandChildren(3)}), 
//     NestedRecordsTest.store.createRecord(NestedRecordsTest.Grandchild, {grandchildName:'failGrandchildB', greatGrandChildren:[]}), 
//     NestedRecordsTest.store.createRecord(NestedRecordsTest.Grandchild, {grandchildName:'failGrandchildC', greatGrandChildren:[]}), 
//     NestedRecordsTest.store.createRecord(NestedRecordsTest.Grandchild, {grandchildName:'failGrandchildD', greatGrandChildren:[]})]})
// 
// failChild6 = 	NestedRecordsTest.store.createRecord(NestedRecordsTest.Child, {childName:'failChildC', 
//   grandChildren:[
//     NestedRecordsTest.store.createRecord(NestedRecordsTest.Grandchild, {grandchildName:'failGrandchildA', greatGrandChildren:NestedRecordsTest.createGreatGrandChildren(3)}), 
//     NestedRecordsTest.store.createRecord(NestedRecordsTest.Grandchild, {grandchildName:'failGrandchildB', greatGrandChildren:[]}), 
//     NestedRecordsTest.store.createRecord(NestedRecordsTest.Grandchild, {grandchildName:'failGrandchildC', greatGrandChildren:[]}), 
//     NestedRecordsTest.store.createRecord(NestedRecordsTest.Grandchild, {grandchildName:'failGrandchildD', greatGrandChildren:[]})]})
// 
// failChild7 = 	NestedRecordsTest.store.createRecord(NestedRecordsTest.Child, {childName:'failChildC', grandChildren:NestedRecordsTest.createGrandChildren(3)})
// 
// failChild8 = 	NestedRecordsTest.store.createRecord(NestedRecordsTest.Child, {childName:'failChildC', grandChildren:NestedRecordsTest.createGrandChildren(3)})
// 
// failChild9 = NestedRecordsTest.createChild()
// failChild10 = NestedRecordsTest.createChild()
