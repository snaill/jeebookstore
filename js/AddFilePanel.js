/*
 * Jeebook store 1.0
 * Copyright(c) 2008, Jeebook.com
 * snaill@jeebook.com
 * 
 * http://www.jeebook.com
 */

Ext.app.AddFilePanel = function() {

	var title = 'Upload document to '+ Ext.getCmp('StoreTree_Id').getCurrentPath();
	Ext.app.AddFilePanel.superclass.constructor.call(this, {
		id 			: 'AddFilePanel_Id',
        title		: title,
        fileUpload	: true,
        frame		: true,
        bodyStyle	: 'padding: 10px 10px 0 10px;',
        labelWidth	: 60,
        defaults	: {
            anchor: '95%',
            allowBlank: false,
            msgTarget: 'side'
        },
        items		: [{
            xtype: 'textfield',
            fieldLabel: 'Name'
        },{
            xtype: 'fileuploadfield',
            emptyText: 'Select a document',
            fieldLabel: 'Document',
            buttonCfg: {
                text: '',
                iconCls: 'upload-icon'
            }
        }],
        buttons		: [{
            text: 'Upload',
            handler: function(){
				var form = Ext.getCmp('AddFilePanel_Id').getForm();
                if(form.isValid()){
	                form.submit({
	                    url: './ashx/adddoc.ashx',
	                    waitMsg: 'Uploading your document...',
	                    success: function(sender, o){
	                        msg('Success', 'Processed file "'+o.result.file+'" on the server');
	                    }
	                });
                }
            }
        },{
            text: 'Reset',
            handler: function(){
				var form = Ext.getCmp('AddFilePanel_Id').getForm();
                form.reset();
            }
        }]
    });
};

Ext.extend(Ext.app.AddFilePanel, Ext.FormPanel, {} );