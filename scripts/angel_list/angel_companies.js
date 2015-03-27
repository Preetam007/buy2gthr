var ejs1 = require("../../config.js");
//connecting to mysql
var connection  = ejs1.connection;
var AL_TOKEN = '60d42d83f27e0b61ed89e314d0827f17'; 			
var request = require('request');
var page = 1;
var page1 =1 ;
var processarr = [];
var totalcount ;
var totalcountArray = [];
var loadid;
var check1 ;
var hits = 0 ;

for(var i = 209000 ; i<= 211000 ; i++)
	{
	  var raise = 'startups/'+i+'?';
			  //console.log(raise);
	  httpcall(raise);
	}
function httpcall(url)
{
	    var link ;
		link = 'https://api.angel.co/1/'+url+'access_token='+AL_TOKEN ;
		
		//console.log(link);
	request(link,function (error,response,body)  
	{
			var data  = JSON.parse(body);
			//console.log(data);
			//console.log(data.hidden);
			if(data.hidden  ==  false)
			{
	               var loc = data.locations ; 
	               if(loc != "" && loc != "[]" && loc != undefined)
	            	   {
	            	   
		               for(var i = 0 ; i<loc.length ; i++)
		            	   {
		            	   if(loc[i].name == 'gurgaon' || loc[i].name == 'delhi' || loc[i].name == 'new delhi'
								  
							 || loc[i].name == 'pune' || loc[i].name == 'chennai' || loc[i].name == 'faridabad' 
								  
							 || loc[i].name == 'noida' || loc[i].name == 'mumbai' || loc[i].name == 'bangalore'
								 
							 || loc[i].name == 'mohali' || loc[i].name == 'chandigarh' || loc[i].name == 'haryana'
								 
							 || loc[i].name == 'kolkata' || loc[i].name == 'karnataka' || loc[i].name == 'maharashtra'
								 
							 || loc[i].name == 'jaipur' ||  loc[i].name == 'hyderabad' || loc[i].name == 'ghaziabad' 
								 
						     || loc[i].name == 'chennai' || loc[i].name == 'mysore' || loc[i].name == 'coimbatore'
									 
							 || loc[i].name == 'ahmedabad' || loc[i].name == 'cochin' || loc[i].name == 'vijayawada')
			            		  
			            	   {
		            		   console.log(data.name);
		            		   console.log(data.id);
				        		               
			                	  connection.query("INSERT INTO comp_college (al_id,name,city) " + 
									        " values (?,?,?)",[data.id ,data.name ,loc[i].name], function(err) 
									        {
											  	if (err) console.log(err);
												
									        });	         
			            		}
		            	   else
		            		   {
		            		     console.log("nooo");
		            		   }
		            	   }
	            	   
	            	   }

			     }		
	});
}	
