var offerid ;
$(document).ready(function() {
	$("[data-toggle='tooltip']").tooltip();
	$("[data-toggle='popover']").popover();

	 $('body').on('mouseenter','.abx',function(){

		 var idd = this.id ;
		 $('.popover:visible').prev().popover('destroy');

         $(this).popover(
			 {
						html:true,
						placement:'right',
						title:$(this).html(),
						content:"loading..."
			 }).popover('show');

		   $.ajax({
					   url: "/offerProfile/id/1",
					   data:
					   {
						   method:'popover',
						   id:idd
					   },
					   cache:true,
					   success: function(data)
					   {
						  $(".gscriptid").empty();
						  $('.popover-content:visible').html(data);

						}
					});


		  $('body').on('click','#googlemap',function(){
			  $(".gscriptid").empty();
			  $("#myModal").modal('show');
			 
			  $(".gscriptid" ).append( "<div>"+
					"<iframe width='500px' height='280px' frameborder='0' style='border:0'"+
			         "src='https://www.google.com/maps/embed/v1/directions?"+
"key=AIzaSyAb9sz-Ih7YtVpdvoT5mLqgkJBx99yR8bc&origin=Anand,+Gujarat,+India&destination=Ahmedabad,+Gujarat,+India&mode=driving'>"+
					"</iframe>"+
				     "</div>" );
		  });
		  $('body').on('click','#closepopover',function(){
			   $('.popover:visible').popover('hide'); 
		  });
	 });

//	data table logic starts
	
	var aacolumns =[];
	var sort = [];

		aacolumns =
			[
				{ sWidth: '20%' },
				{ sWidth: '20%' },
				{ sWidth: '15%' },
				{ sWidth: '20%' }
		    ];
		sort = [ 1, "asc" ];

	offerid = ids ;

var oTable = $('#example').dataTable(
		{
			"bProcessing": true,
			"bDestroy": true,
			"bAutoWidth": false,
			"aoColumns": aacolumns,
			"bLengthChange": false,
			"bFilter": true,
			"language": {
			searchPlaceholder: "Search friends who are interested in current offer",
			"emptyTable":     "nobody interested in current offer ..invite your comp/college mates from other tabs"
			},
			"aaSorting": [sort],
			"sAjaxSource": "/offerProfile/id/"+offerid+"?method=getcurrentmates",
			"bDeferRender": true,
			"fnInitComplete": function(oSettings, json) {
			//getpeoplelisttable();
			}
       });
	    $('.dataTables_filter label ').attr('class','pull-left');
		$('.dataTables_filter label input').css('width','300px');



});

function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition);
    } else { 
        x.innerHTML = "Geolocation is not supported by this browser.";
    }
}
function showPosition(position) {
//    var lat = position.coords.latitude;
//    var position.coords.longitude;
	
	$.ajax({
		url: "/home",
		data :{  method :"updategeopoints", long   :position.coords.longitude,lat    : position.coords.latitude	},			
		success: function (data) 
			{
				console.log(data);
			}
		});
	
	
		
}

//$('.selectorClass').socialShare({
//social: 'blogger,delicious,digg,facebook,friendfeed,google,'+
//'linkedin,myspace,pinterest,reddit,stumbleupon,'+
//'tumblr,twitter,windows,yahoo'
//});

//$('.selectorClass').socialProfiles({
//email: 'example@example.com',
//behance: 'gokhun',
//facebook: 'tolgaergin',
//twitter: 'tolgaergin',
//pinterest: 'tolga',
//dribbble: 'bbb',
//scoutzie: 'gokhun'
//});


 $('body').on('click','.invitation',function(){

	 var userid = this.id ;

	 var htm = $('.invitation#'+userid+' span').html();

	 //alert(htm);

	 $.ajax({
		   url: "/offerProfile/id/1",
    beforeSend : function(){
		            $('.invitation#'+userid+' span').html('loading')
	             },
		   data:
			   {
				   method:'sendinvitation',
				   userid: userid,
				   offerid : offerid,
				   htm      : htm
			   },
		   cache:true,
		   success: function(data)
		   {
		     $('.invitation#'+userid+' span').html(data);
		   }
	 });



 });

function getallmates()
{
	console.log(offerid);
	var aacolumns =[];
	var sort = [];

		aacolumns =
			[
				{ sWidth: '20%' },
				{ sWidth: '20%' },
				{ sWidth: '20%' },
				{ sWidth: '20%' },
			    { sWidth: '20%' }
		    ];
		sort = [ 1, "asc" ];

var oTable = $('#allmates').dataTable(
		{
			"bProcessing": true,
			"bDestroy": true,
			"bAutoWidth": false,
			"aoColumns": aacolumns,
			"aaSorting": [sort],
			"cache": false,
			"bLengthChange": false,
			"bFilter": true,
			"language": {
			searchPlaceholder: "Search your comp/college friends"
			},
			"sAjaxSource": '/offerProfile/id/'+offerid+'?method=getallmates',
			"bDeferRender": true,
			"fnInitComplete": function(oSettings, json) {
			//getpeoplelisttable();
			}
       });

	    $('.dataTables_filter label ').attr('class','pull-left');
		$('.dataTables_filter label input').css('width','300px');
}
function getallcitymates()
{



	var aacolumns =[];
	var sort = [];

		aacolumns =
			[
				{ sWidth: '20%' },
				{ sWidth: '20%' },
				{ sWidth: '20%' },
				{ sWidth: '20%' },
			    { sWidth: '20%' }
		    ];
		sort = [ 1, "asc" ];

var oTable = $('#allcitymates').dataTable(
		{
			"bProcessing": true,
			"bDestroy": true,
			"bAutoWidth": false,
			"aoColumns": aacolumns,
			"aaSorting": [sort],
			"bLengthChange": false,
			"bFilter": true,
			"language": {
			searchPlaceholder: "Search your city mates"
			},
			"sAjaxSource": '/offerProfile/id/'+offerid+'?method=getallcitymates',
			"bDeferRender": true,
			"fnInitComplete": function(oSettings, json) {
			//getpeoplelisttable();
			}
       });
	    $('.dataTables_filter label ').attr('class','pull-right');
		$('.dataTables_filter label input').css('width','300px');
}
