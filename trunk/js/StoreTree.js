Ext.app.StoreTree = function() {
	  
  Ext.app.StoreTree.superclass.constructor.call(this, {
    title       : 'Navigation',
    region      : 'west',
    split       : true,
    width       : 200,
    collapsible : true,
    margins     : '3 0 3 3',
    root : new Ext.tree.TreeNode(),
    cmargins    : '3 3 3 3'
  });
};

Ext.extend(Ext.app.StoreTree, Ext.tree.TreePanel, {} );