
$(function()
{

    var now = moment();

//    console.log(now);

//    var p1 = new google.maps.LatLng(77.1091096, 28.711379100000002);
//    var p2 = new google.maps.LatLng(77.1091096, 28.711379100000002);
//
//    alert(calcDistance(p1, p2));
//
//    //calculates distance between two points in km's
//    function calcDistance(p1, p2){
//      return (google.maps.geometry.spherical.computeDistanceBetween(p1, p2) / 1000).toFixed(2);
//    }

    //open braces
//    var lat1 = 28.711379100000002 ;
//    var lat2 = 28.711379100000002;
//
//    var lon1 = 74.1091096;
//    var lon2 = 77.1091096 ;
//
//
//    Number.prototype.toRad = function() {
//      return this * Math.PI / 180;
//    }
//
//    var R = 6371000; // km
//    var dLat = (lat2-lat1).toRad();
//    var dLon = (lon2-lon1).toRad();
//    var lat1 = lat1.toRad();
//    var lat2 = lat2.toRad();
//
//    var a = Math.sin(dLat/2) * Math.sin(dLat/2) +
//            Math.sin(dLon/2) * Math.sin(dLon/2) * Math.cos(lat1) * Math.cos(lat2);
//    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
//    var d = R * c;
//
//
//    alert(d);

    $.ajax({
        url: "/home",
        data :
            {
              method :"flipkartdata"
            },
        beforeSend : function()
            {
              $('#FlipkartPanel').html("<h1 class='wait_load'>heads up...loading data</h1>")
            },
        success: function (data)
            {
                $('#FlipkartPanel').empty();

               for(var i = 0 ; i< data.length ; i++)
               {
                 var date_diff ;
                 //var curdate = moment(data[i].date_posted, "MM-DD-YYYY");

                 date_diff = data[i].date_diff ;

                   if(date_diff == 0)
                       date_diff = "posted today" ;
                   else
                       date_diff = "posted "+Math.abs(date_diff)+" day ago" ;

                    var str = "<div class='col-xs-6 col-sm-3 '>"+
                                  "<div class='panel panel-default data-box'>"+
                                       "<div class='panel-body' align='center'>"+
"<a href='/offerProfile/id/"+data[i].id+"' ><img class='lazy img-rounded' data-original='/images/fab-furnish-logo.gif'  />"+
                                            "<h5><strong>"+data[i].offer_desc.substring(0,70)+"...</strong></h5></a>"+

                                             "<div class='txt2'><strong><h5>[Min Price. <i class='fa fa-inr'></i>"+data[i].min_price+"]</h5></strong></div>"+
                                             "<div class='text-muted'><h5>[coupon_code:"+data[i].coupon_code+"]</h5></div>"+
                                             "<div>"+
                                                  "<p><a class='btn btn-info btn-md' href='"+data[i].link+"' target='_blank'>Shop Now</a></p>"+
                                             "</div>"+
                                             "<div class='row'>"+
                                                 "<button type='button' id='togLike"+data[i].id+"' class='btn togLike' title ='get notifications'>"+
                                                      "<span class='glyphicon glyphicon-heart'></span>"+
                                                  "</button>"+
                                                  "<button type='button' style='margin-left : 8px' id='togStar"+data[i].id+"' class='btn togStar' title ='get notifications'>"+
                                                       "<span class='glyphicon glyphicon-star'></span>"+
                                                  "</button>"+
                                                  "<button class='btn togShare' data-toggle='modal' data-target='#less"+data[i].id+"' style='margin-left : 8px' id='togShare"+data[i].id+"' >"+
                                                   "<span class='glyphicon glyphicon-share'></span>"+
                                                   "</button>"+
                                                   "<div id='less"+data[i].id+"' class='modal'>"+
                                                    "<div class='modal-dialog '>"+
                                                        "<div class='modal-content'>"+
                                                            "<div class='modal-header'>"+
                                                                "<button type='button' class='close' data-dismiss='modal' aria-hidden='true'>&times;</button>"+
                                                                "<h4 class='modal-title'>Confirmation</h4>"+
                                                            "</div>"+
                                                            "<div class='modal-body'>"+
                                                                "<p>Do you want t</p>"+
                                                                "<p class='text-warning'><small>If you don'.</small></p>"+
                                                            "</div>"+
                                                            "<div class='modal-footer'>"+
                               "<button type='button' class='btn btn-default' data-dismiss='modal'>Close</button>"+

                                                            "</div>"+
                                                        "</div>"+
                                                    "</div>"+
                                                "</div>"+

                                              "</div>"+
                                              "<footer>"+date_diff+"</footer>"+
                                         "</div>"+
                                      "</div>"+
                                "</div>" ;
                     $(str).appendTo('#FlipkartPanel');
                     $(".pagination li a").addClass('flipkartdata #FlipkartPanel');
               }
                $("img.lazy").lazyload(
                {
                    effect : "fadeIn"
                });
            }
       });

});

