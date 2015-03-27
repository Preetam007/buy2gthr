//connecting to mysql
var ejs1 = require("../../config.js");

var connection  = ejs1.connection;

exports.list = function(req, res)
{
		 if(!req.xhr)
		 {
			    connection.query("select * from toponlinestores limit 0,10",function(err,rows)
			   {
				   if(err) console.log(err);
					
				   
						  res.render('./top-online-stores.dust',
						 {
							messagm : 'yes',
							store : (req.params.id !=undefined ? req.params.id : 'all'),
							data :rows
						 });
			   });
		 }
	else
	{
		if(req.query.method == 'toponlinestores')
		{


			connection.query("select status from toponlinestore_love where toponlinestore_id = ? and user_id = ?", [req.query.store_id,10],function(err,rest)
			{
				if(err) console.log(err);

				if(rest.length > 0)
				{
					console.log('jj');

					var stat ;

					if(rest[0].status == 0)
						stat = 1 ;
					else
						stat = 0;

					connection.query("update toponlinestore_love set status = ? where toponlinestore_id = ? and user_id = ?",
									[stat,req.query.store_id,10],function(err,ret)
									 {
						                if(err) console.log(err);

						res.send('ok');
					                 });
				}
				else
				{
					connection.query("insert into toponlinestore_love (toponlinestore_id,user_id,create_at) values(?,?,NOW())",                       [req.query.store_id,10],function(err,rows)
					{
						if(err) console.log(err);

						console.log('yess did it');

						res.send('ok');

					});
				}



			});



		}
		else if(req.query.method == 'offerlove')
		{
			if(req.query.follow == '1')
			{
			   connection.query("insert into offer_love (offer_id , user_id,create_at) values(?,?,NOW())",[req.query.offer_id ,10],
							 function(err,rows)
							 {
				                    if(err) console.log(err);
								    
			                 });	
				res.send('ok');
			}
			else 
			{
				connection.query("delete from  offer_love where offer_id = ? and user_id = ?",[req.query.offer_id ,10],
							 function(err,rws)
							 {
				                    if(err) console.log(err);
								    
			                 });	
				res.send('ok');
			}
		}
	}

};
exports.list1 = function(req, res)
{
	//console.log(req.body);

		  connection.query("select * from toponlinestores where store_name = ?",[req.params.id],function(err,resd)
		   {
	connection.query("select of.id ,IFNULL(of.plan_name,'flip') as plan_name ,of.extra_off,of.brand ,"+
 "br.image_source ,IFNULL(ol.is_live,2) as offer_love from offers of left join brands br "+
 "on of.brand = br.brand_name left join offer_love ol on of.id = ol.offer_id where of.company = ? limit 0,4",[req.params.id],function(err,rows)
				 {
		console.log(rows);
				    if(err) console.log(err);
				     console.log(resd);
				 
						 res.render('./top-online-stores.dust',
						 {
							 messagm : 'yes',
						     store : req.params.id,
							 data2 :resd,
							 data1 : rows
						 });
				 });
		   });

};
