var express = require('express');

   //create an instance of the tone analyzer with your credentials
   var NaturalLanguageUnderstandingV1 = require('watson-developer-cloud/natural-language-understanding/v1.js');
   var natural_language_understanding = new NaturalLanguageUnderstandingV1({
        username: '5447e3f1-9ba5-43ed-97ad-06b6e8c247e1',
        password: 'qpUYARBca7hk',
        version_date: '2018-02-22'
      });




  module.exports = function(req, res) {

     console.log("the request received by NLP is: " + req.body.input);

      //NLP parameters
      var params = {
      'text':  req.body.input,
      'features': {
          'keywords': {
            'emotion': true,
            'sentiment': true,
            'limit': 2
          },
          'emotion': {},
          'sentiment': {}
        }
      };

      //call tone analyzer to analyze doc
      natural_language_understanding.analyze(params, function(err, response) {
        if (err)
          console.log('error:', err);
        else
          // console.log(JSON.stringify(response, null, 2));
          results = console.log(JSON.stringify(response, null, 2));
          // console.log( "parsed = " + response);
          res.send(response);
        });

  }
