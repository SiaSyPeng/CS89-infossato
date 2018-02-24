var express = require('express');

 //create an instance of the tone analyzer with your credentials
    var ToneAnalyzerV3 = require('watson-developer-cloud/tone-analyzer/v3');
    var tone_analyzer = new ToneAnalyzerV3({
      username: 'cbf64268-298d-4e82-8218-25f6139e63e4',
      password: 'J4c34rFTk7BR',
      version_date: '2018-02-23'
    });




module.exports = function(req, res) {

  //  console.log("the request received by AnalyzeTone is: " + req.body.input);

    //create the parameters to be passed to tone_analyzer
    var params = {
    'tone_input':  req.body.input,
    'content_type': 'text/plain'
    };

    //call tone analyzer to analyze doc
    tone_analyzer.tone(params, function(error, response){
      if (error)
        console.log('error:', error);
      else
          //parse response and return results
    //   console.log("Tone analyzer reached success");
       results = console.log(JSON.stringify(response, null, 2));
       console.log( "parsed = " + response.document_tone.tones[0].tone_name );
       res.send(response);
      }
    );

}
