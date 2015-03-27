var ejs1 = require("../../config.js");
//connecting to mysql

var connection  = ejs1.connection;

exports.list = function(req, res)
{
	
	 res.render('./forgotPassword.dust');	
};

exports.create = function(req, res,next)
{
   console.log(req.body);
   
   var email = req.body.Email ;
   
   console.log(email);
   
   connection.query("select id from users  where email = ?" ,[email], function(err,rows) 
    {
	   	 if(rows.length > 0)
		 {
	   		 
	   		var host ="localhost:3000";
			var mailOptions = 
			{
			    from: ejs1.user, // sender address
			    to: email , // list of receivers
			    subject: "Welcome to buyTogether.com", // Subject line 
			    html : 
			    	"To reset your Dealflow.com password, simply click the link below. This will take you to a web page where you can create a new password.<br><br>" +
			    	"<a href='" + host+"/changepassword?id="+rows[0].id +"'> Reset your Dealflow.com password now.</a>.<br><br>" + 
			    	"If you were not trying to reset your password, your account is still secure and no one has been given access to it.<br><br> " +
					"If you can not click the hypertext link above, you can copy and paste the following URL into your browser:<br><br> " +
			    	"https://"+host+"/changepassword?id="+rows[0].id +
			    	"<br><br>The Dealflow.com Team<br><br>" +
			    	"buyTogether.com <br>" +
			    	"Sector 56 <br>" +
			    	"Gurgaon,haryana <br>" +
			    	"Tel 8468005410 <br>" +
			    	"raopreetam007@gmail.com"
			};

			  
			// send mail with defined transport object
			ejs1.smtpTransport.sendMail(mailOptions);
					//,function(error,response)		
		//	{
//			    if(error)
//				{
//			    	var message = error + " .Please contact buyTogether.com staff for further assistance.";
//			        res.render('./forgotPassword.dust', 
//		    		{
//					  	message : message
//					});
//				}
//			    else
//		    	{
			    	var message = "Please check your email for instructions on resetting your buyTogeteher.com password.";
			        res.render('./forgotPassword.dust', 
		    		{
					  	message : message,
					}); 
		    	//}    
			//});  
		 }  
	   else
		   {
		  
					var  message = "The email you provided does not exist on buyTogeteher.com";
					res.render('./forgotPassword.dust', 
				    		{
							  	message : message
							});
		   } 	   
   });
  
};