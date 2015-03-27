var ejs1 = require("../../config.js");
//connecting to mysql

var connection  = ejs1.connection;

//var connection  = ejs1.connection;
exports.list = function(req, res)
{	
  res.render('./info.dust');
		  		  
};