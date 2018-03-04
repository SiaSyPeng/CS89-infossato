
                //SENTIENT WEB APP : Back-end js//
 //Results variables
var ToneAnalyzerResults;
var NLUResults;
var Overall = [];
var RESULTS;
var concepts = ['Dartmouth'];
var OverallSentimentScore =  [858, 758, 71];
/*


  var Tones{
    'analytical': ,
    'confident': ,
    'tentative':
  };



var Overall{ Tones, Emotions, Sentiment };



var Keywords{};        //could be any number of words, each with an emotion-score pair
    for (index=0; index < ;index++){
     keywords[sth[index]] = {sth[index].tone,sth[index].score};
    }


var Sentences{};         //could be any number of sentences , each with an emotion-score pair
  for (index=0; index < ;index++){
     sentences[sth[index]] = {sth[index].tone,sth[index].score};
}

var Outliers{keywords,sentences};

var Concepts{};         //could be any number of word-score pairs
  for (index=0; index < ;index++){
     sentences[sth[index]] = sth[index].score;
  }


var TotalResults{overall,concepts,outliers};
*/

function fillModelWithToneAnalyzerResults(results){
    ToneAnalyzerResults = results; //store resutls in a global var
    var tones = ToneAnalyzerResults.document_tone.tones;
    var Tones = [];
    var ToneScores = [];
    for(var index = 0 ;index < tones.length; index++ ){
        Tones[index] = tones[index].tone_name;
        ToneScores[index] = tones[index].score;
    }

   // console.log("Tones is: " + Tones[0]);
    Overall.push(Tones);
}


function fillModelWithNLUResults(results){
            //emotions
    NLUResults = results;  //store results in a global var
    var emotions = NLUResults.emotion.document.emotion;
    var Emotions = ['sadness', 'joy', 'fear','disgust','anger'];
    var EmotionScores = [];
    var emotions = Object.values(emotions);  //map json values to an array
    var topEmotion = [];
    var topEmotionScore = 0;
    for(var index = 0 ;index < emotions.length; index++){
        EmotionScores[index] = emotions[index];
        if (emotions[index] > topEmotionScore){
            topEmotionScore = emotions[index];
            topEmotion =[ Emotions[index], emotions[index] ];   // store [emotions, score]
        }

    }
    //console.log("emotion indexed is : "+ Emotions[1] +":"+ EmotionScores[1]);
     console.log("topEmotion is :"+ topEmotion[0]);

            //sentiment
    var Sentiment =  NLUResults.sentiment.document;
     Overall.push(EmotionScores)
     Overall.push(Sentiment);

     //console.log("Sentiment in overall :" +Overall[2].label);


            //keywords

 }


/*
function fillModelWithOutliers(){
    //get highest scoring emotion
    //keywords
    var Outlyingkeywords = {};

    for(){

        keywords  = NLUResults.keywords
         for (emotions in keywords){

        }
        var emotions = Object.values(keywords.emotions);  //map json values to an array

         emotion = record highest scoring emotion

        if (highest scoring emotion != topEmotion[1]){

        add to outlying keywords
        }
    }

}
  */

                        /***** Helper Functions *******/




function TextHTMLOrURL(){
   return $("#content_type").val();
}


//to log errors
function errorCB(jqXHR, textStatus, err){
  console.error("Error", err);
}


//ajax request to server
function getToneAnalysis(TextToAnalyze, content_type){

  // console.log("The text about to be passed to ajax is :" +TextToAnalyze );
    if (typeof content_type === 'undefined' || content_type === null || content_type == 'text') {
        var content_type = 'plain';    //make plain text the default content type
        console.log('ToneAnalyzer content_type changed to'+ content_type);
    }

    if (content_type != 'url'){   //dont send ToneAnalyzer request if the type is url

       let info = {input : TextToAnalyze, content_type: 'text/'+content_type};
       $.ajax({
              contentType: 'application/json',
              data: JSON.stringify(info),
              url: '/services/AnalyzeTone',
              type: 'POST',
              success: function(result) {
              fillModelWithToneAnalyzerResults(result);
             // displayToneAnalysisResults(result);
              },
              error: errorCB
          });
       console.log("ajax sent");
    }

}



function getNLAnalysis(TextToAnalyze, content_type){

  // console.log("The text about to be passed to ajax is :" +TextToAnalyze );
    if (typeof content_type === 'undefined' || content_type === null) {
        var content_type = 'text';    //make plain text the default content type
        console.log('NLU content_type changed to '+ content_type);
    }


   let info = {input : TextToAnalyze, content_type: content_type};
   $.ajax({
          contentType: 'application/json',
          data: JSON.stringify(info),
          url: '/services/AnalyzeNL',
          type: 'POST',
          success: function(result) {
          //displayToneAnalysisResults(result);
          fillModelWithNLUResults(result);
          },
          error: errorCB
      });
   console.log(" NLAnalysis ajax sent");
}




