/*
 * Jeebook store 1.0
 * Copyright(c) 2008, Jeebook.com
 * snaill@jeebook.com
 * 
 * http://www.jeebook.com
 */

Ext.app.StorePanel = function() {

	this.tree = new Ext.app.StoreTree();
	this.main = new Ext.app.MainPanel();
	Ext.app.StorePanel.superclass.constructor.call(this, {
		height   : 450,
		autoWidth : true,
		//  autoHeight : true,
		plain    : true,
		layout   : 'border',
		items    : [this.tree, this.main]
	});


    this.tree.on('click', this.onSelectTreeNode, this );
	this.onSelectTreeNode( this.tree.root );
};

Ext.extend(Ext.app.StorePanel, Ext.Panel, {
	onSelectTreeNode : function( node )	{
		this.main.grid.load( node.getPath() );
	}
} );

Ext.BLANK_IMAGE_URL = '../extjs/resources/images/default/s.gif';

Ext.onReady(function(){

	Ext.QuickTips.init();
	Ext.state.Manager.setProvider( new Ext.state.SessionProvider( { state: Ext.appState } ) );
			
	var msgpanel = new Ext.app.MessagePanel();
	msgpanel.render('msgbox');

	var panel = new Ext.app.StorePanel();
	panel.render('view');
});