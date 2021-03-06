/**
 * Nested Record Array Multiple pushObject() Unit Test 
 *
 * @author Oliver Mooney
 */

/*globals NestedRecordsTest */


var NestedRecordsTest, store, testParent, ChildRecordA, ChildRecordB, GrandchildRecordA, GrandchildRecordB, GreatGrandchildRecordA,
		GreatGrandchildRecordB, ChildDictionaryC, ChildDictionaryD, GrandchildDictionaryC, GrandchildDictionaryD, GreatGrandchildDictionaryC,
		GreatGrandchildDictionaryD;

module("Complex SC.Record: Parent > Array of Children > Array of Grandchildren > Array of Greatgrandchildren", {
	setup: function(){
		
		NestedRecordsTest = SC.Object.create({
			store: SC.Store.create()
		});

		window.NestedRecordsTest = NestedRecordsTest;
		store = NestedRecordsTest.store;

		// nested record hierarchy 

		NestedRecordsTest.Parent = SC.Record.extend({
			nestedRecordNamespace: NestedRecordsTest,
			parentName: SC.Record.attr(String),
			children: SC.Record.toMany('NestedRecordsTest.Child', {isNested:YES})
		}) ;

		NestedRecordsTest.Child = SC.Record.extend({
			nestedRecordNamespace: NestedRecordsTest,
		  childName: SC.Record.attr(String),
			grandChildren: SC.Record.toMany('NestedRecordsTest.Grandchild', {isNested:YES})

		}) ;

		NestedRecordsTest.Grandchild = SC.Record.extend({
			nestedRecordNamespace: NestedRecordsTest,
		  grandchildName: SC.Record.attr(String),
			greatGrandChildren: SC.Record.toMany('NestedRecordsTest.GreatGrandchild', {isNested:YES})
		}) ;

		NestedRecordsTest.GreatGrandchild = SC.Record.extend({
			nestedRecordNamespace: NestedRecordsTest,
		  greatGrandchildName: SC.Record.attr(String)
		}) ;
		
		// create sample records
		SC.RunLoop.begin();
		testParent = store.createRecord(NestedRecordsTest.Parent, {
			parentName: 'Parent1',
			children: [
			{type: 'Child', childName:'Child1', grandChildren: [
				{type: 'Grandchild', grandchildName: 'Grandchild1', greatGrandChildren: [
					{type: 'GreatGrandchild', greatGrandchildName: 'GreatGrandchild1'}]
				}]
			}]
		});
		
		ChildRecordA = store.createRecord(NestedRecordsTest.Child, {
			childName: 'ChildA', grandChildren: [
				{type: 'Grandchild', grandchildName: 'GrandchildA', greatGrandChildren: [
					{type: 'GreatGrandchild', greatGrandchildName: 'GreatGrandchildA'}]
				}]
			});
		
		ChildRecordB = store.createRecord(NestedRecordsTest.Child, {
			childName: 'ChildB', grandChildren: [
				{type: 'Grandchild', grandchildName: 'GrandchildB', greatGrandChildren: [
					{type: 'GreatGrandchild', greatGrandchildName: 'GreatGrandchildB'}]
				}]
		});
		
		GrandchildRecordA = store.createRecord(NestedRecordsTest.Grandchild, {
			grandchildName: 'GrandchildM', greatGrandChildren: [
				{type: 'GreatGrandchild', greatGrandchildName: 'GreatGrandchildM'}
			]
		});
		
		GrandchildRecordB = store.createRecord(NestedRecordsTest.Grandchild, {
			grandchildName: 'GrandchildN', greatGrandChildren: [
				{type: 'GreatGrandchild', greatGrandchildName: 'GreatGrandchildN'}
			]
		});
		
		GreatGrandchildRecordA = store.createRecord(NestedRecordsTest.GreatGrandchild, {
			greatGrandchildName: 'GreatGrandchildS'
		});
		
		GreatGrandchildRecordB = store.createRecord(NestedRecordsTest.GreatGrandchild, {
			greatGrandchildName: 'GreatGrandchildT'
		});
		
		
		// mirror sample nested records with dictionaries
		ChildDictionaryC = {
			type: 'Child', 
			childName: 'ChildC', 
			grandChildren: [
				{type: 'Grandchild', grandchildName: 'GrandchildC', greatGrandChildren: [
					{type: 'GreatGrandchild', greatGrandchildName: 'GreatGrandchildC'}]
				}]
			};
		
		ChildDictionaryD = {
			type: 'Child', 
			childName: 'ChildD', 
			grandChildren: [
				{type: 'Grandchild', grandchildName: 'GrandchildD', greatGrandChildren: [
					{type: 'GreatGrandchild', greatGrandchildName: 'GreatGrandchildD'}]
				}]
			};
	
		GrandchildDictionaryC = {
			type: 'Grandchild',
			grandchildName: 'GrandchildM', greatGrandChildren: [
				{type: 'GreatGrandchild', greatGrandchildName: 'GreatGrandchildM'}
			]
		};

		GrandchildDictionaryD = {
			type: 'Grandchild',
			grandchildName: 'GrandchildN', 
			greatGrandChildren: [
				{type: 'GreatGrandchild', greatGrandchildName: 'GreatGrandchildN'}
			]
		};

		GreatGrandchildDictionaryC = {
			type: 'GreatGrandchild',
			greatGrandchildName: 'GreatGrandchildS'
		};

		GreatGrandchildDictionaryD = {
			type: 'GreatGrandchild',
			greatGrandchildName: 'GreatGrandchildT'
		};

		SC.RunLoop.end();
	},
	
	teardown: function(){
		delete NestedRecordsTest.Parent;
    delete NestedRecordsTest.Child;
    delete NestedRecordsTest.Grandchild;
    delete NestedRecordsTest.GreatGrandchild;
    delete window.NestedRecordsTest;
    NestedRecordsTest = null;
    testParent = null;
    ChildRecordA = null;
    ChildRecordB = null;
    store = null;
	}
});

