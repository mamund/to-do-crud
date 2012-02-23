/* to-do crud example */

var http = require('http');
var fs = require('fs');
var querystring = require('querystring');

var g = {};
g.host = '0.0.0.0';
g.port = (process.env.PORT ? process.env.PORT : 80);

function handler(req, res) {

  var m = {};
  m.homeUrl = '/';
  m.homeXml = '<to-do>\n'
    + '</to-do>';

  main();

  function main() {
    switch(req.url) {
      case m.homeUrl:
        switch(req.method) {
          case 'GET':
            processList();
            break;
          default:
            showError(405, 'Method not allowed');
            break;
        }
        break;
      default:
        showError(404, 'Page not found');
        break;
    }
  }

  /* show list of items */
  function processList() {
    res.writeHead(200, 'OK', 'application/xml');
    res.end(m.homeXml);
  }

  /* show error page */
  function showError(status, msg) {
    res.writeHead(status, msg, m.textHtml);
    res.end(m.errorMessage.replace('{@status}', status).replace('{@msg}', msg));
  }

}

http.createServer(handler).listen(g.port, g.host);