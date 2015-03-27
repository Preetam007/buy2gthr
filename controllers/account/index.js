var ejs1 = require("../../config.js");
//connecting to mysql

var connection  = ejs1.connection;
var bcrypt = require('bcrypt-nodejs');
var fs = require('fs');

exports.list = function(req, res)
{
	if(!req.xhr)
	{
		connection.query("select id ,name ,email ,city ,college_name ,company_name ,image_source from users where id = ?",[10], function(err,rows) 
			 {
				if(!err)
				{
					//console.log(rows); 
					var clname = rows[0].name;
					var spnmae = clname.split(' ');
					res.render('./account.dust',
					{
						messagm          :  'yes',
						userprofile      :  'yes',
						ids              :  rows[0].id ,
						user_name        :  rows[0].name ,
						fisrt_name       :  spnmae[0],
						last_name        :  spnmae[1],
						email            :  rows[0].email ,
						city             :  rows[0].city ,
						college_name     :  rows[0].college_name ,
						company          :  rows[0].company_name ,
						image_source     :  rows[0].image_source 
					});
				}
				else
					console.log(err);	
			 });
	}
	else
	{
		if(req.query.method == 'userupdate')
	    {
			var name = req.query.name;
			var email = req.query.email;
			var comp = req.query.comp;
			var city= req.query.city;

			connection.query("update users set name = ? ,email = ? ,company_name = ? ,city = ?  where id = ?",     [name,email,comp,city,10],function(err,res)
			{
				if(err)
					console.log(err);
			});
			res.send('ok');
	   }
		else if(req.query.method == 'changepassword')
		{
			
			var old = req.query.oldpassword;
			var newpas1 = req.query.newpasword1;
			var newpas2 = req.query.newpasword2;
			
			
			connection.query("select password from users where id = ?",[10],function(err,rest)
			 {
					if(bcrypt.compareSync(old, rest[0].password) == true)
					{
						
						connection.query("update users set password = ? where id = ?",[newpas1,10],function(err,row)
						 {
                             if(err) console.log(err);
							
							  res.send('ok');

						 });
						
						;
					}
					else
					{
						res.send('no');
					}
			 });
			
			
		}
	}
		
};
exports.create = function(req, res)
{
	 console.log(req.files);
	 var path = req.files.inputPhoto.path;
	 var size = req.files.inputPhoto.size;  
	 
	if(size < 6000)
	{
			 fs.rename(path,'/JBK/buyTogether/public/'+req.files.inputPhoto.name, function (err) 
			 {
				   if (err) throw err;
				   console.log('renamed complete');

				   res.send(req.files.inputPhoto.name);
			 });
	  
			connection.query("update users set image_source = ?  where id = ?",                                     [req.files.inputPhoto.name,10],function(err,res)
			{
				if(err)
					console.log(err);
			});
	}
	else
	{
		res.send('IMAGE SIZE SHOULD BE LESS THAN 6 MB');
	}
	

};