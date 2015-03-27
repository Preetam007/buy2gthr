var ejs1 = require("../../config.js");
//connecting to mysql

var connection  = ejs1.connection;

exports.list = function(req, res)
{
    console.log(req.session.isLoggedIn);
    
	 var user_id = req.session.user_id ;
	
	if(!req.xhr)
	{   
		connection.query("select id ,name ,email ,image_source ,city ,college_name ,company_name from users where id = ?",[10], function(err,rows) 
	     {
			if(!err)
			{
			    res.render('./userProfile.dust',
				{
					messagm : 'yes',
					userprofile : 'yes',
				    ids : rows[0].id ,
					user_name : rows[0].name ,
					email : rows[0].email ,
					city :  rows[0].city ,
					image_source : rows[0].image_source,
					college_name :  rows[0].college_name ,
					company_name :  rows[0].company_name 
				});
			}
			else
			    console.log(err);	
		 });
		
	}
	else if(req.query.method == 'starrating')
		{
			var value = req.query.value;
			var user_id = req.query.user_id;
			connection.query("select id from user_rating where user_rate = ? and user_rate_to = ?",[10,user_id],function(err,rows)
			{
				if(err) console.log(err);
				
				
				if(rows.length > 0)
				{
					connection.query("update user_rating set rating = ? where user_rate = ? and user_rate_to = ?",[value,10,user_id],function(err,reft)
					{
						if(err) console.log(err);
					});
				}
				else
				{
					connection.query("insert into user_rating (user_rate ,user_rate_to,rating) values(?,?,?)",[10,user_id,value],
			 function(err,rows)
			 {
				   if(err) console.log(err);

					console.log('yess again we did it');
				
			 });	
				}	
			});
						   
		res.send('ok');
		}
	else if(req.query.method == 'getfollowers')
	{
		
		console.log(req.query.userid);
		//use req.query.userid .....in place of 10
		     connection.query("SELECT u.name ,u.guid FROM buytogether.user_followers of join users u on u.id = of.followed_by where of.user_id = ?",[req.query.userid], function(err,rows)
		     {
				 if(err) console.log(err);
				var array =[];

				for(var i=0 ; i<rows.length;i++)
				{
					var arr = [];
					var href = "/userProfile/b2gthrid/"+rows[i].guid;
					
					arr.push('<a href='+href+'><span class="glyphicon glyphicon-user"></span><small>'+rows[i].name+'</small></a>');
					
					arr.push('<button class="btn btn-primary">follow</button>');

					if(arr.length > 0)
						array.push(arr);
				}

				res.send({"aaData":array});

				 //console.log(rows);

			 });	
	}
	else if(req.query.method == 'followuser')
	{
		console.log(req.query.val);
		
		if(req.query.val == '1')
		{
			connection.query("delete from user_followers where user_id = ?  and followed_by = ?",                                                               [req.query.user_id,10],function(err,rer)
			{
				if(err) console.log(err);
				res.send({ok:"0"});
			});
		}
		else
		{
			connection.query("insert into  user_followers(user_id,followed_by) values(?,?)",                                                               [req.query.user_id,10],function(err,rer)
			{
				if(err) console.log(err);
				res.send({ok:"1"});
			});
		}
		
		
	}
};
exports.list1 = function(req, res)
{
	   connection.query("select id,name ,email ,city ,image_source,college_name ,company_name from users where guid = ?",[req.params.id],function(err,rows)
	   {
		  if(err) console.log(err);
		   
		   var following = '0';
         connection.query("select uf.id from user_followers uf where user_id = (select u.id from users u  where guid= ?) "+
"and followed_by = ?",[req.params.id,10],function(err,rsl)
		   {
			     if(err) console.log(err);
			 
			     if(rsl.length > 0 )
				 {
					 following = '1';
				 }
			     res.render('./userProfile.dust',
				 {
				   following : following,
				   messagm : 'yes' ,
				   otherprofile :'yes',
				   user_name : rows[0].name ,
				   user_id    : rows[0].id,
					email : rows[0].email ,
					city :  rows[0].city ,
					 image_source : rows[0].image_source,
					college_name :  rows[0].college_name ,
					company_name :  rows[0].company_name 
				 });
			 });        
	   });	
}

exports.create = function(req, res,next)
{
	
	 if (req.body.pk != undefined)
	   {

	   
		   if(req.body.pk == 1)
		   {
				  connection.query("update users set name = ? where id = ?",[req.body.value,10],function(err,res)
				   {
					   console.log(res);
				   });
		   }
		   else if (req.body.pk == 2)
		   {
				   connection.query("update users set email = ? where id = ?",[req.body.value,10],function(err,res)
				   {
					   console.log(res);
				   });
		   
		   }
		   else if (req.body.pk == 3)
		   {
				 connection.query("update users set company_name = ? where id = ?",[req.body.value,10],function(err,res)
				   {
					   console.log(res);
				   });
		   
		   }
		   else if(req.body.pk == 4)
		   {
				 connection.query("update users set city = ? where id = ?",[req.body.value,10],function(err,res)
				   {
					   console.log(res);
				   });
		   }
	  
						  console.log(req.body);
						  res.send({ok:"ok"});
						  //console.log("we did it");
					  
			 
		}	 
	
	
	
};


