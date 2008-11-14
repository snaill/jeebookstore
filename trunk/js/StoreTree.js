/*
 * Jeebook store 1.0
 * Copyright(c) 2008, Jeebook.com
 * snaill@jeebook.com
 * 
 * http://www.jeebook.com
 */

Ext.app.StoreTree = function() {
	
	Ext.app.StoreTree.superclass.constructor.call(this, {
		title       : 'Folders',
		region      : 'west',
		split       : true,
		width       : 200,
		collapsible : true,
		margins     : '3 0 3 3',
		cmargins    : '3 3 3 3',
		loader		: new Ext.app.StoreTreeLoader({
       		clearOnLoad:false
       	}),
		root 		: new Ext.tree.AsyncTreeNode({
			id:'root',
			text:'Store',
			attributes : 'root/dirs.xml'	 
		})
	});
};

Ext.extend(Ext.app.StoreTree, Ext.tree.TreePanel, {} );