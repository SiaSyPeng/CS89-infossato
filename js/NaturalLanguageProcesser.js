var express = require('express');

   //create an instance of NaturalLanguageUnderstanding with your credentials
   var NaturalLanguageUnderstandingV1 = require('watson-developer-cloud/natural-language-understanding/v1.js');
   var natural_language_understanding = new NaturalLanguageUnderstandingV1({
        username: '5447e3f1-9ba5-43ed-97ad-06b6e8c247e1',
        password: 'qpUYARBca7hk',
        version_date: '2018-02-22'
      });


module.exports = function(req, res) {

     // console.log("the content received by NLProcessor is: " + req.body.input);
      var content_type = req.body.content_type;
    //  console.log("content_type recieved at NLProcessor server :" +  content_type);


      //NLU parameters
      var params = {
      [content_type] : req.body.input,
      'features': {
          'keywords': {
            'emotion': true,
            'sentiment': true,
            'limit': 4
          },
          'emotion': {},
          'sentiment': {},
          'concepts': {'limit': 4}
        }
      };

      //call the NLU API analyze doc
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
