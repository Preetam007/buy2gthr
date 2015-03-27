
var ejs1 = require("../../config.js");
//connecting to mysql

var connection  = ejs1.connection;
exports.list = function(req, res)
{ 
	console.log(req.body);
	res.render('./deleteaccount',
   {
		messagm : 'yes',
	    userprofile : 'yes'
   });
			
};
exports.create = function(req,res)
{
	console.log(req.body);
	
	res.redirect('/info');
	
};