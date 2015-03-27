   "use strict";

    
	$(function()
	{ 
		  Tipped.create('#storeLove1', {position: 'topleft'});
		  Tipped.create('.togstar', {position: 'topleft'});
		
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
			
			//alert(cal);
		   var indexfollow = 	cal.indexOf('glyphicon-star-empty');
			
			//alert(sd);
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
	});

	//}
