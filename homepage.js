// api personal key
var APIKEY = "&appid=fd752dc15f7e56d500006bb657ee9154";

// api for five day forecast
// var queryURLFive = "https://api.openweathermap.org/data/2.5/forecast?q=" + city + APIKEY;

// global variables
var searchedCities = JSON.parse(localStorage.getItem("city")) || [];
var searchEl = document.getElementById("search-button");
var cityEl = document.getElementById("city");
var weatherDiv = document.getElementById("current-weather");
var cityHistory = document.getElementById("searchedCities");
var weatherContainer = document.getElementById("weather-conditions");
var fiveDayDiv = document.getElementById("fiveday-container")

// event listener for user input
searchEl.addEventListener("click", function() {
    var inputEl = document.getElementById("city-input");
    console.log(inputEl.value); 
    searchedCities.push(inputEl.value);
    // save search history
    localStorage.setItem("city", JSON.stringify(searchedCities));

    getWeather(inputEl.value);
    renderButton(inputEl.value);
})
// click function to get weather
function pastCityClick(e) {
    console.log(e.target.textContent)
    getWeather(e.target.textContent);
}
// function to render city text
function renderButton(city) {
    console.log(city)
    var ul = document.createElement("ul");
        ul.classList.add("list-group-item", "text-center")
        ul.setAttribute("value", city)
        ul.textContent = city
        ul.addEventListener('click', pastCityClick)
        // stick it to the page
        document.getElementById("searched-cities").appendChild(ul);
}
// function to display user search history
function displaySearchHistory() {
    var savedCities = JSON.parse(localStorage.getItem("city"));
    console.log(savedCities)

    if (!savedCities) {
        savedCities = [];
        console.log(savedCities)
    };

    for (let i = 0; i < savedCities.length; i++) {
        console.log("looping")
        // create ul
        var ul = document.createElement("ul");
        // add saved cities text to display
        ul.innerHTML = savedCities[i]
        ul.classList.add("list-group-item", "text-center")
        ul.addEventListener('click', pastCityClick)
        // stick it to the page
        document.getElementById("searched-cities").appendChild(ul);
    }
  
};

displaySearchHistory();

// get weather data function
var getWeather = function(cityName) {
    // api call 
    var queryURL = "https:///api.openweathermap.org/data/2.5/weather?q=" 

    queryURL = queryURL + cityName + APIKEY + "&units=imperial";
    console.log(queryURL, cityName)

    fetch(queryURL)
    .then(response => response.json())
    .then(response => {
        console.log(response)

        var kelvinData = response.main.temp; 
        console.log(kelvinData);

        var pressure = response.main.pressure;
        console.log(pressure);

        weatherDiv(response, cityName);

                    
        });
    };
// function to get five day weather data 
var getFiveDayData = function(lat,lon) {
    var fiveDayUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=minutely,hourly${APIKEY}&units=imperial`
    console.log(fiveDayUrl);
    // url request
    fetch(fiveDayUrl)
    .then(response => response.json())
    .then(response => {
        console.log('5 DAY RESPONSE!', response)
        displayFiveDay(response);
    })
}

// function to display five day forecast
var displayFiveDay = function(weather, cityName) {
    fiveDayDiv.innerHTML = "";
    for (var i=0; i < 5; i++) {
        console.log(weather.daily[i])
        // creates cards
        var card = document.createElement("div");
        card.classList.add("card", "border-dark")
        // function to format days using moment
        var dateString = moment.unix(weather.daily[i].dt).format("MM/DD/YYYY")

        var formattedDate = document.createElement("h3");
        formattedDate.textContent = moment.unix(weather.daily[i].dt).format("MM/DD/YYYY");
        card.appendChild(formattedDate);
        
        var weatherIcon = document.createElement("img")
        weatherIcon.setAttribute("src", "https://openweathermap.org/img/wn/" + weather.daily[i].weather[0].icon + ".png");
        weatherIcon.classList.add("image-fluid")
        card.appendChild(weatherIcon);
        
        var temperatureEl = document.createElement("span");
        temperatureEl.textContent = "Temperature: " + weather.daily[i].temp.day + "°F";
        temperatureEl.classList.add("card-title") 
        card.appendChild(temperatureEl);

        var humidityEl = document.createElement("span");
        humidityEl.textContent = "Humidity: " + weather.daily[i].humidity + "%";
        humidityEl.classList.add("card-title")
        card.appendChild(humidityEl);

        var windSpeedEl = document.createElement("span");
        windSpeedEl.textContent = "Wind Speed: " + weather.daily[i].wind_speed + "MPH";
        windSpeedEl.classList.add("card-title")
        card.appendChild(windSpeedEl);

        fiveDayDiv.appendChild(card)
    };

};

// function to display current weather
var weatherDiv = function (weather, cityName) {
    console.log(cityEl);
    weatherContainer.innerHTML = "";
    cityEl.innerHTML = cityName;
    // function to format current day using moment
    var dateString = moment.unix(weather.dt).format("MM/DD/YYYY")

    var formattedDate = document.createElement("h1");
    formattedDate.textContent = moment.unix(weather.dt).format("MM/DD/YYYY");
    formattedDate.classList = "mt-2"
    cityEl.appendChild(formattedDate);

    var weatherIcon = document.createElement("img")
    weatherIcon.setAttribute("src", "https://openweathermap.org/img/wn/" + weather.weather[0].icon + ".png");
    weatherIcon.classList = "img-fluid"
    cityEl.appendChild(weatherIcon);

    var temperatureEl = document.createElement("h5");
    temperatureEl.textContent = "Temperature: " + weather.main.temp + "°F";
    temperatureEl.classList = "list-group-item"
    weatherContainer.appendChild(temperatureEl);

    var humidityEl = document.createElement("h5");
    humidityEl.textContent = "Humidity: " + weather.main.humidity + "%";
    humidityEl.classList = "list-group-item"
    weatherContainer.appendChild(humidityEl);

    var windSpeedEl = document.createElement("H5");
    windSpeedEl.textContent = "Wind Speed: " + weather.wind.speed + "MPH";
    windSpeedEl.classList = "list-group-item"
    weatherContainer.appendChild(windSpeedEl);

    getFiveDayData(weather.coord.lat, weather.coord.lon);
};









