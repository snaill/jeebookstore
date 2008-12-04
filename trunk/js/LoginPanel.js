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
		items:[{
			xtype: 'textfield',
            hideLabel: true,
            emptyText: Ext.app.Resource.EmptyText.LoginMail,
			name:'email',
			width:200
		}, new Ext.Button({
			text : Ext.app.Resource.Button.Login,
			handler : this.onLogin,
			scope :	this
		})],
		keys: [{    
			key:Ext.EventObject.ENTER,   
			fn: this.onLogin,   
			scope:this
		}] 
	});
};

Ext.extend(Ext.app.LoginPanel, Ext.FormPanel, {
	onLogin : function() {
		var form = this.getForm();
			if(form.isValid()){
				form.submit({
					url: './ashx/login.ashx',
					waitMsg: Ext.app.Resource.WaitMsg.Login,
					success: function(sender, o){
						this.updateState( o.result.data );
						Ext.app.Navigatebar.getObj().setStatus( true, 'Login success!' );
					},
					failure : function(sender, o) {
						Ext.app.StorePanel.getStatusbar().setStatus({
                            text:'Login failure!', 
                            iconCls:'',
                            clear: true
                        });						
					},
					scope : this
				});
			}
	},
	updateState : function( o )	{
		Ext.app.UserState = o;
		Ext.app.MainPanel.getObj().updateToolbar( o );
	}
});

Ext.app.UserState = null;