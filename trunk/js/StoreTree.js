/*
 * Jeebook store 1.0
 * Copyright(c) 2008, Jeebook.com
 * snaill@jeebook.com
 * 
 * http://www.jeebook.com
 */

Ext.app.StoreTree = function() {
	
	Ext.app.StoreTree.superclass.constructor.call(this, {
		id			: 'StoreTree_Id',
		title       : 'Folders',
		region      : 'west',
		split       : true,
		useArrows	: true,
        animate		: true,
		width       : 200,
		collapsible : true,
		margins     : '3 0 3 3',
		cmargins    : '3 3 3 3',
		autoScroll 	: true,
		loader		: new Ext.app.StoreTreeLoader({
       		clearOnLoad:false
       	}),
		root 		: new Ext.tree.AsyncTreeNode({
			id:'root',
			text:'Store'
		})
	});

	this.root.expand();
};

Ext.extend(Ext.app.StoreTree, Ext.tree.TreePanel, {
	getPath : function( node ) {
		var p = node.getPath() + '/';
		// delete /root
		return p.substring( 5 );
	},
	getCurrentPath : function(){
		var node = this.getSelectionModel().getSelectedNode();
		if ( !node )
			node = this.root;
		return this.getPath( node );
	},
	refresh : function(){
		var node = this.getSelectionModel().getSelectedNode();
		if ( !node )
			node = this.root;
		node.reload();
	}
} );

Ext.app.StoreTree.getObj = function(){
	return Ext.getCmp('StoreTree_Id');
};