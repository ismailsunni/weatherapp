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
        $('#stationList').append(
            '<li><h2>' + station.name + '</h2>' + 
            '<p>Province: ' + station.province + '</p>' +
            '<p>Last updated: ' + station.date + '</p>' +
            '<span id= "'+ index + '" class="ui-li-count">'+ 
            Math.round(station.temperature) + '°</span></li>'
            );
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
