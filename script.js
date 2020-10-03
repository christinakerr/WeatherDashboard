// VARIABLES

var searchButton = $("#search"); // jQuery DOM objects
var inputEl = $("#cityQuery");

var currentCity;

var APIKey = "c9d43ea44c719a1c7bfa973c77a3170b";

// FUNCTIONS



//MAIN PROCESSES

window.addEventListener('load', function () {

    searchButton.on("click", function (event) { // When the user clicks search button
        event.preventDefault();
        currentCity = inputEl.val().trim();
        console.log(currentCity);

        var queryURL = "http://api.openweathermap.org/data/2.5/weather?q=" + currentCity + "&appid=" + APIKey;


        $.ajax({
            method: "GET",
            url: "queryURL"
        }).then(function(cityWeatherData){
            console.log(cityWeatherData)
        })
    });

})