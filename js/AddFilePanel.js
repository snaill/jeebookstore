/*
 * Jeebook store 1.0
 * Copyright(c) 2008, Jeebook.com
 * snaill@jeebook.com
 * 
 * http://www.jeebook.com
 */

Ext.app.AddFilePanel = function() {

	var path = Ext.app.StoreTree.getObj().getCurrentPath();
	var title = 'Upload document to '+ path;
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
            xtype: 'hidden',
			hidden  : true,
			name : 'Path',
			value : path
        },{
            xtype: 'textfield',
            fieldLabel: 'Name',
			name : 'Name',
        },{
            xtype: 'fileuploadfield',
            emptyText: 'Select a document',
            fieldLabel: 'Document',
			name:'File',
            buttonCfg: {
                text: '',
                iconCls: 'upload-icon'
            }
        },{
            xtype: 'textarea',
            hideLabel: true,
            name: 'msg',
            anchor: '100% -53'  // anchor width by percentage and height by raw adjustment
        }],
        buttons		: [{
            text: 'Upload',
            handler: function(){
				var form = Ext.getCmp('AddFilePanel_Id').getForm();
                if(form.isValid()){
	                form.submit({
	                    url: './ashx/addFile.ashx',
	                    waitMsg: 'Uploading your document...',
	                    success: function(sender, o){
							Ext.app.StoreGrid.getObj().refresh();
	                    //    msg('Success', 'Processed file "'+o.result.file+'" on the server');
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