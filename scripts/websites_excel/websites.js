var ejs1 = require("../../config.js");
//connecting to mysql

var connection  = ejs1.connection;


if(typeof require !== 'undefined') XLSX = require('xlsx');
var workbook = XLSX.readFile('websites.xlsx');

var web = workbook.Strings;

//console.log(web.length);

for(var i = 0 ; i < web.length ;i++)
	{
	 console.log(web[i].t);
	 
	 
	 connection.query("INSERT INTO website (website_name) " + 
		        " values (?)",[web[i].t], function(err) 
		        {
				  	if (err) throw err;
					
		        });	
	 
	 
	 
	}





