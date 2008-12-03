/*
 * Jeebook store 1.0
 * Copyright(c) 2008, Jeebook.com
 * snaill@jeebook.com
 * 
 * http://www.jeebook.com
 */

Ext.app.Navigatebar = function() {
	
	var html = '<div style=\"text-align:left;float:left\">Store|<a href=\"#\">Blog</a></div>' +
			'<div style=\"text-align:right\"><a href=\"#\">Return</a>|<a href=\"#\">Help</a></div>';
		
	Ext.app.Navigatebar.superclass.constructor.call(this, {
//		id : 'Navigatebar_Id',
//		height   : 400,
			defaults: {
		bodyStyle:'padding:15px 20px'
	},
		margins : '15, 0, 0, 15',
		html: html,
		autoWidth : true,
		plain    : true
	});
};

Ext.extend(Ext.app.Navigatebar, Ext.Panel, {} );

