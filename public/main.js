
                //SENTIENT WEB APP : Back-end js//

 //Results variables
var ToneAnalyzerResults; 
var NLUResults;
var Overall = []; 
var RESULTS = {};   
var topEmotion = [];  
/*
//    var Emotions = ['sadness', 'joy', 'fear','disgust','anger']; 


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
    RESULTS.Overall = Overall;
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
            topEmotion =[ Emotions[index], emotions[index] ];   // store [emotions, score]
        }
            
    }   
    //console.log("emotion indexed is : "+ Emotions[1] +":"+ EmotionScores[1]);
     console.log("topEmotion is :"+ topEmotion[0]); 
    
            //sentiment
    var Sentiment = NLUResults.sentiment.document;    
    Overall.push(EmotionScores)
    Overall.push(Sentiment);  
    
     //console.log("Sentiment in overall :" +Overall[2].label); 
    
    
            //keywords
    
    
            //concepts    
    Concepts = [];
    for(var index = 0 ;index < NLUResults.concepts.length; index++){
        Concepts.push(NLUResults.concepts[index].text);
    }
    
    
    RESULTS.Concepts = Concepts;
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
      
  
  
                        /***** Helper Functions *******/

   


function TextHTMLOrURL(){
    
   return $("#content_type").val();
}


//to log errors
function errorCB(jqXHR, textStatus, err){
  console.error("Error", err);
}
 
 
function sendDiscoveryRequest(){
    let info = {}; 
       $.ajax({ 
              contentType: 'application/json',
              data: JSON.stringify(info),
              url: '/services/Discovery',
              type: 'POST',
              success: function(result) {
              console.log("Discovery client received success");
              },
              error: errorCB  
          });
       console.log("Discovery client request sent");
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




                    /***** End of Helper Functions *******/







                    /***** Event Handlers *******/


    function handleSubmitText(TextToAnalyse) {
       // when analyze button is hit,
       var content_type =  TextHTMLOrURL();
       getNLAnalysis(TextToAnalyse, content_type);
    }
 
 




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

$( "#Discover" ).on('click',
    function(){
       // console.log( ""+ $("#TextToAnalyse").val() +" Was passed to getToneAnalysis");
    sendDiscoveryRequest();
    }); 

     //TODO
     /* Add more buttons or tabs to the page then add more event listners to make the page interactive*/


                    /***** End of Event Listeners *******/

 