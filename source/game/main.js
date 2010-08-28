// This is now out of date, put changes in the main server engine at the front. 
require.paths.push('../../');
require.paths.push('../');
require.paths.push('./');
require('lib/mootools').apply(GLOBAL);
require('engine/engine');
var net = require('net');
sys = require('sys');

var server = net.createServer(function (stream) {

    stream.on('connect', function () {
		stream.write("What is your name?\r\n");
		sys.puts("User connected ("+stream.remoteAddress+")");
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

});

log_error = function(message) {
	sys.puts("ERROR: "+message);
}

var world = new World('discoworld');

var handlePlayer = function(playerName, stream) {

	var player = new Player(playerName);

	player.addEvent('output', function(message) {
		stream.write(message+"\r\n");
	});

	stream.on('data', function(data) {
		try {
			player.onInput(new String(data).trim());
		} catch(e) {
			log_error(e);
		}
	});

	try {
		player.send("Hi there, "+player.get('name')+"!");
		if (!player.enterWorld(world)) return false;
		return true;
	} catch (e) {
		log_error(e);
	}

};

server.listen(8000);