test("Push created great-grandchild records to a grandchild's array of great-grandchildren", function(){
	var tPGreatGrandChildren = testParent.get('children').objectAt(0).get('grandChildren').objectAt(0).get('greatGrandChildren');
	tPGreatGrandChildren.pushObject(GreatGrandchildRecordA);
	equals(tPGreatGrandChildren.get('length'), 2, "Pushing the first great-grandhild record onto the grandchild's great-grandchildren gives a great-grandchildren length of 2.");

	tPGreatGrandChildren.pushObject(GreatGrandchildRecordB);
	equals(tPGreatGrandChildren.get('length'), 3, "Pushing the second great-grandhild record onto the grandchild's great-grandchildren gives a great-grandchildren length of 3.");
	
});

test("Push created grandchild records to a child's array of grandchildren", function(){
	var tPGrandChildren = testParent.get('children').objectAt(0).get('grandChildren');
	tPGrandChildren.pushObject(GrandchildRecordA);
	equals(tPGrandChildren.get('length'), 2, "Pushing the first grandchild record onto the child's grandchildren gives a grandchildren length of 2.");

	tPGrandChildren.pushObject(GrandchildRecordB);
	equals(tPGrandChildren.get('length'), 3, "Pushing the second grandchild record onto the child's grandchildren gives a grandchildren length of 3.");

});

test("Push created child records to a parent record's array of children", function(){
	var tPChildren = testParent.get('children');
	tPChildren.pushObject(ChildRecordA);
	equals(tPChildren.get('length'), 2, "Pushing the first child record onto the parent's children gives a children length of 2.");

	tPChildren.pushObject(ChildRecordB); // FAILS in full app with a stack blowout - OM 100711
	equals(tPChildren.get('length'), 3, "Pushing the second child record onto the parent's children gives a children length of 3.");
	
});



test("Push great-grandchild dictionaries to a grandchild's array of great-grandchildren", function(){
	var tPGreatGrandChildren = testParent.get('children').objectAt(0).get('grandChildren').objectAt(0).get('greatGrandChildren');
	tPGreatGrandChildren.pushObject(GreatGrandchildDictionaryC);
	equals(tPGreatGrandChildren.get('length'), 2, "Pushing the first great-grandchild dictionary onto the grandchild's great-grandchildren gives a grandchildren length of 2.");

	tPGreatGrandChildren.pushObject(GreatGrandchildDictionaryD);
	equals(tPGreatGrandChildren.get('length'), 3, "Pushing the second great-grandchild dictionary onto the grandchild's great-grandchildren gives a grandchildren length of 3.");

});

test("Push grandchild dictionaries to a child's array of grandchildren", function(){
	var tPGrandChildren = testParent.get('children').objectAt(0).get('grandChildren');
	tPGrandChildren.pushObject(GrandchildDictionaryC);
	equals(tPGrandChildren.get('length'), 2, "Pushing the first grandchild dictionary onto the child's grandchildren gives a grandchildren length of 2.");

	tPGrandChildren.pushObject(GrandchildDictionaryD);
	equals(tPGrandChildren.get('length'), 3, "Pushing the second grandchild dictionary onto the child's grandchildren gives a grandchildren length of 3.");

});

test("Push child dictionaries to a parent record's array of children", function(){
	var tPChildren = testParent.get('children');
	tPChildren.pushObject(ChildDictionaryC);
	equals(tPChildren.get('length'), 2, "Pushing the first child dictionary onto the parent's children gives a children length of 2.");

	tPChildren.pushObject(ChildDictionaryD); 
	equals(tPChildren.get('length'), 3, "Pushing the second child dictionary onto the parent's children gives a children length of 3.");
	
});


