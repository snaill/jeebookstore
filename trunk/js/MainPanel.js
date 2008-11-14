/*
 * Jeebook store 1.0
 * Copyright(c) 2008, Jeebook.com
 * snaill@jeebook.com
 * 
 * http://www.jeebook.com
 */

Ext.app.MainPanel = function() {
	  
	// create the Grid
	this.grid = new Ext.app.StoreGrid();

	Ext.app.MainPanel.superclass.constructor.call(this, {
		region    : 'center',
		margins   : '3 3 3 0', 
		layout    : 'border',
		defaults  : {
			autoScroll : true
		},
		tbar:new Ext.Toolbar([{
			id:"btn_addDir",
			text:'���Ŀ¼',
			tooltip: {title:'���Ŀ¼',text:'�ڵ�ǰĿ¼�������Ŀ¼'},
			//    iconCls: 'tabs',
			pressed : true,
			enableToggle : true,
			handler: this.onAddDir,
			scope:this
		}, '-', 
		{
			id:"btn_addFile",
			text:'����ļ�',
			tooltip: {title:'����ļ�',text:'�ϴ��ļ�����ǰĿ¼'},
			pressed : true,
			//    iconCls: 'tabs',
			enableToggle : true,
			handler: this.onAddFile,
			scope:this
		}]),
		items   : [this.grid, 
				  new Ext.app.ContentPanel()
		]
	});
};

Ext.extend(Ext.app.MainPanel, Ext.Panel, {
	onAddDir : function(item){
		var bot = Ext.getCmp('bottom-panel');
		bot.showPanel( "AddDir", Ext.getCmp('btn_addDir') );
		
		var msg = Ext.getCmp('message-panel');
		msg.showMessage("add dir success!");
	},
	onAddFile : function(item){
		var bot = Ext.getCmp('bottom-panel');
		bot.showPanel( "AddFile", Ext.getCmp('btn_addFile') );
	}
});