$("#save").click(function()
{
	var profile = $("#profile").val();
	var contact = $("#contact").val();
	var invite = $("#invite").val();
    var email = $("#email").val();
	var follow = 	$("#follow").val();
	
	$.ajax({
		       url: "/privacy",
			   data:
				   {
					   method:'updateprivacy',
					   profile: profile.toString(),
					   contact : contact.toString(),
					   invite  : invite.toString(),
					   email : email.toString(),
					   follow : follow.toString()
				   },
			   //cache:true,
			   success: function(data)
			   {
				    var str = '<div class="alert alert-success">'+
							'<a href="#" class="close" data-dismiss="alert">&times;</a>'+
							'<strong>Success!</strong> Your Privacy has been updated.'+
						     '</div>';
				   $("#ff").fadeOut(1000, function(){
						$("#ff").empty().append(str).fadeIn();
					});
			    }
	         });
});
$(document).ready(function() {
			Tipped.create('.profile-tooltip', {position: 'topleft'});
	        Tipped.create('.contact-tooltip', {position: 'topleft'});
	        Tipped.create('.email-tooltip', {position: 'topleft'});
	        Tipped.create('.invite-tooltip', {position: 'topleft'});
	        Tipped.create('.follow-tooltip', {position: 'topleft'});
	
	
  });