//Parse tone response
function displayToneAnalysisResults(jsonResponse){

    // results for the whole document
    var tones = jsonResponse.document_tone.tones;
    if (tones.length > 0){
        $('.tone_responseBlock').append(document.createElement('h3').innerHTML = 'Results : Whole Document');

      //  create results table
        var table = document.createElement("table");
        table.className = 'resultsTable';
        table.innerHTML = '<tr><th>Tone</th><th>Score</th></tr>';
        $('.tone_responseBlock').append(table);

        for(var index = 0 ;index < tones.length; index++ ){
            addToTable(tones[index].tone_name, tones[index].score);
        }
    }





   // results for the individual sentences
    var sentencesTones = jsonResponse.sentences_tone;
    if (sentencesTones.length > 0){
        $('.tone_responseBlock').append(document.createElement('h3').innerHTML = 'Results : Sentences');

        //  create results table for sentences
        var table = document.createElement("table");
        table.className = 'resultsTable_sentences';
        table.innerHTML = '<tr><th>Sentence</th><th>Tone</th><th>Score</th></tr>';
        $('.tone_responseBlock').append(table);

        /****TO FIX*****/
        //the following for loop needs some fixing. need to correctly pass the structure of the
      //  toneAnalyzer response to access the individual sentences, their indentified tone and // // corresponding scores. You may reveal the structure of toneAnalyzer response by this line: console.log(" toneAnalyzer json response is : " + jsonResponse);

        for(var index = 0 ;index < sentencesTones.length; index++ ){
            var sentence = sentencesTones[index];
            var text = sentence.text;
            console.log("text is: " + sentence);
            for(var index2 = 0 ;index2 < sentence.tones.length; index2++ ){
                if (index2 = 0){                  addToTable_sentence(text,sentence.tones[index2].tone_name,sentence.tones[index2].score);
                } else{
                  addToTable_sentence("",sentence.tone_name,sentence.score);
                }
            }
        }
         /****END OF TO FIX*****/
    }
}

function addToTable(toneName,score){
   var toneHTML = '<td>' +toneName+ '</td><td>' +score+ '</td>';
   var tableRow = document.createElement("tr");
   tableRow.innerHTML = toneHTML;
    $('.resultsTable').append(tableRow);
}

function addToTable_sentence(sentence, toneName,score){
   var toneHTML = '<td>' +sentence+ '<td>' +toneName+ '</td><td>' +score+'</td>';
   var tableRow = document.createElement("tr");
   tableRow.innerHTML = toneHTML;
    $('.resultsTable_sentences').append(tableRow);
}

