/*
 * Jeebook store 1.0
 * Copyright(c) 2008, Jeebook.com
 * snaill@jeebook.com
 * 
 * http://www.jeebook.com
 */

Ext.app.StorePanel = function() {

  Ext.app.StorePanel.superclass.constructor.call(this, {
    height   : 450,
    autoWidth : true,
  //  autoHeight : true,
    plain    : true,
    layout   : 'border',
    items    : [new Ext.app.StoreTree, new Ext.app.MainPanel()]
  });
};

Ext.extend(Ext.app.StorePanel, Ext.Panel, {} );

Ext.BLANK_IMAGE_URL = '../../extjs/resources/images/default/s.gif';

Ext.onReady(function(){

  Ext.QuickTips.init();
  Ext.state.Manager.setProvider( new Ext.state.SessionProvider( { state: Ext.appState } ) );
            
  var msgpanel = new Ext.app.MessagePanel();
  msgpanel.render('msgbox');
  
  var panel = new Ext.app.StorePanel();
  panel.render('view');
});