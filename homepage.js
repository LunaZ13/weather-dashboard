// api personal key
var APIKEY = "&appid=fd752dc15f7e56d500006bb657ee9154";

// api for five day forecast
var queryURLFive = "https://api.openweathermap.org/data/2.5/forecast?q=" + city + APIKEY;

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

function pastCityClick(e) {
    console.log('E TARGEtxs!!!!',e)
    console.log('text conte! e.target.textContent', e.target.textContent)
    getWeather(e.target.textContent);
}

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

var getFiveDayData = function(lat,lon) {
    var fiveDayUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=minutely,hourly${APIKEY}&units=imperial`
    console.log(fiveDayUrl);

    fetch(fiveDayUrl)
    .then(response => response.json())
    .then(response => {
        console.log('5 DAY RESPOINSE!', response)
        displayFiveDay(response);
    })
}


var displayFiveDay = function(weather, cityName) {
    fiveDayDiv.innerHTML = "";
    for (var i=0; i < 5; i++) {
        console.log(weather.daily[i])
        
        var card = document.createElement("div");
        card.classList.add("card")
        
        var dateString = moment.unix(weather.daily[i].dt).format("MM/DD/YYYY")

        var formattedDate = document.createElement("h3");
        formattedDate.textContent = moment.unix(weather.daily[i].dt).format("MM/DD/YYYY");

        card.appendChild(formattedDate);
        
        var weatherIcon = document.createElement("img")
        weatherIcon.setAttribute("src", "https://openweathermap.org/img/wn/" + weather.daily[i].weather[0].icon + ".png");
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


var weatherDiv = function (weather, cityName) {

    console.log(cityEl);
    weatherContainer.innerHTML = "";
    cityEl.innerHTML = cityName;

    var dateString = moment.unix(weather.dt).format("MM/DD/YYYY")

    var formattedDate = document.createElement("h1");
    formattedDate.textContent = moment.unix(weather.dt).format("MM/DD/YYYY");

    cityEl.appendChild(formattedDate);

    var weatherIcon = document.createElement("img")
    weatherIcon.setAttribute("src", "https://openweathermap.org/img/wn/" + weather.weather[0].icon + ".png");
    weatherIcon.classList = "bg-white"

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

    getFiveDayData(weather.coord.lat, weather.coord.lon);

}









