/* to-do.js */

var pg;

window.onload = function() {
  pg = thisPage();
  pg.init();
};

var thisPage = function() {

  var g = {};
  g.list = {};
  g.listUrl = '/to-do/'; // (for both list and add)
  g.completeUrl = '/to-do/complete/';
  g.searchUrl = '/to-do/search?text={@text}';

  function init() {
    attachEvents();
    refreshList();
  }

  function refreshList() {
    makeRequest(g.listUrl,'list');
  }

  function searchList() {
    var text;

    text = prompt('Enter search:');
    if(text) {
      makeRequest(g.searchUrl.replace('{@text}',encodeURIComponent(text)),'search');
    }
  }

  function addToList() {
    var text;

    text = prompt('Enter text:');
    if(text) {
      makeRequest(g.listUrl,'add','text='+encodeURIComponent(text));
    }
  }

  function completeItem() {
    makeRequest(g.completeUrl, 'complete', 'id='+encodeURIComponent(this.id));
  }

  function showList() {
    var elm, li, i, x;

    elm = document.getElementById('list-data');
    if(elm) {
      elm.innerHTML = '';
      for(i=0,x=g.list.length;i<x;i++) {
        li = document.createElement('li');
        li.id = g.list[i].id;
        li.onclick = completeItem;
        li.title = 'click to delete';
        li.appendChild(document.createTextNode(g.list[i].text));
        elm.appendChild(li);
      }
    }
  }

  function attachEvents() {
    var elm;

    elm = document.getElementById('add');
    if(elm) {
      elm.onclick = addToList;
    }

    elm = document.getElementById('search');
    if(elm) {
      elm.onclick = searchList;
    }

    elm = document.getElementById('list');
    if(elm) {
      elm.onclick = refreshList;
    }
  }

  function makeRequest(href, context, body) {
    var ajax;

    ajax=new XMLHttpRequest();
    if(ajax) {

      ajax.onreadystatechange = function(){processResponse(ajax,context);};

      if(body) {
        ajax.open('post',href,false);
        ajax.send(body);
      }
      else {
        ajax.open('get',href,false);
        ajax.send(null);
      }
    }
  }

  function processResponse(ajax, context) {
    if(ajax.readyState===4 || ajax.readyState==='complete') {
      if(ajax.status===200 || ajax.status===204) {
        switch(context) {
          case 'list':
          case 'search':
            g.list = JSON.parse(ajax.responseText);
            showList();
            break;
          case 'add':
          case 'complete':
            makeRequest(g.listUrl, 'list');
            break;
          default:
            alert('unknown context:'+context);
            break;
        }
      }
      else {
        alert('*** ERROR: '+ajax.status+'\n'+ajax.statusText);
      }
    }
  }

  var that = {};
  that.init = init;
  return that;
};