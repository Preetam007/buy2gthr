
$(function()
{
	
	if($("#followuser").val() == '1')
	{
		$("#followuser").attr("title","click to unfollow this user");
	}
	else
		$("#followuser").attr("title","click to follow this user");

		Tipped.create('.profile-tooltip', {position: 'topleft'});
		Tipped.create('.reviews-tooltip', {position: 'topleft'});
		Tipped.create('.followers-tooltip', {position: 'topleft'});
		Tipped.create('.mates-tooltip', {position: 'topleft'});
		Tipped.create('.activities-tooltip', {position: 'topleft'});
		Tipped.create('#followuser', {position: 'topleft'});
	

	var aacolumns =[];
	var sort = [];

	aacolumns =
			[
				{ sWidth: '50%' },
				{ sWidth: '50%' }
		    ];
    sort = [ 1, "asc" ];
	

	var oTable = $('#recomfollowers').dataTable(
			{
				"bProcessing": true,
				"bDestroy": true,
				"bAutoWidth": false,
				"aoColumns": aacolumns,
				"aaSorting": [sort],
				"bLengthChange": false,
				"bFilter" :false,
				"paging": false,
				"ordering": false,
                "info":     false,
				"sAjaxSource": '/userProfile?method=getfollowers&userid='+user_id,
				"bDeferRender": true,
				"fnInitComplete": function(oSettings, json) {
				//getpeoplelisttable();
				}
		   });

			
	
	
	$('#input-id').on('rating.change', function(event, value, caption) {
	  $.ajax({
		       url: "/userProfile",
			   data:
				   {
					   method:'starrating',
					   value : value,
					   user_id : user_id
				   },
			   //cache:true,
			   success: function(data)
			    {
				    
			    }
	        });
     });
	
});

   $("#followuser").click(function()
   {
		$.ajax(
			{
				url: "/userProfile",
				data :
				{  
				  method :"followuser",
				  val   :	$("#followuser").val(),
				  user_id : user_id	
				},			
				success: function (data) 
				{
					var n = noty({
						text: 'NOTY - a jquery notification library!',
						animation: {
							open: 'animated bounceInLeft', // Animate.css class names
							close: 'animated bounceOutRight', // Animate.css class names
							easing: 'swing', // unavailable - no need
							speed: 500 // unavailable - no need
						}
					});
					
					if(data.ok == '0')
					{
						$("#followuser").text('follow');
						$("#followuser").val('0');
						
						
					}
					else
					{
						$("#followuser").text('following');
						$("#followuser").val('1');
					}
				}
		    }); 
   });


   

 $.fn.editable.defaults.mode = 'popup';

 $(".editname").each(function(a,e)
	    { 
			$('#'+this.id).editable({
				type: 'text',
				title: 'change your name',
				pk: 1,
			   name : this.id.slice(6,8),
		        value: $(this).attr('value'),    
		        url: '/userProfile',
		        display: function(value,response) {
		        	if(response != undefined)
		        		{
		        			if(response.ok != "ok")
		    	        	{
		        				$(this).html($(this).attr('value'));
		        				$(".editable-container").after("<br><div class='alert alert-success plisterrorDiv'>"+response.ok+"</div>");
		    	        		setTimeout(function() {$(".plisterrorDiv").remove();},3000);
		    	        	}
		        			else
		        				$(this).html(value);
		        		}	
		        		else
		        			$(this).html(value);
		        	}
		         }); 
	    });


$(".editemail").each(function(a,e)
	    { 
			$('#'+this.id).editable({
				type: 'text',
				title: 'change your email',
				pk: 2,
			   name : this.id.slice(6,8),
		        value: $(this).attr('value'),    
		        url: '/userProfile',
		        display: function(value,response) {
		        	if(response != undefined)
		        		{
		        			if(response.ok != "ok")
		    	        	{
		        				$(this).html($(this).attr('value'));
		        				$(".editable-container").after("<br><div class='alert alert-success plisterrorDiv'>"+response.ok+"</div>");
		    	        		setTimeout(function() {$(".plisterrorDiv").remove();},3000);
		    	        	}
		        			else
		        				$(this).html(value);
		        		}	
		        		else
		        			$(this).html(value);
		        	}
		         }); 
	    });




$(".editcomp").each(function(a,e)
	    { 
			$('#'+this.id).editable({
				type: 'text',
				title: 'change your company name',
				pk: 3,
			   name : this.id.slice(6,8),
		        value: $(this).attr('value'),    
		        url: '/userProfile',
		        display: function(value,response) {
		        	if(response != undefined)
		        		{
		        			if(response.ok != "ok")
		    	        	{
		        				$(this).html($(this).attr('value'));
		        				$(".editable-container").after("<br><div class='alert alert-success plisterrorDiv'>"+response.ok+"</div>");
		    	        		setTimeout(function() {$(".plisterrorDiv").remove();},3000);
		    	        	}
		        			else
		        				$(this).html(value);
		        		}	
		        		else
		        			$(this).html(value);
		        	}
		         }); 
	    });
		
$(".editcity").each(function(a,e)
	    { 
			$('#'+this.id).editable({
				type: 'text',
				title: 'change your city name',
				pk: 4,
			   name : this.id.slice(6,8),
		        value: $(this).attr('value'),    
		        url: '/userProfile',
		        display: function(value,response) {
		        	if(response != undefined)
		        		{
		        			if(response.ok != "ok")
		    	        	{
		        				$(this).html($(this).attr('value'));
		        				$(".editable-container").after("<br><div class='alert alert-success plisterrorDiv'>"+response.ok+"</div>");
		    	        		setTimeout(function() {$(".plisterrorDiv").remove();},3000);
		    	        	}
		        			else
		        				$(this).html(value);
		        		}	
		        		else
		        			$(this).html(value);
		        	}
		         }); 
	    });		


    $(window).scroll(function()
    {
		if ($(this).scrollTop() > 50) 
		{
		    $('#backToTop').fadeIn('slow');
		} 
		else
		{
		    $('#backToTop').fadeOut('slow');
		}
    });
    
    $('#backToTop').click(function()
    {
        $("html, body").animate({ scrollTop: 0 }, 500);
        return false;
    });
function getfollowers()
{
	var aacolumns =[];
	var sort = [];

		aacolumns =
			[
				{ sWidth: '50%' },
				{ sWidth: '50%' }
		    ];
		sort = [ 1, "asc" ];

var oTable = $('#allfollowers').dataTable(
		{
			"bProcessing": true,
			"bDestroy": true,
			"bInfo" : false,
			"bAutoWidth": false,
			"aoColumns": aacolumns,
			"aaSorting": [sort],
			"bLengthChange": false,
			"bFilter": true,
			"language": {
			searchPlaceholder: "Search preetam followers"
			},
			"sAjaxSource": '/userProfile?method=getfollowers&userid='+user_id,
			"bDeferRender": true,
			"fnInitComplete": function(oSettings, json) {
			//getpeoplelisttable();
			}
       });

	    $('.dataTables_filter label ').attr('class','pull-left');
		$('.dataTables_filter label input').css('width','200px');
}
   
    
  