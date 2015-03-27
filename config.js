	var mysql      = require('mysql');
	
	var connection = mysql.createConnection({

		host     : 'localhost',
		database :'buytogether',
		user     : 'Preetam',
		password : 'admin'
	});



//MAILING SMTP OPTIONS
    var  user = "raopreetam007@outlook.com";   
    exports.user = user;
    
    var nodemailer = require("nodemailer");
    // create reusable transport method (opens pool of SMTP connections)
    var smtpTransport = nodemailer.createTransport("SMTP",
    {
        auth: 
        {
            user: user,
            pass: "myway$1A"
        }
    });
    exports.smtpTransport = smtpTransport;
    
    exports.connection = connection;