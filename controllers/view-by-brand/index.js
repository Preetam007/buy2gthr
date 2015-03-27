//connecting to mysql
var ejs1 = require("../../config.js");

var connection  = ejs1.connection;

exports.list = function(req, res)
{
	   if(!req.xhr)
		 {
			   connection.query("select * from brands",function(err,rows)
			   {
					 if(err) console.log(err);

					 res.render('./view-by-brand.dust',
					 {
						 messagm : 'yes',
						  brand : (req.params.id !=undefined ? req.params.id : 'all'),
						  data  : rows

					 });
			   });	 
		 }
	  else
	  {
		  if(req.query.method == 'brandlove')
		  {
			  connection.query("select status from brand_love where brand_id = ? and user_id = ?",                                                              [req.query.brand_id,10],function(err,rest)
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
					
					connection.query("update brand_love set status = ? where brand_id = ? and user_id = ?",
									 [stat,req.query.brand_id,10],function(err,ret)
									 {
						                if(err) console.log(err);
						
						                 res.send('ok');
						
					                 });
				}
				else
				{
					connection.query("insert into brand_love (brand_id,user_id,create_at) values(?,?,NOW())",                                                          [req.query.brand_id,10],function(err,rows)
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
			
			connection.query("select status from offer_love where offer_id = ? and user_id = ?",                                                              [req.query.offer_id,10],function(err,rest)
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
					
					connection.query("update offer_love set status = ? where offer_id = ? and user_id = ? ",
									 [stat,req.query.offer_id,10],function(err,ret)
									 {
						                if(err) console.log(err);
						
						                 res.send('ok');
						
					                 });
				}
				else
				{
					connection.query("insert into offer_love (offer_id,user_id,create_at) values(?,?,NOW())",                                                          [req.query.offer_id,10],function(err,rows)
					{
						if(err) console.log(err);

						console.log('yess did it');
						
						res.send('ok');
					
					});
				}
			});

		}
		  
		  
	  }
		
	   	
};
exports.list1 = function(req, res)
{
		  connection.query("select * from brands where brand_name = ?",[req.params.id],function(err,resd)
		   {
			  
			  
			  if(err) console.log(err);
			 
			    connection.query("select of.id , of.brand ,of.extra_off,of.plan_name ,of.type ,of.company ,tp.image_source from                                    offers of join toponlinestores tp on of.company = tp.store_name and of.brand = ?",                                                                [req.params.id],function(err,rows)
				 {
						 res.render('./view-by-brand.dust',
					     {
						   messagm : 'yes',
						   brand : req.params.id,
						   data1 :	resd,
						   data2 : rows 
						 });   
				 });
		   });
         	
};