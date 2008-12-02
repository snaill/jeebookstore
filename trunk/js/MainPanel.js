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
		id 		  : 'MainPanel_Id',
		region    : 'center',
		margins   : '3 3 3 0', 
		layout    : 'border',
		defaults  : {
			autoScroll : true
		},
		tbar:new Ext.Toolbar([new Ext.Action({
			id:"btn_addDir",
			text: Ext.app.Resource.Toolbar.AddDir,
			disabled : true,
			tooltip: {title:'Add folder',text:'Add sub folder to current path.'},
			//    iconCls: 'tabs',
	//		pressed : true,
			enableToggle : true,
			handler: this.onAddDir,
			scope:this
		}), '-', 
		new Ext.Action({
			id:"btn_addFile",
			text:'Add Document',
			disabled : true,			
			tooltip: {title:'Add Document',text:'Upload document to current folder.'},
	//		pressed : true,
			//    iconCls: 'tabs',
			enableToggle : true,
			handler: this.onAddFile,
			scope:this
		})]),
		items   : [this.grid, 
				  new Ext.app.ContentPanel()
		]
	});
};

Ext.extend(Ext.app.MainPanel, Ext.Panel, {
	updateToolButton : function( o, action ){
		if ( o.disabled != null )	{
			action.setDisabled(o.disabled);
		}
	},
	updateToolbar : function( o ){
		if ( o.addDir != null )	{
			this.updateToolButton( o.addDir, Ext.getCmp('btn_addDir') ); 
		}
		
		if ( o.addFile != null )	{
			this.updateToolButton( o.addFile, Ext.getCmp('btn_addFile') ); 
		}
	},
	onAddDir : function(item){
		var bot = Ext.getCmp('ContentPanel_Id');
		bot.showPanel( "AddDir", Ext.getCmp('btn_addDir') );
	},
	onAddFile : function(item){
		var bot = Ext.getCmp('ContentPanel_Id');
		bot.showPanel( "AddFile", Ext.getCmp('btn_addFile') );
	}
});

Ext.app.MainPanel.getObj = function(){
	return Ext.getCmp('MainPanel_Id');
};
