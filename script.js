

// View the current time and location information based on their IP address
// Layout change depending on the day period (night/ day)
// Show Current Timezone / Day of the year / day of the week / week number


// Get random programming quote  at the start and on clic

URL = "https://api.chucknorris.io/jokes/random"

async function logJSONData() {
    const response = await fetch(URL);
    const jsonData = await response.json();
    console.log(jsonData);
  }