var ejs1 = require("../../config.js");
//connecting to mysql
var connection  = ejs1.connection;

if(typeof require !== 'undefined') XLSX = require('xlsx');
var workbook = XLSX.readFile('C.xlsx');

var web = workbook.Strings;
console.log(web);
for(var i = 0 ; i < web.length ;i++)
	{
		//console.log(web[i].t);
	     var name ;
		 name = web[i].t;
		 console.log(name);
		 console.log(i);
			connection.query("INSERT INTO comp_college (name) " + 
			        " values (?)",[name], function(err) 
			        {
					  	if (err) console.log(err);
						
			        });	
 
    }





