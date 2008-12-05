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
		items : [' ',
				new Ext.StatusBar({
					id: 'Statusbar_Id',
					defaultText: 'Jeebook Store'
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
				}, ' ']
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
	}
});

Ext.app.Navigatebar.getObj = function() {
	return Ext.getCmp('Navigatebar_Id');
}

