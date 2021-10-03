var APIKEY = "&appid=fd752dc15f7e56d500006bb657ee9154";

var queryURL = "https:///api.openweathermap.org/data/2.5/weather?q=" + city + APIKEY;
var queryURLFive = "https://api.openweathermap.org/data/2.5/forecast?q=" + city + APIKEY;
var searchedCities = [];

var inputEl = document.getElementById("#city-input");
var searchEl = document.getElementById("#search-button");
var cityEl = document.getElementById("#city");
var temperatureEl = document.getElementById("#temperature");
var humidityEl = document.getElementById("#humidity");
var windEl = document.getElementById("#wind");
var uvIndexEl = document.getElementById("#uv-index");
var weatherDiv = document.getElementById("#current-weather")
var cityHistory = document.getElementById("#searchedCities")

var formSubmitHandler = function(event) {
    event.preventDefault();
    var city = inputEl.value.trim();
    if (city) {
        getWeather(city);
        get5day(city);
        inputEl.value = ""
    } else {
        alert("Please enter a valid City.");
    }
    searchedCities();

}

var getWeather = function(city) {
    var queryURL;
    var queryURLFive;

    fetch(apiURL).then(function(response){
        if (response.ok) {
            response.json().then(function(data) {
                weatherDiv(data, city);
            });
        };
    });
    
}











searchEl.addEventListener("submit", formSubmitHandler)