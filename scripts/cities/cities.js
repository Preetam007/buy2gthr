var ejs1 = require("../../config.js");
//connecting to mysql
var connection  = ejs1.connection;

if(typeof require !== 'undefined') XLSX = require('xlsx');
var workbook = XLSX.readFile('indian_cities.xlsx');

var web = workbook.Strings;
console.log(web);
for(var i = 0 ; i < web.length ;i++)
	{
		//console.log(web[i].t);
	     var name ;
		 name = web[i].t;
		 console.log(name);
			connection.query("INSERT INTO cities(city_name) " + 
			        " values (?)",[name], function(err) 
			        {
					  	if (err) throw err;
						console.log(i);
			        });	
 
    }





