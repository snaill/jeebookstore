/*
 * Jeebook store 1.0
 * Copyright(c) 2008, Jeebook.com
 * snaill@jeebook.com
 * 
 * http://www.jeebook.com
 */

Ext.app.StoreGrid = function() {
    this.expander = new Ext.grid.RowExpander({
        tpl : new Ext.Template(
            '<p><a href="#" onclick="Ext.app.StoreGrid.Download(\'{id}\', \'{name}\')">Download</a></p><br>',
            '<p><b>Summary:</b> {time}</p>'
        )
    });

	Ext.app.StoreGrid.superclass.constructor.call(this, {
		id : 'StoreGrid_Id',
		store: new Ext.data.Store({
			reader: new Ext.app.StoreGridReader()
		}),
		columns: [
			this.expander,
			{header: "Name", width: 160, sortable: true, dataIndex: 'name'},
			{header: "Size", width: 75, sortable: true, renderer: this.formatSize, dataIndex: 'size', align : 'right' },
			{header: "Upload time", width: 85, sortable: true, dataIndex: 'time'}
		],
		stripeRows: true,
		border:false,
		plugins: this.expander,
		region:'center'
	});

	this.on('cellclick', this.onCellClick, this );
	this.curRow = -1;
};

Ext.extend(Ext.app.StoreGrid, Ext.grid.GridPanel, {
	load : function(path)	{
		var url = "." + path + "/docs.xml";
		var conn = new Ext.data.Connection({
			url : url
		});
	
		this.store.proxy = new Ext.data.HttpProxy( conn );
		this.store.proxy.on('loadexception', this.onLoadException, this );
		this.store.reload();
	},
	onLoadException : function( o, options, response, e )	{
		this.store.removeAll();
	},
	onCellClick : function( grid, rowIndex, columnIndex, e ) {
		if ( this.curRow > -1 )
		{
			this.expander.collapseRow( this.curRow );
			this.curRow = -1;
		}
		
		if ( 0 == columnIndex )
			return;
		
		this.expander.expandRow( rowIndex );
		this.curRow = rowIndex;
	},
	formatSize : function( size )	{
		return Ext.util.Format.fileSize(size);
	},
	refresh : function()	{
		this.load( Ext.app.StoreTree.getObj().getCurrentPath() );
	}
});

Ext.app.StoreGrid.getObj = function(){
	return Ext.getCmp('StoreGrid_Id');
};

Ext.app.StoreGrid.Download = function(id, name){
	 window.location='ashx/Download.ashx?id=' + id + '&name=' + name;
}