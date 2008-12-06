/*
 * Jeebook Store 1.0
 * Copyright(c) 2008, Jeebook.com
 * snaill@jeebook.com
 * 
 * http://www.jeebook.com
 */

Ext.app.AddFolderPanel = function() {

	var path = Ext.app.StoreTree.getObj().getCurrentPath();
	var title = 'Add folder to '+ path;
	Ext.app.AddFolderPanel.superclass.constructor.call(this, {
		id : 'AddFolderPanel_Id',
		title: title,
        frame: true,
        bodyStyle: 'padding: 10px 10px 0 10px;',
        labelWidth: 50,
        defaults: {
            anchor: '95%',
            allowBlank: false,
            msgTarget: 'side'
        },
        items: [{
            xtype: 'hidden',
			hidden  : true,
			name : 'Path',
			value : path
        },{
            xtype: 'textfield',
            fieldLabel: 'Name',
			name : 'Name'
        }],
        buttons: [{
            text: 'Create',
            handler: function(){
				var form = Ext.getCmp('AddFolderPanel_Id').getForm();
                if(form.isValid()){
	                form.submit({
	                    url: './ashx/addfolder.ashx',
	                    waitMsg: 'Creating new folder...',
	                    success: function(sender, o){
							Ext.app.StoreTree.getObj().refresh();
	                    }
	                });
                }
            }
        },{
            text: 'Reset',
            handler: function(){
				var form = Ext.getCmp('AddFolderPanel_Id').getForm();
                form.reset();
            }
        }]
    });
};

Ext.extend(Ext.app.AddFolderPanel, Ext.FormPanel, {} );