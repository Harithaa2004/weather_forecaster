var apikey = '3d1330686a3152bfe4e87d46fd8e3f91';
var api = 'https://api.openweathermap.org/data/2.5/weather?q=';
var searchBox = document.querySelector('.search input');
var searchBtn = document.querySelector('.search button');
var weatherIcon = document.querySelector('.weather-icon');

async function fetchCity(city) {
  const response = await fetch(
    api + city + '&appid=' + apikey + '&units=metric'
  );
  if (response.status == 404) {
    document.querySelector('.error').style.display = 'block';
    document.querySelector('.weather').style.display = 'none';
  } else {
    var data = await response.json();
    document.querySelector('.city').innerHTML = data.name;
    document.querySelector('.temp').innerHTML =
      Math.round(data.main.temp) + '*C';
    document.querySelector('.humidity').innerHTML = data.main.humidity + '%';
    document.querySelector('.wind').innerHTML = data.wind.speed + ' km/h';

    console.log(data.weather[0].main);
    if (data.weather[0].main == 'Clouds') {
      weatherIcon.src = 'img/clouds.png';
    } else if (data.weather[0].main == 'Clear') {
      weatherIcon.src = 'img/clear.png';
    } else if (data.weather[0].main == 'Rain') {
      weatherIcon.src = 'img/rain.png';
    } else if (data.weather[0].main == 'Drizzle') {
      weatherIcon.src = 'img/drizzle.png';
    } else if (data.weather[0].main == 'Mist') {
      weatherIcon.src = 'img/mist.png';
    }

    document.querySelector('.weather').style.display = 'block';
    document.querySelector('.error').style.display = 'none';
  }
}

searchBtn.addEventListener('click', () => {
  fetchCity(searchBox.value);
});

searchBox.addEventListener('keydown', (e) => {
  if (e.key === 'Enter') {
    fetchCity(searchBox.value);
  }
});
