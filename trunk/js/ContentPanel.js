/*
 * Jeebook store 1.0
 * Copyright(c) 2008, Jeebook.com
 * snaill@jeebook.com
 * 
 * http://www.jeebook.com
 */

Ext.app.ContentPanel = function() {
  
	this.compId = "";
	this.panelName = "";
	this.actionButton = null;

	Ext.app.ContentPanel.superclass.constructor.call(this, {
		id:'ContentPanel_Id',
		layout:'fit',
		height: 250,
		split: true,
		border:false,
		hidden:true,
		region:'south'
	});
};

Ext.extend(Ext.app.ContentPanel, Ext.Panel, {
	clear : function()	{
		// clear old state
		this.remove(this.compId);

		this.compId = null;
		this.panelName = "";

		if ( this.actionButton != null )
		{
			this.actionButton.toggle( false );
			this.actionButton = null;
		}
		
		this.hide();
		this.ownerCt.doLayout();
	},
	showPanel : function( panelName, actionButton ) {
		// clear old state
		this.remove(this.compId);
		if ( this.panelName == panelName )
		{
			this.compId = null;
			this.panelName = "";
			this.actionButton = null;

			this.hide();
			this.ownerCt.doLayout();
			return;
		}
		else if ( this.actionButton != null )
		{
			this.actionButton.toggle( false );
		}

		// create new panel
		var comp = null;
		if ( panelName == 'AddFolder' )
			comp = this.add(new Ext.app.AddFolderPanel());
		else if ( panelName == 'AddFile' )
			comp = this.add(new Ext.app.AddFilePanel());
		else if ( panelName == 'Rename' )
			comp = this.add(new Ext.app.AddFilePanel());
		else if ( panelName == 'Delete' )
			comp = this.add(new Ext.app.AddFilePanel());
		
		else
		{
			this.panelName = "";
			return;
		}

		//
		this.compId = comp.id;
		this.panelName = panelName;
		this.actionButton = actionButton;

		//
		this.show();
		this.ownerCt.doLayout();
	}
});

Ext.app.ContentPanel.getObj = function(){
	return Ext.getCmp('ContentPanel_Id');
};