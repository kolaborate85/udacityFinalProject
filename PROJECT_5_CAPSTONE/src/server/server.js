const express = require('express');
const app = express();
const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended:true }));
app.use(bodyParser.json());

const cors = require('cors');
app.use(cors())

app.use(express.static('website'));
app.use('/api', require('./route.js'));

const port = 4000;

app.get('/', function(req, res){
    res.sendFile(__dirname+'/website/index.html')
})
const localserver = app.listen(port, callback);

function callback(){
    console.log("server is testing");
    console.log(`runing localhost: ${port}`);

}