if(typeof(Storage) !== "undefined") {

    if(localStorage.getItem("geopoint") !='yes')
    {
        if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition);
        } else {
            $("#demo").html("Geolocation is not supported by this browser.");
        }
        localStorage.setItem("geopoint", "yes");
    }
} else {
    console.log('local storage not supported');
}



    function showPosition(position) {
        var OS_Name = navigator.appVersion;
        if (OS_Name.indexOf("Win") != -1)
        {
            OS_Name = "Windows Operating System ";
        }
        else if (OS_Name.indexOf("Mac") != -1)
        {
            OS_Name = "Mac Operating System ";

        } else if (OS_Name.indexOf("X11") != -1)
        {
            OS_Name = "Unix Operating System ";

        } else if (OS_Name.indexOf("Linux") != -1)
        {
            OS_Name ="Linux Operating System ";

        } else if (OS_Name.indexOf("SunOS") != -1)
        {
            OS_Name ="Solaris Operating System ";

        } else
        {
            OS_Name ="Unknown Operation System ";
        }

//        $.ajax({
//        url: "/home",
//        data :
//            {
//              method  : "updategeopoints",
//              long    : position.coords.longitude,
//              lat     : position.coords.latitude ,
//              browser : navigator.appCodeName ,
//              OS      : OS_Name
//            },
//        success: function (data)
//            {
//                console.log(data);
//            }
//        });
        //$("#demo").html(position.coords.latitude+" fg" + position.coords.longitude) ;
    }





 $("a[href='#Flipkart']").click(function()
{
     $(".pagination li a").removeClass(function(){return $(this).attr("class");}).addClass("flipkartdata #FlipkartPanel");
});

 $("a[href='#Snapdeal'],a[href='#Amazon'],a[href='#Myntra'],a[href='#Jabong'],a[href='#FabFurnish'],a[href='#Zovi'],"+
   "a[href='#Yebhi'],a[href='#Junglee'],a[href='#Tradus'],a[href='#HealthKart'],a[href='#LensKart'],a[href='#YepMe'],"+
   "a[href='#Zivame'],a[href='#FirstCry'],a[href='#Pepperfry']").click(function()
{

     if($(window).scrollTop() > 10)
     {
         $('html, body').animate({scrollTop : 0},800);
     }

    var cc =  $(this).attr('href') ;
    var dd = cc.split("#");
    var comp = dd[1];

    var obj = {Snapdeal:"snapdealdata",Amazon:"amazondata",Myntra:"myntradata",Jabong:"jabongdata",FabFurnish:"fabfurnishdata"
               ,Zovi:"zovidata",Yebhi:"yebhidata",Junglee:"jungleedata",Tradus:"tradusdata",HealthKart:"healthkartdata"
            ,LensKart:"lenskartdata",YepMe:"yepmedata",Zivame : "Zivamedata",FirstCry : "FirstCrydata",Pepperfry : "Pepperfrydata"};

    var panel = {Snapdeal:"#SnapdealPanel",Amazon:"#AmazonPanel",Myntra:"#MyntraPanel",Jabong:"#JabongPanel",FabFurnish:"#FabFurnishPanel"
               ,Zovi:"#ZoviPanel",Yebhi:"#YebhiPanel",Junglee:"#JungleePanel",Tradus:"#TradusPanel",HealthKart:"#HealthKartPanel"
               ,LensKart:"#LensKartPanel",YepMe:"#YepMePanel",Zivame:"#ZivamePanel",FirstCry:"#FirstCryPanel",Pepperfry:"#PepperfryPanel"};


    $.ajax({
        url: "/home",
        data :
            {
              method : obj[comp]
            },
            beforeSend : function()
            {
              $(panel[comp]).html("<h1 class='wait_load'>heads up..."+comp+" fetching data</h1>");
            },
            success: function (data)
            {
                $(panel[comp]).empty();
               for(var i = 0 ; i< data.length ; i++)
               {
                   var date_diff ='';
                   date_diff = data[i].date_diff ;

                   if(date_diff == 0)
                       date_diff = "posted today" ;
                   else
                       date_diff = "posted "+Math.abs(date_diff)+" day ago" ;

                    var str = "<div class='col-xs-6 col-sm-3'>"+
                                  "<div class='panel panel-default data-box'>"+
                                       "<div class='panel-body' align='center'>"+
                                            "<a href='/offerProfile/id/"+data[i].id+"'><img src='/js/custom/home/Snapdeal-logo.png' class='img-rounded' />"+
                                            "<br />"+
                                            "<h5><strong>"+data[i].offer_desc.substring(0,70)+"...</strong></h5></a>"+

                                             "<div class='txt2'><strong><h5>[Min Price. "+data[i].min_price+"]</h5></strong></div>"+
                                             "<div class='text-muted'><h5>[coupon_code :"+data[i].coupon_code+"]</h5></div>"+
                                             "<div>"+
                                                  "<p><a class='btn btn-primary btn-md' href='http://"+data[i].link+"' target='_blank'>Shop Now</a></p>"+
                                             "</div>"+
                                             "<div class='row'>"+
                                             "<button type='button' class='btn'>"+
                                              "<span class='glyphicon glyphicon-thumbs-up'></span>"+
                                              "</button>"+
                                              "<button type='button' style='margin-left : 8px' id= 'togSt' class='btn togStar'>"+
                                              "<span class='glyphicon glyphicon-star'></span>"+
                                              "</button>"+
                                              "</div>"+
                                              "<footer>"+date_diff+"</footer>"+
                                         "</div>"+
                                      "</div>"+
                                "</div>" ;

                     $(str).appendTo(panel[comp]);

                    $(".pagination li a" ).removeClass(function() {
                      return $(this).attr( "class" );
                    }).addClass(obj[comp]+" "+panel[comp]);



//                     $(".pagination li a").addClass(obj[comp]);
               }
            }
       });
});
   $('body').on('click','.togStar',function(){

       var idd = this.id ;

       var spli = idd.split('r');
       var offer_id = spli[1];

      var ddd = '#'+idd;

     var  isliveClas = $(this).children('span').attr('class');
     //console.log(isliveClas);

       var is = isliveClas.indexOf("empty");

       //console.log(is);
       var islive = '' ;

       if(isliveClas.indexOf("empty") != -1)
        {
            islive = 1 ;
        }
       else
           islive = 0 ;



      $.ajax(
      {
        url: "/home",
        data :
            {
              is_live : islive,
              offer_id : offer_id ,
              method : 'offerProfileStar'
            },
            success: function (data)
            {
                $(ddd +'  span').toggleClass("glyphicon-star-empty");
            }
        });
    });

