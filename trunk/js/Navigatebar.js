/*
 * Jeebook store 1.0
 * Copyright(c) 2008, Jeebook.com
 * snaill@jeebook.com
 * 
 * http://www.jeebook.com
 */

Ext.app.Navigatebar = function() {

	Ext.app.Navigatebar.superclass.constructor.call(this, {
		items : [' ', new Ext.form.Label({ text : 'Jeebook Store' }), '->',
				{
					id:"btn_addDir",
					text: Ext.app.Resource.Toolbar.AddDir,
					handler: this.onAddDir,
					scope:this
				}, '-', 
				{
					id:"btn_addFile",
					text:'Add Document',
					handler: this.onAddFile,
					scope:this
				}, ' ']
	});
};

Ext.extend(Ext.app.Navigatebar, Ext.Toolbar, {} );

