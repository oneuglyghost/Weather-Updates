var APIKey = "b865d75d612fbe2ab2e90e162fa3c3b3";
var Showcurrentweather = document.getElementById("current-weather");

// taking the text in the input and saving to local storage
document.getElementById("searchButton").addEventListener("click", function() {
    //get the input
    var cityInputValue = document.getElementById("cityInput").value;

    //check if the input value is not empty
    if (cityInputValue.trim() !== "") {
        // Check if the city already exists in local storage 
        var existsInLocalStorage = checkIfExistsInLocalStorage(cityInputValue);
        if (!existsInLocalStorage){
             //get weather data from the searched city
        geoCoding(cityInputValue)
        }else{
            console.log("already in local storage")
        }
    }
})

// Function to check if a city already exists in local storage 
function checkIfExistsInLocalStorage(city) {
    var lowerCaseCity = city.toLowerCase();

    // Iterate through local storage keys
    for (var key in localStorage) {
        if (localStorage.hasOwnProperty(key)) {
            var lowerCaseKey = key.toLowerCase();
            if (lowerCaseKey === lowerCaseCity) {
                return true; // City already exists in local storage
            }
        }
    }
    return false; // City does not exist in local storage
}

/// function to show past searches
function displayPastSearches() {
    var pastSearchesList = document.getElementById("past-searches");

    //clear existing list 
    pastSearchesList.innerHTML = "";

    // get key from local storage
    Object.keys(localStorage).forEach(function(key){
        var listItem = document.createElement("li");
        listItem.textContent = key;

        // add a click listener to each list item
        listItem.addEventListener("click", function(){
            geoCoding(key);
        })
        pastSearchesList.appendChild(listItem);
    })
}

//shows past searches when page loads
displayPastSearches();



/// function to get weather data from OpenWeather API
function geoCoding(city) {
    var APIKey = "b865d75d612fbe2ab2e90e162fa3c3b3";
    //API endpoint URL
    var apiUrl = 'https://api.openweathermap.org/geo/1.0/direct?q=' + city + '&appid=' + APIKey;

    // Clear existing content in Showcurrentweather
    Showcurrentweather.innerHTML = '';

    // Api requests
    fetch(apiUrl)
        .then(function(response) {
            return response.json();
        })
        .then(function(data) {
            console.log(data);
            console.log(data[0].lat);
            console.log(data[0].lon);

            if (data && data.length > 0) {
                // API request was successful, save to local storage
                localStorage.setItem(city, city);
                // clear the input field
                document.getElementById('cityInput').value = '';
                displayPastSearches();
                //get weather data from the searched city
                getCurrentWeather(city, data[0].lat, data[0].lon);
                getWeatherForecast(data[0].lat, data[0].lon);
            } else {
                console.error('City not found in the weather API.');
                
            }
            
        })
}

// get current weather for city and add to page
function getCurrentWeather(city, lat,lon) {
    console.log("Lat = ", lat);
    console.log("Long =", lon);
    console.log("City =", city);

    
    var APIURL = "https://api.openweathermap.org/data/2.5/weather?lat=" + lat + "&lon=" + lon + "&appid=" + APIKey + "&units=imperial";

    fetch(APIURL)
    .then(function (response) {
        return response.json();
    })
    .then(function(data) {
        console.log(data)
        console.log('Icon:', icon);
        
        var headerCity = document.createElement("h2");
        var currentDate = document.createElement("p");
        var currentTemp = document.createElement("p");
        var currentWindSpeed = document.createElement("p");
        var currentHumidity = document.createElement("p");
        var icon = data.weather[0].icon;
        
        var iconImage = document.createElement("img");
        iconImage.src = "http://openweathermap.org/img/w/" + icon + ".png";
        iconImage.alt = data.weather[0].description;
        
        console.log('Icon:', icon);
        headerCity.textContent = data.name + ' ' ;
        currentDate.textContent= dayjs().format("MM/DD/YYYY");
        currentTemp.textContent = "Temperature: " + data.main.temp + " ˚F";
        currentWindSpeed.textContent = "Wind: " + data.wind.speed + " MPH";
        currentHumidity.textContent = "Humidity: " + data.main.humidity + "%";
        
        headerCity.style.display = "inline-block";
        iconImage.style.display = "inline-block";

        Showcurrentweather.appendChild(headerCity);
        Showcurrentweather.appendChild(iconImage);
        Showcurrentweather.appendChild(currentDate);
        Showcurrentweather.appendChild(currentTemp);
        Showcurrentweather.appendChild(currentWindSpeed);
        Showcurrentweather.appendChild(currentHumidity);


    })  
}




