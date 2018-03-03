var DiscoveryV1 = require('watson-developer-cloud/discovery/v1');
var fs = require('fs');

var discovery = new DiscoveryV1({
  username: "162ce8b3-dd57-4842-8619-78aca58baa7a",
  password: "gm7GVGfXbMA2",
  version_date: '2017-11-07'
});

discovery.createEnvironment({
  name: 'my_environment',
  description: 'My environment',
  size: 1
},
  function (err, response) {
    if (err)
      console.log('error:', err);
    else
      console.log(JSON.stringify(response, null, 2));
});

discovery.query({ environment_id: 'system', collection_id: 'news-en', "query": "\"Dartmouth \"",
  "filter": "language:(english|en),crawl_date>2018-02-23T12:00:00-0500,crawl_date<2018-03-02T12:00:00-0500",
  "aggregations": [
    "term(host).term(enriched_text.sentiment.document.label)",
    "term(enriched_text.sentiment.document.label)"
  ] }), function(error, data) {
  console.log(JSON.stringify(data, null, 2));
});
