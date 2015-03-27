
$("#save").click(function(event)
{
//	event.preventDefault();
//	console.log('yes');
//	
//	 var name = $("#inputName").val();
//	 var email = $("#inputEmail").val();
//	 var comp = $("#inputcompName").val();
//	 var city = $("#inputcity").val();
//	
//	console.log(name);
//	console.log(email);
//	console.log(comp);
//	console.log(city);
//	
//	 $.ajax({
//			   url: "/account",
//			   data:
//				   {
//					   method:'userupdate',
//					   name:name,
//					   email : email,
//					   comp:comp,
//					   city : city
//				   },
//			   //cache:true,
//			   success: function(data)
//			   {
//				   //$("#ff").empty();
//				   var str = '<div class="alert alert-success">'+
//							'<a href="#" class="close" data-dismiss="alert">&times;</a>'+
//							'<strong>Success!</strong> YourProfile has been updated.'+
//						     '/div>';
//				   $("#ff").fadeOut(1000, function(){
//						$("#ff").empty().append(str).fadeIn();
//					});
//				   //$("#ff").fadeOut().delay(1000).empty().append(str).fadeIn();
//	 			}
//	 		});
	
	    $('#myForm').ajaxForm({
			success: function(data)
			   {
				   if(data == 'IMAGE SIZE SHOULD BE LESS THAN 6 MB')
				   {
					   var str = '<div class="alert alert-info">'+
							'<a href="#" class="close" data-dismiss="alert">&times;</a>'+
							'<strong>Success!</strong> IMAGE SIZE SHOULD BE LESS THAN 6 MB.'+
						     '/div>';
					   $("#ff").fadeOut(1000, function(){
							$("#ff").empty().append(str).fadeIn();
						});
				   }
				   else
				   {
					   var str = '<div class="alert alert-success">'+
							'<a href="#" class="close" data-dismiss="alert">&times;</a>'+
							'<strong>Success!</strong> YourProfile has been updated.'+
						     '/div>';
					   $("#ff").fadeOut(1000, function(){
							$("#ff").empty().append(str).fadeIn();
						});
					   alert(data);
					   $("#imgid").attr("src", '/'+data);
				   }   
		       }
            });
});



$("#changepassword").click(function(event)
{
	event.preventDefault();
	
	 var oldpas = $("#inputcurrent").val();
	 var newpas1 = $("#inputnew").val();
	 var newpas2 = $("#inputagain").val();
	
	 $.ajax({
			   url: "/account",
			   data:
				   {
					   method:'changepassword',
					   oldpassword:oldpas,
					   newpasword1 : newpas1,
					   newpasword2:newpas2
				   },
			   success: function(data)
			   {
				   $('#pasform')[0].reset();
				   var str ;
				   if(data == 'ok')
				   {
					    str = '<div class="alert alert-success">'+
							'<a href="#" class="close" data-dismiss="alert">&times;</a>'+
							'<strong>Success!</strong> YourPAssword has been updated.'+
						     '/div>';
				   }
				   else
				   {
                        str = '<div class="alert alert-danger">'+
							'<a href="#" class="close" data-dismiss="alert">&times;</a>'+
							'<strong>Alert!</strong>please enter your old password correct.'+
						     '/div>';
				   
				   }
				    
				   $("#changepasdalert").fadeOut(800, function(){
						$("#changepasdalert").empty().append(str).fadeIn();
					});
				   
				  
				   console.log(data);
				}
			});
});
