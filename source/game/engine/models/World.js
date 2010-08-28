World = new Class({

	Extends: Base,

	players: {},

	rooms: {},

	items: {},

	name: null,

	basePath: null,

	roomPath: 'rooms/',

	/**
	 * The name of the world will determine the path to the world's room and
	 * object files.
	 */
	create: function(name) {
		this.set('name', name);
		this.basePath = name+'/';
		this.players = new Hash(this.players);
		this.rooms   = new Hash(this.rooms);
		this.items   = new Hash(this.items);
	},

	/**
	 * Adds the player to the world.
	 */
	addPlayer: function(player) {
		this.players[player.name] = player;
		this.announce(player.name+" has entered the world.");
	},

	getPlayer: function(name) {
		return this.players[name] || false;
	},

	announce: function(message) {
		this.players.each(function(player) {
			player.send(message.capitalize());
		});
	},
	
	getRoom: function(path) {
		if (!this.rooms[path]) {
			try {
				var room = require('worlds/'+this.basePath+this.roomPath+path).room;
				this.rooms[path] = new room();
			} catch (e) {
				return false;
			}
		}
		return this.rooms[path];
	}

});
