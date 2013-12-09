var http = require('http'),
    httpProxy = require('http-proxy');

httpProxy.setMaxSockets(4096);

var server1 = new httpProxy.HttpProxy({
  target: {
    host: '127.0.0.1',
    port: '3000'
  }
});

var server2 = new httpProxy.HttpProxy({
  target: {
    host: '127.0.0.1',
    port: '3001'
  }
});

var server = http.createServer(function(req ,res){
  switch(req.headers.host){
    case 'server1.com':
      server1.proxyRequest(req, res);
    break;
    case 'chuzr.cs.lmu.edu':
      server2.proxyRequest(req, res);
    break;
  }
});

server.listen(80);
