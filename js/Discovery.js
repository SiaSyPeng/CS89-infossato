var DiscoveryV1 = require('watson-developer-cloud/discovery/v1');

var discovery = new DiscoveryV1({
  username: 'b271e12c-bbca-4328-b0e2-8dc2b30445c0',
  password: 'G5RsfdxUNtJh',
  version_date: '2018-02-03' 
}); 


module.exports = function(req, res) {

    
    //query for concepts
var concept = 'Space Exploration';
//var query_string = 'query:'+concept;
var query_string = {
                      "query":"nested(enriched_text.concepts).filter(enriched_text.concepts.score>0.75).term(enriched_text.concepts.text)",
                      "deduplicate": true, 
                      "count": 1,  
                      "return": "title,url,host" 
                    };
  
discovery.query( {environment_id: 'system', collection_id: 'news-en', query_options:[query_string], version: '2017-11-07'}, function(error, data) {
                 if (error)
                     console.log('error:', error);
                else{
                        console.log(JSON.stringify(data, null, 2));
                    }
}); 
     
        
      
 /*  
 'nested(enriched_text.entities).filter(enriched_text.entities.type::Company).filter(enriched_text.entities.sentiment.score>=0.8).term(enriched_text.entities.text)'
 
 'nested(enriched_text.concepts).filter(enriched_text.concepts.score>0.75).term(enriched_text.concepts.text)'
 
{
  "query": "\"MobileEye\"",
  "filter": "language:(english|en),crawl_date>2018-01-03T12:00:00-0500,crawl_date<2018-03-03T12:00:00-0500",
  "deduplicate": true,
  "count": 5,
  "return": "title,url,host,crawl_date"
}     
    
    
//enriched_text.concepts.text:"artificial intelligence" 

  
 

"enriched_text": {
  "concepts": [
    {
    "text": "Cloud computing",
    "relevance": 0.610029}
    ]
  }
*/
}