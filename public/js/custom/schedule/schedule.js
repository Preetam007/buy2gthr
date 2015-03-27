$(window).scroll(function(){
        if ($(this).scrollTop() > 50) {
            $('#backToTop').fadeIn('slow');
        } else {
            $('#backToTop').fadeOut('slow');
        }
    });
    $('#backToTop').click(function(){
        $("html, body").animate({ scrollTop: 0 }, 500);
        return false;
    });
    
    $("#id_city option").click(function()
    {
      $(".step2").show();
    });
    $("#logout").click(function()
    {
      var cookies = $.cookie();
         for(var cookie in cookies) 
		 {
           $.removeCookie(cookie);
         }
    });