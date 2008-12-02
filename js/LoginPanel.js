/*
 * Jeebook store 1.0
 * Copyright(c) 2008, Jeebook.com
 * snaill@jeebook.com
 * 
 * http://www.jeebook.com
 */

Ext.app.LoginPanel = function() {
	Ext.app.LoginPanel.superclass.constructor.call(this, {
		id:'LoginPanel_Id',
		layout:'table',
		border:false,
		autoheight:true,
		layoutConfig: {
			columns: 2
		},
/* 		initialConfig :{
			reader : new Ext.data.JsonReader()
		}, */
		items:[{
			xtype: 'textfield',
            hideLabel: true,
            emptyText: 'Input your e-mail for login',
			name:'email',
			width:200
		}, new Ext.Button({
			text : 'Login',
			handler : this.onLogin,
			scope :	this
		})]
	});
};

Ext.extend(Ext.app.LoginPanel, Ext.FormPanel, {
	onLogin : function() {
		var form = this.getForm();
			if(form.isValid()){
				form.submit({
					url: './ashx/login.ashx',
					waitMsg: 'Login ...',
					success: function(sender, o){
						Ext.app.MainPanel.getObj().updateToolbar( o.result.data );
					}
				});
			}
	}
});