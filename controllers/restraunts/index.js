var ejs1 = require("../../config.js");
//connecting to mysql

var connection  = ejs1.connection;

exports.list = function(req, res)
{
	if(!req.xhr)
	{
		res.render('./restraunts.dust',
		{
			messagm : 'yes',
			userprofile : 'yes'
			//ids : rows[0].id 
		});
	}
	else 
	{
		
		
	}			
};
exports.create = function(req, res)
{
		
};