//Parse tone response
 function displayNLAnalysisResults(jsonResponse){

     // results for the whole document
     var sentiment = jsonResponse.sentiment.document.label;

     // console.log('emotion' + emotion);
     console.log('sentiment' + sentiment);

     // if (emotion.length > 0){
     //     // $('.nl_responseBlock').append(document.createElement('h3').innerHTML = 'Results : Whole Document');
     //     $('.nl_responseBlock').append(document.createElement('h3').innerHTML=emotion);
     //   //  create results table
     //     // var table = document.createElement("table");
     //     // table.className = 'resultsTable';
     //     // table.innerHTML = '<tr><th>emotion</th><th>Score</th></tr>';
     //     // $('.tone_responseBlock').append(table);
     //     //
     //     // for(var index = 0 ;index < tones.length; index++ ){
     //     //     addToTable(tones[index].tone_name, tones[index].score);
     //     // }
     //
     // }
 }

     //TODO
   /* Add for functions to revise the display, make it more intuitive*/



                    /***** End of Helper Functions *******/


                    /***** Event Handlers *******/


  function handleSubmitText(TextToAnalyse) {
     // when analyze button is hit,
     var content_type =  TextHTMLOrURL();
     getToneAnalysis(TextToAnalyse, content_type);
     getNLAnalysis(TextToAnalyse, content_type);
    // displayToneAnalysisResults( getToneAnalysis(TextToAnalyse) );
  }


  $( "#testBut" ).on('click',
  function(){
     // console.log( ""+ $("#TextToAnalyse").val() +" Was passed to getToneAnalysis");
   queryConcept(concepts);
  });

  function queryConcept(Concepts) {
     console.log('Quering: ' + Concepts[0]);
     getDiscoveryAnalysis(Concepts[0]);
  }

  function getDiscoveryAnalysis(Concepts) {
     console.log("The concept about to be passed to ajax is : " + Concepts );
     let info = {input : Concepts };
     $.ajax({
          contentType: 'application/json',
          data: JSON.stringify(info),
          url: '/services/AnalyzeSentiment',
          type: 'POST',
          success: function(result) {
          displayToneAnalysisResults(result);
         },
          error: errorCB
      });
      console.log("ajax sent");
  }

  function displayDiscoveryAnalysis(result) {
    // get scores for overall Sentiment, assign it to global variable OverallSentimentScore
    // in array format, corresponding to the order of positive, negative, Neutral
    OverallSentimentScore = [858, 758, 71];
    console.log(result);
  }
  /*
   * All the graphs
   */

  var ctx = document.getElementById("toneChart").getContext('2d');
  var toneChart = new Chart(ctx, {
      type: 'polarArea',
      data: {
          labels: ["Anger", "Fear", "Joy", "Sadness", "Analytical", "Confident", "tentative"],
          datasets: [{
              data: [0.12, 0.9, 0.3, 0.5, 0.2, 0.10, 0.11],
              backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
                'rgba(153, 102, 255, 0.2)',
                'rgba(100, 159, 64, 0.2)',
                'rgba(255, 20, 20, 0.2)'
              ]
          }],
      },
      options: {
        animation: {
          animateScale: true
        }
      }
  });

  var ctx = document.getElementById("emotionChart").getContext('2d');
  var emotionChart = new Chart(ctx, {
      type: 'radar',
      data: {
          labels: ["Sadness", "Joy", "Fear", "Anger", "Disgust"],
          datasets: [{
              label: 'Emotions',
              data: [12, 19, 3, 5, 2],
              backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
              ],
              borderColor: [
                  'rgba(255,99,132,1)',
              ],
              borderWidth: 1,
              pointBackgroundColor: 'rgba(255, 20, 20, 0.8)'

          }]
      },
      options: {
          scales: {
              display: true
          }
      }
  });

  var ctx = document.getElementById("keyEmotionChart").getContext('2d');
  var keyEmotionChart = new Chart(ctx, {
      type: 'radar',
      data: {
          labels: ["Sadness", "Joy", "Fear", "Anger", "Disgust"],
          datasets: [{
              label: 'Trump',
              data: [1, 20, 5, 7, 4],
              backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
              ],
              borderColor: [
                  'rgba(255,99,132,1)',
              ],
              borderWidth: 1
          },
          {
              label: 'Obama',
              data: [12, 19, 3, 5, 2],
              backgroundColor: [
                  'rgba(255, 99, 20, 0.2)',
              ],
              borderColor: [
                  'rgba(255,99,132,1)',
              ],
              borderWidth: 1
          }
        ],

      },
      options: {
          scales: {
              display: true
          }
      }
  });

  var ctx = document.getElementById("senEmotionChart").getContext('2d');
  var senEmotionChart = new Chart(ctx, {
      type: 'radar',
      data: {
          labels: ["Sadness", "Joy", "Fear", "Anger", "Disgust"],
          datasets: [{
              label: 'This is bad',
              data: [1, 20, 5, 7, 4],
              backgroundColor: [
                'rgba(255, 99, 132, 0.5)',
              ],
              borderColor: [
                  'rgba(255,99,132,1)',
              ],
              borderWidth: 1
          },
          {
              label: 'This is something',
              data: [5, 10, 10, 6, 14],
              backgroundColor: [
                'rgba(200, 99, 132, 0.5)',
              ],
              borderColor: [
                  'rgba(255,99,132,1)',
              ],
              borderWidth: 1
          },
          {
              label: 'lalala',
              data: [13, 2, 3, 3, 5],
              backgroundColor: [
                'rgba(100, 99, 132, 0.5)',
              ],
              borderColor: [
                  'rgba(255,99,132,1)',
              ],
              borderWidth: 1
          },
          {
              label: 'This is good',
              data: [12, 19, 3, 5, 2],
              backgroundColor: [
                  'rgba(255, 99, 20, 0.5)',
              ],
              borderColor: [
                  'rgba(255,99,132,1)',
              ],
              borderWidth: 1
          }
        ]
      },
      options: {
          scales: {
              display: true
          }
      }
  });

  var ctx = document.getElementById("conceptSentimentChart").getContext('2d');
  var conceptSentimentChart = new Chart(ctx, {
      type: 'doughnut',
      data: {
          labels: ["Positive", "Neutral", "Negative"],
          datasets: [{
              data: OverallSentimentScore,
              backgroundColor: [
                'rgb(220, 184, 203)',
                'rgb(204,215,228)',
                'rgb(206,234,247)'
              ],
              borderColor: [
                  'rgb(255,255,255)',
              ],
              borderWidth: 1
          }],

      },
      options: {
          animation: {
              animateRotate: true
          }
      }
  });
  //TODO
 /* Add  more event handlers  to handle events that occur when user
clicks on buttons or tabs etc*/

                  /***** End of Event Handlers *******/






                   /***** Event Listeners *******/

// listen to click on submitText button //
  $( "#submitText" ).on('click',
  function(){
     // console.log( ""+ $("#TextToAnalyse").val() +" Was passed to getToneAnalysis");
   handleSubmitText( $("#TextToAnalyse").val());
  });

  $( "#TextRadio" ).on('click',
  function(){
     // console.log( ""+ $("#TextToAnalyse").val() +" Was passed to getToneAnalysis");
   alert("you did the text");
  });

  $( "#URLRadio" ).on('click',
  function(){
     // console.log( ""+ $("#TextToAnalyse").val() +" Was passed to getToneAnalysis");
   alert("you did the URL");
  });



   //TODO
   /* Add more buttons or tabs to the page then add more event listners to make the page interactive*/


                  /***** End of Event Listeners *******/
