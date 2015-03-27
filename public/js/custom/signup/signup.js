var companies = [];
var colleges = [];
$(function()
{
	
//	$.ajax({
//		url: "/signup",
//		data :
//			{  
//			  method :"updatetypehead"
//			},
//	
//			success: function (data) 
//			{ 
//				for(var i = 0 ; i<data.length ; i++)
//					{ 
//					companies.push(data[i].comp_name);
//					 
//					}
//		    }
//       });   
});


    
	$("#Register").click(function()
	{
		   var returnValue = true;
	       if(jQuery.trim($("#inputName").val()).length == 0)
	       {
	    	   // $("#allerrordiv").show();
		        $("#inputName_error").text("First Name is required.");
				$("#inputName_group").addClass("has-error");
				returnValue = false;  
		   }
		   else
		   {
			  $("#inputName_group").addClass("has-success");
			  $("#inputName_error").text("");
		   }
	      
		  
		  
		  
	      if(jQuery.trim($("#inputEmail").val()).length == 0)
		  {
	    	  	//$("#allerrordiv").show();
			    $("#inputEmail_error").text("Email is required.");
				$("#inputEmail_group").addClass("has-error");
				 returnValue = false; 
		  }
	      else
	      {
		       var emailRegex = /[\._a-zA-Z0-9-]+@[\._a-zA-Z0-9-]+/igm;
			   if (!emailRegex.test($("#inputEmail").val())) 
	           {
				    // $("#allerrordiv").show();
			         $("#inputEmail_error").text("Invalid Email ID.");
			         $("#inputEmail_group").addClass("has-error");
			    	  returnValue = false;
	           } 
			   else
			   {
				    $("#inputEmail_group").addClass("has-success");
				    $("#inputEmail_error").text("");
			   } 
	       }	
	      
	      
	      if(jQuery.trim($("#inputPassword").val()).length == 0)
	       {
	    	   // $("#allerrordiv").show();
		        $("#inputPassword_error").text("First Pass is required.");
				$("#inputPassword_group").addClass("has-error");
				returnValue = false;  
		   }
		   else
		   {
			  $("#inputPassword_group").addClass("has-success");
			  $("#inputPassword_error").text("");
		   }
		   
		   if($("#id_city option:selected").val() == '')
	       {
	    	   // $("#allerrordiv").show();
		        $("#inputCity_error").text("City Name is required.");
				$("#inputCity_group").addClass("has-error");
				returnValue = false;  
		   }
		   else
		   {
			  $("#inputCity_group").addClass("has-success");
			  $("#inputCity_error").text("");
		   }
		   
		            
		 if(jQuery.trim($("#inputComp").val()).length == 0)
		   {
			   // $("#allerrordiv").show();
				$("#inputComp_error").text("Comp Name is required.");
				$("#inputComp_group").addClass("has-error");
				returnValue = false;  
		   }
		else
		   {
			  $("#inputComp_group").addClass("has-success");
			  $("#inputComp_error").text("");
		   }
					   
		return returnValue;
	});//register button ends
	
//	 $("#id_city option").click(function()
//    {
//      $(".step5").show();
//     // alert(2);
//      
//      $.ajax({
//			url :"/signup",
//			data : {
//				     method : "updatecolleges"
//			       },
//			 success: function(data)
//			 { 
//				 var datas= data.arr;
//				 
//				 for(var i = 0 ; i<datas.length ; i++)
//					{
//					 
//					 colleges.push(datas[i].college_name);
//					 
//					 var drop= "drop";
//					 var div_data="<li value="+datas[i].college_name+" class= "+drop+" >"+datas[i].college_name+"</li>";
//		                //console.log(div_data);
//		                $(div_data).appendTo('#menu14'); 
//					 
//					 //$("#menu14 li").text(datas[i].college_name);
//					//companies.push(data[i].comp_name);
//					 
//					 
//					}
//			 }
//		  });
//      
//      
//    });
	
//	    var substringMatcher = function(strs) {
//    	  return function findMatches(q, cb) {
//    	    var matches, substrRegex;
//    	 
//    	    // an array that will be populated with substring matches
//    	    matches = [];
//    	 
//    	    // regex used to determine if a string contains the substring `q`
//    	    substrRegex = new RegExp(q, 'i');
//    	 
//    	    // iterate through the pool of strings and for any string that
//    	    // contains the substring `q`, add it to the `matches` array
//    	    $.each(strs, function(i, str) {
//    	      if (substrRegex.test(str)) {
//    	        // the typeahead jQuery plugin expects suggestions to a
//    	        // JavaScript object, refer to typeahead docs for more info
//    	        matches.push({ value: str });
//    	      }
//    	    });
//    	 
//    	    cb(matches);
//    	  };
//    	};
    	 
    	

			

	
	var compreasontypeahead = $('#inputComp').typeahead(
		{
		name: 'inputComp',
		template: [
			'<p>{{label}}</p>'
			].join(''),
		  engine: Hogan ,
		  remote: {
		    url: '/signup?method=searchcomp&search=%QUERY',
		    cache: false,
		    filter: function(response) 
		    {
				
				console.log(response);
		    	var a = new Array();
				
		    	for (var i =0; i< response.length;i++) 
				{
					  var o = new Object();
					  o.label = response[i].NAME;
					  o.value = response[i].NAME;
					  o.id    =	response[i].ID;
					  a.push(o);
				}
				  return a;
			} 
		  }
	}
	
	);

	compreasontypeahead.on('typeahead:selected',function(evt,data)
	{
		$("#inputComp").val(data.id);
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
	
	
	
	
	
	
	
	
	
	