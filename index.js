//server for the Sentient web app


var express = require('express');  // app server
var bodyParser = require( 'body-parser' );  // parser for post requests
var watson = require( 'watson-developer-cloud' );  // watson sdk

 
var app = express();

// require/imports necessary modules to handle
// corresponding requests
var AnalyzeTone = require('./js/AnalyzeTone');


// decode the body of the post request
app.post('/services/AnalyzeTone', bodyParser.json({type: 'json'}));
//route /services/AnalyzeTone requests to the AnalyzeTone module
app.post('/services/AnalyzeTone', AnalyzeTone); 


//call homepage  
app.use('/', express.static('public')); 

           
app.listen(8081); 