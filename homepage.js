var APIKEY = "&appid=fd752dc15f7e56d500006bb657ee9154";

var queryURL = "https:///api.openweathermap.org/data/2.5/weather?q=" + "Saint Paul" + APIKEY;
var queryURLFive = "https://api.openweathermap.org/data/2.5/forecast?q=" + city + APIKEY;
var searchedCities = [];

var inputEl = document.getElementById("#city-input");
var searchEl = document.getElementById("#search-button");
var cityEl = document.getElementById("#city");
var weatherDiv = document.getElementById("#current-weather");
var cityHistory = document.getElementById("#searchedCities");
var weatherContainer = document.getElementById("#weather-conditions");

var formSubmitHandler = function(event) {
    event.preventDefault();
    console.log(event);
    var city = inputEl.value.trim();
    if (city) {
        getWeather(city);
        get5day(city);
        inputEl.value = ""
    } else {
        alert("Please enter a valid City.");
    }
    searchedCities();
};

var getWeather = function(city) {

    fetch(queryURL)
    .then(response => response.json())
    .then(response => {
        console.log(response)

        var kelvinData = response.main.temp; 
        console.log(kelvinData);

        var pressure = response.main.pressure;
        console.log(pressure);
                    
        });
    };
    

getWeather();

var weatherDiv = function (weather, city) {
    weatherContainer.textContent = "";
    cityEl.textContent = city;

    var weatherIcon = document.createElement("img")
    weatherIcon.setAttribute("src", "https://openweathermap.org/img/wn/" + weatherPic + "@2x.png");
    cityEl.appendChild(weatherIcon);

    var temperatureEl = document.createElement("span");
    temperatureEl.textContent = "Temperature: " + weather.main.temp + "°F";
    temperatureEl.classList = "list-group-item"

    weatherContainer.appendChild(temperatureEl);

    var humidityEl = document.createElement("span");
    humidityEl.textContent = "Humidity: " + weather.main.humidity + "%";
    humidityEl.classList = "list-group-item"

    weatherContainer.appendChild(humidityEl);

    var windSpeedEl = document.createElement("span");
    windSpeedEl.textContent = "Wind Speed: " + weather.wind.speed + "MPH";
    windSpeedEl.classList = "list-group-item"

    weatherContainer.appendChild(windSpeedEl);

}









searchEl.addEventListener("click", formSubmitHandler);