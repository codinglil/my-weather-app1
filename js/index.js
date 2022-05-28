//search city and update name
function searchCity(event) {
  event.preventDefault();
  let displayCity = document.querySelector("#search-place");

  let h3 = document.querySelector("#chosen-city-name-update");
  h3.innerHTML = `${displayCity.value.toUpperCase()}`;
  let p = document.querySelector(".city-change-name");
  p.innerHTML = `${displayCity.value.toUpperCase()}`;

  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${displayCity.value}&appid=d5ccd512023748fb33c1fa7c1f597470&units=metric`;
  axios.get(apiUrl).then(showTemp);
}

let form = document.querySelector("form");
form.addEventListener("submit", searchCity);

//get temp based on the selected city
function showTemp(response) {
  celsiusTemp = response.data.main.temp;
  let temp = Math.round(celsiusTemp);
  let currentTemp = document.querySelector("#curr-temp");
  currentTemp.innerHTML = `${temp}⁰C`;

  let description = response.data.weather[0].description;
  let weather = document.querySelector(".weather-description");
  weather.innerHTML = `<strong>${description.toUpperCase()}</strong>`;

  let imgIcon = document.querySelector("#current-img");
  let icon = response.data.weather[0].icon;
  console.log(icon);
  if (icon === "01d") {
    imgIcon.setAttribute(`src`, `img/sunny2.gif.webp`);
  } else if (icon === "02d") {
    imgIcon.setAttribute(`src`, `img/partly cloudy.webp`);
  } else if (icon === "09d" || icon === "10d") {
    imgIcon.setAttribute(`src`, `img/rain.gif`);
  } else if (icon === "11d" || icon === "11n") {
    imgIcon.setAttribute(`src`, `img/thunder.gif`);
  } else if (icon === "13d" || icon === "13n") {
    imgIcon.setAttribute(`src`, `img/snow.gif`);
  } else if (icon === "50d" || icon === "50n") {
    imgIcon.setAttribute(`src`, `img/fog.gif`);
  } else if (icon === "03d" || icon === "04d") {
    imgIcon.setAttribute(`src`, `img/cloudy.gif.webp`);
  } else if (
    icon === "01n" ||
    icon === "02n" ||
    icon === "03n" ||
    icon === "04n" ||
    icon === "09n" ||
    icon === "10n"
  ) {
    imgIcon.setAttribute(`src`, `img/night.gif`);
  }
}
//adding a button listener
function getPosition(position) {
  navigator.geolocation.getCurrentPosition(getPosition);
  let lon = position.coords.longitude;
  let lat = position.coords.latitude;

  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lon=${lon}&lat=${lat}&appid=d5ccd512023748fb33c1fa7c1f597470&units=metric`;
  axios.get(apiUrl).then(showMyTemp);
}
let button = document.querySelector(".myCity");
button.addEventListener("click", getPosition);

//my location
function showMyTemp(response) {
  celsiusTemp = response.data.main.temp;

  let myCurrentTemp = document.querySelector("#curr-temp");
  myCurrentTemp.innerHTML = `${Math.round(celsiusTemp)}⁰C`;
  let h3 = document.querySelector("#chosen-city-name-update");
  h3.innerHTML = response.data.name;

  let p = document.querySelector("#chosen-city-weather-description");
  p.innerHTML = `<strong><i>${response.data.weather[0].description.toUpperCase()}</i></strong> at your location now.`;
  let imgIcon = document.querySelector("#current-img");
  let icon = response.data.weather[0].icon;
  console.log(icon);
  if (icon === "01d") {
    imgIcon.setAttribute(`src`, `img/sunny2.gif.webp`);
  } else if (icon === "02d") {
    imgIcon.setAttribute(`src`, `img/partly cloudy.webp`);
  } else if (icon === "09d" || icon === "10d") {
    imgIcon.setAttribute(`src`, `img/rain.gif`);
  } else if (icon === "11d" || icon === "11n") {
    imgIcon.setAttribute(`src`, `img/thunder.gif`);
  } else if (icon === "13d" || icon === "13n") {
    imgIcon.setAttribute(`src`, `img/snow.gif`);
  } else if (icon === "50d" || icon === "50n") {
    imgIcon.setAttribute(`src`, `img/fog.gif`);
  } else if (icon === "03d" || icon === "04d") {
    imgIcon.setAttribute(`src`, `img/cloudy.gif.webp`);
  } else if (
    icon === "01n" ||
    icon === "02n" ||
    icon === "03n" ||
    icon === "04n" ||
    icon === "09n" ||
    icon === "10n"
  ) {
    imgIcon.setAttribute(`src`, `img/night.gif`);
  }
}
//2 degrees

function changeToF(event) {
  event.preventDefault();
  let currentTemp = document.querySelector("#curr-temp");
  let fahrenheitTemp = (celsiusTemp * 9) / 5 + 32;
  currentTemp.innerHTML = `${Math.round(fahrenheitTemp)}⁰F`;
}
let clickF = document.querySelector(".f");
clickF.addEventListener("click", changeToF);

function changeToC(event) {
  event.preventDefault();
  let currentTemp = document.querySelector("#curr-temp");
  currentTemp.innerHTML = `${Math.round(celsiusTemp)}⁰C`;
}
let clickC = document.querySelector(".c");
clickC.addEventListener("click", changeToC);

let celsiusTemp = null;

//date manipulation
function displayDay() {
  let currentDay = new Date();
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[currentDay.getDay()];
  let currentDayTitle = document.querySelector(".current-day-title");
  currentDayTitle.innerHTML = `${day}`;
}

displayDay();

function displayTodayDate() {
  let currentDate = new Date();
  let months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  let month = months[currentDate.getMonth()];
  let day = currentDate.getDate();
  let hour = currentDate.getHours();
  if (hour < 10) {
    hour = `0${hour}`;
  }
  let minutes = currentDate.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  let currentDateTitle = document.querySelector(".current-date");
  currentDateTitle.innerHTML = `${month} ${day}, ${hour}:${minutes}`;
}
displayTodayDate();
