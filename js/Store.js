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
		id : 'StorePanel_Id',
		height   : 400,
		autoWidth : true,
		plain    : true,
		layout   : 'border',
		items    : [this.tree, this.main]
	});


    this.tree.on('click', this.onSelectTreeNode, this );
	this.onSelectTreeNode( this.tree.root );
};

Ext.extend(Ext.app.StorePanel, Ext.Panel, {
	onSelectTreeNode : function( node )	{
		this.main.grid.load( Ext.app.StoreTree.getObj().getPath(node) );
	}
} );

Ext.app.StorePanel.getObj = function() {
	return Ext.getCmp('StorePanel_Id');
};

Ext.BLANK_IMAGE_URL = '../extjs/resources/images/default/s.gif';
Ext.app.Resource = new Object();

Ext.onReady(function(){

	Ext.QuickTips.init();
	Ext.state.Manager.setProvider( new Ext.state.SessionProvider( { state: Ext.appState } ) );
	
 	var language;
	if (navigator.appName == 'Netscape')
		language = navigator.language;
	else
		language = navigator.browserLanguage;

	if (language.indexOf('zh') > -1) 
		Ext.app.Resource = Ext.app.zh_CN;
	else
		Ext.app.Resource = Ext.app.en_US; 

	new Ext.app.LoginPanel().render('loginbox');
	
	new Ext.app.Navigatebar().render('navbar');
	
	var panel = new Ext.app.StorePanel();
	panel.render('view');
	
	var resizer = new Ext.Resizable( panel.getEl(), {
		width:panel.width,
		height:panel.height,
		minHeight:200,
		handles: 's',
		heightIncrement:5,
		dynamic: true
	});
	resizer.on('resize', function(){
		panel.updateBox( panel.getSize() );
	});
});