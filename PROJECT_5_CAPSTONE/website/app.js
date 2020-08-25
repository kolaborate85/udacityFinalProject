/* Global Variables */
const corsHack = 'https://cors-anywhere.herokuapp.com/';

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth()+'.'+ d.getDate()+'.'+ d.getFullYear();


//get the api url and the api keys//
const weatherUrl = 'https://api.openweathermap.org/data/2.5/weather';
const apikey = '9b64546f74f20e37483a4d7ff28b50f3';

//dom values//
//we replace zipcode with city and got rid of feeling//
const city = document.getElementById('city');

// we create a callback function from the evenListener//

const generateButton = document.getElementById('generate');
generateButton.addEventListener('click', createEntry);

function createEntry() {
    getWeather(function(result){

        let payload = {
            temperature: result.main.temp/10 * 9/5 + 32,
            date: new Date(),
            userResponse: feelings.value
        }
        apiPost('/api/projectData', payload, getLatestEntry)
            
      
    })
}

function getWeather(cb){
    apiGet(corsHack+weatherUrl+'?appid='+apikey+'&zip='+zipInput.value, cb)
}


function apiGet(route,cb){
  fetch(route)
      .then(function(res){ return res.json()})
      .then(function(res){
          cb(res)
      })
}
function apiPost(route, payload, cb){
  fetch(route, {
      method: 'POST',
      headers: {
        "Content-Type": "application/json"
      }, 
    body: JSON.stringify(payload)
  })
      .then(function(res){ return res.json()})
      .then(function(res){
          cb(res)
      })
}
// we replace date, temp, content with latitude, longitude, and country
const latitude = document.getElementById('lati');
const longitude = document.getElementById('longi');
const country = document.getElementById('country');

function getLatestEntry() {
    apiGet('/api/projectData', function(result){
        let latestEntry = result[result.length-1];
        date.innerText = latestEntry.date;
        //temp.innerText = latestEntry.temp;
        temp.innerText = latestEntry.temperature;
        content.innerText = latestEntry.userResponse; 
    })
}
getLatestEntry();
