
$(function()
{
	
	var aacolumns =[];
	var sort = [];
	var oTable ;

		aacolumns = 
			[
				{ sWidth: '10%' },
				{ sWidth: '10%' },
				{ sWidth: '20%' },
				{ sWidth: '30%' },
				{ sWidth: '30%' }
		    ];
		sort = [ 1, "asc" ];
	
 oTable = $('#example').dataTable(
		{
			"bProcessing": true,
			"bDestroy": true,
			"bAutoWidth": false,
			"bLengthChange": false,
			"bFilter": true,
			//"bInfo": false,
			"aoColumns": aacolumns,
			"aaSorting": [sort],
			"sAjaxSource": '/admin?method=getreqComp',
			"bDeferRender": true,
			"language": {
				searchPlaceholder: "Search records"
			},
			"fnInitComplete": function(oSettings, json) { 
			getcomplisttable();
			}
       });
	   $('.dataTables_filter label ').attr('class','pull-left');
		$('.dataTables_filter label input').css('width','392px');

	   
	   /*
	   var bbcolumns =[];
		bbcolumns = 
			[
				{ sWidth: '10%' },
				{ sWidth: '10%' },
				{ sWidth: '10%' },
				{ sWidth: '30%' },
				{ sWidth: '30%' },
				{ sWidth: '10%' }
		    ];
	   
	   */
        $('#activitlog').dataTable(
		{
			"bProcessing": true,
			"bDestroy": true,
			"bAutoWidth": false,
			"aoColumns": aacolumns,
			"aaSorting": [sort],
			"sAjaxSource": '/admin?method=getlogComp',
			"bDeferRender": true,
			"fnInitComplete": function(oSettings, json) { 
			//getcomplisttable();
			}
       });	   
	   
	   
	   
	        $('body').on('click','.select',function(){
	 
	     if($(".select").length == $(".select:checked").length) 
	        {
	            $("#selectall").attr("checked", "checked");
	        } 
	        else 
	        {
	            $("#selectall").removeAttr("checked");
	        }
	 
	 
	 });

	 
	 $('body').on('click','#selectall',function(){
	     
		 $(".select").attr("checked", this.checked);
		
	 }); 
	
	function getcomplisttable(){
	$.fn.editable.defaults.mode = 'popup';
	
	$(".complisttable").each(function(a,e)
	{			
		$('#'+this.id).editable({
			type: 'text',
			title: 'Enter relation',
			pk: 1,
			 placement: 'right',
	        name : this.id.substring(0,this.id.indexOf('c')),
	        value: $(this).attr('value'),    
	        url: '/admin',
	        display: function(value,response) {
	        	if(response != undefined)
	        		{
	        			if(response.ok != "ok")
	    	        	{
	        				$(this).html($(this).attr('value'));
	        				$(".editable-container").after("<br><div class='alert alert-success plisterrorDiv'>"+response.ok+"</div>");
	    	        		setTimeout(function() {$(".plisterrorDiv").remove();},3000);
	    	        	}
	        			else
						{
							$(this).html(value);
							
							
							//oTable.fnDraw();
							location.reload(true);
						 //oTable.fnReloadAjax("/admin?method=getreqComp");
											 
							var $container = $("#example");
							$container.load("/admin?method=getlogComp");
////							var refreshId = setInterval(function()
////							{
////								$container.load('/admin');
////							}, 1000);
							
						}
	        				
	        		}	
	        		else
	        			$(this).html(value);
	        	},
			callback : function(value, settings) {
					console.log(this);
					console.log(value);
					console.log(settings);
              }
	         }); 
    });
}
	   
} );









