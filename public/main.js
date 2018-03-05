               //SENTIENT WEB APP : Back-end js//

 //Results variables
var ToneAnalyzerResults;
var NLUResults;
var Overall = [];
var RESULTS = {};
var topEmotion = [];
var DiscoveryResults = [];
RESULTS.DiscoveryResults = DiscoveryResults;
var DiscoveryOverallSentimentScore = [];

// char variable
var toneChart;
var emotionChart;
var conceptSentimentChart;




            /***********Results Parsing Functions **********/


function fillModelWithDiscoveryResults(DiscoveryResponse){
    //console.log("Entered fillModelWithDiscoveryResults");

    var OverallSentimentScore = [];
    var sentiments = DiscoveryResponse.aggregations[0].results;
    if (sentiments){
     //    console.log("sentiments is defined");
        for(var index = 0 ;index < sentiments.length; index++ ){
            var sentimentScore =  Object.values(sentiments[index]);
            OverallSentimentScore[index] =sentimentScore[1];
        }
    }

    DiscoveryOverallSentimentScore = OverallSentimentScore;
    RESULTS.DiscoveryResults.OverallSentimentScore = OverallSentimentScore;
    //show graph
    displayDiscoveryAnalysis(DiscoveryOverallSentimentScore);


    //related articles
   var articles = DiscoveryResponse.results;
    var relatedArticles = [];
   if (articles){
        for(var index = 0 ;index < articles.length; index++ ){
            var anArticle = Object.values(articles[index]);
            var ArticleTitleAndUrl = [anArticle[3],anArticle[4]];
            relatedArticles.push(ArticleTitleAndUrl);
        }
    }

    RESULTS.DiscoveryResults.relatedArticles = relatedArticles;
    listRelatedArticles(relatedArticles);
}


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
    RESULTS.Overall = Overall;

    console.log("Tonescores are "+ ToneScores);
    console.log("Tones are "+Tones);
    FinalToneScores = ToneScores;
    displayToneAnalysisResults(Tones, ToneScores);

}



function fillModelWithNLUResults(results){
            //emotions
    NLUResults = results;  //store results in a global var
    var emotions = NLUResults.emotion.document.emotion;
    var Emotions = ['sadness', 'joy', 'fear','disgust','anger'];
    var EmotionScores = [];
    var emotions = Object.values(emotions);  //map json values to an array

    var topEmotionScore = 0;
    for(var index = 0 ;index < emotions.length; index++){
        EmotionScores[index] = emotions[index];
        if (emotions[index] > topEmotionScore){
            topEmotionScore = emotions[index];
            topEmotion =[ Emotions[index], emotions[index] ];   // store [emotion, score]
        }

    }
    //console.log("emotion indexed is : "+ Emotions[1] +":"+ EmotionScores[1]);
    console.log("topEmotion is :"+ topEmotion[0]);


            //sentiment
    var Sentiment = NLUResults.sentiment.document;  //sentiment has properties, score and label
    console.log("sentiment =: "+ Sentiment);
    Overall.push(EmotionScores);
    Overall.push(Sentiment);

    displayEmotionsInDocument(EmotionScores);
     //console.log("Sentiment in overall :" +Overall[2].label);



            //keywords


            //concepts
    Concepts = [];
    for(var index = 0 ;index < NLUResults.concepts.length; index++){
        Concepts.push(NLUResults.concepts[index].text);
    }


    RESULTS.Concepts = Concepts;
    console.log("Concepts extracted are" + Concepts );
    listKeyConcepts(Concepts); 
    queryConcept(Concepts);

 }
 
function listKeyConcepts(ConceptsArray){ 

    $('#conceptBlock').find('span').remove();  //delete existing list
    for(var index = 0; index < Math.floor(ConceptsArray.length/2); index++){  //list half of returned concepts 
        var concept = document.createElement('span');
        concept.innerHTML = ConceptsArray[index];
        $('#conceptBlock').append(concept);  
    }
} 



// compares values from both ToneAnalyzer and NLU, so call after both requests called
function fillModelWithOutliers(){
    var Outliers = {};
    console.log("fillModelWithOutliers() called");
    //keywords
    var Outlyingkeywords = [];
    var keywords = NLUResults.keywords;

    for(var index = 0 ;index < keywords.length; index++){
    //for (var keyword in NLUResults.keywords){

        var emotions = Object.values(keywords[index].emotion);   //get emotion scores into an array

        //find highest scoring emotion in keyword
        var newtopEmotion = [];
        var newtopEmotionScore = 0;
        for(var index2 = 0 ;index2 < emotions.length; index2++){ //for all scores of emotion
            newtopEmotionScore = emotions[index2];
            if (emotions[index2] > newtopEmotionScore){    //if score is greater than max, replace it
                newtopEmotionScore = emotions[index2];
                newtopEmotion = [ Emotions[index2], emotions[index2] ];   // store [emotion, score]
            }

        }

         // if highest emotion is different from document topEmotion
        if (newtopEmotion[0] != topEmotion[0]){
            outlyingkeyword = [ NLUResults.keywords[index].text, newtopEmotion[0], newtopEmotion[1] ]; //store keyword, emotion and score
            Outlyingkeywords.push(outlyingkeyword);         //add it to outliers
        }

    }
    Outliers.Outlyingkeywords = Outlyingkeywords;
    console.log(Outliers.Outlyingkeywords[0][0]);


 /*
    //sentences
    var Outlyingsentences = [];
    var sentences = ToneAnalyzerResults.sentences_tone;

    for(var index = 0 ;index < sentences.length; index++){

        var emotions = Object.values(keywords[index].emotion);   //get emotion scores into an array

        //find highest scoring emotion in keyword
        var newtopEmotion = [];
        var newtopEmotionScore = 0;
        for(var index2 = 0 ;index2 < emotions.length; index2++){ //for all scores of emotion
            newtopEmotionScore = emotions[index2];
            if (emotions[index2] > newtopEmotionScore){    //if score is greater than max, replace it
                newtopEmotionScore = emotions[index2];
                newtopEmotion = [ Emotions[index2], emotions[index2] ];   // store [emotion, score]
            }

        }

         // if highest emotion is different from document topEmotion
        if (newtopEmotion[1] != topEmotion[1]){
            outlyingkeyword = [ NLUResults.keywords[index].text, newtopEmotion[0], newtopEmotion[1] ]; //store keyword, emotion and score
            Outlyingkeywords.push(outlyingkeyword);         //add it to outliers
        }

    }
    Outliers.Outlyingkeywords = Outlyingkeywords;
   // console.log(Outliers.Outlyingkeywords[0][0]);
    */

   // add to general results
    RESULTS.Outliers = Outliers;

}



            /***********END of Results Parsing Functions **********/










                        /***** Helper Functions *******/