$('body').on('click','.togLike',function()
    {

       var idd = this.id ;
       //console.log(idd);
       var spli = idd.split('e');
       var offer_id = spli[1];

       var ddd = '#'+idd;

      $.ajax({
                url: "/home",
                data :
                    {
                      offer_id : offer_id ,
                      method : 'offerProfileLove'
                    },
                    success: function (data)
                    {
                       // $(ddd +'  span').toggleClass("glyphicon-star-empty");
                          $(ddd +'  span').toggleClass("glyphicon-heart-empty");
                    }
              });
    });

   $(".pagination li a").click(function()
    {
     var method = $(this).attr('class').split(' ')[0];
     var panel_data = $(this).attr('class').split(' ')[1] ;

     var comp = 'flipkart' ;
        $.ajax({
                        url: "/home",
                        data :
                            {
                              data_load : $(this).attr('data_load') ,
                              method : method
                            },
                        beforeSend : function()
                        {
                          $(panel_data).html("<h1 class='wait_load'>heads up..."+comp+" fetching data</h1>");
                        },
                        success: function (data)
                        {
                           $(panel_data).empty();
                           for(var i = 0 ; i< data.length ; i++)
                           {
                               var date_diff ='';
                               date_diff = data[i].date_diff ;

                               if(date_diff == 0)
                                   date_diff = "posted today" ;
                               else
                                   date_diff = "posted "+Math.abs(date_diff)+" day ago" ;


                                var str = "<div class='col-xs-6 col-sm-3'>"+
                                              "<div class='panel panel-default data-box'>"+
                                                   "<div class='panel-body' align='center'>"+
            "<a href='/offerProfile/id/"+data[i].id+"' ><img class='lazy img-rounded' data-original='/images/fab-furnish-logo.gif'  />"+
                                                        "<h5><strong>"+data[i].offer_desc.substring(0,70)+"...</strong></h5></a>"+

                                                         "<div class='txt2'><strong><h5>[Min Price. <i class='fa fa-inr'></i>"+data[i].min_price+"]</h5></strong></div>"+
                                                         "<div class='text-muted'><h5>[coupon_code:"+data[i].coupon_code+"]</h5></div>"+
                                                         "<div>"+
                                                              "<p><a class='btn btn-info btn-md' href='"+data[i].link+"' target='_blank'>Shop Now</a></p>"+
                                                         "</div>"+
                                                         "<div class='row'>"+
                                                             "<button type='button' id='togLike"+data[i].id+"' class='btn togLike' title ='get notifications'>"+
                                                                  "<span class='glyphicon glyphicon-heart'></span>"+
                                                              "</button>"+
                                                              "<button type='button' style='margin-left : 8px' id='togStar"+data[i].id+"' class='btn togStar' title ='get notifications'>"+
                                                                   "<span class='glyphicon glyphicon-star'></span>"+
                                                              "</button>"+
                                                              "<button class='btn togShare' data-toggle='modal' data-target='#less"+data[i].id+"' style='margin-left : 8px' id='togShare"+data[i].id+"' >"+
                                                               "<span class='glyphicon glyphicon-share'></span>"+
                                                               "</button>"+
                                                               "<div id='less"+data[i].id+"' class='modal'>"+
                                                                "<div class='modal-dialog '>"+
                                                                    "<div class='modal-content'>"+
                                                                        "<div class='modal-header'>"+
                                                                            "<button type='button' class='close' data-dismiss='modal' aria-hidden='true'>&times;</button>"+
                                                                            "<h4 class='modal-title'>Confirmation</h4>"+
                                                                        "</div>"+
                                                                        "<div class='modal-body'>"+
                                                                            "<p>Do you want t</p>"+
                                                                            "<p class='text-warning'><small>If you don'.</small></p>"+
                                                                        "</div>"+
                                                                        "<div class='modal-footer'>"+
                                                                            "<button type='button' class='btn btn-default' data-dismiss='modal'>Close</button>"+
                                                                            "<button type='button' class='btn btn-primary'>Save changes</button>"+
                                                                        "</div>"+
                                                                    "</div>"+
                                                                "</div>"+
                                                            "</div>"+

                                                          "</div>"+
                                                          "<footer>"+date_diff+"</footer>"+
                                                     "</div>"+
                                                  "</div>"+
                                            "</div>" ;

                                 $('html, body').animate({scrollTop : 0},200);
                               $(str).appendTo(panel_data);
                           }
                            $("img.lazy").lazyload(
                            {
                                effect : "fadeIn"

                            });
                        }
                  });
    });

