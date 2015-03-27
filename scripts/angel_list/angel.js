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

var raise = 'startups?filter=raising';

	httpcall(raise,1);

function httpcall(url,x)
{
	    var link ;
		link = 'https://api.angel.co/1/'+url+'&page='+page+'&access_token='+AL_TOKEN ;
	
	//processarr = [];
	request(link,function (error,response,body)  
	{
			var data  = JSON.parse(body);
			//console.log(data);
			totalcount = data.total;
			if(data.startups.length > 0)
			{
				var loop = data.startups;
				
				for(var i=0;i<loop.length;i++)
				{
					               var loc = loop[i].locations ; 
					   
					              if (loc != "" && loc != "[]" && loc != undefined)
					            	  {  
					            	  if(loc[0].name == 'gurgaon' || loc[0].name == 'delhi' || loc[0].name == 'new delhi'
										  
										  || loc[0].name == 'pune' || loc[0].name == 'chennai' || loc[0].name == 'Faridabad' )
					            		  
					            		  {
					            		       console.log(loop[i].id ,loop[i].name  ,loc[0].name);
					            		       
					            		       connection.query("INSERT INTO companies (al_id,comp_name , city) " + 
					            				        " values (?,?,?)",[loop[i].id ,loop[i].name ,loc[0].name], function(err) 
					            				        {
					            						  	if (err) throw err;
					            							
					            				        });	   
					            		  }    
					            	  }
					        	 
					
				}
				
				page++;
				console.log(page);
				httpcall(raise,page);
			}
		
		
			
	});
}	
