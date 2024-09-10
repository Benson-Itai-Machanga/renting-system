var map = L.map('map',
    {
        measureControl: true,
    });  
    map.setView([-20.07206,30.83331],17);
    map.zoomControl.setPosition('bottomright');

var googleSatImage = L.tileLayer(
            'http://{s}.google.com/vt/lyrs=s&x={x}&y={y}&z={z}',
            {
              maxZoom: 50,
              subdomains:['mt0','mt1','mt2','mt3']
});
googleSatImage.addTo(map);

var houses = new L.tileLayer.betterWms("http://localhost:8090/geoserver/myHub/wms", {
    layers: "myHub:my_hub",
    maxZoom: 80,
    format:  "image/png",
    transparent: "true",
    attribution: "@GIS2024"
});
map.addLayer(houses); 

$("#priceRangeCheckbox").change(function(){
    if(this.checked != true)
      {
  		   $('#minMaxPriceContainer').hide();
           //console.log("not checked");
      }
    else
        {
            $('#minMaxPriceContainer').show();
            //console.log("checked");
        }
})

$('.incidentAddress').click(function(){
            $('#first_imageDiv').show();
        });

$('#first_imageDiv').hide();

$("#displayImages").change(function(){
    if(this.checked != true)
      {
           $('#first_imageDiv').hide();
      }
    else
        {
            $('#first_imageDiv').show();
        }
})

$('.infor').click(function(){
			$('.information').hide();
			$('#'+$(this).attr('target')).show();
		});

 $('#minimiseIncidentResults').click(function(){

    if ($(this)) {

        $('#resultsDivInner').css("transition","1s ease");
        $('#resultsInformation').hide();   
        $('#resultsDiv').css("width","100%");
        $('#resultsDiv').css("height","0.05px");
        $('#resultsDiv').css("transition","1s ease");
        $('#minimiseIncidentResults').hide();
        $('#resultsDivInner').hide();
    }
 });

$("#news").click(function(){
    $('#resultsDiv').css("height","225px");
    $('#resultsDivInner').show(); 
    $('#resultsInformation').hide();  
    $('#resultsInformation').css("transition","1s ease"); 
    $('#NewsInfo').show();
    $('#minimiseIncidentResults').show();
    $('#resultsDivInner').css("height","200px");
    $('#resultsDivInner').css("border-bottom","1px solid burlywood");   
})
            
$("#about").click(function(){

    $('#resultsDiv').css("height","225px");
    $('#resultsInformation').css("transition","1s ease");
    $('#resultsInformation').hide(); 
    $('#resultsDivInner').show();   
    $('#AboutUsInfo').show();
    $('#minimiseIncidentResults').show();
    $('#resultsDivInner').css("height","200px");
    $('#resultsDivInner').css("border-bottom","1px solid burlywood");   
})