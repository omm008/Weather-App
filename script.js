let tym = document.querySelector('#time');
let sunIcon = document.querySelector('#sunFace');
let selectCountry = document.querySelector('#searchInput');
let inputCity = document.querySelector('#city');


// weather.js
let city = "New Delhi"
// Replace this with any city or get input from a form

selectCountry.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
        const city = e.target.value.trim();
            inputCity.innerHTML = selectCountry.value;
            getWeather(city);
    }
});

// Call the WeatherAPI
async function getWeather(city) {
    const apiKey = "73749f7903dc408f84654402250405";
    const url = `http://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${encodeURIComponent(city)}&days=1&aqi=yes&alerts=no`;

    try {
        const response = await fetch(url);
        const data = await response.json();
        updateWeatherUI(data);
    } catch (error) {
        console.error("Failed to fetch weather data:", error);
        console.log("Could not load weather data.");
    }
}

// Update the content on the page dynamically
function updateWeatherUI(data) {
    
    let temp = document.querySelector('#temp-c');
    let max = document.querySelector('#max-val');
    let min = document.querySelector('#min-val');
    let feels = document.querySelector('#fLike-val');
    let humid = document.querySelector('#humidity-val');
    let wind = document.querySelector('#wSpeed-val');
    let rain = document.querySelector('#rain-val');
    let aqi = document.querySelector('#aqi-val');

    let cntry = document.querySelector('#country');
    cntry.innerHTML = data.location.country;
    temp.innerHTML = `${data.current.temp_c}°C`;
    
    feels.innerHTML = `${data.current.feelslike_c}°C`;
    humid.innerHTML = `${data.current.humidity}%`;
    wind.innerHTML = `${data.current.wind_kph} km/h`;
    rain.innerHTML = `${data.current.precip_mm} mm`;
    aqi.innerHTML = `${data.current.air_quality.pm2_5}`;
    max.innerHTML = `${data.forecast.forecastday[0].day.maxtemp_c}°C`;
    min.innerHTML = `${data.forecast.forecastday[0].day.mintemp_c}°C`;
}

// Call the function on page load
window.onload = () => {
    getWeather(city);
};



const cities = [
    { name: "London", id: "lndn" },
    { name: "Washington", id: "usa" },
    { name: "Beijing", id: "china" },
    { name: "Moscow", id: "mscw" },
    { name: "Paris", id: "prs" }
];

async function updateAllCitiesWeather() {
    const apiKey = "73749f7903dc408f84654402250405";

    for (const city of cities) {
        const url = `http://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${encodeURIComponent(city.name)}&aqi=no`;

        try {
            const response = await fetch(url);
            const data = await response.json();
            const temp = data.current.temp_c;

            const element = document.getElementById(city.id);
            if (element) {
                element.textContent = `${temp}°C`;
            }
        } catch (error) {
            console.error(`Error fetching weather for ${city.name}:`, error);
            const element = document.getElementById(city.id);
            if (element) {
                element.textContent = "N/A";
            }
        }
    }
}

// Call auto-update once on page load
window.addEventListener("load", () => {
    updateAllCitiesWeather();

    // Optional: Refresh every 10 minutes
    setInterval(updateAllCitiesWeather, 10 * 60 * 1000);
});

//Updating background color based on time
function updateBackgroundBasedOnTime() {
    const mainBox = document.getElementById("mainWeatherBox");
    const hour = new Date().getHours();

    let bgColor = "";
    let textColor = "";

    if (hour >= 5 && hour < 12) {
        // Morning
        bgColor = "linear-gradient(to right, #fceabb, #f8b500)";
        textColor = "black";
    } else if (hour >= 12 && hour < 17) {
        // Afternoon
        bgColor = "linear-gradient(to right, #f6d365, #fda085)";
        textColor = "black";
    } else if (hour >= 17 && hour < 20) {
        // Evening
        bgColor = "linear-gradient(to right, #a18cd1, #fbc2eb)";
        textColor = "black";
    } else {
        // Night
        bgColor = "linear-gradient(to right, #0f2027, #203a43, #2c5364)";
        textColor = "white";
    }

    mainBox.style.background = bgColor;
    mainBox.style.color = textColor;
}

window.addEventListener("load", () => {
    updateBackgroundBasedOnTime();
    updateAllCitiesWeather(); // your other weather updater
});


// Time.js

let curHours = new Date().getHours();
let curMins = new Date().getMinutes();

if(curMins < 10) {
    tym.innerHTML = `${curHours} : 0${curMins}`;
} else {
    tym.innerHTML = `${curHours} : ${curMins}`;
}
setInterval(() => {
    if(curMins < 10) {
        tym.innerHTML = `${curHours} : 0${curMins}`;
    } else {
        tym.innerHTML = `${curHours} : ${curMins}`;
    }
}, 10000);


let arr = {
    sun:{
        src: './assets/sun.png',
        alt: 'sun',
    },
    sunset:{
        src: './assets/sunset.png',
        alt: 'sunset',
    },
    moon:{
        src: './assets/moon.png',
        alt: 'moon',
    }
}

if(curHours >= 6 && curHours < 16) {
    sunIcon.innerHTML =  `<img id="sunFace" src="${arr.sun.src}" alt="">`
}
else if(curHours >= 16 && curHours < 19) {
    sunIcon.innerHTML = `<img id="sunFace" src="${arr.sunset.src}" alt="">`
    sunIcon.alt = arr.sunset.alt;
}
else{
    sunIcon.innerHTML = `<img id="sunFace" src="${arr.moon.src}" alt="">`
    sunIcon.alt = arr.moon.alt;
}