//return input type
 function TextOrURL(){
   return ($(".radioButtons").attr('id'));
}

//to log errors
function errorCB(jqXHR, textStatus, err){
  console.error("Error", err);
}


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
              fillModelWithOutliers();  //call fillModelWithOutliers() after all results are returned to since it accesses values from both results
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
          getToneAnalysis(TextToAnalyze, content_type);   //call AnalyzeTone after NLU returns success
          fillModelWithNLUResults(result);
          },
          error: errorCB
      });
   console.log(" NLAnalysis ajax sent");
}



function queryConcept(Concepts) {
     console.log('Quering: ' + Concepts[0]);
     getDiscoveryAnalysis(Concepts[0]);
  }

  function getDiscoveryAnalysis(Concepts){
     console.log("The concept about to be passed to ajax is : " + Concepts );
     let info = {input : Concepts };
     $.ajax({
          contentType: 'application/json',
          data: JSON.stringify(info),
          url: '/services/AnalyzeSentiment',
          type: 'POST',
          success: function(result) {
          DiscoveryResponse = result;
          fillModelWithDiscoveryResults(result);

         },
          error: errorCB
      });
      console.log("ajax sent");
  }



                    /***** End of Helper Functions *******/







                /***********Display Functions **********/

function displayToneAnalysisResults(Tones, ToneScores){

  if (toneChart) {
    toneChart.destroy();
  }
  var ctx = document.getElementById("toneChart").getContext('2d');

  toneChart = new Chart(ctx, {
      type: 'polarArea',
      data: {
          labels: Tones,
          datasets: [{
              data: ToneScores,
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
}



 function displayEmotionsInDocument(EmotionScoresArray){

     // results for the whole document
     //var sentiment = jsonResponse.sentiment.document.label;

     // console.log('emotion' + emotion);
     //console.log('sentiment' + sentiment);

     if (emotionChart) {
       emotionChart.destroy();
     }

     var ctx = document.getElementById("emotionChart").getContext('2d');
     emotionChart = new Chart(ctx, {
         type: 'radar',
         data: {
             labels: ["Sadness", "Joy", "Fear", "Anger", "Disgust"],
             datasets: [{
                 label: 'Emotions',
                 data: EmotionScoresArray,

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

}



  function displayDiscoveryAnalysis(DiscoveryOverallSentimentScore) {
    // get scores for overall Sentiment, assign it to global variable OverallSentimentScore
    // in array format, corresponding to the order of positive, negative, Neutral
    console.log('in analysis');
    if (conceptSentimentChart) {
      conceptSentimentChart.destroy();
    }

    var ctx = document.getElementById("conceptSentimentChart").getContext('2d');
    conceptSentimentChart = new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels: ["Positive", "Negative", "Neutral"],
            datasets: [{
                data: DiscoveryOverallSentimentScore,
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
  }



function listRelatedArticles(relatedArticlesArray){
    //delete existing list
    $('.relatedArticles').find('a').remove();

    for(var index = 0 ;index < relatedArticlesArray.length; index++ ){
        var article = document.createElement("a");
        article.href = relatedArticlesArray[index][1];
        article.innerHTML = relatedArticlesArray[index][0]; //set title as url
        //one article per line
        $('.relatedArticles').append(article);
     }
}


                    /***** End of Display Functions *******/







                    /*****Event Handlers *******/

 function handleSubmitText(TextToAnalyse) {
     // when analyze button is hit,
     var content_type = TextOrURL();
     getNLAnalysis(TextToAnalyse, content_type);
}

                  /***** End of Event Handlers *******/






                   /***** Event Listeners *******/

// listen to click on submitText button //
  $( "#submitText" ).on('click',
  function(){
   handleSubmitText( $("#TextToAnalyse").val());
  });

  $( "#TextRadio" ).on('click',
  function(){
        $(".radioButtons").attr('id', 'text');
  });
 //$('element').attr('id', 'value');
  $( "#URLRadio" ).on('click',
  function(){
        $(".radioButtons").attr('id', 'url');
  });

              /***** End of Event Listeners *******/
