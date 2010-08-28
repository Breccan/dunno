require.paths.push('source/game/engine');
require.paths.push('source/game');
require.paths.push('./');
require('./lib/mootools').apply(GLOBAL);
require('./source/game/engine/engine');
require('./client')

var http = require('http'), 
  net = require('net'),
  url = require('url'),
  fs = require('fs'),
  io = require('./')
  sys = require('sys'),

send404 = function(res){
  res.writeHead(404);
  res.write('404');
  res.end();
},

server = http.createServer(function(req, res){
  // your normal server code
  var path = url.parse(req.url).pathname;
  switch (path){
  case '/':
    res.writeHead(200, {'Content-Type': 'text/html'});
    res.write('<h1>Welcome. Try the <a href="/client/chat.html">chat</a> example.</h1>');
    res.end();
    break;

  default:
    if (/\.(js|html|swf)$/.test(path)){
      try {
        var swf = path.substr(-4) === '.swf';
        res.writeHead(200, {'Content-Type': swf ? 'application/x-shockwave-flash' : ('text/' + (path.substr(-3) === '.js' ? 'javascript' : 'html'))});
        fs.readFile(__dirname + path, swf ? 'binary' : 'utf8', function(err, data){
          if (!err) res.write(data, swf ? 'binary' : 'utf8');
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
}),
world = new World('discoworld'),
//handles player and send to site.
handlePlayer = function(playerName, stream) {
	var player = new Player(playerName);

	player.addEvent('output', function(message) {
		stream.write(message+"\r\n");
	});

	stream.on('data', function(data) {
		player.onInput(new String(data).trim());
	});

	player.send("Hi there, "+player.get('name')+"!");

	if (!player.enterWorld(world)) return false;

	return true;
},
//login closure for direct connection
login = function(stream) {
  stream.on('connect', function () {
    stream.write("What is your name?\r\n");
    sys.puts("User connected.");
  });

  var closure = null;
  stream.on('data', function (data) {
    if (!closure) closure = handlePlayer(new String(data).trim(), stream);
		if (!closure) stream.write("Please try again: ");
  });

  stream.on('end', function () {
    stream.write('goodbye\r\n');
    stream.end();
  });
},
net_server = net.createServer(function (stream) {
  login(stream);
});

//START SERVERS
server.listen(80);
net_server.listen(4242);
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
