  /*
  Tones: anger, fear, joy, sadness, analytical, confident, and tentative
  Emotions:  sadness, joy, fear, disgust, and anger
  Sentiment: positive ,negative, neutral
  */   
/*******COMMENTS********/
/*
This is the structure of the response the client will recieve to display. This is only meant to 
guide you as you code the UI: not meant to be run. 

In this model, the scores of the values "anger, fear, joy, sadness" which appear in both ToneAnalyzer and NLP will be normalized added to their counterparts in Emotions 

*/




  var Tones{    
    'analytical': ,
    'confident': ,
    'tentative':    
  };


var Emotions{
    'sadness': ,
    'joy': ,
    'fear': , 
    'anger': ,
    'disgust': ,
    'confident': ,
    'tentative':    
  };
 
var  Sentiment { []: score }    //could be any of  positive ,negative, neutral

var overall{ Tones, Emotions, Sentiment }; 



var keywords{};        //could be any number of words, each with an emotion-score pair
    for (index=0; index < ;index++){
     keywords[sth[index]] = {sth[index].tone,sth[index].score}; 
    }
 
        
var sentences{};         //could be any number of sentences , each with an emotion-score pair
  for (index=0; index < ;index++){
     sentences[sth[index]] = {sth[index].tone,sth[index].score}; 
}
         
var outliers{keywords,sentences};
     
var concepts{};         //could be any number of word-score pairs
  for (index=0; index < ;index++){
     sentences[sth[index]] = sth[index].score; 
  } 
    
         
var TotalResults{overall,concepts,outliers};
      