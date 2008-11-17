/*
 * Jeebook store 1.0
 * Copyright(c) 2008, Jeebook.com
 * snaill@jeebook.com
 * 
 * http://www.jeebook.com
 */

Ext.app.AddDirPanel = function() {

	var title = 'Add folder to '+ Ext.getCmp('StoreTree_Id').getCurrentPath();
	Ext.app.AddDirPanel.superclass.constructor.call(this, {
		id : 'AddDirPanel_Id',
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
            xtype: 'textfield',
            fieldLabel: 'Name'
        }],
        buttons: [{
            text: 'Add',
            handler: function(){
				var form = Ext.getCmp('AddDirPanel_Id').getForm();
                if(form.isValid()){
	                form.submit({
	                    url: './ashx/addfolder.ashx',
	                    waitMsg: 'Creating new folder...',
	                    success: function(fp, o){
	                        msg('Success', 'Processed file "'+o.result.file+'" on the server');
	                    }
	                });
                }
            }
        },{
            text: 'Reset',
            handler: function(){
				var form = Ext.getCmp('AddDirPanel_Id').getForm();
                form.reset();
            }
        }]
    });
};

Ext.extend(Ext.app.AddDirPanel, Ext.FormPanel, {} );