const form = document.getElementById('destination-from');
if(form){
  form.addEventListener('submit', (ev)=> {
    ev.preventDefault();
    
    addDestination(form.elements.destination.value,
      form.elements.from.value, 
      form.elements.to.value)
      .then(res => console.log(res) )
  })
}

const addDestination = (locationname, from, to) => {
  return fetch(`http://localhost:4000/api/add-location/${locationname}/${from}/${to}`)
  .then(f => f.json())
  .then(data => { 
    const storage = readStorage();
    if(storage){
      storage.push(data);
      localStorage.setItem('travelDestinations', JSON.stringify(storage));

    } else {
      localStorage.setItem('travelDestinations', JSON.stringify([data]));
    }
    const card = generateCard(data);
    destinations.innerHTML += card;
  
  })
}



const destinations = document.getElementById('destinations');

function generateCard(cardData){
  return `
    <div class="card">
    
      <h2>${cardData.locationname}</h2>
      <img src="${cardData.pictures[0].previewURL}"/>
      <p>
        Typical weather between ${cardData.from} and ${cardData.to}: 
      </p>
      <ul>
        <li>Temperature: ${cardData.weather.minTemp} - ${cardData.weather.maxTemp}</li>
        <li>Condition: ${cardData.weather.cloudy} </li>
      </ul>
      
    </div>
  `;
}

function readStorage(){
  return JSON.parse(localStorage.getItem('travelDestinations'));
}

function init(){
  const cards = readStorage()
  if(cards){
    cards.forEach(card => {
      const template = generateCard(card);
      destinations.innerHTML += template;
    })
  }
}
export default init;

