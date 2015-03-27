var ejs1 = require("../../config.js");
//connecting to mysql

var connection  = ejs1.connection;
//var bcrypt = require('bcrypt-nodejs');

exports.list = function(req, res)
{
		res.render('./post_a_offer.dust',
		{
			messagm : 'yes',
			userprofile : 'yes'
			//ids : rows[0].id 
		});
			
};
exports.create = function(req, res)
{
		
};