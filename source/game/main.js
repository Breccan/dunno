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

});

var world = new World('discoworld');

var handlePlayer = function(playerName, stream) {

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

};

server.listen(8000);
