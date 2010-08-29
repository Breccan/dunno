require('./source/game/main');
var http = require('http'), 
  net = require('net'),
  url = require('url'),
  fs = require('fs'),
  io = require('./'),
  sys = require('sys');
var send404 = function(res){
  res.writeHead(404);
  res.write('404');
  res.end();
},

server = http.createServer(function(req, res){
  // your normal server code
  var path = url.parse(req.url).pathname;
  switch (path){
  case '/':
    try{
    res.writeHead(200, {'Content-Type': 'text/html'});
    fs.readFile('client/index.html', 'utf8', function(err, data){
          if (!err) res.write(data, 'utf8');
          res.end();
        });
      } catch(e){ 
        send404(res); 
      }
    break;

  default:
    if (/\.(js|html|swf|png)$/.test(path)){
      try {
        var swf = path.substr(-4) === '.swf';
        var png = path.substr(-4) === '.png';
        res.writeHead(200, {'Content-Type': swf ? 'application/x-shockwave-flash' : png ? 'image/png' : ('text/' + (path.substr(-3) === '.js' ? 'javascript' : 'html'))});
        fs.readFile(__dirname + path, (swf || png) ? 'binary' : 'utf8', function(err, data){
          if (!err) res.write(data, (swf || png) ? 'binary' : 'utf8');
          res.end();
        });
      } catch(e){ 
        send404(res); 
      }
      break;
    }

    send404(res);
    break;
  }
});

//START SERVERS
server.listen(80);
// socket.io, I choose you
// simplest chat application evar
var io = io.listen(server),
buffer = [];

io.on('connection', function(client){
  var connection = new Client(client);
  connection.write("What is your name?");

  var closure = null;
  client.on('message', function(message){
    if (!closure) closure = handlePlayer(new String(message).trim(), connection);
		if (!closure) connection.write("Please try again: ");
  });

  client.on('disconnect', function(){
    connection.write('goodbye\r\n');
  });
});
