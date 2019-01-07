const meteoclimaticNetwork = 'http://pixel.uji.es/meteo/api/api.php/stations';

var currentStation = ''
var stations = [];

// Get station list
function getStationList(){

}

function generateList(stations){
    // Remove all the previous items
    $('#stationList li').remove();
    
    $.each(stations, function(index, station){
        console.log(station.name);
        $('#stationList').append('<li><a href="#" id="toDetails">' + station.name + '<span id= "'+ index + '" class="ui-li-count">'+ Math.round(station.temperature) + '°</span></a></li>');
    })
    
    // Refresh the list (important)
    $('#stationList').listview('refresh');
}

// Refresh button event
$(document).on("click", "#refresh", function(){
    // Prevent the usual navigation behavior
    event.preventDefault();

    $.getJSON(meteoclimaticNetwork, function(result){
        var stations = [];
        console.log(result.stations.records);
        var records = result.stations.records;
        records.forEach(record => {
            stations.push(
                {
                    'name': record[1],
                    'province': record[2],
                    'date': record[18],
                    'temperature': record[5],
                    'latitude': record[3],
                    'longitude': record[4]
                }
            );
        });
        // Show to the list
        generateList(stations);
    });

});

// // Event to navigate to details
// $(document).on("pagebeforeshow", "#home", function(){
//     $(document).on('click', '#toDetails', function(e){
//         // Stop more events
//         e.preventDefault();
//         e.stopImmediatePropagation();
//         console.log(e.target.children[0].id);
//         console.log(stations[e.target.children[0].id])
//         // Store the current item in the list
//         currentStation = stations[e.target.children[0].id];
//         // Change to the new page
//         $.mobile.changePage('#details')
//     });
// });

// // Event to populate UI of details
// $(document).on("pagebeforeshow", "#details", function(e){
//     // Stop more events
//     e.preventDefault(); 

//     $('#stationName').text(currentStation.name);
//     console.log(currentStation.weather[0].description);
//     $('#stationDescription').text(currentStation.weather[0].description);
//     $('#stationTemperature').text(
//         'Temperature: ' + currentStation.main.temp);
//     $('#stationHumidity').text(
//         'Humidity:' + 
//         currentStation.main.humidity);
//     $('#stationPressure').text(
//         'Pressure: ' + 
//         currentStation.main.pressure);
// });
