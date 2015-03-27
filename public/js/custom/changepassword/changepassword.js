
	$("#submit").click(function()
	{
		var returnValue = true;
		if(jQuery.trim($("#pwd").val()).length == 0)
		{
			$("#deal_pwd").text("Password is required.");
			$("#deal_pwdgroup").addClass("has-error");
			returnValue = false;  
		}
		else
		{
			$("#deal_pwdgroup").addClass("has-success");
			$("#deal_pwd").text("");
		}
		if ($("#pwd").val() != $("#txt_confirmpwd").val()) 
		{
			$("#confirmPwd").text("Passwords do not match.");
			$("#confirmPwdGroup").addClass("has-error");
			returnValue = false;
		}	
		return returnValue;	
	  }); 