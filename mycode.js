const GoogleKey = 'AIzaSyDBRx0crV33B-rLPoQr7SkYl4_ZrUOZzig';
const OpenWeatherMapKey = 'b975cc9f4ba510724c9bdb7d7f317657'
const OWMurl = 'https://api.openweathermap.org/data/2.5/find?';
var sts;
var stations

var currentStation = ''

// Refresh button event
$(document).on("click", "#refresh", function(){
    // Prevent the usual navigation behavior
    event.preventDefault();

    // Get user location
    $.post("https://www.googleapis.com/geolocation/v1/geolocate?key=" + GoogleKey, function(result){
        populateList(result.location.lat, result.location.lng)
    });

    function populateList(lat, lon){
        var url = OWMurl + 'lat=' + lat + '&lon=' + lon + '&appid=' + OpenWeatherMapKey + '&cnt=20&units=metric';
        console.log(url);   
        // Remove all the previous items
        $('#stationList li').remove();
        // Add more station to the list
        $.getJSON(url, function(data){
            console.log(data);
            stations = data.list;
            $.each(stations, function(index, station){
                $('#stationList').append('<li><a href="#" id="toDetails">' + station.name + '<span id= "'+ index + '" class="ui-li-count">'+ Math.round(station.main.temp) + '°</span></a></li>');
            })
            // Refresh the list (important)
            $('#stationList').listview('refresh');
        });
    };
    


});

// Event to navigate to details
$(document).on("pagebeforeshow", "#home", function(){
    $(document).on('click', '#toDetails', function(e){
        // Stop more events
        e.preventDefault();
        e.stopImmediatePropagation();
        console.log(e.target.children[0].id);
        console.log(stations[e.target.children[0].id])
        // Store the current item in the list
        currentStation = stations[e.target.children[0].id];
        // Change to the new page
        $.mobile.changePage('#details')
    });
});

// Event to populate UI of details
$(document).on("pagebeforeshow", "#details", function(e){
    // Stop more events
    e.preventDefault(); 

    $('#stationName').text(currentStation.name);
    console.log(currentStation.weather[0].description);
    $('#stationDescription').text(currentStation.weather[0].description);
    $('#stationTemperature').text(
        'Temperature: ' + currentStation.main.temp);
    $('#stationHumidity').text(
        'Humidity:' + 
        currentStation.main.humidity);
    $('#stationPressure').text(
        'Pressure: ' + 
        currentStation.main.pressure);
    

});