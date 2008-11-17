/*
 * Jeebook store 1.0
 * Copyright(c) 2008, Jeebook.com
 * snaill@jeebook.com
 * 
 * http://www.jeebook.com
 */

Ext.app.StoreGridReader = function() {
	  
    var meta = {};
    var recordType = [
		{name: 'name'},
		{name: 'size'},
		{name: 'time'}
	];

    Ext.app.StoreGridReader.superclass.constructor.call(this, meta, recordType);
};

Ext.extend(Ext.app.StoreGridReader, Ext.data.XmlReader, {
    readRecords : function(doc){
        var root = doc.documentElement || doc;
    	var recordType = this.recordType, fields = recordType.prototype.fields;
    	var totalRecords = 0, success = true;

    	var records = [];
    	var ns = Ext.DomQuery.select("doc", root);
        for(var i = 0, len = ns.length; i < len; i++) {
	        var n = ns[i];
	        var values = {};
			
	        for(var j = 0, jlen = fields.length; j < jlen; j++){
	            var f = fields.items[j];
	            values[f.name] = n.getAttribute(f.name);
	        }
			
	        var record = new recordType(values, null);
	        record.node = n;
	        records[records.length] = record;
	    }

	    return {
	        success : success,
	        records : records,
	        totalRecords : totalRecords || records.length
	    };
    }
} );