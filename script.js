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
        currentCity = inputEl.val();
        console.log(currentCity);

        var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + currentCity + "&appid=" + APIKey;

        if (currentCity != null) {
            $.ajax({
                url: queryURL,
                method: "GET"
            }).then(function (cityWeatherData) {
                console.log(cityWeatherData)
            })
        }

    });

})