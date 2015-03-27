var ejs1 = require("../../config.js");
//connecting to mysql
var connection  = ejs1.connection;

if(typeof require !== 'undefined') XLSX = require('xlsx');
var workbook = XLSX.readFile('ggn.xlsx');

var web = workbook.Strings;
console.log(web);
for(var i = 0 ; i < web.length ;i++)
	{
	     var name ;
		 name = web[i].t;
		 console.log(name);
			connection.query("INSERT INTO malls (mall_name ,city) " + 
			        " values (?,?)",[name,"gurgaon"], function(err) 
			        {
					  	if (err) throw err;
						console.log(i);
			        });	
 
    }





