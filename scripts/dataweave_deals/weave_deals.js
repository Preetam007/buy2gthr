var ejs1 = require("../../config.js");
//connecting to mysql
var connection  = ejs1.connection;			
var request = require('request');
var page = 6;
var ecomp = process.argv[2];


var hits = 0 ;

var datab = {
				flipkart:
						 {
							flipkartdata : 'http://api.dataweave.in/v1/coupons/listByStore/?'+
						'api_key=f7286d24b072626167c373671355077cf5175331&store=FlipKart&page='+page+'&per_page=10' ,
							link : 'www.flipkart.com'
					      },
	             snapdeal:
						 {
							snapdealdata : 'http://api.dataweave.in/v1/coupons/listByStore/?'+
				          'api_key=f7286d24b072626167c373671355077cf5175331&store=Snapdeal&page=1&per_page=10' ,
							link : 'www.snapdeal.com'
					      },
				 amazondata : '' , 
	             myntra:
						 {
							myntradata : 'http://api.dataweave.in/v1/coupons/listByStore/?'+
				 'api_key=f7286d24b072626167c373671355077cf5175331&store=Myntra&page=1&per_page=10', 
							link : 'www.myntra.com'
					      },
	             jabong:
						 {
							 jabongdata : 'http://api.dataweave.in/v1/coupons/listByStore/?'+
				 'api_key=f7286d24b072626167c373671355077cf5175331&store=Jabong&page=1&per_page=10' , 
							link : 'www.jabong.com'
					      },
				 fabfurnishdata : '' ,
	              zovi:
						 {
							 zovidata : 'http://api.dataweave.in/v1/coupons/listByStore/?'+
				 'api_key=f7286d24b072626167c373671355077cf5175331&store=Zovi&page=1&per_page=10', 
							link : 'www.zovi.com'
					      },
	             yebhi:
						 {
							 yebhidata : 'http://api.dataweave.in/v1/coupons/listByStore/?'+
				 'api_key=b20a79e582ee4953ceccf41ac28aa08d&store=Yebhi&page=1&per_page=10' , 
							link : 'www.yebhi.com'
					      },
				 jungleedata : '' ,
	             tradus :
						 {
							 tradusdata : 'http://api.dataweave.in/v1/coupons/listByStore/?'+
				 'api_key=b20a79e582ee4953ceccf41ac28aa08d&store=Tradus&page=1&per_page=10', 
							link : 'www.tradus.com'
					      },
	             healthkart :
						 {
							  healthkartdata : 'http://api.dataweave.in/v1/coupons/listByStore/?'+
				 'api_key=b20a79e582ee4953ceccf41ac28aa08d&store=HealthKart&page=1&per_page=10', 
							link : 'www.healthkart.com'
					      },
	             lenskart :
						 {
							  lenskartdata : 'http://api.dataweave.in/v1/coupons/listByStore/?'+
				 'api_key=b20a79e582ee4953ceccf41ac28aa08d&store=Lenskart.com&page=1&per_page=10', 
							link : 'www.lenskart.com'
					      },
				 yepmedata : '',
	             Zivame :
						 {
							  Zivamedata : 'http://api.dataweave.in/v1/coupons/listByStore/?'+
				 'api_key=f7286d24b072626167c373671355077cf5175331&store=Zivame&page=1&per_page=10', 
							link : 'www.zivame.com'
					      },
	             FirstCry :
						 {
							  FirstCrydata : 'http://api.dataweave.in/v1/coupons/listByStore/?'+
				 'api_key=f7286d24b072626167c373671355077cf5175331&store=FirstCry&page=1&per_page=10',
							link : 'www.firstcry.com'
					      },
	             Pepperfry :
						 {
							  Pepperfrydata : 'http://api.dataweave.in/v1/coupons/listByStore/?'+
				 'api_key=b20a79e582ee4953ceccf41ac28aa08d&store=Pepperfry&page=1&per_page=10',
							link : 'www.pepperfry.com'
					      },
	              fashionn :
						 {
							 fashionndata : 'http://api.dataweave.in/v1/coupons/listByStore/?'+
		         'api_key=f7286d24b072626167c373671355077cf5175331&store=Fashion%2Band%2BYou&page=1&per_page=10',
							link : 'www.fashionandyou.com'
					      }
			};	

var dat = ecomp+'data' ;
//var cccc= datab[ecomp][0] ;
console.log(datab[ecomp][dat]);
console.log(datab[ecomp]['link']);
//console.log(cccc[dat]);


	  httpcall(datab[ecomp][dat],datab[ecomp]['link']);

function httpcall(url,comp_link)
{

	    var link ;
		link = url;
	    var comp_link = comp_link
		
		//console.log(link);
	request(link,function (error,response,body)  
	{
		if(error) console.log(error);
		var data  = JSON.parse(body);
		
		    if(data.response != 'undefined')
			{
				
			    //console.log(data);
				for(var i = 0 ;i<data.data.length ; i++)
				{
					var plan_name = data.data[i].coupon_title ;
					var offer_desc  = data.data[i].coupon_description ;
					var link = data.data[i].coupon_link ; 
					var company = data.data[i].store ; 
					
					 connection.query("insert into offers (plan_name ,offer_desc,link ,company,comp_link) values (?,?,?,?,?)",[plan_name,offer_desc,link,company,comp_link],function(err)
					 { 
						  if(err) console.log(err);
						  console.log(i);
						 
					 });
				}
			}
	});
}	
