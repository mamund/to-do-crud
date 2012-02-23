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
  m.listUrl = '/to-do/';
  m.completeUrl = '/to-do/complete/';

  m.errorMessage = '<h1>{@status} - {@msg}</h1>';
  m.textHtml = {'content-type':'text/html'};

  m.complete = {};

  main();

  /* process requests */
  function main() {
    switch(req.url) {
      case m.homeUrl:
        switch(req.method) {
          case 'GET':
            showHtml();
            break;
          default:
            showError(405, 'Method not allowed');
            break;
        }
        break;
      case m.listUrl:
        switch(req.method) {
          case 'GET':
            processList();
            break;
          default:
            showError(405, 'Method not allowed');
            break;
        }
      case m.completeUrl:
          switch(req.method) {
            case 'POST':
              completeItem();
              break;
            default:
              showError(405, 'Method not allowed');
              break;
          }
      default:
        showError(404, 'Page not found');
        break;
    }
  }

  /* complete single item */
  function completeItem() {
    var body = '';

    req.on('data', function(chunk) {
      body += chunk.toString();
    });

    req.on('end', function() {
      m.complete = querystring.parse(body);
      sendComplete();
    });
  }
  function sendComplete() {
      res.writeHead(204, "No content");
      res.end();
  }

  /* show html page */
  function showHtml() {
    fs.readFile('index.html', 'ascii', sendHtml);
  }
  function sendHtml(err, data) {
    if (err) {
      showError(500, err.message);
    }
    else {
      res.writeHead(200, "OK", {'content-type' : 'text/html'});
      res.end(data);
    }
  }

  /* show list of items */
  function processList() {
    var list, item, i, x;

    list = [];
    for(i=0, x=3;i<x; i++) {
      item = {};
      item.id = i;
      item.text = 'this is item '+i;
      list.push(item);
    }

    res.writeHead(200, 'OK', {'content-type' : 'application/xml'});
    res.end(JSON.stringify(list));
  }

  /* show error page */
  function showError(status, msg) {
    res.writeHead(status, msg, m.textHtml);
    res.end(m.errorMessage.replace('{@status}', status).replace('{@msg}', msg));
  }
}

// listen for requests
http.createServer(handler).listen(g.port, g.host);