var ejs1 = require("../../config.js");
//connecting to mysql
var connection  = ejs1.connection;

exports.list = function(req, res)
{
	
	 res.render('./changepassword.dust');	
};

exports.create = function(req, res, next)
{ 
	var message;
	var bcrypt = require('bcrypt-nodejs');
	var hash_pwd = bcrypt.hashSync(res.req.body.pwd);
	console.log(req.query);
	
	console.log(req.query.id);
	
	connection.query('SELECT name FROM users where id = ?', [req.query.id], function(err, rows, fields)
	 {
		if(rows == undefined)
		{
			message = "There was a problem with the request, please try again or <a href='/contact'>contact</a> buyTogether.com for assistance.";
			res.render('./changepassword', 
			{
				message : message,
				
			});
		}
		else
		{
			connection.query('update users set  password = ? and password_changeAt = NOW() where id = ?',[hash_pwd,req.query.id],function(err, rows, fields) 
			{
				message = "Password changed successfully";
					res.render('./changepassword', 
					{
						message : message,
					});
			 });			
		}	
	});
};