
                //SENTIENT WEB APP : Back-end js//

 
                        /***** Helper Functions *******/

   


function TextHTMLOrURL(){
   return $("#content_type").val();
} 


//to log errors
function errorCB(jqXHR, textStatus, err) {
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
   //   displayToneAnalysisResults( getToneAnalysis(TextToAnalyse) );
    //   displayToneAnalysisResults( getToneAnalysis(TextToAnalyse) );
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



     //TODO
     /* Add more buttons or tabs to the page then add more event listners to make the page interactive*/


                    /***** End of Event Listeners *******/

 