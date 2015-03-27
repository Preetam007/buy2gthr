var ejs1 = require("../../config.js");
//connecting to mysql
var connection = ejs1.connection;


var AL_TOKEN = '60d42d83f27e0b61ed89e314d0827f17'; 	

var request = require('request');
var page = 1;
var processarr = [];
var count;
var array = [];
var loadid;


connection.query("select al_id from companies",function(err,rsl)
{
	for (var j=0; j<rsl.length;j++)
	{
		console.log(rsl[j].al_id);
		httpcall(rsl[j].al_id);
	}
});

function httpcall(al_id)
{
	processarr = [];
	request('https://api.angel.co/1/startup_roles?v=1&startup_id='+al_id+'&page='+page+'&access_token='+AL_TOKEN,function (error,response,body) 
	{
		var data = JSON.parse(body);
		//console.log(data);
		
		if(data.startup_roles != undefined)
		{
			if(data.startup_roles.length > 0)
			{
				count = data.startup_roles.length;
				var loop = data.startup_roles;
				  page++;
				//console.log(page);
				for(var i=0;i<loop.length;i++)
				{
					console.log(loop[i].tagged);
//					addpeople(loop[i] ,company_id);
//					processarr.push("DONE");
//						
//					if(processarr.length == loop.length)
//						httpcall();
				}
			}
		}
		else
		{
		//connection.query(Q_ang26,[company_id]);
		}
	});
}

function addpeople(data ,company_id)
{
	connection.query(Q_ang18,[data.tagged.id],function(err,rsl)
	{
		var a = data.created_at.split('T');
		var joindate = a[0] +' '+ a[1].substring(0,a[1].length-1);
		
		if(rsl.length > 0)
		{
			//addcomp_people(joindate,company_id,rsl[0].people_id,data.role);
			 add_updatedat(company_id);
		}	
		else
		{
			connection.query(Q_ang19,[data.tagged.name,loadid,data.tagged.id],function(err,res3)
			{
				
		       addcomp_people(joindate,company_id,res3.insertId,data.role);
		
			});
		}	
	});
}

function addcomp_people(joindate,startup_id,people_id,role)
{
	connection.query(Q_ang20,[joindate,startup_id,people_id,role,loadid],function(err,res)
	{
		 add_updatedat(startup_id);
	});      
}


function add_updatedat(startup_id)
{
	connection.query(Q_ang26,[startup_id],function(err,res)
	{
       //check(array);
	});

}

//function check(array)
//{
//	if( array.length == count )
//	{
//		connection.query(q1,[loadid],function(err,result4)	
//		{
//			process.exit() ;
//		});
//	}
//}


