
var ejs1 = require("../../config.js");
//connecting to mysql

var connection  = ejs1.connection;


//var connection  = ejs1.connection;
exports.list = function(req, res)
{
      var id = req.session.user_id ;
      //console.log(id);

    var datab = {flipkartdata : "flipkart" ,snapdealdata : "Snapdeal" , amazondata : "amazon" , myntradata : "myntra"
                    , jabongdata : "jabong" , fabfurnishdata : "fabfurnish" , zovidata : "zovi"
                    , yebhidata : "yebhi" , jungleedata : "junglee" , tradusdata : "tradus"
                    , healthkartdata : "healthkart", lenskartdata : "lenskart", yepmedata : "yepme",Zivamedata : "Zivame",FirstCrydata : "FirstCry",Pepperfrydata : "pepperfry"};

        if(id != undefined)
        {
          connection.query("select email from users where id = ?",[id],function(err,rows)
          {
            if(!err)
            {

                    if(!req.xhr)
                    {
                         req.session.email_id = rows[0].email ;
                        res.render('./home.dust',
                                  {
                                    email  : rows[0].email,
                                    messagm : "yes",
                                    loggedin : (req.session.isLoggedIn == true ? 1 : 0)
                                  });
                    }
                   else
                   {
                         var method = req.query.method ;
                          //console.log(method);

                         console.log(method);
                         console.log(datab[method]);
                         console.log(req.query.data_load);
                         if(req.query.method ==  method)
                         {
                            if(datab[method] != undefined)
                            {
                                var li = 0;
                                var gi = 16 ;
                                var ss ;
                                var data_load = 17 * (req.query.data_load -1)-(req.query.data_load-1-1);

                                console.log(data_load);

                                if(req.query.data_load != undefined && req.query.data_load != 1)
                                {
ss ="select DATE_FORMAT(date_posted,'%d %b %y') as date_posted ,DATEDIFF(date_posted,NOW()) as date_diff,offer_desc ,"+
"IFNULL(min_price,'not given')  as min_price,IFNULL(coupon_code,'no need') as coupon_code ,link,id from offers where "+
"company = ? limit "+data_load +",16 " ;
                                }
                                else
                                {

                                    console.log('q');
  ss = "select DATE_FORMAT(date_posted,'%d %b %y') as date_posted ,DATEDIFF(date_posted,NOW()) as date_diff,offer_desc ,"+
  "IFNULL(min_price,'not given')  as min_price,IFNULL(coupon_code,'no need') as coupon_code,link,id  from offers where "+
  "company = ? limit 0,16 ";
                                }

                                connection.query(ss,[datab[method]],function(err,rows)
                                {
                                   if(!err) res.send(rows);
                                   else
                                        console.log(err);
                                });
                            }
                            else if(req.query.method == 'offerProfileStar')
                             {
                                 var offer_id = req.query.offer_id ;
                                 var islive = req.query.is_live;

                                 connection.query("select id ,is_live from user_activity where user_id =? and offer_id = ? and activity_type_id = ?",[id,offer_id,3],function(err,rows)
                                        {
                                            if(!err)
                                            {
                                                if(rows.length < 1)
                                                {
                                                    //console.log("insert");
                                                     connection.query("INSERT INTO user_activity (user_id,offer_id,activity_type_id,is_live) values (?,?,?,?)",[id,offer_id,3,islive], function(err)
                                                     {
                                                        if(err)
                                                              console.log(err);
                                                     });

                                                }
                                                else
                                                {
                                                    //console.log("update");
                                                      connection.query("update user_activity set is_live = ? where id= ?",[islive,rows[0].id],function(err)
                                                      {
                                                          if(err)
                                                              console.log(err);
                                                      });
                                                }

                                            }
                                            else
                                                console.log(err);


                                        });


//

                                     connection.query("INSERT INTO offer_activity (activity_type_id,company,user_id,create_at,offer_id) values (?,?,?,NOW(),?)",[3,'flipkart',id,offer_id], function(err)
                                     {
                                          if(!err)
                                          {
                                              res.send("okk");
                                          }
                                          else
                                             console.log(err);
                                     });

                             }
                             else if(req.query.method == 'offerProfileLove')
                             {
                                    var offer_id = req.query.offer_id ;

                                      connection.query("INSERT INTO offer_activity (activity_type_id,company,user_id,create_at,offer_id) values (?,?,?,NOW(),?)",[4,'flipkart',id,offer_id], function(err)
                                     {
                                          if(!err)
                                          {
                                              res.send("okk");
                                          }
                                          else
                                             console.log(err);
                                     });
                             }
                             else if(req.query.method == 'updategeopoints')
                             {
                                 connection.query("update users set longitude = ? ,latitude = ? , browser = ? ,OS = ? where id = ?",[req.query.long,req.query.lat,req.query.browser,req.query.OS,10],function(err,refd)
                                 {
//                                     console.log('loikiiiu');

                                     if(err) console.log(err);
                                     else
                                        res.send('ok');
                                 });
                             }

                         }
                   }
            }
            else
               console.log(err);
          });
        }
        else
        {
           res.redirect('/info');

        }
};


