//$(function () {
//                $('#datetimepicker1').datetimepicker();
//            });



//$(".pickButton").click(function()
//	{
//	    $(this).hide(200);
//		$(".showForm").show(300);
//	});
//  $(".subButtn").click(function()
//	{
//	 var userName = $("#exampleInputName").val();
//	 
//	 var userEmail = $("#exampleEmailName").val();
//	    
//	    setCookie("name", userName, 1);
//	    setCookie("email", userEmail, 1);
//	    
//	});


	$("#Login").click(function()
	{//register button starts
		   var returnValue = true;
	       
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
		return returnValue;
	});//register button ends