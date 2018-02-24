var express = require('express');

 //create an instance of the tone analyzer with your credentials
    var ToneAnalyzerV3 = require('watson-developer-cloud/tone-analyzer/v3');
    var tone_analyzer = new ToneAnalyzerV3({
      username: '0fdf1b6e-8c6d-4d1e-986d-c9e0cc776ace',
      password: 'nLMw2yTVST7S',
      version_date: '2018-02-20'
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
