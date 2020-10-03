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
var fiveDayDiv = $("#fiveDayContainer");
var fiveDayH3 = $("#fiveDayHead");
var mainCardDiv = $("#card-div");
var secondCardDiv = $("#card-div-2");
var searchHistoryUl = $("#searchHistory");

var currentCity;

var APIKey = "c9d43ea44c719a1c7bfa973c77a3170b";

// FUNCTIONS

function citySearch() { // Displays weather data for a new city
    

    var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + currentCity + "&units=imperial&appid=" + APIKey;

    if (currentCity != null) { // Query for basic weather info for city (if city is typed in)
        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function (cityWeatherData) {

            mainCardDiv.css("display", "block"); // Show the main columns
            secondCardDiv.css("display", "block");

            inputEl.val("");


            console.log(cityWeatherData)
            cityNameH2.text(cityWeatherData.name);
            currentDateH2.text("Today");
            weatherEmojiTodayEl.text("Weather");

            tempMainEl.text("Temperature: " + cityWeatherData.main.temp);
            humidityMainEl.text("Humidity: " + cityWeatherData.main.humidity);
            windMainEl.text("Wind Speed: " + cityWeatherData.wind.speed);

            var uvQuery = "https://api.openweathermap.org/data/2.5/uvi?lat=" + cityWeatherData.coord.lat + "&lon=" + cityWeatherData.coord.lon + "&appid=" + APIKey;


            $.ajax({  // Query for UV Index Data
                url: uvQuery,
                method: "GET"
            }).then(function (uvData) {
                uvMainEl.text("UV Index: " + uvData.value);
            })

            var fiveDayURL = "https://api.openweathermap.org/data/2.5/forecast?q=" + currentCity + "&units=imperial&appid=" + APIKey;

            $.ajax({
                url: fiveDayURL, // Query for 5 Day Forecast
                method: "GET"
            }).then(function (fiveDayData) {
                console.log(fiveDayData);

                fiveDayH3.css("display", "block"); //Show Five Day Forecast heading
                var day = 1;

                fiveDayDiv.empty();

                for (var i = 5; i < fiveDayData.list.length; i += 8) { //Generate card for each of the five days
                    var dayEl = $(`
                    <div class="card five-day">
                        <div class="card-body">
                            <h5 class="card-title">Day ${day}</h5>
                            <p class="card-text">Emoji</p>
                            <p class="card-text">Temp: ${fiveDayData.list[i].main.temp}</p>
                            <p class="card-text">Humidity: ${fiveDayData.list[i].main.humidity}</p>
                        </div>
                    </div>
                    `)
                    fiveDayDiv.append(dayEl);
                    day++;
                }

            })
        })
    }
}

//MAIN PROCESSES

window.addEventListener('load', function () {
    searchButton.on("click", function(event) { // When the user clicks search button
        event.preventDefault();

        currentCity = inputEl.val().trim();
        console.log(currentCity);

        var previouslySearchedLi = $(`<li class="list-group-item search-history" value="${currentCity}">${currentCity}</li>`);
        console.log(searchHistoryUl, previouslySearchedLi);

        searchHistoryUl.prepend(previouslySearchedLi); // Add city to list of previous searches

        citySearch();
    });

    searchHistoryUl.on("click", function (event) { // When user clicks a city in the search history
        var listItem = $(event.target);
        currentCity = listItem[0].firstChild.data;
        console.log(listItem, currentCity);
        citySearch();
    })
})