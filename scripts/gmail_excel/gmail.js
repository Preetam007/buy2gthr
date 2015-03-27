var ejs1 = require("../../config.js");
//connecting to mysql

var connection  = ejs1.connection;


if(typeof require !== 'undefined') XLSX = require('xlsx');
var workbook = XLSX.readFile('gmail.xlsx');

//console.log(workbook);

var web = workbook.Strings;

//console.log(web);


for(var i = 0 ; i < web.length ;i++)
	{
	var email ;
	if(i % 2 == 0)
		{
		var em = [] ;
		 email = web[i].t;
		em.push(email);
	
		connection.query("INSERT INTO gmail_acc (email) " + 
		        " values (?)",[email], function(err) 
		        {
				  	if (err) throw err;
					
		        });	
		}
	else
		{
		var pas = [];
		var pass=  web[i].t;
		//console.log(pass);
		pas.push(pass);
		console.log(pas);
		
		connection.query("update gmail_acc set password = ? where email = ?",[pass,email], function(err) 
		        {
				  	if (err) throw err;
					
		        });	
		}  
  }





