var http = require('http'),
    request = require('request'),
    url = require('url');

var port = process.env.PORT || 8000,
    proxyURL = process.env.PROXY_URL || 'http://registry.npmjs.org:80/',
    allowOrigin = process.env.ALLOW_ORIGIN || '*',
    allowMethods = process.env.ALLOW_METHODS || '*',
    allowHeaders = process.env.ALLOW_HEADERS || 'X-Requested-With',
    additionalQueryParameters = process.env.ADITIONAL_PARAM || ''

http.createServer(function (req, res) {
  var r = request(url.resolve(proxyURL, req.url+additionalQueryParameters));
  r.qs.
  // Add CORS Headers
  r.on('response', function(_r) {
    _r.headers['Access-Control-Allow-Origin'] = allowOrigin;
    _r.headers['Access-Control-Allow-Methods'] = allowMethods;
    _r.headers['Access-Control-Allow-Headers'] = allowHeaders;
  });

  // Stream the response
  req.pipe(r).pipe(res);
}).listen(port);

console.log('Proxying ' + proxyURL + ' on port ' + port);
