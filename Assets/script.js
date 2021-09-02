// Declare variable to store searched city.
var city="";
// More variable declaration
var searchCity = $("#search-city");
var searchBtn = $("#search-btn");
var clearButton = $("#clear-history");
var currentCity = $("#current-city");
var currentTemp = $("#temp");
var currentHumidty= $("#humidity");
var currentWindSpeed=$("#wind-speed");
var currentUv= $("#uv");


var APIKey="5f235053112b46d58bc7225d5ebf9a00";

// AJAX Call.
function currentWeather(city){
//Build URL to collect data from server side.
    var queryURL= "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&APPID=" + APIKey;
    $.ajax({
        url:queryURL,
        method:"GET",
//Calls data from the API
    }).then(function(response){
    //Gets longitude and latitude to allow for second AJAX.
        var lon=response.coord.lon;
        var lat=response.coord.lat;
        $.ajax({
            url: "https://api.openweathermap.org/data/2.5/onecall?lat="+lat+"&lon="+lon+"&exclude=minutely,hourly&appid="+APIKey
    //Draws data into the HTML.
        }).then(function(data){
        
            for (var i=0; i<6; i++){
            $("#icon"+i).attr("src","http://openweathermap.org/img/wn/"+data.daily[i].weather[0].icon+"@2x.png")
            $("#temp"+i).text("Temperature: " + data.daily[i].temp.day)
            $("#humid"+i).text("Humidity: " + data.daily[i].humidity)
            $("#uv"+i).text("UV Index: " + data.daily[i].uvi)
            $("#wind"+i).text("Wind Speed: " + data.daily[i].wind_speed)
    }
        })
    })
}

currentWeather("Detroit")    
