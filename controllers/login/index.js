var ejs1 = require("../../config.js");
//connecting to mysql

var connection  = ejs1.connection;

var bcrypt = require('bcrypt-nodejs');

exports.list = function(req, res)
{
	if(req.session.isLoggedIn == true)
	{
	  res.redirect('/home');
	}
	else
	{
	   if(req.query.id != undefined && req.query.logintype == "verify")
	   {
			var id = req.query.id;
			
			connection.query("select name from users where guid = ?",[id],function(err,rows)
			{
			   if(rows.length == 0)
			   {
			     res.render('./login.dust',
					 {
					     message1 : "Welcome to extraShoppin.in. Please login to continue."
					 });
			   }
			   else
			     {
				     connection.query("select name from users where guid = ?",[id],function(err,rows)
			         {
						  res.render('./login.dust',
						 {
							 message1 :  'hello  '+rows[0].name+' Welcome to extraShoppin.in. Please login to continue.'
						 });
					 });
				     
				   
				 }
			});
	    }
        else
        {
		    res.render('./login.dust');
        }		
	
	   
	 
	}
	
	
};
exports.create = function(req, res,next)
{
	
	var email = req.body.inputEmail;
	
	var pass = req.body.inputPassword;
	
	//var hash_pwd = bcrypt.hashSync(pass);
	
	connection.query("select password ,id from users  where email = ?" ,[email], function(err,rows) 
	        {
		         console.log(rows);
		        var id = rows[0].id  ;
				
//			  	if(bcrypt.compareSync(pass, rows[0].password) == true)
//			  		{
			  		connection.query("update  users set login_at = NOW() ,logged_in = ? where email = ?" ,[1,email], function(err,rows) 
			  		        {
			  			      if(err)
			  			    	    console.log(err);
			  		        });
			  		
			  		
			  		    req.session.isLoggedIn = true ;
			  		    req.session.user_id = id ;
			  		    
			  		    res.redirect("/home");
					  		
//			  		}
//			  	else
//			  		{
//				  		var message = "name and password combination is wrong.";
//						  res.render('./login.dust', 
//							  {
//									  	message2 : message,
//									  	
//					           });
//			  		}			  	
	        });
	
	
	
};
