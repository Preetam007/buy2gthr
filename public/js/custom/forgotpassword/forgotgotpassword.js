
	$("#submit").click(function()
	{
	    var returnValue = true;
		if(jQuery.trim($("#email").val()).length == 0)
		{
			 $("#email_error").text("Email is required.");
			$("#email_group").addClass("has-error");
			returnValue = false; 
		}
		else
		{
			var emailRegex = /[\._a-zA-Z0-9-]+@[\._a-zA-Z0-9-]+/igm;
			if (!emailRegex.test($("#email").val())) 
			{
				$("#email_error").text("Invalid Email ID.");
				$("#email_group").addClass("has-error");
				returnValue = false;
			} 
			else
			{
				$("#email_group").addClass("has-success");
				$("#email_error").text("");
			} 
		}
		return returnValue;
	});