const Key = "3f8dddd53e0eaa2470ae622746649a2d&units";
const inputBox = document.querySelector("#input-box");
const Temp = document.querySelector("#temp");
const City = document.querySelector("#city");
const Humidity = document.querySelector("#humidity");
const windSpeed = document.querySelector("#wind-speed");
const weatherType = document.querySelector("#weather-type");
const weatherIcon = document.querySelector("#weather-icon");


const getWeatherData = async () => {
    const cityName = inputBox.value;
    const URL = `https://api.openweathermap.org/data/2.5/weather?q=${cityName.toLowerCase()}&appid=${Key}=metric`;

    let response = await fetch(URL);

    if (!response.ok) {
        alert("City not found. Please enter a valid city name.");
        return;
    }

    let data = await response.json();
    UpdateWeatherData(data);
};

const UpdateWeatherData = (data) => {
    //Update City, Temprature, Humidity, and Wind Speed
    City.innerText = data.name;
    Temp.innerText = Math.round(data.main.temp) + '°C';
    Humidity.innerText = data.main.humidity + '%';
    windSpeed.innerText = data.wind.speed + " Km/h";

    //Update Weather type and Weather-icon
    if(data.weather[0].main === "Clouds"){
        weatherType.innerText = data.weather[0].main;
        weatherIcon.src = "Images/clouds.png";
    }
    else if(data.weather[0].main === "Clear"){
        weatherType.innerText = data.weather[0].main;
        weatherIcon.src = "Images/clear.png";
    }
    else if(data.weather[0].main === "Rain"){
        weatherType.innerText = data.weather[0].main;
        weatherIcon.src = "Images/rain.png";
    }
    else if(data.weather[0].main === "Drizzle"){
        weatherType.innerText = data.weather[0].main;
        weatherIcon.src = "Images/drizzle.png";
    }
    else if(data.weather[0].main === "Haze"){
        weatherType.innerText = data.weather[0].main;
        weatherIcon.src = "Images/haze.png";
    }
    else if(data.weather[0].main === "Mist"){
        weatherType.innerText = data.weather[0].main;
        weatherIcon.src = "Images/mist.png";
    }
    else if(data.weather[0].main === "Snow"){
        weatherType.innerText = data.weather[0].main;
        weatherIcon.src = "Images/snow.png";
    }
    else if(data.weather[0].main === "Dust"){
        weatherType.innerText = data.weather[0].main;
        weatherIcon.src = "Images/dust.png";
    }
};

//function for getting Weather Data 
addEventListener("keypress", (evt) => {
    if(evt.key === "Enter"){
        getWeatherData();
    }
});

const getWeatherByLocation = async () => {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition( async position => {
            const { latitude, longitude } = position.coords;
            const URL = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${Key}=metric`;

            let response = await fetch(URL);
            
            if (!response.ok) {
                alert("Failed to fetch weather data. Please try again later.");
                return;
            }

            let data = await response.json();
            UpdateWeatherData(data);

        }, error => {
            alert("Failed to get your location. Please allow location access.");
        });
    } 
    else {
        alert("Geolocation is not supported by this browser.");
    }
};

// Call getWeatherByLocation when the page loads
window.onload = getWeatherByLocation;