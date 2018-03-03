var DiscoveryV1 = require('watson-developer-cloud/discovery/v1');
var fs = require('fs');

var discovery = new DiscoveryV1({
  username: "162ce8b3-dd57-4842-8619-78aca58baa7a",
  password: "gm7GVGfXbMA2",
  version_date: '2017-11-07'
});

module.exports = function(req, res) {
  console.log('now in discovery.js');
  discovery.query({
    environment_id: 'system', collection_id: 'news-en',
    query: 'nested(enriched_text.entities).filter(enriched_text.entities.type::Company).filter(enriched_text.entities.sentiment.score>=0.8).term(enriched_text.entities.text)'
  }),
    function(error, data) {
      console.log(JSON.stringify(data, null, 2));
  };
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
