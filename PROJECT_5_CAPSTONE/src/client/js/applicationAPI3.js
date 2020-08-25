const { default: Axios } = require("axios");

const corsHack = 'https://cors-anywhere.herokuapp.com/';


//get the api url and the api keys//
const pixUrl = 'https://pixabay.com/api/';
const pixKey = '17832682-4940a0d36b5beff720c7e03a3';

const getPictures = async (pixUrl,pixKey)=>{
    try{
      const response = await fetch(pixUrl+pixKey);
      const pixArray = await response.json();
      const pixData = pixArray;
      return pixData
    } catch(error){
      console.log('error', error);
    }
  }

const postPicts = async( url = '', pictData = {})=>{
    const response = fetch(url = 'http://localhost:6000/', {
    method: 'POST', 
    credentials: 'same-origin', 
    headers: {
        'Content-Type': 'application/json',
    },
    body: JSON.stringify(pictData),
    }).then(getPictures())


}

