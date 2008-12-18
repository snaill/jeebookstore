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
		region : 'north',	
		items : [' ', new Ext.form.Label({ text : 'Jeebook Store' }), ' ', ' ',
			{
				id : 'LoginMail_Id',
				xtype: 'textfield',
				hideLabel: true,	
				emptyText: Ext.app.Resource.EmptyText.LoginMail,
				width:150
			}, new Ext.Button({
				text : Ext.app.Resource.Button.Login,
				handler : this.onLogin,
				scope :	this
			}), ' ',
			new Ext.StatusBar({
				id: 'Statusbar_Id',
				defaultText: 'Use guest@jeebook.com to login'
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
	handleResponse : function(response)	{
		var o = Ext.decode( response.responseText );
		this.updateState( o.data );
		this.setStatus( true, 'Login success!' );
	},
	handleFailure : function(response)	{
		this.setStatus({
			text:'Login failure!', 
			iconCls:'',
			clear: true
		});						
	},	
	onLogin : function() {
		var url = './ashx/login.ashx?user=' + Ext.getCmp('LoginMail_Id').getValue() + '&psw=';
		this.transId = Ext.Ajax.request({
			url: url,
			success: this.handleResponse,
			failure: this.handleFailure,
			scope: this
		});
	},
	updateState : function( o )	{
		Ext.app.UserState = o;
		Ext.app.MainPanel.getObj().updateToolbar( o );
	}
});

Ext.app.Navigatebar.getObj = function() {
	return Ext.getCmp('Navigatebar_Id');
}
