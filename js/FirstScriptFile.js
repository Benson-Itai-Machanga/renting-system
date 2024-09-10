function QueryHouseData(FetchedSearch)
{

			var _addressResults = "";
			var pictureNameOne = " ";
			var houseInfor = FetchedSearch;
			for (var i = 0; i < houseInfor.length; i++) 
			{
				var incidentAddress = document.createElement("div");
			    incidentAddress.classList.add("incidentAddress");
			    incidentAddress.id = houseInfor[i].id;
			    var Y = houseInfor[i].y;
			    var X = houseInfor[i].x;   
			    var address = houseInfor[i].address;
			    var care_taker= houseInfor[i].care_taker;
			    var phone_number= houseInfor[i].tel;
			    var reservours= houseInfor[i].reservours;
			    var room_price= houseInfor[i].room_price;
			    var other= houseInfor[i].other;
			    

	       		incidentAddress.setAttribute("address",address);
			    incidentAddress.setAttribute("care_taker",care_taker);
			    incidentAddress.setAttribute("phone_number",phone_number);
			    incidentAddress.setAttribute("facilities",other);
			    incidentAddress.setAttribute("room_price",room_price);
			    incidentAddress.setAttribute("Y",Y);
			    incidentAddress.setAttribute("X",X);
			    incidentAddress.setAttribute("coords", Y+", "+X);
	        
	       		incidentAddress.append(address);

		        results.append(incidentAddress);
		        _addressResults += incidentAddress.outerHTML;
			}
			results.innerHTML = _addressResults;
	 
		  $(".incidentAddress").click(function()
	      	{
		      	if ($(this))//if incident info clicked, true/false. 
                {
		      	     	$('#resultsInformation').show();
		      	     	$('#resultsInformation').css("transition","1s ease");		

		      	     	var coords = $(this).attr("coords").split(",");
	                  	var Y = $(this).attr("Y");
	                  	var X = $(this).attr("X");
                 	 	var address = $(this).attr("address");
                 		var phone_number = $(this).attr("phone_number");
                 		var name = $(this).attr("care_taker");
                 		var facilities = $(this).attr("facilities");
                 		var room_price = $(this).attr("room_price");
				 	 					map.flyTo(coords,20);

                 	 	var popup=L.popup({closeOnClick: true, autoClose: true})
                      	.setLatLng(coords)
                      	.setContent(address)
                      	.openOn(map);
										 //L.marker(coords).addTo(map);
										$("#RetName").val(name);	
										$("#RetTel").val(phone_number);	
									 	$("#RetAddress").val(address);	
									 	$("#RetFacil").val(facilities);	
									 	$("#RetRoomPrice").val('$'+room_price);		 
				}

	      		else
		      		{
		      			
		      		}	
			});

		    $(".incidentAddress").dblclick(function(){
	  				{
	  					$('#resultsInformation').hide();
	  				} 
  			})
}

$('#minimiseIncidentResults').hide();

$("#applyRadioRequest").click(function(){

	if ($(this))
    {
     	$('#resultsDiv').css("height","225px");
     	$('#minimiseIncidentResults').show();
     	$('#resultsDivInner').css("height","200px");
     	$('#resultsDivInner').css("border-bottom","1px solid burlywood");	

     	$('#resultsDiv').show();
	    $('#minimiseIncidentResults').show();
	    $('#resultsDivInner').show();			 
	}

	var power_source = $('#powerSource_').val();
	var reservours = $('#Reservours_').val();
	var internet = $('#internet_').val();
	var security = $('#Security_').val();

	var uploadingData	=   { 
							  "case":'uploadingData', 
		                      "power_source":power_source,
		                      "reservours":reservours,
		                      "internet":internet,
		                      "security":security
		                    };
	//console.log(uploadingData);		                    
 
	$.ajax({
	type: "POST",
	url: "php/FirstScriptFile.php",
	dataType: "json",
	data:uploadingData,
	success: function(data, status, xhr)
	{
		console.log(data);
	    //QueryHouseData(data);
  	}	
	});

})

$("#ODK").click(function(){

 // fetch("https://script.google.com/macros/s/AKfycbwxjZ7nbEsVC053pQs_mfkft5aA5UR6Ua6d5SFcQPBtK-nAflPjouH1l4b3Sjb4jTXgLw/exec",{
  fetch("https://script.google.com/macros/s/AKfycbwxjZ7nbEsVC053pQs_mfkft5aA5UR6Ua6d5SFcQPBtK-nAflPjouH1l4b3Sjb4jTXgLw/exec")
  .then(res=>res.json())
  .then(data=>{ 
  console.log(data);
  var inforMation = {'case':'insert_data', 'houseInfoData': data};
  $.ajax({
                url: "php/FirstScriptFile.php",
                method: "post",
                data: inforMation,
                success : function(respData)
                {
                  //var waterQualityData = respData;
                    console.log(respData);
                }
        });
    });
  });

$("#allDataQuerry").click(function(){

	if ($(this))
    {
     	$('#resultsDiv').css("height","225px");
     	$('#minimiseIncidentResults').show();
     	$('#resultsDivInner').css("height","200px");
     	$('#resultsDivInner').css("border-bottom","1px solid burlywood");	

     	$('#resultsDiv').show();
	    $('#minimiseIncidentResults').show();
	    $('#resultsDivInner').show();			 
	}
	//console.log("all");	
	var allDataQuerry	= {"case":'allDataQuerry'}

	$.ajax({
	type: "POST",
	url: "php/FirstScriptFile.php",
	dataType: "json",
	data:allDataQuerry,
	success: function(data, status, xhr)
	{
		//console.log(data);
	    QueryHouseData(data)
	}	
	});
})