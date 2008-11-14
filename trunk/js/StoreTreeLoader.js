/*
 * Jeebook store 1.0
 * Copyright(c) 2008, Jeebook.com
 * snaill@jeebook.com
 * 
 * http://www.jeebook.com
 */

Ext.app.StoreTreeLoader = Ext.extend( Ext.tree.TreeLoader, {
	load : function(node, callback){
        if(this.clearOnLoad){
            while(node.firstChild){
                node.removeChild(node.firstChild);
            }
        }
        if(this.doPreload(node)){ // preloaded json children
            if(typeof callback == "function"){
                callback();
            }
        }else if(node.attributes){
            this.requestData(node, callback);
        }
    },
    requestData : function(node, callback){
        if(this.fireEvent("beforeload", this, node, callback) !== false){
            this.transId = Ext.Ajax.request({
                method:this.requestMethod,
                url: "./root/dirs.xml",
                success: this.handleResponse,
                failure: this.handleFailure,
                scope: this,
                argument: {callback: callback, node: node},
                params: this.getParams(node)
            });
        }else{
            // if the load is cancelled, make sure we notify
            // the node that we are done
            if(typeof callback == "function"){
                callback();
            }
        }
    },

    /**
    * Override this function for custom TreeNode node implementation
    */
    createNode : function( nodeDir ){
		var nodeTree = 	new Ext.tree.AsyncTreeNode();
		nodeTree.text = nodeDir.getAttribute("name");
		return nodeTree;
    },

    processResponse : function(response, node, callback){
alert("response.responseXML:"+response.responseXML);
        var doc = response.responseXML;
        try {
			var root = doc.documentElement || doc;
			var dirs = Ext.DomQuery.select("dir", root);
			node.beginUpdate();
			for ( var i = 0; i < dirs.length; i ++ )
			{
				this.creatNode( dirs[i] );
			}
            node.endUpdate();
            if(typeof callback == "function"){
                callback(this, node);
            }
        }catch(e){
            this.handleFailure(response);
        }
    },
		
	handleFailure : function(response){
        this.transId = false;
        var a = response.argument;
alert("response.responseText"+response.responseText);
        this.fireEvent("loadexception", this, a.node, response);
        if(typeof a.callback == "function"){
            a.callback(this, a.node);
        }
    }
} );