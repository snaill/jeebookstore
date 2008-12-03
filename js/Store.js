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
		//  autoHeight : true,
		plain    : true,
		layout   : 'border',
/* 		bbar: new Ext.StatusBar({
            id: 'Statusbar_Id',
            defaultText: 'Ready'
        }), */
		items    : [this.tree, this.main]
	});


    this.tree.on('click', this.onSelectTreeNode, this );
	this.onSelectTreeNode( this.tree.root );
};

Ext.extend(Ext.app.StorePanel, Ext.Panel, {
	onSelectTreeNode : function( node )	{
		this.main.grid.load( node.getPath() );
	},
	getStatusbar : function() {
		return Ext.getCmp('Statusbar_Id');
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
	
	/*var headerDom = document.getElementsByTagName('head').item(0);  
    var jsDom = document.createElement('script');  
    jsDom.type = 'text/javascript';  
    jsDom.scr = 'lang/' + pack;  
    headerDom.appendChild(jsDom);   */

//	new Ext.app.MessagePanel().render('msgbox');
	new Ext.StatusBar({
        id: 'Statusbar_Id',
		hidden : true,
        defaultText: 'Ready'
    }).render('msgbox');

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