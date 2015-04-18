
var querystring = require('querystring');
var request = require('request');
var http = require('https');


var fb_id 				 = ejs1.FB_ID;
var fb_secret 			 = ejs1.FB_secret;
var fb_TOKEN; 		
var totalcount ;
var totalcountArray = [];
var loadid;



function call(url,id,followid)
{
	var post_options = {
			host: 'graph.facebook.com',
			path: '/v2.0/' + url +  '?method=GET&format=json&suppress_http_code=1&access_token='+ fb_id+'|'+fb_secret,
			method: 'GET',
			headers: {'user-agent': 'node.js'},
			};

	var post_req = http.request(post_options, function(response)
	{
		var body = '';
		response.on("data", function(chunk)
		{
		    body += chunk.toString('utf8');
		});
		
		response.on("end", function()
		{
			var data = JSON.parse(body);
			
			if(data.error == undefined)
			{
				if(data.location != undefined)
						address(id,data.location);
				
				
			}
			else
			{
				totalcountArray.push("ok");
			}	
			
			if( totalcountArray.length == totalcount )
			{
//				connection.query(q1,[loadid],function(err,result4)	
//				{
//					process.exit() ;
//				});
			}
		});
		
	});

	post_req.end();
}






