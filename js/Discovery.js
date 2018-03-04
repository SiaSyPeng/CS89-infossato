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

  const params = { query: "\"concept\"",
    filter: 'language:(english|en),crawl_date>2018-02-24T12:00:00-0500,crawl_date<2018-03-03T12:00:00-0500',
    aggregations: [
      "term(host).term(enriched_text.sentiment.document.label)",
      "term(enriched_text.sentiment.document.label)"
    ],
    environment_id: 'system',
    collection_id: 'news' }

  discovery.query(params, (error, response) => {
    console.log(params);
    if (error) {
      next(error);
    } else {
      //results = console.log(JSON.stringify(response, null, 2));
      if (response.sentiment){
          console.log('here');
          console.log( "parsed = " + response.sentiment );
      }
      console.log(response)
      //res.send(response);
      //console.log(JSON.stringify(response, null, 2));
    }
  });
  //console.log('exited');
}

// discovery.createEnvironment({
//   name: 'my_environment',
//   description: 'My environment',
//   size: 1
// },
//   function (err, response) {
//     if (err)
//       console.log('error:', err);
//     else
//       console.log(JSON.stringify(response, null, 2));
// });
// module.exports = function(req, res) {
//
//   discovery.query({ environment_id: 'system', collection_id: 'news-en', query:
//       nested(enriched_text.entities).filter(enriched_text.entities.type::Company).filter(enriched_text.entities.sentiment.score>=0.8).term(enriched_text.entities.text)
//  }), function(error, data) {
//     console.log(JSON.stringify(data, null, 2));
//   });
//
// }
