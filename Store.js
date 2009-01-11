﻿
Ext.app.AddFilePanel=function(){Ext.app.AddFilePanel.superclass.constructor.call(this,{id:'AddFilePanel_Id',title:'AddFilePanel',fileUpload:true,frame:true,bodyStyle:'padding: 10px 10px 0 10px;',labelWidth:60,defaults:{anchor:'95%',allowBlank:false,msgTarget:'side'},items:[{id:'AddFilePanel_Path_Id',xtype:'hidden',hidden:true},{id:'AddFilePanel_Name_Id',xtype:'textfield',fieldLabel:'Name'},{xtype:'fileuploadfield',emptyText:'Select a document',fieldLabel:'Document',buttonCfg:{text:'',iconCls:'upload-icon'}},{xtype:'textarea',hideLabel:true,name:'remark',anchor:'100% -53'}],buttons:[{text:'Upload',handler:function(){var name=Ext.getCmp('AddFilePanel_Name_Id').getValue();var path=Ext.getCmp('AddFilePanel_Path_Id').getValue();var url='./ashx/addFile.ashx';var form=Ext.getCmp('AddFilePanel_Id').getForm();if(form.isValid()){form.submit({url:url,params:{name:name,path:path},method:'GET',waitMsg:'Uploading your document...',success:function(sender,o){Ext.app.StoreGrid.getObj().refresh();Ext.app.ContentPanel.getObj().clear();Ext.app.Navigatebar.getObj().setStatus(true,'Create folder success.');},failure:function(sender,o){Ext.app.Navigatebar.getObj().setStatus(false,Ext.app.Error.getMessage(o.result.fault));}});}}},{text:'Reset',handler:function(){var form=Ext.getCmp('AddFilePanel_Id').getForm();form.reset();}}]});this.updatePanel();};Ext.extend(Ext.app.AddFilePanel,Ext.FormPanel,{onNotify:function(event){if(event.id!=Ext.app.Event.FolderChanged)
return;this.updatePanel(event);},updatePanel:function(event){var path='';if(event!=null)
path=Ext.app.StoreTree.getObj().getPath(event.node);else
path=Ext.app.StoreTree.getObj().getCurrentPath();this.setTitle('Upload document to '+path);Ext.getCmp('AddFilePanel_Path_Id').setValue(path);}});
Ext.app.AddFolderPanel=function(){Ext.app.AddFolderPanel.superclass.constructor.call(this,{id:'AddFolderPanel_Id',title:'AddFolderPanel',frame:true,bodyStyle:'padding: 10px 10px 0 10px;',labelWidth:50,defaults:{anchor:'95%',allowBlank:false,msgTarget:'side'},items:[{id:'AddFolderPanel_Path_Id',xtype:'hidden',hidden:true},{id:'AddFolderPanel_Name_Id',xtype:'textfield',fieldLabel:'Name'}],buttons:[{text:'Create',handler:function(){var name=Ext.getCmp('AddFolderPanel_Name_Id').getValue();var path=Ext.getCmp('AddFolderPanel_Path_Id').getValue();var url='./ashx/addfolder.ashx';var form=Ext.getCmp('AddFolderPanel_Id').getForm();if(form.isValid()){form.submit({url:url,params:{name:name,path:path},method:'GET',waitMsg:'Creating new folder...',success:function(sender,o){Ext.app.StoreTree.getObj().refresh();Ext.app.ContentPanel.getObj().clear();Ext.app.Navigatebar.getObj().setStatus(true,'Create folder success.');},failure:function(sender,o){Ext.app.Navigatebar.getObj().setStatus(false,Ext.app.Error.getMessage(o.result.fault));}});}}},{text:'Reset',handler:function(){var form=Ext.getCmp('AddFolderPanel_Id').getForm();form.reset();}}]});this.updatePanel();};Ext.extend(Ext.app.AddFolderPanel,Ext.FormPanel,{onNotify:function(event){if(event.id!=Ext.app.Event.FolderChanged)
return;this.updatePanel(event);},updatePanel:function(event){var path='';if(event!=null)
path=Ext.app.StoreTree.getObj().getPath(event.node);else
path=Ext.app.StoreTree.getObj().getCurrentPath();this.setTitle('Add folder to '+path);Ext.getCmp('AddFolderPanel_Path_Id').setValue(path);}});
Ext.app.ContentPanel=function(){this.compId="";this.panel=null;this.actionButton=null;Ext.app.ContentPanel.superclass.constructor.call(this,{id:'ContentPanel_Id',layout:'fit',height:250,split:true,border:false,hidden:true,region:'south'});};Ext.extend(Ext.app.ContentPanel,Ext.Panel,{onNotify:function(event){if(this.panel!=null)
this.panel.onNotify(event);},clear:function(){this.remove(this.compId);this.compId=null;this.panel=null;if(this.actionButton!=null)
{this.actionButton.toggle(false);this.actionButton=null;}
this.hide();this.ownerCt.doLayout();},showPanel:function(panel,actionButton){this.remove(this.compId);if(this.panel!=null&&this.panel.id==panel.id)
{this.compId=null;this.panel=null;this.actionButton=null;this.hide();this.ownerCt.doLayout();return;}
else if(this.actionButton!=null)
{this.actionButton.toggle(false);}
var comp=null;if(panel==null)
{this.panel=null;return;}
comp=this.add(panel);this.compId=comp.id;this.panel=panel;this.actionButton=actionButton;this.show();this.ownerCt.doLayout();}});Ext.app.ContentPanel.getObj=function(){return Ext.getCmp('ContentPanel_Id');};
Ext.app.Error={};Ext.app.Error.CODE_UNKNOWN=0;Ext.app.Error.CODE_PARAMETER=1;Ext.app.Error.CODE_PATHNOTEXIST=2;Ext.app.Error.CODE_LOGINFAILED=3;Ext.app.Error.CODE_FOLDERISEXISTED=4;Ext.app.Error.CODE_FILEISEXISTED=5;Ext.app.Error.getMessage=function(o){switch(o.code)
{case Ext.app.Error.CODE_PARAMETER:return Ext.app.Resource.Error.Parameter;case Ext.app.Error.CODE_PATHNOTEXIST:return Ext.app.Resource.Error.PathNotExist;case Ext.app.Error.CODE_LOGINFAILED:return Ext.app.Resource.Error.LoginFailed;case Ext.app.Error.CODE_FOLDERISEXISTED:return Ext.app.Resource.Error.FolderIsExisted;case Ext.app.Error.CODE_FILEISEXISTED:return Ext.app.Resource.Error.FileIsExisted;default:return o.message;}};
Ext.app.Event={};Ext.app.Event.FolderChanged=1;Ext.app.Error.FileChanged=2;
Ext.form.FileUploadField=Ext.extend(Ext.form.TextField,{buttonText:'Browse...',buttonOnly:false,buttonOffset:3,readOnly:true,autoSize:Ext.emptyFn,initComponent:function(){Ext.form.FileUploadField.superclass.initComponent.call(this);this.addEvents('fileselected');},onRender:function(ct,position){Ext.form.FileUploadField.superclass.onRender.call(this,ct,position);this.wrap=this.el.wrap({cls:'x-form-field-wrap x-form-file-wrap'});this.el.addClass('x-form-file-text');this.el.dom.removeAttribute('name');this.fileInput=this.wrap.createChild({id:this.getFileInputId(),name:this.name||this.getId(),cls:'x-form-file',tag:'input',type:'file',size:1});var btnCfg=Ext.applyIf(this.buttonCfg||{},{text:this.buttonText});this.button=new Ext.Button(Ext.apply(btnCfg,{renderTo:this.wrap,cls:'x-form-file-btn'+(btnCfg.iconCls?' x-btn-icon':'')}));if(this.buttonOnly){this.el.hide();this.wrap.setWidth(this.button.getEl().getWidth());}
this.fileInput.on('change',function(){var v=this.fileInput.dom.value;this.setValue(v);this.fireEvent('fileselected',this,v);},this);},getFileInputId:function(){return this.id+'-file';},onResize:function(w,h){Ext.form.FileUploadField.superclass.onResize.call(this,w,h);this.wrap.setWidth(w);if(!this.buttonOnly){var w=this.wrap.getWidth()-this.button.getEl().getWidth()-this.buttonOffset;this.el.setWidth(w);}},preFocus:Ext.emptyFn,getResizeEl:function(){return this.wrap;},getPositionEl:function(){return this.wrap;},alignErrorIcon:function(){this.errorIcon.alignTo(this.wrap,'tl-tr',[2,0]);}});Ext.reg('fileuploadfield',Ext.form.FileUploadField);
Ext.app.MainPanel=function(){this.grid=new Ext.app.StoreGrid();Ext.app.MainPanel.superclass.constructor.call(this,{id:'MainPanel_Id',region:'center',margins:'3 3 3 0',layout:'border',defaults:{autoScroll:true},tbar:new Ext.Toolbar([new Ext.Action({id:'btn_addFolder',text:Ext.app.Resource.Toolbar.AddFolder,disabled:false,tooltip:{title:'Add folder',text:'Add sub folder to current path.'},enableToggle:true,handler:this.onAddFolder,scope:this}),'-',new Ext.Action({id:'btn_addFile',text:Ext.app.Resource.Toolbar.AddFile,disabled:false,tooltip:{title:'Add document',text:'Upload document to current folder.'},enableToggle:true,handler:this.onAddFile,scope:this}),'-',new Ext.Action({id:'btn_rename',text:Ext.app.Resource.Toolbar.Rename,disabled:true,tooltip:{title:'Rname',text:'Rname current folder or document.'},enableToggle:true,handler:this.onRename,scope:this}),'-',new Ext.Action({id:'btn_delete',text:Ext.app.Resource.Toolbar.Delete,disabled:true,tooltip:{title:'Delete',text:'Delete current folder or document.'},enableToggle:true,handler:this.onDelete,scope:this})]),items:[this.grid,new Ext.app.ContentPanel()]});};Ext.extend(Ext.app.MainPanel,Ext.Panel,{onNotify:function(event){Ext.app.ContentPanel.getObj().onNotify(event);},updateToolButton:function(o,action){if(o.disabled!=null){action.setDisabled(o.disabled);}},updateToolbar:function(o){if(o.addFolder!=null){this.updateToolButton(o.addFolder,Ext.getCmp('btn_addFolder'));}
if(o.addFile!=null){this.updateToolButton(o.addFile,Ext.getCmp('btn_addFile'));}
if(o.rename!=null){this.updateToolButton(o.rename,Ext.getCmp('btn_rename'));}},onAddFolder:function(item){Ext.app.ContentPanel.getObj().showPanel(new Ext.app.AddFolderPanel(),Ext.getCmp('btn_addFolder'));},onAddFile:function(item){Ext.app.ContentPanel.getObj().showPanel(new Ext.app.AddFilePanel(),Ext.getCmp('btn_addFile'));},onRename:function(){Ext.app.ContentPanel.getObj().showPanel(new Ext.app.AddFilePanel(),Ext.getCmp('btn_rename'));},onDelete:function(){Ext.app.ContentPanel.getObj().showPanel(new Ext.app.AddFilePanel(),Ext.getCmp('btn_delete'));}});Ext.app.MainPanel.getObj=function(){return Ext.getCmp('MainPanel_Id');};
Ext.app.Navigatebar=function(){Ext.app.Navigatebar.superclass.constructor.call(this,{id:'Navigatebar_Id',region:'north',style:'background:#FFFFFF',items:[' ',{id:"btn_mainSite",text:Ext.app.Resource.Toolbar.MainSite,handler:this.onMainSite,scope:this},'-',{id:"btn_blogSite",text:Ext.app.Resource.Toolbar.BlogSite,handler:this.onBlogSite,scope:this},'-',new Ext.StatusBar({id:'Statusbar_Id',style:'background:#FFFFFF;border:none',defaultText:'Use guest@jeebook.com to login'}),'->',{id:'LoginMail_Id',xtype:'textfield',hideLabel:true,emptyText:Ext.app.Resource.EmptyText.LoginMail,width:150},new Ext.Button({text:Ext.app.Resource.Button.Login,handler:this.onLogin,scope:this}),'-',{id:'btn_Code',text:'源码',handler:this.onCode,scope:this},'-',{id:"btn_help",text:Ext.app.Resource.Toolbar.Help,handler:this.onHelp,scope:this},' '],keys:[{key:Ext.EventObject.ENTER,fn:this.onLogin,scope:this}]});};Ext.extend(Ext.app.Navigatebar,Ext.Toolbar,{onMainSite:function(){window.location='http://www.jeebook.com';},onBlogSite:function(){window.location='http://www.jeebook.com/blog';},onCode:function(){window.location='http://code.google.com/p/jeebookstore';},onHelp:function(){},setStatus:function(success,msg){var s=Ext.getCmp('Statusbar_Id');var cls=success?'x-status-success':'x-status-error';s.setStatus({text:msg,iconCls:cls,clear:true});},handleResponse:function(response){var o=Ext.decode(response.responseText);this.updateState(o.data);this.setStatus(true,'Login success!');},handleFailure:function(response){this.setStatus({text:'Login failure!',iconCls:'',clear:true});},onLogin:function(){var url='./ashx/login.ashx';var user=Ext.getCmp('LoginMail_Id').getValue();this.transId=Ext.Ajax.request({url:url,method:'GET',params:{user:user,psw:''},success:this.handleResponse,failure:this.handleFailure,scope:this});},updateState:function(o){Ext.app.UserState=o;Ext.app.MainPanel.getObj().updateToolbar(o);}});Ext.app.Navigatebar.getObj=function(){return Ext.getCmp('Navigatebar_Id');}
Ext.app.SearchPanel=function(){Ext.app.SearchPanel.superclass.constructor.call(this,{id:'SearchPanel_Id',layout:'table',border:false,autoheight:true,layoutConfig:{columns:2},items:[{id:'SearchKey_Id',xtype:'textfield',hideLabel:true,emptyText:Ext.app.Resource.EmptyText.SearchKey,name:'email',width:200},new Ext.Button({text:Ext.app.Resource.Button.Search,handler:this.onSearch,scope:this})],keys:[{key:Ext.EventObject.ENTER,fn:this.onSearch,scope:this}]});};Ext.extend(Ext.app.SearchPanel,Ext.FormPanel,{onSearch:function(){Ext.app.StoreGrid.getObj().search(Ext.app.StoreTree.getObj().getCurrentPath(),Ext.getCmp('SearchKey_Id').getValue());}});
Ext.state.SessionProvider=Ext.extend(Ext.state.CookieProvider,{readCookies:function(){if(this.state){for(var k in this.state){if(typeof this.state[k]=='string'){this.state[k]=this.decodeValue(this.state[k]);}}}
return Ext.apply(this.state||{},Ext.state.SessionProvider.superclass.readCookies.call(this));}});
Ext.BLANK_IMAGE_URL='../extjs/resources/images/default/s.gif';Ext.app.Resource=new Object();Ext.app.UserState=null;Ext.onReady(function(){Ext.QuickTips.init();Ext.state.Manager.setProvider(new Ext.state.SessionProvider({state:Ext.appState}));var language;if(navigator.appName=='Netscape')
language=navigator.language;else
language=navigator.browserLanguage;if(language.indexOf('zh')>-1)
Ext.app.Resource=new Ext.app.zh_CN();else
Ext.app.Resource=new Ext.app.en_US();var header=new Ext.Panel({layout:'border',region:'north',height:115,items:[new Ext.app.Navigatebar(),{region:'west',border:false,width:180,html:'<img src=\"images/logo.png\" />'},new Ext.Panel({region:'east',layout:'table',width:468,border:false,layoutConfig:{columns:1},items:[{border:false,height:10},{border:false,width:468,height:60,el:'adbox'}]}),new Ext.Panel({region:'center',layout:'table',border:false,layoutConfig:{columns:1},items:[{border:false,height:40},new Ext.app.SearchPanel()]})]});var tree=new Ext.app.StoreTree();var main=new Ext.app.MainPanel();var viewport=new Ext.Viewport({layout:'border',items:[header,tree,main]});viewport.doLayout();setTimeout(function(){Ext.get('loading').remove();Ext.get('loading-mask').fadeOut({remove:true});},250);});
Ext.app.StoreGrid=function(){var store=new Ext.data.Store({reader:new Ext.app.StoreGridReader()});Ext.app.StoreGrid.superclass.constructor.call(this,{id:'StoreGrid_Id',store:store,columns:[{header:"Name",width:160,sortable:true,renderer:this.renderName,dataIndex:'name'},{header:"Size",width:75,sortable:true,renderer:this.formatSize,dataIndex:'size',align:'right'},{header:"Upload time",width:85,sortable:true,dataIndex:'time'}],viewConfig:{forceFit:true,enableRowBody:true,showPreview:true,getRowClass:function(record,rowIndex,p,store){if(this.showPreview&&record.data.remark!=null){p.body='<p>'+record.data.remark+'</p>';return'x-grid3-row-expanded';}
return'x-grid3-row-collapsed';}},bbar:new Ext.PagingToolbar({pageSize:25,store:store,displayInfo:true,displayMsg:'Displaying {0} - {1} of {2}',emptyMsg:'No data to display'}),stripeRows:true,border:false,region:'center'});this.on('cellclick',this.onCellClick,this);};Ext.extend(Ext.app.StoreGrid,Ext.grid.GridPanel,{load:function(path){var url='ashx/GetFiles.ashx?path='+encodeURIComponent(path);var conn=new Ext.data.Connection({url:url});this.store.proxy=new Ext.data.HttpProxy(conn);this.store.proxy.on('loadexception',this.onLoadException,this);this.store.reload();},search:function(path,key){var url='ashx/Search.ashx?path='+path+'&key='+key;var conn=new Ext.data.Connection({url:url});this.store.proxy=new Ext.data.HttpProxy(conn);this.store.proxy.on('loadexception',this.onLoadException,this);this.store.reload();},onLoadException:function(o,options,response,e){this.store.removeAll();},onCellClick:function(grid,rowIndex,columnIndex,e){},renderName:function(value,p,record){return String.format('<b><a href="ashx/Download.ashx?id={1}&name={2}">{0}</a></b>',value,encodeURIComponent(record.data.id),encodeURIComponent(record.data.name));},formatSize:function(size){return Ext.util.Format.fileSize(size);},refresh:function(){this.load(Ext.app.StoreTree.getObj().getCurrentPath());}});Ext.app.StoreGrid.getObj=function(){return Ext.getCmp('StoreGrid_Id');};Ext.app.StoreGrid.Download=function(id,name){window.location='ashx/Download.ashx?id='+id+'&name='+name;}
Ext.app.StoreGridReader=function(){var meta={};var recordType=[{name:'name'},{name:'size'},{name:'time'},{name:'id'},{name:'remark'}];Ext.app.StoreGridReader.superclass.constructor.call(this,meta,recordType);};Ext.extend(Ext.app.StoreGridReader,Ext.data.JsonReader,{readRecords:function(o){var recordType=this.recordType,fields=recordType.prototype.fields;var totalRecords=o.total,success=o.success;var records=[];for(var i=0,len=o.data.length;i<len;i++){var n=o.data[i];var values={};for(var j=0,jlen=fields.length;j<jlen;j++){var f=fields.items[j];values[f.name]=n[f.name];}
var record=new recordType(values,null);record.node=n;records[records.length]=record;}
return{success:success,records:records,totalRecords:totalRecords||records.length};}});
Ext.app.StoreTree=function(){Ext.app.StoreTree.superclass.constructor.call(this,{id:'StoreTree_Id',region:'west',split:true,useArrows:true,animate:true,width:200,collapsible:true,collapseMode:'mini',margins:'3 0 3 3',cmargins:'3 3 3 3',autoScroll:true,loader:new Ext.app.StoreTreeLoader({clearOnLoad:false}),root:new Ext.tree.AsyncTreeNode({id:'root',text:'Store'})});this.on('click',function(node){Ext.app.StoreGrid.getObj().load(this.getPath(node));var event={};event.id=Ext.app.Event.FolderChanged;event.node=node;Ext.app.MainPanel.getObj().onNotify(event);},this);this.root.expand();};Ext.extend(Ext.app.StoreTree,Ext.tree.TreePanel,{getPath:function(node){var p=node.getPath()+'/';return p.substring(5);},getCurrentPath:function(){var node=this.getSelectionModel().getSelectedNode();if(!node)
node=this.root;return this.getPath(node);},refresh:function(){var node=this.getSelectionModel().getSelectedNode();if(!node)
node=this.root;node.reload();}});Ext.app.StoreTree.getObj=function(){return Ext.getCmp('StoreTree_Id');};
Ext.app.StoreTreeLoader=Ext.extend(Ext.tree.TreeLoader,{load:function(node,callback){if(this.clearOnLoad){while(node.firstChild){node.removeChild(node.firstChild);}}
if(this.doPreload(node)){if(typeof callback=="function"){callback();}}else if(node.attributes){this.requestData(node,callback);}},requestData:function(node,callback){if(this.fireEvent("beforeload",this,node,callback)!==false){var url='ashx/GetFolders.ashx';var nodePath=Ext.app.StoreTree.getObj().getPath(node);this.transId=Ext.Ajax.request({method:'GET',url:url,success:this.handleResponse,failure:this.handleFailure,scope:this,argument:{callback:callback,node:node},params:{path:nodePath}});}else{if(typeof callback=="function"){callback();}}},createNode:function(name){return new Ext.tree.AsyncTreeNode({id:name,text:name});},processResponse:function(response,node,callback){var o=Ext.decode(response.responseText);try{node.beginUpdate();for(var i=0;i<o.data.length;i++)
{var n=this.createNode(o.data[i]);if(n)
node.appendChild(n);}
node.endUpdate();if(typeof callback=="function"){callback(this,node);}}catch(e){this.handleFailure(response);}},handleFailure:function(response){this.transId=false;var a=response.argument;this.fireEvent("loadexception",this,a.node,response);if(typeof a.callback=="function"){a.callback(this,a.node);}}});
Ext.app.en_US=function(){this.Toolbar={};this.Toolbar.AddFolder='Add Folder';this.Toolbar.AddFile='Add Document';this.Toolbar.Rename='Rename';this.Toolbar.Delete='Delete';this.Toolbar.MainSite='Home';this.Toolbar.BlogSite='Blog';this.Toolbar.Help='Help';this.EmptyText={};this.EmptyText.LoginMail='Input your e-mail for login';this.EmptyText.SearchKey='Please input keyword';this.Button={};this.Button.Login='Login';this.Button.Search='Search';this.WaitMsg={};this.WaitMsg.Login='Login ...';this.WaitMsg.Search='Search ...';this.Error={};this.Error.Parameter='Error parameter defined!';this.Error.PathNotExist='Path is not exist!';this.Error.LoginFailed='Login is failed!';this.Error.FolderIsExisted='Folder is existed!';this.Error.FileIsExisted='File is existed!';}
Ext.app.zh_CN=function(){this.Toolbar={};this.Toolbar.AddFolder='添加目录';this.Toolbar.AddFile='添加文档';this.Toolbar.Rename='重命名';this.Toolbar.Delete='删除';this.Toolbar.MainSite='主站';this.Toolbar.BlogSite='博客';this.Toolbar.Help='帮助';this.EmptyText={};this.EmptyText.LoginMail='输入e-mail登录';this.EmptyText.SearchKey='请输入搜索关键字';this.Button={};this.Button.Login='登录';this.Button.Search='搜索';this.WaitMsg={};this.WaitMsg.Login='登录中 ...';this.WaitMsg.Search='搜索中 ...';this.Error={};this.Error.Parameter='参数错误';this.Error.PathNotExist='路径不存在';this.Error.LoginFailed='登录失败';this.Error.FolderIsExisted='目录已存在';this.Error.FileIsExisted='文件已存在';};