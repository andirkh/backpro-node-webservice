// server.js
// where your node app starts

// init project
const express = require('express');
const synaptic = require('synaptic');
const Network = synaptic.Network;
const bodyParser = require('body-parser');
const app = express();
const multilayer = require('./public/multilayer.json');

var myNetwork = Network.fromJSON(multilayer);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static('public'));

app.get('/', function(request, response) {
  response.sendFile(__dirname + '/views/index.html');
});

app.post('/predict', function(request, response){
  var matrix = request.body.matrix;
  var matrixLen = matrix.length;
  
  if(matrixLen === 625){
    var result = myNetwork.activate(matrix);
    response.status(200).send({"msg": "Success", "result": result})
  } else {
    response.status(404).send({"msg": "Matrix harus sepanjang 625", "result": []})
  }
})

const listener = app.listen(process.env.PORT, function() {
  console.log('Your app is listening on port ' + listener.address().port);
});
