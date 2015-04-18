   "use strict";

    
	$(function()
	{ 
		  Tipped.create('#storeLove1', {position: 'topleft'});
		  Tipped.create('.togstar', {position: 'topleft'});
		  Tipped.create('#next_load', {position: 'topleft'});
		  Tipped.create('#previous_load', {position: 'topleft'});
		
         $('#Container').mixItUp();
		 $('#storeLove1').on('click', function(e)
		  {
		    // e.preventDefault();
			 $.ajax(
			 {
				url: "/top-online-stores",
				data :
					{  
					  store_name : plan ,
					  store_id  :id ,	
					  method : 'toponlinestores'
					},
				success: function (data) 
				{
					console.log('done');
				   // $(ddd +'  span').toggleClass("glyphicon-star-empty");
					  $('#storeLove1 span').toggleClass("glyphicon-heart-empty"); //you can list several class names 
				}
			 });  
		  });

		$('.togstar').on('click', function(e)
		{
			e.preventDefault();
			
		    var id = '#'+this.id ;
			var offer_id = id.substring(10);
		  
			var cal = $(".togstar span").attr('class');
			
		    var indexfollow = 	cal.indexOf('glyphicon-star-empty');
			
			var follow = '';
			
			if(indexfollow != -1)
			{
				follow ='1';
			}
			else
				follow = '2';
				
		    $.ajax(
			{
				url: "/top-online-stores",
				data :
					{  
					  offer_id : offer_id ,
					  method : 'offerlove',
					  follow : follow
					},
					success: function (data) 
					{
						 $(id +'  span').toggleClass('glyphicon-star glyphicon-star-empty','true false');
						// $(id +'  span').toggleClass('glyphicon-star'); //you can list several class names 
						//sweetAlert('following!', 'Your will get notified if any body intersted in this offer', 'success');
					}
			});
		});
		
		
		var doc_location= document.location.href.split('/')[6] ;
		
		if(max_load <= 10)
		{
			
			$( ".pagination li a:lt(6):gt(1)" ).css("display","none");
			//, "title" : "no more offers"
			$(".pagination li a:last:first,.pagination li a:eq(1)" ).attr({"href" : "javascript:void(0)"});
		    Tipped.create('.pagination li a:last:first,.pagination li a:eq(1)', {position: 'topleft'});
		}
		else
		{
//			var remain = max_load - 10 ;
//			var remain_rows = reamin /10 ;
			
//			var div = 20 /10 ;
//			$( ".pagination li a:lt(6):gt("+div+")" ).css("display","none");
			//, "title" : "no more offers"
//			$(".pagination li a:last,.pagination li a:eq("+div+")" ).attr({"href" : "javascript:void(0)"});
//		    Tipped.create('.pagination li a:last:first,.pagination li a:eq(1)', {position: 'topleft'});

			for(i=max_load ; i<=max_load; i=i+10)
			{
				var div = Math.ceil(i/10) ;
				$( ".pagination li a:lt(6):gt("+div+")" ).css("display","none");
				//, "title" : "no more offers"
//				$(".pagination li a:last,.pagination li a:eq("+div+")" ).attr({"href" : "javascript:void(0)"});
            }
			
		}
			
		
		
		
	});

	//}
