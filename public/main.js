
                //SENTIENT WEB APP : Back-end js//




                    /***** Helper Functions *******/
function errorCB(jqXHR, textStatus, err) {
  console.error("Error", err);
}

   // send request to server via ajax
function getToneAnalysis(TextToAnalyze){
   console.log("The text about to be passed to ajax is :" +TextToAnalyze );
   let info = {input : TextToAnalyze };
   $.ajax({
          contentType: 'application/json',
          data: JSON.stringify(info),
          url: '/services/AnalyzeTone',
          type: 'POST',
          success: function(result) {
          displayToneAnalysisResults(result);
         },
          error: errorCB
      });
    console.log("ajax sent");
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

 //function to rebuild html to display latest response
    function updateView() {
    }


     //TODO
   /* Add for functions to revise the display, make it more intuitive*/



                    /***** End of Helper Functions *******/







                    /***** Event Handlers *******/


    function handleSubmitText(TextToAnalyse) {
       // when analyze button is hit,
        getToneAnalysis(TextToAnalyse);
   //   displayToneAnalysisResults( getToneAnalysis(TextToAnalyse) );

    }



    //TODO
   /* Add  more event handlers  to handle events that occur when user
  clicks on buttons or tabs etc*/

                    /***** End of Event Handlers *******/



                    /***** Event Listeners *******/

// listen to click on submitText button // $(document)
    $( "#submitText" ).on('click',
    function(){
        console.log( ""+ $("#TextToAnalyse").val() +" Was passed to getToneAnalysis");
     handleSubmitText( $("#TextToAnalyse").val());
    });


    //TODO
    /* Add more buttons or tabs to the page then add more event listners to make the page interactive*/
    // send request to server via ajax
 function getNLAnalysis(TextToProcess){
    console.log("The text about to be passed to ajax is :" +TextToProcess );
    let info = {input : TextToProcess };
    $.ajax({
           contentType: 'application/json',
           data: JSON.stringify(info),
           url: '/services/AnalyzeNL',
           type: 'POST',
           success: function(result) {
           displayNLAnalysisResults(result);
          },
           error: errorCB
       });
     console.log("ajax sent");
   }


 //Parse tone response
 function displayNLAnalysisResults(jsonResponse){

     // results for the whole document
     // var emotion = jsonResponse.emotion.document.emotion;
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

     if (sentiment.length > 0) {
       $('.nl_responseBlock').append(document.createElement('h3').innerHTML=sentiment);

     }


    // results for the individual sentences
     // var sentencesTones = jsonResponse.sentences_tone;
     // if (sentencesTones.length > 0){
     //     $('.tone_responseBlock').append(document.createElement('h3').innerHTML = 'Results : Sentences');
     //
     //     //  create results table for sentences
     //     var table = document.createElement("table");
     //     table.className = 'resultsTable_sentences';
     //     table.innerHTML = '<tr><th>Sentence</th><th>Tone</th><th>Score</th></tr>';
     //     $('.tone_responseBlock').append(table);
     //
     //     /****TO FIX*****/
     //     //the following for loop needs some fixing. need to correctly pass the structure of the
     //   //  toneAnalyzer response to access the individual sentences, their indentified tone and // // corresponding scores. You may reveal the structure of toneAnalyzer response by this line: console.log(" toneAnalyzer json response is : " + jsonResponse);
     //
     //     for(var index = 0 ;index < sentencesTones.length; index++ ){
     //         var sentence = sentencesTones[index];
     //         var text = sentence.text;
     //         console.log("text is: " + sentence);
     //         for(var index2 = 0 ;index2 < sentence.tones.length; index2++ ){
     //             if (index2 = 0){                  addToTable_sentence(text,sentence.tones[index2].tone_name,sentence.tones[index2].score);
     //             } else{
     //               addToTable_sentence("",sentence.tone_name,sentence.score);
     //             }
     //         }
     //     }
     //      /****END OF TO FIX*****/
     // }
 }



  //function to rebuild html to display latest response
     function updateView() {
     }


      //TODO
    /* Add for functions to revise the display, make it more intuitive*/



                     /***** End of Helper Functions *******/







                     /***** Event Handlers *******/


     function handleNLText(TextToProcess) {
        // when analyze button is hit,
         getNLAnalysis(TextToProcess);
    //   displayToneAnalysisResults( getToneAnalysis(TextToAnalyse) );

     }



     //TODO
    /* Add  more event handlers  to handle events that occur when user
   clicks on buttons or tabs etc*/

                     /***** End of Event Handlers *******/



                     /***** Event Listeners *******/

 // listen to click on submitText button // $(document)
     $( "#processText" ).on('click',
     function(){
         console.log( ""+ $("#TextToProcess").val() +" Was passed to getNLAnalysis");
      handleNLText( $("#TextToProcess").val());
     });


     //TODO
     /* Add more buttons or tabs to the page then add more event listners to make the page interactive*/


                    /***** End of Event Listeners *******/
