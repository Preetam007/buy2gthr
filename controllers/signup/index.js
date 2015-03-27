//connecting to mysql
var ejs1 = require("../../config.js");

var connection  = ejs1.connection;

exports.list = function(req, res)
{
	if(!req.xhr)
	{   
		if(req.session.isLoggedIn == true)
		{
		  res.redirect('/home');
		}
		else
		{
		  res.render('./signup.dust');
		}
		
		if(req.query.method ==  "searchcomp")
		{
			
			console.log('yess');
		}
		
	}
	else
	{
		
	    if(req.query.method ==  "searchcomp")
		{
			console.log('yess');
			console.log(req.body);
			console.log(req.query.search);
			
			connection.query("SELECT comp_name as NAME, id FROM companies where comp_name like '" +
			 req.query.search + "%' order by comp_name limit 0,8", function(err, result) 
            {
				if(err) console.log(err);
				console.log(result);
			      res.json(result);
		    });
			
	  }
	}	
};
exports.create = function(req, res,next)
{
	var name = req.body.inputName;
	var email = req.body.inputEmail ;
	var pwd =  req.body.inputPassword ;
	var city = req.body.city ;
	var comp_name = req.body.inputComp ;
	
	 console.log(req.body);
	
	//module for bcrypting the password
	var bcrypt = require('bcrypt-nodejs');
	// new generated bcrypt password
	var hash_pwd = bcrypt.hashSync(pwd);
	
	
	 //module for generating uuid
	  var uuid = require('node-uuid');
	  // new generated uuid
	  var guid = uuid.v1();
	  
	//console.log(hash_pwd);		
			connection.query("select name from users  where email = ?" ,[email], function(err,rows) 
			        {
					  	if (err) console.log(err);
						
					  	if(rows.length > 0)
					  		{
					  		var message = "The email you used already exists.";
							  res.render('./signup.dust', 
								  {
										  	messagm : message,
										  	
						           });
					  		 }
					  	else
					  		{
								 if(comp_name != undefined && comp_name != '')
								 {       
									connection.query("INSERT INTO users (name,email,city,password,guid,create_at,ip,company_name) " + 
									 " values (?,?,?,?,?,CURDATE(),?,?)",[name,email,city,hash_pwd,guid,req.ip,comp_name], function(err,rows) 
									{
										
									   var id =rows.insertId;
										if (err)
										{
										   console.log(err);
										}
										else
										{
										
//										   connection.query("INSERT INTO req_companies(user_name ,user_city ,old_comp_name,user_id) values (?,?,?,?)",[name ,city,request_Comp,id], function(err,rows) 
//											{
//											  if(err) console.log(err);
//											});
											
											
											 res.render('../../registerverify/views/registerverify', 
															{
																message		: "Success.  You will receive an email to verify your account." 
															});
											
											req.session.user_id = id ;
										
											var host ="localhost:3000";
											var mailOptions = 
											{
												from: ejs1.user, // sender address
												to: email , // list of receivers
												subject: "Welcome to buyTogether.com", // Subject line 
												html:  'Copy and paste the following link in your browser to verify your account.<br><br>'+ host+'/login?id=' + guid + '&logintype=verify ' +  
														'<br><br>Cordially,<br>The buyTogether team' 	
											};
											// send mail with defined transport object
											ejs1.smtpTransport.sendMail(mailOptions); 
										}
									});	 	        
								 }	
					  		}	
			        });	
	//var head = ejs1.user;
	
	
	
	
	
	req.session.isLogined = 'true';
	
	
	
	
	
	 
	//console.log(req.body);
	//console.log(req.ip);
	
};

