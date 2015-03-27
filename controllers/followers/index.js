//connecting to mysql
var ejs1 = require("../../config.js");

var connection  = ejs1.connection;

exports.list = function(req, res)
{
		  console.log(req.params.id);
		  res.render('./top-online-stores.dust');
		
};