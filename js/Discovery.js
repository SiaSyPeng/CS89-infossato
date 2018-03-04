var DiscoveryV1 = require('watson-developer-cloud/discovery/v1');
var fs = require('fs');

var discovery = new DiscoveryV1({
  username: "162ce8b3-dd57-4842-8619-78aca58baa7a",
  password: "gm7GVGfXbMA2",
  version_date: '2017-11-07'
});


 

module.exports = function(req, res) {
  console.log('now in discovery.js');

  var concept = req.body.input;
  console.log('req.body.input= '+ concept);

  const params = { query: concept,
    filter: "language:(english|en),crawl_date>2018-02-24T12:00:00-0500,crawl_date<2018-03-03T12:00:00-0500",
    aggregation: "term(enriched_text.sentiment.document.label)",
    count: 5,
    return: "title,url,host",
    environment_id: 'system',
    collection_id: 'news' }

  discovery.query(params, (error, response) => {
    //console.log(params);
    if (error) {
      next(error);
    } else 
    {
      //results = console.log(JSON.stringify(response, null, 2));

      console.log('here');
      var numberOfArticles = JSON.stringify(response.matching_results, null, 2);
      var aggregations = JSON.stringify(response.aggregations, null, 2);
      var top5Articles = JSON.stringify(response.results, null, 2);
      var results = "parsed " + numberOfArticles +
      " articles and the aggregation is "+ aggregations +
      " top5Articles " + top5Articles
    

      console.log(results); 
      res.send(response);
     } 
  }); 
}
