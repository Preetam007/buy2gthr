var ejs1 = require("../../config.js");
//connecting to mysql

var connection  = ejs1.connection;
var bcrypt = require('bcrypt-nodejs');

exports.list = function(req, res)
{
	if(!req.xhr)
	{
		connection.query("select * from user_privacy where user_id = ?",[10],function(err,rewt)
		{
           if(rewt.length > 0)
			{
                res.render('./privacy.dust',
				{
					messagm : 'yes',
					userprofile : 'yes',
					profile : rewt[0].who_can_see_my_stuff ,
					contact : rewt[0].who_can_contact_me ,
					invite : rewt[0].who_can_invite_me ,
					email : rewt[0].who_can_follow_me ,
					follow : rewt[0].who_can_follow_me ,
				});
			}
		});	
	}
	else 
	{
		if(req.query.method == 'updateprivacy')
		{
			console.log(req.query.profile);
			console.log(req.query.contact);
			console.log(req.query.invite);
			console.log(req.query.email);
			console.log(req.query.follow);
			res.send('ok');
			
			var profile  = req.query.profile ;
			var contact  = req.query.contact ;
			var invite  = req.query.invite ;
			var email  = req.query.email ;
			var follow = req.query.follow ;
			
			
			connection.query("select * from user_privacy where user_id = ?",[10],function(err,rest)
			{
				if(rest.length > 0)
				{
					connection.query("update user_privacy set who_can_see_my_stuff = ? ,who_can_contact_me = ? ,who_can_invite_me = ? ,who_can_view_email = ? ,who_can_follow_me = ? where user_id = ?",[profile,contact,invite,email,follow,10],function(err,row)
					{
						if(err) console.log(err);
						
					});
					
				}
				else
				{
					connection.query("insert into user_privacy (user_id,who_can_see_my_stuff  ,who_can_contact_me,who_can_invite_me  ,who_can_view_email  ,who_can_follow_me ) values(?,?,?,?,?,?)",[10,profile,contact,invite,email,follow],function(err,rew)
					{
						if(err) console.log(err);
						
					});
					
				}
				
			});
			
		}
		
		
	}
		
			    
			
};
exports.create = function(req, res)
{
		
};