const API_KEY_GEOLOC = config.API_KEY_GEOLOC;

// View the current time && Layout change depending on the day period (night/ day)
// Show Current Timezone / Day of the year / day of the week / week number

const triggerAPICalls = document.querySelector(".btn_apicalls");
const detailBtn = document.querySelector('.btn')

// GET RANDOM PROGRAMING QUOTE || JOKE /////////////////////////////////////
//https://github.com/skolakoda/programming-quotes-api
//https://github.com/lukePeavey/quotable
const quoteText = document.querySelector(".quote__text");
const quoteAuthor = document.querySelector(".quote__author");

URL = "https://api.chucknorris.io/jokes/random";
async function getJoke() {
  const response = await fetch(URL);
  const jsonData = await response.json();
  console.log(jsonData);
  return jsonData;
}
// Depending if i want to add more joke from differents API later as long has the reponse from this api dosn't countain "Chuck norris" = durty way
if (URL === "https://api.chucknorris.io/jokes/random") {
  quoteAuthor.innerHTML = "Chuck Norris";
}

// VIEW CURRENT LOCATION ////////////////////////////////////////////////

// API GEOLOCALISATION CALL
// exmple of api call 'https://geocode.xyz/51.50354,-0.12768?geoit=xml&auth=your_api_key'
// what we want : 'https://geocode.xyz/latitude,longitude?geoit=JSON&auth=API_KEY_GEOLOC'
async function getLocalisation(URL_LOC) {
  const response = await fetch(URL_LOC);
  const jsonData = await response.json();
  console.log(jsonData);
  return jsonData;
}

// View the current time and location information based on their IP address
function getLocation() {
  const message = document.querySelector(".message");
  const location = document.querySelector(".location");

  // check if the Geolocation API is supported
  if (!navigator.geolocation) {
    message.innerHTML = `Your browser doesn't support Geolocation`;
    return;
  } else {
    navigator.geolocation.getCurrentPosition(onSuccess, onError);
  }
  // handle success case
  function onSuccess(position) {
    const { latitude, longitude } = position.coords;
    URL_LOC = `https://geocode.xyz/${latitude},${longitude}?geoit=JSON&auth=${API_KEY_GEOLOC}`;
    getLocalisation(URL_LOC).then(
      (data) => (location.innerHTML = `${data.city},${data.country}`)
    );
  }
  // handle error case
  function onError() {
    location.innerHTML = `Failed to get your location!`;
  }
}

// TIME ////////////////////////////////////////////////
const hours = document.querySelector(".time-hour");
const minutes = document.querySelector(".time-min");
const timeZoneLoc = document.querySelector(".gi__timeZone");
const timePeriod = document.querySelector(".gi__periodOfDay");

const iconDayPeriod = document.querySelector('.icon-day-period')

function display_currentTime() {
  const currentTime = new Date();

  // Show in witch period of the day we are Morning | After-noon | Night
  if (currentTime.getHours() >= 6 && currentTime.getHours() < 12) {
    timePeriod.innerHTML = "Morning";
  }
  if (currentTime.getHours() >= 12 && currentTime.getHours() < 22) {
    timePeriod.innerHTML = "Afternoon";
  } else {
    timePeriod.innerHTML = "Evening"
    iconDayPeriod.src = "assets/desktop/icon-moon.svg"
  };

  // Get Hours and Minutes for the digital clock && make sure that it show 2digits everytime
  const currentHour = currentTime.getHours();
  const currentMin = currentTime.getMinutes();

  if (currentHour < 10) {
    hours.innerHTML = `0${currentHour}`;
  } else {
    hours.innerHTML = currentHour;
  }

  if (currentMin < 10) {
    minutes.innerHTML = `0${currentMin}`;
    console.log(currentMin);
  } else {
    minutes.innerHTML = currentMin;
  }

  // Refresh the clock to for everyminutes// make sure also that if we log at sec 45 it will not log every 
  //minutes at second 45 
  timeZoneLoc.innerHTML = `Time Zone: \n ${Intl.DateTimeFormat().resolvedOptions().timeZone}`;

  const currentSecond = currentTime.getSeconds();

  if (currentSecond >= 3) {
    timeOutPrecision = 60 - currentSecond;
    refresh = 1000 * timeOutPrecision;
    setTimeout(display_currentTime, refresh);
  } else {
    refresh = 1000 * 60;
    setTimeout(display_currentTime, refresh);
  }
}

  // const ampm = currentTime.getHours( ) >= 12 ? ' PM' : ' AM';
// var option = { weekday: "long", day: "numeric", month: "long" };
// // var fullDate = today.toLocaleDateString("en-US", option);
// var options = {
//   weekday: "long",
//   year: "numeric",
//   month: "long",
//   day: "numeric",
// };
// var today = new Date();

// console.log(today.toLocaleDateString("en-US")); // 9/17/2016
// console.log(today.toLocaleDateString("en-US", options)); // Saturday, September 17, 2016
// console.log(today.toLocaleDateString("hi-IN", options));//

// DEV TOOLS ////////////////////////////////////////////////
// Some API are limited on requests, to limit them, i've added a call btn to do all request in one and not evertime the website refresh during development
triggerAPICalls.addEventListener("click", function () {
  getJoke().then((data) => (quoteText.innerHTML = data.value));
  getLocation();
  display_currentTime();
});


detailBtn.addEventListener('click', function(){
  
})