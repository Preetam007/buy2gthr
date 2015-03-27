
var ejs1 = require("../../config.js");
//connecting to mysql

var connection  = ejs1.connection;
exports.list = function(req, res, next)
{ 
	if(req.session.isLoggedIn == undefined)
	{
		res.redirect('/info');
	}	
	else
	{
	     console.log(req.session.user_id);
		connection.query("update users set logout_on = CURDATE() , logout_at = NOW(),LOGGED_IN = 0 where id =?", [req.session.user_id], function(err, rows12)
		{ 
		    if(err)
			      console.log(err);
			req.session.destroy(function(err)
			{
				res.redirect('/info');
			});
		}); 
	}	
};