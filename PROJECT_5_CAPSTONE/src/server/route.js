const express = require('express');
const router = new express.Router();
const axios = require('axios');
const https = require('https')



//Router is part of express//
const corsHack = 'https://cors-anywhere.herokuapp.com/';

router.get('/geoname', function (req, res) {
    res.json(projectData) //returning object test:food//
})

router.post('/projectGeo', function (req, res) {
    projectData.push(req.body)
    console.log(projectData);
    res.json(req.body);
})

const pixabayKey = '17832682-4940a0d36b5beff720c7e03a3';
const geonameUser = 'aderinto2020';
const weatherBitKey = '78951238bf09442296e764687ee65a2f';

router.get('/add-location/:locationname/:from/:to', async (req, res) => {
    let newObj = {
        from: req.params.from,
        to: req.params.to
    }

    //const endDate = new Date(req.params.from+'T00:00:00');
    //endDate.setDate(endDate.getUTCDate() + 1);
    //const apiDate = endDate.getFullYear() + '-' + leadingZero(endDate.getMonth()+1)+ '-' + leadingZero(endDate.getDate());

    const targetDate = new Date(req.params.from+'T00:00:00Z');
    targetDate.setFullYear(targetDate.getFullYear() - 1);
    const apiStartDate = targetDate.getFullYear() + '-' + leadingZero(targetDate.getUTCMonth()+1)+ '-' + leadingZero(targetDate.getUTCDate());
    targetDate.setDate(targetDate.getDate() + 1);
    const apiEndDate = targetDate.getFullYear() + '-' + leadingZero(targetDate.getUTCMonth()+1)+ '-' + leadingZero(targetDate.getUTCDate());
    
    
    function leadingZero(inp){
        if(Number(inp) < 10) {
            return '0' + inp;
        }
        return  inp;
    }


    let result = await axios.get(`http://api.geonames.org/search?type=json&name=${encodeURIComponent(req.params.locationname)}&maxRows=10&username=${geonameUser}`)

    newObj.locationname = result.data.geonames[0].name + ', ' + result.data.geonames[0].countryName
    // call 3
    let weatherURL = `http://api.weatherbit.io/v2.0/history/daily?lat=${result.data.geonames[0].lat}&lon=${result.data.geonames[0].lng}&key=${weatherBitKey}`;
    weatherURL+=`&start_date=${apiStartDate}&end_date=${apiEndDate}&units=I`
    console.log(weatherURL)
    let weather = await axios.get(weatherURL)
    
    
    newObj.weather = {
        minTemp:weather.data.data[0].min_temp, 
        maxTemp:weather.data.data[0].max_temp,
        cloudy:weather.data.data[0].clouds > 45? "cloudy":"clear"
    }
    let pixaBayUrl = `https://pixabay.com/api/?key=${pixabayKey}&q=${encodeURIComponent(req.params.locationname)}`;
    let pictures = await axios.get(pixaBayUrl);

    newObj.pictures = pictures.data.hits
    
    res.json(newObj)


})
module.exports = router; //we tell node that module should export router//
//'/getData is the endpoint//

