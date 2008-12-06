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
			id:"btn_addFolder",
			text: Ext.app.Resource.Toolbar.AddFolder,
			disabled : true,
			tooltip: {title:'Add folder',text:'Add sub folder to current path.'},
			enableToggle : true,
			handler: this.onAddDir,
			scope:this
		}), '-', 
		new Ext.Action({
			id:"btn_addFile",
			text:'Add Document',
			disabled : true,			
			tooltip: {title:'Add Document',text:'Upload document to current folder.'},
			enableToggle : true,
			handler: this.onAddFile,
			scope:this
		}), '-',
		new Ext.Action({
			id:'btn_rename',
			text:'Rename',
			disabled : true,			
			tooltip: {title:'Add Document',text:'Upload document to current folder.'},
			enableToggle : true,
			handler: this.onAddFile,
			scope:this
		}), '-',
		new Ext.Action({
			id:'btn_delete',
			text:'Delete',
			disabled : true,			
			tooltip: {title:'Add Document',text:'Upload document to current folder.'},
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
		if ( o.addFolder != null )	{
			this.updateToolButton( o.addFolder, Ext.getCmp('btn_addFolder') ); 
		}
		
		if ( o.addFile != null )	{
			this.updateToolButton( o.addFile, Ext.getCmp('btn_addFile') ); 
		}
				
		if ( o.rename != null )	{
			this.updateToolButton( o.rename, Ext.getCmp('btn_rename') ); 
		}
		
		if ( o.delete != null )	{
			this.updateToolButton( o.delete, Ext.getCmp('btn_delete') ); 
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
