//server for the Sentient web app


var express = require('express');  
var bodyParser = require( 'body-parser' );  // parser for post requests
var watson = require( 'watson-developer-cloud' );  // watson sdk


var app = express();

// import necessary modules to handle corresponding requests
var AnalyzeTone = require('./js/AnalyzeTone');
var AnalyzeNL = require('./js/NaturalLanguageProcesser');
var Discovery = require('./js/Discovery');

 
// decode the body of the post request
app.post('/services/AnalyzeTone', bodyParser.json({type: 'json'}));
//route /services/AnalyzeTone requests to the AnalyzeTone module
app.post('/services/AnalyzeTone', AnalyzeTone);

app.post('/services/AnalyzeNL', bodyParser.json({type: 'json'}));
//route /services/AnalyzeTone requests to the AnalyzeNL module
app.post('/services/AnalyzeNL', AnalyzeNL);
 
app.post('/services/Discovery', bodyParser.json({type: 'json'}));
//route /services/AnalyzeTone requests to the AnalyzeNL module
app.post('/services/Discovery', Discovery);

//call homepage
app.use('/', express.static('public')); 


app.listen(8081);
