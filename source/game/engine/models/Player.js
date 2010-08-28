Player = new Class({

	Extends: Living,

	/**
	 * The main engine will add an event to the player object to output data.
	 */
	send: function(message, delay) {
		if (!message.each) message = [message];
		message.each(function(line) {
			this.fireEvent('output', line);
		}, this);
	},

	/**
	 * And nonplayer objects won't be sending any data packets to the engine,
	 * so we don't need that method there.
	 */
	onInput: function(command) {
		this.queueCommand(command);
	},

	/**
	 * Puts the player in the world.
	 */
	enterWorld: function(world) {
		if (world.getPlayer(this.get('name'))) return false;
		world.addPlayer(this);
		this.world = world;
	    this.set('location', "lobby");
		this.force('look');
		return true;
	},

	/**
	 * Emits a message to everyone in the room except the current player.
	 */
	emit: function(message) {
		me = this.name;
		this.get('room').get('players').each(function(player, name) {
			if (player.name != me) player.send(message);
		});
	}

});
