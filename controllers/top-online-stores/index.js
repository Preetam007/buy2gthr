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
	
	//console.log('1st');
	console.log(req.params.data_load);
connection.query("select tp.* ,count(*) as maxdata_load from toponlinestores tp  join offers of on "+
				" tp.store_name =of.company where store_name = ?",[req.params.id],function(err,resd)
	   {
	
	       console.log(resd);
	        if(err) console.log(err);
			var data_load = 11 * (req.params.data_load -1)-(req.params.data_load-1-1);

	
	       // console.log(data_load);
			var ss = '';
            var next = parseInt(req.params.data_load) + parseInt(1);
	         
	       // console.log(req.params.id);
			if(req.params.data_load == undefined)
			{
				ss = "select of.id ,IFNULL(of.plan_name,'flip') as plan_name ,of.extra_off,of.brand ,"+
		"br.image_source ,IFNULL(ol.is_live,2) as offer_love from offers of left join brands br "+
		"on of.brand = br.brand_name left join offer_love ol on of.id = ol.offer_id where of.company = ? limit 0,10" ;
			}
			else if(req.params.data_load == NaN)
			{
				ss = "select of.id ,IFNULL(of.plan_name,'flip') as plan_name ,of.extra_off,of.brand ,"+
		"br.image_source ,IFNULL(ol.is_live,2) as offer_love from offers of left join brands br "+
"on of.brand = br.brand_name left join offer_love ol on of.id = ol.offer_id where of.company = ? limit 0,10 ";
			}
	        else
			{
				ss = "select of.id ,IFNULL(of.plan_name,'flip') as plan_name ,of.extra_off,of.brand ,"+
		"br.image_source ,IFNULL(ol.is_live,2) as offer_love from offers of left join brands br "+
	"on of.brand = br.brand_name left join offer_love ol on of.id = ol.offer_id where of.company = ? limit "+data_load+",10 ";
			}
	
             connection.query(ss,[req.params.id],function(err,rows)
			 {
	             console.log(ss);
				 if(err) console.log(err);
				 
				 res.render('./top-online-stores.dust',
				 {
					 messagm : 'yes',
					 store : req.params.id,
					 data2 :resd,
					 data1 : rows,
//					 maxdata_load : resd[0].maxdata_load ,
//					 data_load_next : 2,
					 data_load : req.params.data_load != undefined ? req.params.data_load : 1,
					 maxdata_load : resd[0].maxdata_load ,
					 data_load_next : req.params.data_load != undefined ? next : 2,
					 data_load_previous : req.params.data_load == 2 ? '': req.params.data_load -1
				 });
			 });
	   });
};
exports.list2 = function(req, res)
{
	console.log(req.params.data_load);
	
	if(req.params.data_load != undefined)
	{
		console.log('3st');
connection.query("select tp.* ,count(*) as maxdata_load from toponlinestores tp  join offers of on tp.store_name =of.company "+ 
			"where store_name = ?",[req.params.id],function(err,resd)
	   {  
			if(err) console.log(err);
			connection.query("select of.id ,IFNULL(of.plan_name,'flipkat offer') as plan_name ,of.extra_off,of.brand ,"+
			"br.image_source ,IFNULL(ol.is_live,2) as offer_love from offers of left join brands br "+
			"on of.brand = br.brand_name left join offer_love ol on of.id = ol.offer_id where of.company = ? limit 5,4",[req.params.id],function(err,rows)
			 {
//				console.log(rows);
				console.log(resd[0]);
				if(err) console.log(err);
                      var next = parseInt(req.params.data_load) + parseInt(1) ;
					 res.render('./top-online-stores.dust',
					 {
						 messagm : 'yes',
						 store : req.params.id,
						 data2 :resd,
						 data1 : rows,
						 data_load : req.params.data_load ,
						 maxdata_load : resd[0].maxdata_load ,
						 data_load_next : next,
						 data_load_previous : req.params.data_load -1

					 });
			 });
	   });
		
	}
		
};