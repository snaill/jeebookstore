/*
 * Jeebook store 1.0
 * Copyright(c) 2008, Jeebook.com
 * snaill@jeebook.com
 * 
 * http://www.jeebook.com
 */

Ext.app.StorePanel = function() {

  Ext.app.StorePanel.superclass.constructor.call(this, {
    width    : 600,
    height   : 350,
 //    renderTo: 'view',
    plain    : true,
    layout   : 'border',
    items    : [new Ext.app.StoreTree, new Ext.app.MainPanel()]
  });
};

Ext.extend(Ext.app.StorePanel, Ext.Panel, {} );

Ext.onReady(function(){

  Ext.QuickTips.init();
  Ext.state.Manager.setProvider( new Ext.state.SessionProvider( { state: Ext.appState } ) );
            
  var panel = new Ext.app.StorePanel();
  panel.render('view');
});