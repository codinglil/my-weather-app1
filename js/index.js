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

//get temp
function showTemp(response) {
  let temp = Math.round(response.data.main.temp);
  let currentTemp = document.querySelector("#curr-temp");
  currentTemp.innerHTML = `${temp}⁰C`;

  let description = response.data.weather[0].description;

  let weather = document.querySelector(".weather-description");
  console.log(weather);
  weather.innerHTML = `<strong>${description.toUpperCase()}</strong>`;

  let imgIcon = document.querySelector("#current-img");
  let icon = response.data.weather[0].icon;
  console.log(icon);
  if (icon === "01d") {
    imgIcon.setAttribute(`src`, `img/sunny2.gif.webp`);
  } else if (icon === "02d") {
    imgIcon.setAttribute(`src`, `img/partly cloudy.webp`);
  } else if (icon === "09d" || icon === "10d") {
    imgIcon.setAttribute(`src`, `img/rain1.gif`);
  } else if (icon === "11d") {
    imgIcon.setAttribute(`src`, `img/thunder.gif`);
  } else if (icon === "13d") {
    imgIcon.setAttribute(`src`, `img/snow.gif`);
  } else if (icon === "50d") {
    imgIcon.setAttribute(`src`, `img/fog.gif`);
  } else if (icon === "10d" && description === "light rain") {
    imgIcon.setAttribute(`src`, `img/rainandsun.gif`);
  } else if (icon === "03d" || icon === "04d") {
    imgIcon.setAttribute(`src`, `img/cloudy.gif.webp`);
  } else if (
    icon === "01n" ||
    icon === "02n" ||
    icon === "03n" ||
    icon === "04n"
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

function showMyTemp(response) {
  let temp = Math.round(response.data.main.temp);

  let myCurrentTemp = document.querySelector("#curr-temp");
  myCurrentTemp.innerHTML = `${temp}⁰C`;
  let h3 = document.querySelector("#chosen-city-name-update");
  h3.innerHTML = response.data.name;
  //h3.innerHTML = `It is ${temp}⁰C`;
  let p = document.querySelector("#chosen-city-weather-description");
  p.innerHTML = `<strong><i>${response.data.weather[0].description.toUpperCase()}</i></strong> at your location now.`;
}
//2 degrees
//  function changeToC(event) {
//  event.preventDefault();
//  let currentTemp = document.querySelector("#curr-temp");
//  currentTemp.innerHTML = ;
//  }
//  let clickC = document.querySelector(".c");
//  clickC.addEventListener("click", changeToC);

//  function changeToF(event) {
//      event.preventDefault();
//   let currentTemp = document.querySelector("#curr-temp");
//  currentTemp.innerHTML = ;
//  }
//  let clickF = document.querySelector(".f");
//  clickF.addEventListener("click", changeToF);

//3 date manipulation
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
  let minutes = currentDate.getMinutes();

  let currentDateTitle = document.querySelector(".current-date");
  currentDateTitle.innerHTML = `${month} ${day}, ${hour}:${minutes}`;
}
displayTodayDate();
