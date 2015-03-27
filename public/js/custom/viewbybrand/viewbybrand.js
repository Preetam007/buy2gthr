"use strict";
$('.togstar').on('click', function(e) {
	
	  var id = '#'+this.id ;
	
	  var offer_id = id.substring(10);
	
       console.log(offer_id);

		  e.preventDefault();

		 $.ajax({
					url: "/view-by-brand",
					data :
						{  
						  offer_id : offer_id ,
						  method : 'offerlove'
						},
						success: function (data) 
						{
							  $(id +'  span').toggleClass('glyphicon-star-empty'); //you can list several class names 
						}
			});
	
     
//      e.preventDefault();
			
			
			
    });

$(function()
{
	
	$('#brandLove1').on('click', function(e) 
	{
			console.log(brand);	
		    console.log(id);
		
		 $.ajax({
					url: "/view-by-brand",
					data :
						{  
						  brand_name : brand ,
						  brand_id  :id ,	
						  method : 'brandlove'
						},
						success: function (data) 
						{
						   // $(ddd +'  span').toggleClass("glyphicon-star-empty");
							 $('#brandLove1 span').toggleClass("glyphicon-heart-empty"); //you can list several class names ; //you can list several class names 
						}
				  }); 
		  
		  e.preventDefault();	
     });
	
	
	
	
	
});
