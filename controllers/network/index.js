var ejs1 = require("../../config.js");
//connecting to mysql

var connection  = ejs1.connection;
var bcrypt = require('bcrypt-nodejs');

exports.list = function(req, res)
{
	if(!req.xhr)
	{
	connection.query("select id ,name ,email ,city ,college_name ,company_name from users where id = ?",[10], function(err,rows) 
	     {
			if(!err)
			{
				//console.log(rows); 
				
			    res.render('./network.dust',
				{
					messagm : 'yes',
					userprofile : 'yes',
				    ids : rows[0].id ,
					user_name : rows[0].name ,
					email : rows[0].email ,
					city :  rows[0].city ,
					college_name :  rows[0].college_name ,
					company :  rows[0].company_name 
				});
			}
			else
			    console.log(err);	
		 });
	}
	else
	{
		
			
			
	
	}
		
};
exports.create = function(req, res)
{
	
	
	
};