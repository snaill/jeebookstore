/*
 * Jeebook store 1.0
 * Copyright(c) 2008, Jeebook.com
 * snaill@jeebook.com
 * 
 * http://www.jeebook.com
 */

Ext.app.Navigatebar = function() {

	Ext.app.Navigatebar.superclass.constructor.call(this, {
		id : 'Navigatebar_Id',
		items : [' ', new Ext.form.Label({ text : 'Jeebook Store' }), ' ', ' ',
			{
				xtype: 'textfield',
				hideLabel: true,	
				emptyText: Ext.app.Resource.EmptyText.LoginMail,
				name:'email',
				width:150
			}, new Ext.Button({
				text : Ext.app.Resource.Button.Login,
				handler : this.onLogin,
				scope :	this
			}), ' ',
			new Ext.StatusBar({
				id: 'Statusbar_Id',
				defaultText: ''
			}),'->',{
				id:"btn_mainSite",
				text: Ext.app.Resource.Toolbar.MainSite,
				handler: this.onMainSite,
				scope:this
			}, '-', 
			{
				id:"btn_blogSite",
				text:Ext.app.Resource.Toolbar.BlogSite,
				handler: this.onBlogSite,
				scope:this
			}, '-', 
			{
				id:"btn_help",
				text:Ext.app.Resource.Toolbar.Help,
				handler: this.onHelp,
				scope:this
			}, ' '],
		keys: [{    
			key:Ext.EventObject.ENTER,   
			fn: this.onLogin,   
			scope:this
		}] 
	});
};

Ext.extend(Ext.app.Navigatebar, Ext.Toolbar, {
	onMainSite : function()	{
		window.location='http://www.jeebook.com';
	},
	onBlogSite : function()	{
		window.location='http://www.jeebook.com/blog';				
	},
	onHelp : function()	{
	},
	setStatus : function( success, msg ) {
		var s = Ext.getCmp('Statusbar_Id');
		var cls = success ? 'x-status-success' : 'x-status-error';
		s.setStatus({
			text:msg, 
			iconCls:cls,
			clear: true
        });
	},
	onLogin : function() {
		var form = this.getForm();
		if(form.isValid()){
			form.submit({
				url: './ashx/login.ashx',
				waitMsg: Ext.app.Resource.WaitMsg.Login,
				success: function(sender, o){
					this.updateState( o.result.data );
					this.setStatus( true, 'Login success!' );
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

Ext.app.Navigatebar.getObj = function() {
	return Ext.getCmp('Navigatebar_Id');
}

Ext.app.UserState = null;