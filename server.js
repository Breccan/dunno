var net = require('net');
var sys = require('sys');
var server = net.createServer(function (stream) {
    stream.setEncoding('utf8');
    stream.on('connect', function () {
      stream.write('hello\r\n');
      sys.puts("User connected.");
      });
    stream.on('data', function (data) {
      stream.write(data);
      });
    stream.on('end', function () {
      stream.write('goodbye\r\n');
      stream.end();
      });
    });
server.listen(80);
