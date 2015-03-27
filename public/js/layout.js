 
$(function () { $("[data-toggle='tooltip']").tooltip(); });









var previousScroll = 0,
    headerOrgOffset = $('#navbar1').height();
    //console.log(headerOrgOffset);
$('#header-wrap').height($('#navbar1').height());

$(window).scroll(function () {
    var currentScroll = $(this).scrollTop();
	//console.log(currentScroll);
    if (currentScroll > headerOrgOffset) {
        if (currentScroll > 60) {
            $('#navbar2').slideUp();
			$('#header-wrap').addClass("navbar-fixed-top");
        } 
    } 
	if(currentScroll == 0)
	{
	  $('#header-wrap').removeClass("navbar-fixed-top");
	   $('#navbar2').slideDown();
	}
    previousScroll = currentScroll;
});

