

function displayWeather(data) {
    // Get reference to the html element 
    const weatherIcon =document.getElementById('weather-icon');
    const tempDivInfo = document.getElementById('temp-div');
    const weatherInfoDiv = document.getElementById('weather-info');
    const hourlyForecastDiv = document.getElementById('hourly-forecast');
    
    //Clear previous content
    tempDivInfo.innerHTML = '';
    weatherInfoDiv.innerHTML ='';
    hourlyForecastDiv.innerHTML = '';

    if(data.cod === '404') {
        weatherInfoDiv.innerHTML = `<p>${data.message}</p>`;
    }
    else{
        const cityName = data.name;
        const temperature = Math.round(data.main.temp - 273.15);
        const description = data.weather[0].description;
        const iconCode = data.weather[0].icon;
        const iconUrl = `https://openweathermap.org/img/wn/${iconCode}@4x.png`;

        const temperatureHtml = `<p>${temperature}°C</p>`;
        const weatherHtml = `
            <p>${cityName}</p>
            <p>${description}</p>
        `;

        tempDivInfo.innerHTML = temperatureHtml;
        weatherInfoDiv.innerHTML = weatherHtml;
        weatherIcon.src = iconUrl;
        weatherIcon.alt = description;

        showImage();
    }   
}

function displayHourlyForecast(hourlyData) {
    // Get reference to the html element where the hourly forecast will be displayed
    const hourlyForecastDiv = document.getElementById('hourly-forecast');
    
    // We are extracting first 8 items from the hourlyData.
    const next24Hours = hourlyData.slice(0, 8);

    next24Hours.forEach(item => {
        const dateTime = new Date(item.dt * 1000);
        const hour = dateTime.getHours();
        const iconCode = item.weather[0].icon;
        const iconUrl = `https://openweathermap.org/img/wn/${iconCode}.png`;
        const temperatue = Math.round(item.main.temp - 273.15);
    
        const hourlyItemHtml = `
            <div class="hourly-item">
                <span>${hour}:00</span>
                <img src="${iconUrl}" alt="Hourly Weather Icon">
                <span>${temperatue}°C</span>
            </div>    
        `;
        hourlyForecastDiv.innerHTML += hourlyItemHtml;
    });
}

function showImage() {
    //Geting the reference to weather-icon image element rather than weather icon HTML element.
    const weatherIcon = document.getElementById('weather-icon');
    
    //This particular CSS property is controlling visiblity of the element and Setting it to 'block' is making image become visible on webpage.
    weatherIcon.style.display = 'block';
}

function getWeather() {
    //const apikey = '9543b7510875f193382c46946f8a83a6';
    const city = document.getElementById('city').value;

    if(!city){
        alert('Please enter a city');
        return;
    }
    // Construction of URL 
    const currentWeatherUrl = `/api?q=${city}`;
    const forecastUrl = `/api?q=${city}`;
    
    fetch(currentWeatherUrl)
        .then(res => res.json())
        .then(data => {
            displayWeather(data);
        })
        .catch(err => {
            console.log('Error fetching current weather data:', err);
            alert('Error fetching current weather data. Please try again.');
        })

    /*fetch(forecastUrl)
        .then(res => res.json())
        .then(data => {
            displayHourlyForecast(data.list);
        })
        .catch(err => {
            console.log('Error fetching current forecast data:', err);
            alert('Error fetching hourly weather data. Please try again.');
        })   
    */              
}