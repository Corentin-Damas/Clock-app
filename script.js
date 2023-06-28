const API_KEY_GEOLOC = config.API_KEY_GEOLOC;
const detailBtn = document.querySelector(".btn");
const mainContainer = document.querySelector(".container");

let isNight = false;
// GET RANDOM PROGRAMING QUOTE || JOKE /////////////////////////////////////
const quoteText = document.querySelector(".quote__text");
const quoteAuthor = document.querySelector(".quote__author");

URL = "https://api.chucknorris.io/jokes/random";
async function getJoke() {
  const response = await fetch(URL);
  const jsonData = await response.json();
  console.log(jsonData);
  return jsonData;
}
// Depending if i want to add more joke from differents API later as
// long has the reponse from this api dosn't countain "Chuck norris" = durty way
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
const timeZoneLoc = document.querySelector(".timeZone");
const timePeriod = document.querySelector(".gi__periodOfDay");
const timeformat = document.querySelector(".gi__timeFormat");
const weekDay = document.querySelector(".weekday");
const yearDay = document.querySelector(".yearDay");
const weekNumber = document.querySelector(".weekNumber");
const iconDayPeriod = document.querySelector(".icon-day-period");

function display_currentTime() {
  const currentTime = new Date();
  // const currentTime = new Date('December 17, 1995 03:24:00'); // Test for the night design

  // Show in witch period of the day we are Morning | After-noon | Night
  if (currentTime.getHours() >= 6 && currentTime.getHours() < 12) {
    timePeriod.innerHTML = "Morning";
  }
  if (currentTime.getHours() >= 12 && currentTime.getHours() < 22) {
    timePeriod.innerHTML = "Afternoon";
    
  } else {
    timePeriod.innerHTML = "Evening";
    iconDayPeriod.src = "assets/desktop/icon-moon.svg";
    isNight = true
  }

  timeformat.innerHTML = currentTime.toUTCString().slice(-4); // At the end of the string the time zone type is used

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
  const currentSecond = currentTime.getSeconds();

  if (currentSecond >= 3) {
    timeOutPrecision = 60 - currentSecond;
    refresh = 1000 * timeOutPrecision;
    setTimeout(display_currentTime, refresh);
  } else {
    refresh = 1000 * 60;
    setTimeout(display_currentTime, refresh);
  }

  // MORE DETAILS Panel
  timeZoneLoc.innerHTML = Intl.DateTimeFormat().resolvedOptions().timeZone; // Get time zone ex Europe/paris
  weekDay.innerHTML = currentTime.getDay(); // Get and display day of the week in Integer 0 = Sunday 1= Monday

  // Compare the UTC stamp of now and the UTC stamp of the begining of the year
  // The difference is in millisec, we need to convert it back to Days
  function getDayOfYear(date = new Date()) {
    const timestamp1 = Date.UTC(
      date.getFullYear(),
      date.getMonth(),
      date.getDate()
    );
    const timestamp2 = Date.UTC(date.getFullYear(), 0, 0);
    const differenceInMilliseconds = timestamp1 - timestamp2;
    const differenceInDays = differenceInMilliseconds / 1000 / 60 / 60 / 24;
    return differenceInDays;
  }
  yearDay.innerHTML = getDayOfYear(); // Display on main page the day of the year

  // Do the same but for the week
  startDate = new Date(currentTime.getFullYear(), 0, 1);
  const days = Math.floor((currentTime - startDate) / (24 * 60 * 60 * 1000));
  const weekNumberInt = Math.ceil(days / 7); // Main differnce with previous is here where we pass from day to week

  weekNumber.innerHTML = weekNumberInt; // Display on main page the week number
}

// Moving Everything Together /////////////////////////////////////
detailBtn.addEventListener("click", function () {
if(isNight){
  mainContainer.classList.toggle("container-detail-night");
  document.querySelectorAll('.u-text-color').forEach(el => el.style.color="white")
} else {
  mainContainer.classList.toggle("container-detail-day");
}
  document.querySelector(".quote").classList.toggle("more-detail-quote");
  document.querySelector(".global-info").classList.toggle("more-detail-hour");
  document.querySelector(".time-detail").classList.toggle("hide");
  document.querySelector(".more-btn").classList.toggle("btn-up");
  document.querySelector(".btn-icon-wrap").classList.toggle("btn-bg-alt");
  document
    .querySelectorAll(".btn-text")
    .forEach((el) => el.classList.toggle("hide"));
});

// is there a better way to implement all change incase of transition ?

///// API CALLS EVERYTHING ////////////////////////////////////////////

// getJoke().then((data) => (quoteText.innerHTML = data.value));
// getLocation();
display_currentTime();
isNight&& mainContainer.classList.add('night_bg')
