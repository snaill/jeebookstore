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
    id:'bottom-panel',
    layout:'fit',
    height: 250,
    split: true,
    border:false,
    hidden:true,
    region:'south'
  });
};

Ext.extend(Ext.app.ContentPanel, Ext.Panel, {
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
    if ( panelName == "AddDir" )
      comp = this.add(new Ext.app.AddDirPanel());
    else if ( panelName == "AddFile" )
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