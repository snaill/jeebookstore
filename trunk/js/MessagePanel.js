/*
 * Jeebook store 1.0
 * Copyright(c) 2008, Jeebook.com
 * snaill@jeebook.com
 * 
 * http://www.jeebook.com
 */

function onTimer(){
  var msg = Ext.getCmp("message-panel");
  msg.onTimer();
};

Ext.app.MessagePanel = function() {
 
  this.label = new Ext.form.Label();
  this.sec = 0;
  Ext.app.MessagePanel.superclass.constructor.call(this, {
    id:'message-panel',
    width:300,
    height:30,
    split: true,
    border:false
  });
  
  this.add( this.label );
};

Ext.extend(Ext.app.MessagePanel, Ext.Panel, {
  showMessage : function( msg, err, sec ) {
    if ( msg == null || msg == "" )
      return;
    
    if ( err == null )
      err = false;
    
    if ( sec == null )
      sec = 3000;

    this.label.setText( msg );
    setTimeout( function(){ onTimer(); }, sec );
  },
  onTimer : function() {
    this.label.setText("");
  }
});