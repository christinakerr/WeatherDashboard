// VARIABLES

var searchButton = $("#search"); // jQuery DOM objects
var inputEl = $("#cityQuery");
var cityNameH2 = $("#cityName");
var currentDateH2 = $("#currentDate");
var weatherEmojiTodayEl = $("#weatherEmoji");
var tempMainEl = $("#temp-main");
var humidityMainEl = $("#humidity-main");
var windMainEl = $("#wind-main");
var uvMainEl = $("#UV-main");

var currentCity;

var APIKey = "c9d43ea44c719a1c7bfa973c77a3170b";

// FUNCTIONS

function citySearch(event){ // Displays weather data for a new city
    event.preventDefault();
        currentCity = inputEl.val().trim();
        console.log(currentCity);

        var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + currentCity + "&units=imperial&appid=" + APIKey;

        if (currentCity != null) { // Query for basic weather info for city (if city is typed in)
            $.ajax({
                url: queryURL,
                method: "GET"
            }).then(function (cityWeatherData) {
                console.log(cityWeatherData)
                cityNameH2.text(cityWeatherData.name);
                currentDateH2.text("Today");
                weatherEmojiTodayEl.text("Weather");

                tempMainEl.text("Temperature: " + cityWeatherData.main.temp);
                humidityMainEl.text("Humidity: " + cityWeatherData.main.humidity);
                windMainEl.text("Wind Speed: " + cityWeatherData.wind.speed);

                var uvQuery = "https://api.openweathermap.org/data/2.5/uvi?lat=" + cityWeatherData.coord.lat + "&lon=" + cityWeatherData.coord.lon + "&appid=" + APIKey;
                console.log(uvQuery);

                
                $.ajax({  // Query for UV Index Data
                    url: uvQuery,
                    method: "GET"
                }).then(function(uvData) {
                    uvMainEl.text("UV Index: " + uvData.value);
                })

                var fiveDayURL = "https://api.openweathermap.org/data/2.5/forecast?q=" + currentCity + "&units=imperial&appid=" + APIKey;
                
                $.ajax({
                    url: fiveDayURL, // Query for 5 Day Forecast
                    method: "GET"
                }).then(function(fiveDayData) {



                })
            })
        }
}

//MAIN PROCESSES

window.addEventListener('load', function () {
    searchButton.on("click", citySearch); // When the user clicks search button
})