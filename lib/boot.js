var express = require('express');
var fs = require('fs');

module.exports = function(parent, options){
	var verbose = options.verbose;
	  fs.readdirSync(__dirname + '/../controllers').forEach(function(name){
	        if (name !="offerProfile") 
	      {
		    var obj = require('./../controllers/' + name)
		      , name = obj.name || name
		      , prefix = obj.prefix || ''
		      , app = express()
		      , method
		      , path;
		
		    app.set('views', __dirname + '/../controllers/' + name + '/views');
		    	
		    // generate routes based on the exported methods
		    for (var key in obj) {
		      // "reserved" exports
		    	method = "";
		      path = '/' + name;
		      if (key == "list")
		    	  method = "get";
		      else if (key == "create")
		    	  method = "post";
		      
		
		      if (method != "") {
			      path = prefix + path;
			      app[method](path, obj[key]);
			      //verbose && console.log('     %s %s -> %s', method.toUpperCase(), path, key);
		      }
		      //verbose && console.log('     %s %s -> %s', method.toUpperCase(), path, key);
		    }
		    
		    // mount the app
		    parent.use(app);
			}
		
	  });	
	  
	    var obj, app;
		
		app = express();
		obj = require('./../controllers/info');
		app.set('views', __dirname + '/../controllers/info/views');
		app.get('/', obj['list']);
	    parent.use(app);
	  
	    app = express();
		obj = require('./../controllers/offerProfile');
		app.set('views', __dirname + '/../controllers/offerProfile/views');
	
		app.get('/offerProfile/id/:id', obj['list']);
		parent.use(app);
		
		app = express();
		obj = require('./../controllers/top-online-stores');
		app.set('views', __dirname + '/../controllers/top-online-stores/views');
		app.get('/top-online-stores/type/:id', obj['list1']);
		parent.use(app);
	
	    app = express();
		obj = require('./../controllers/buy1get1');
		app.set('views', __dirname + '/../controllers/buy1get1/views');
		app.get('/buy1get1/type/:id', obj['list1']);
		parent.use(app);
		
	    app = express();
		obj = require('./../controllers/view-by-category');
		app.set('views', __dirname + '/../controllers/view-by-category/views');
		app.get('/view-by-category/type/:id', obj['list']);
		parent.use(app);
		
		
	   
	    app = express();
		obj = require('./../controllers/view-by-brand');
		app.set('views', __dirname + '/../controllers/view-by-brand/views');
		app.get('/view-by-brand/type/:id', obj['list1']);
		parent.use(app);
	
	     app = express();
		obj = require('./../controllers/userProfile');
		app.set('views', __dirname + '/../controllers/userProfile/views');
		app.get('/userProfile/b2gthrid/:id', obj['list1']);
		parent.use(app);
	
	
	  
	  
};





