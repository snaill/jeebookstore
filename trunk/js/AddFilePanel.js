/*
 * Jeebook store 1.0
 * Copyright(c) 2008, Jeebook.com
 * snaill@jeebook.com
 * 
 * http://www.jeebook.com
 */

Ext.app.AddFilePanel = function() {

  Ext.app.AddFilePanel.superclass.constructor.call(this, {
        title: 'File Upload Form',
        fileUpload: true,
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
        },{
            xtype: 'fileuploadfield',
            id: 'form-file',
            emptyText: 'Select an image',
            fieldLabel: 'Photo',
            name: 'photo-path',
            buttonCfg: {
                text: '',
                iconCls: 'upload-icon'
            }
        }],
        buttons: [{
            text: 'Save',
            handler: function(){
                if(fp.getForm().isValid()){
	                fp.getForm().submit({
	                    url: 'file-upload.php',
	                    waitMsg: 'Uploading your photo...',
	                    success: function(fp, o){
	                        msg('Success', 'Processed file "'+o.result.file+'" on the server');
	                    }
	                });
                }
            }
        },{
            text: 'Reset',
            handler: function(){
                fp.getForm().reset();
            }
        }]
    });
};

Ext.extend(Ext.app.AddFilePanel, Ext.FormPanel, {} );