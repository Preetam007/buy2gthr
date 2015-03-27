var ejs1 = require("../../config.js");
//connecting to mysql

var connection  = ejs1.connection;

exports.list = function(req, res)
{
	   if (!req.xhr)
	   {
	      res.render('./admin.dust');
	   }
	   else
	   {
	      if(req.query.method == 'getreqComp')
		  {
		     connection.query("select user_id ,user_name,user_city,old_comp_name from req_companies where verified = ?",[0],function(err,rows)
			 {
				   var array =[];
				   for(var i=0 ; i<rows.length;i++)
					{
						var arr = [];
						arr.push('<input name="select"  value= "'+rows[i].user_id+'" class="select" type="checkbox"/>');
						arr.push(rows[i].user_id);
						arr.push(rows[i].user_name);
						arr.push(rows[i].user_city);
						arr.push('<a id="'+rows[i].user_id+'comp" value="'+rows[i].old_comp_name+'" class="complisttable">'+rows[i].old_comp_name+'</a>');
						
						if(arr.length > 0)
							array.push(arr);
					}
				   res.send({"aaData":array});	
			 });
		  }
		  else if(req.query.method == 'getlogComp')
		  {
		     connection.query("select user_id ,user_name,user_city,old_comp_name ,verified_comp_name "+
			 "from req_companies where verified= 1",function(err,rows)
			 {
			    if(err) console.log(err);
				
				   var array =[];
				   for(var i=0 ; i<rows.length;i++)
					{
						var arr = [];
						arr.push(rows[i].user_id);
						arr.push(rows[i].user_name);
						arr.push(rows[i].user_city);
						arr.push(rows[i].old_comp_name);
						arr.push(rows[i].verified_comp_name);
						
						
						if(arr.length > 0)
							array.push(arr);
					}
				   res.send({"aaData":array});	
			 });
		  }
	   }
	
	
};
exports.create = function(req, res,next)
{
           if (req.body.pk != undefined)
		       {
					 connection.query("update  users set company_name = ? where id = ?",[req.body.value ,req.body.name],function(err,rows)
					 { 
						  if(err) console.log(err);
						  else
							   {
								  res.send({ok:"ok"});
								  console.log("we did it");
							   }
					 });
					 
//                  insert modified name into como_college               //
					 
					 
//					 connection.query("insert into comp_college(name) values(?)",[req.body.value],function(err,rows)
//					 { 
//					      console.log(rows);
//						  if(err) console.log(err);
//					 });
					 
					 connection.query("update  req_companies set verified_comp_name = ? ,verified = ? where user_id = ?",[req.body.value,1 ,req.body.name],function(err,rows)
					 { 
						  if(err) console.log(err);
										 
					 });  
			   }
   
	
};