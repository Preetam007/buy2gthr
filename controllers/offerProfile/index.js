var ejs1 = require("../../config.js");
//connecting to mysql

var connection  = ejs1.connection;


exports.list = function(req, res)
{
     var user_id = req.session.user_id ;
	 var offer_id = req.params.id;

	//console.log(offer_id);

	 if (!req.xhr)
	   {
		 connection.query("select plan_name ,min_price, coupon_code ,type ,comp_link ,link,company,brand ,ol.user_id as user_id from offers of left join offer_love ol on  of.id = ol.offer_id  where of.id= ?",[offer_id], function(err,rows)
	     {
			if(!err)
			{
				for(var i = 0 ;i<rows.length;i++)
				{
					//console.log(rows[i].user_id);
                }

			    res.render('./offerProfile.dust',
				{
					plan_name : rows[0].plan_name ,
					min_price : rows[0].min_price ,
					coupon_code :  rows[0].coupon_code ,
					type :  rows[0].type ,
					brand :  rows[0].brand ,
					messagm : "yes",
					email : req.session.email_id ,
					offer_id : offer_id ,
					userid    : rows[0].user_id,
					comp_link : rows[0].comp_link,
					company : rows[0].company,
					offer_link : rows[0].link
				});
			}
			else
			    console.log(err);
		 });

	         connection.query("INSERT INTO offer_activity (activity_type_id,company,user_id,create_at,offer_id) values (?,?,?,CURDATE(),?)",[1,'flipkart',user_id,offer_id], function(err)
		     {

				 if(err) console.log(err);
			 });
	   }
	 else
		 {

		    if(req.query.method == 'getallmates')
		    {
		     connection.query("select id ,guid,name ,college_name ,company_name ,case  when logged_in= 1 then 'online' else 'offline' end as  logged_in ,email  from users where company_name =(select company_name from users where id = 10)", function(err,rows)
		     {
	            // console.log('mates');
				 //console.log(offer_id);

				 if(err) console.log(err);

				   var array =[];

				   for(var i=0 ; i<rows.length;i++)
					{
						var arr = [];
						var href = "/userProfile/b2gthrid/"+rows[i].guid;

						arr.push('<a href='+href+'></span>'+rows[i].name+'</a>');


						if(rows[i].college_name == '' || rows[i].college_name == null || rows[i].college_name == undefined)
						{
							arr.push('<a href="#"><span class="glyphicon glyphicon-record"></span>'+rows[i].company_name+'</a>');
						}
						else
						{
							arr.push(rows[i].college_name);
						}


						var str1 ='' ;
						if(rows[i].logged_in == 'online')
								str1 = "<a id='status"+rows[i].id+"' onclick='status("+rows[i].id+")'><span class='badge progress-bar-info'>chat</span></a>";
						else
							  str1 = "<a id='status"+rows[i].id+"' onclick='status("+rows[i].id+")'><span class='badge progress-bar-danger'>send msg</span></a>";

						arr.push(str1);
						arr.push(rows[i].email);
						arr.push('<button class="btn btn-primary invitation" type="button" id='+rows[i].id+'><span  class="badge">invite</span></button>');

						if(arr.length > 0)
							array.push(arr);
					}

				res.send({"aaData":array});
			 });
		    }
            else if(req.query.method == 'getallcitymates')
			 {
				 connection.query("select u.id ,guid,name ,college_name ,company_name ,city ,calony ,pocket ,case  when logged_in= 1 then 'online' else 'offline' end as logged_in,email ,up.who_can_contact_me,up.who_can_invite_me  from users u left join user_privacy up on u.id = up.user_id where city = ?",['delhi'] ,function(err,rows)
				 {
						if(err) console.log(err);


					// console.log(offer_id);

					   var array =[];

					   for(var i=0 ; i<rows.length;i++)
					   {

							var arr = [];
					var href = "/userProfile/b2gthrid/"+rows[i].guid;
						    arr.push('<a href='+href+'><span class="glyphicon glyphicon-user"></span>'+rows[i].name+'</a>');
						   arr.push("<a class='abx btn btn-lg btn-danger' id="+rows[i].id+" data-toggle='popover' >"+rows[i].city+"</a>");

						var str1 ='' ;
						if(rows[i].logged_in == 'online')
								str1 = "<a id='status"+rows[i].id+"' onclick='status("+rows[i].id+")'><span class='badge progress-bar-info'>chat</span></a>";
						else
							    str1 = "<a id='status"+rows[i].id+"' onclick='status("+rows[i].id+")'><span class='badge progress-bar-danger'>send msg</span></a>";

						arr.push(str1);

						arr.push(rows[i].email);
						  
						
						   if(rows[i].who_can_invite_me == '3')
						   {
							   arr.push('<span  class="badge" title="only company mate of this user can invite ">invite</span>'); 
						   }
						   else
						   {
							   arr.push('<button class="btn btn-primary invitation" type="button" id='+rows[i].id+'><span  class="badge">invite</span></button>');

						   }
						   
						


							if(arr.length > 0)
								array.push(arr);
						}

						res.send({"aaData":array});
					// res.send({"data":rows});


					 //console.log(rows);

				 });
			 }

		   else if(req.query.method == 'getcurrentmates')
		   {
		    connection.query("select u.id ,u.guid,u.name  ,u.company_name as place, case  when u.logged_in= 1 then 'online' else 'offline' end as  logged_in,u.email  from users u join offer_love ua on u.id = ua.user_id where ua.offer_id = ? and u.company_name =(select company_name from users us where us.id = ?) union select u.id ,u.guid,u.name ,u.city as place ,case  when u.logged_in= 1 then 'online' else 'offline' end as  logged_in,u.email  from users u join offer_love ua on u.id = ua.user_id where ua.offer_id = ? and u.city =(select city from users us where us.id = ?) and u.company_name != (select company_name from users us where us.id = ?)",[1,10,1,10,10], function(err,rows)
		     {
	             console.log('table');
				 if(err) console.log(err);
				var array =[];

				for(var i=0 ; i<rows.length;i++)
				{
					var arr = [];
					var href = "/userProfile/b2gthrid/"+rows[i].guid;
					arr.push('<a href='+href+'><span class="glyphicon glyphicon-user"></span>'+rows[i].name+'</a>');

					
					arr.push('<a href="#"><span class="glyphicon glyphicon-record"></span>'+rows[i].place+'</a>');
                    
					
					var str1 ='' ;
					if(rows[i].logged_in == 'online')
						str1 = "<a id='status"+rows[i].id+"' onclick='status("+rows[i].id+")'><span  class='badge alert-success'>chat</span></a>";
					else
						str1 = "<a id='status"+rows[i].id+"' onclick='status("+rows[i].id+")'><span class='badge alert-info'>send msg</span></a>";

					arr.push(str1);


					arr.push(rows[i].email);

					if(arr.length > 0)
						array.push(arr);
				}

				res.send({"aaData":array});

				 //console.log(rows);

			 });
		   }
			 else if(req.query.method == 'popover')
			 {

				res.header("Access-Control-Allow-Origin", "*");
                res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
				 

				 if (typeof(Number.prototype.toRad) === "undefined") {
					  Number.prototype.toRad = function() {
						return this * Math.PI / 180;
					}
				 }
				// console.log(req.query.id);
				 connection.query("SELECT longitude , latitude FROM buytogether.users where id = ? union SELECT longitude , latitude FROM buytogether.users where id = ? ",[10,11],function(err,resd)
				  {
					 //console.log(resd.length);

					 var lon1 = resd[0].longitude;
					 var lat1 = resd[0].latitude;

					 var  lon2 = resd[1].longitude;
					 var  lat2 = resd[1].latitude;

						 var R = 6371; // km
						var dLat = (lat2-lat1).toRad();
						var dLon = (lon2-lon1).toRad();
						var lat1 = lat1.toRad();
						var lat2 = lat2.toRad();

						var a = Math.sin(dLat/2) * Math.sin(dLat/2) +
								Math.sin(dLon/2) * Math.sin(dLon/2) * Math.cos(lat1) * Math.cos(lat2);
						var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
						var d = R * c;

						console.log(d);


					 var arr = [];
					 arr.push('<a href="www.google.com"><span class="glyphicon glyphicon-user"></span> </a><br><p>your city mate is'+d+'from you see on google map how far</p><br>'+
'<p id="googlemap">see on google map</p>'+
'<div class="modal fade" id="myModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">'+
  '<div class="modal-dialog">'+
    '<div class="modal-content">'+
 '<div class="modal-header"><button type="button" class="close" data-dismiss="modal"><span aria-hidden="true">'+
							  '&times;</span><span class="sr-only">Close</span></button>'+
       '<h4 class="modal-title" id="myModalLabel">Modal title</h4>'+
     '</div>'+
      '<div class="modal-body  gscriptid">'+
	 '</div>'+
      '<div class="modal-footer">'+
      '  <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>'+
       ' <button type="button" class="btn btn-primary">Save changes</button>'+
     ' </div>'+
   ' </div>'+
  '</div>'+
'</div><button type="button" class="close" id="closepopover" aria-hidden="true">&times;</button>');
					 res.send(arr);

				  });
			 }
			 else if(req.query.method == 'sendinvitation')
			 {
//				 console.log(req.query.userid);
//				 console.log(req.query.offerid);
//				 console.log(req.query.htm);


				 var senthtm  ;

				 if(req.query.htm == 'invite')
				 {
					 senthtm = 'invitation sent';
				 }
				 else
					 senthtm = 'invite';


		connection.query("select id ,invitation_status from offer_invitation where offer_id = ? and user_id = ? and invited_by = ?",[req.query.offerid,req.query.userid,10],function(err,ref)
		 {
			if(err) console.log(err);
			else
			{
				if(ref.length == 0)
				{
					 connection.query("INSERT INTO offer_invitation (offer_id,user_id,invited_by,invitation_status) values (?,?,?,?)",[req.query.offerid,req.query.userid,10,1],function(err,resd)
				  {
                       if(err) console.log(err);
					   else
						    res.send(senthtm);
				  });
				}
				else
				{
					var status ;

					if(ref[0].invitation_status == 1)
						status = 0;
					else
						status =1 ;


					connection.query('update offer_invitation set invitation_status = ? where offer_id = ? and user_id = ? and invited_by = ?',[status,req.query.offerid,req.query.userid,10],function(err,ups)
						{
							if(err) console.log(err);
						    else
								res.send(senthtm);
					   });
				}

			}



		 });


             }




		 }













//	if(req.session.isLoggedIn == true)
//	  {
		//console.log(req.params.id);

//	  }
//	else
//		res.send('okk');

};
