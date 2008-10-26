Ext.app.MainPanel = function() {
	  
  // create the Grid
  this.grid = new Ext.app.StoreGrid();
 
  Ext.app.MainPanel.superclass.constructor.call(this, {
    region    : 'center',
    margins   : '3 3 3 0', 
    layout : 'border',
    defaults  : {
      autoScroll : true
    },
    tbar:new Ext.Toolbar([{
      text:'���Ŀ¼',
      tooltip: {title:'���Ŀ¼',text:'�ڵ�ǰĿ¼�������Ŀ¼'},
  //    iconCls: 'tabs',
      handler: this.onItemClick,
      scope:this
    }, '-', {
      text:'����ļ�',
      tooltip: {title:'����ļ�',text:'�ϴ��ļ�����ǰĿ¼'},
  //    iconCls: 'tabs',
      handler: this.onAddClick,
      scope:this
    }]),
    items     : [this.grid, {
                id:'bottom-preview',
                layout:'fit',
                height: 250,
                split: true,
                border:false,
                hidden:true,
                region:'south'
            }]
  });
};

Ext.extend(Ext.app.MainPanel, Ext.Panel, {
  onItemClick : function(item){
    var bot = Ext.getCmp('bottom-preview');
    bot.add({html:'<p>this is a test!</p>'});
    bot.show();
    bot.ownerCt.doLayout();
  },
  onAddClick : function(item){
    var bot = Ext.getCmp('bottom-preview');
    bot.add(new Ext.app.AddFilePanel());
    bot.show();
    bot.ownerCt.doLayout();
  }

} );