const weatherInfo = document.querySelector('.weather');
const cityName = document.querySelector('.location');
const temp = document.querySelector('.currentTemp');
const date = document.querySelector('.date');
const highlow = document.querySelector('.highlow');
const description = document.querySelector('.description');
const unit = document.querySelector('.unit');
unit.addEventListener('click', toggleUnit);

//to start 
let entercity = 'brooklyn'
fetchCurrent(entercity);


const form = document.querySelector('.search');
const input = document.querySelector('input');
form.addEventListener('submit', (e) => {
    e.preventDefault();
    entercity = e.currentTarget.city.value;
    fetchCurrent(entercity);
})

async function fetchCurrent(city) {
    try {
        let response = ''
        if (unit.classList.contains('f')) {
            response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=8a386e1d63025c611c2e68a0d31378c1&units=imperial`, { mode: 'cors' })
        }
        else if (unit.classList.contains('c')) {
            response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=8a386e1d63025c611c2e68a0d31378c1&units=metric`, { mode: 'cors' })
        }
        const data = await response.json();
        displayData(storeData(data));
    }
    catch (e) {
        alert("City not found. Please enter a valid city.")
        // console.log("Error. Enter a valid city. ", e);
    }
}

function storeData(data) {
    let weather = {
        cityName: data.name,
        temp: Math.round(data.main.temp),
        high: Math.round(data.main.temp_max),
        low: Math.round(data.main.temp_min),
        description: data.weather[0].description,
        day: new Date(data.dt * 1000).toLocaleString('en-us', { month: 'long', year: 'numeric', day: 'numeric' }),
        time: new Date(data.dt * 1000).getHours()
    }
    return weather;
}



function displayData(weather) {
    let units = 'F'
    if (unit.classList.contains('c')) {
        units = 'C'
    }
    cityName.textContent = weather.cityName;
    temp.textContent = `${weather.temp} °${units}`
    description.textContent = weather.description;
    date.textContent = `${weather.day}`;
    highlow.textContent = `H: ${weather.high} °${units} L: ${weather.low} °${units}`;
    let hours = weather.time
    if (hours > 6 && hours < 20) {
        document.body.style.backgroundImage = "url('https://images.unsplash.com/photo-1514454529242-9e4677563e7b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2940&q=80')"
    }
    else {
        document.body.style.backgroundImage = "url('https://images.unsplash.com/photo-1528722828814-77b9b83aafb2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2670&q=80')"
    }
}


function toggleUnit() {
    unit.classList.toggle('f');
    unit.classList.toggle('c');
    if (unit.classList.contains('f')) {
        unit.textContent = 'display °C'
        fetchCurrent(entercity)

    }
    else {
        unit.textContent = 'display °F'
        fetchCurrent(entercity)
    }
}
