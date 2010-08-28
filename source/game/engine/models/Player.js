Player = new Class({

	Extends: Living,
  type: "player",

	/**
	 * The main engine will add an event to the player object to output data.
	 */
	send: function(message, delay) {
		this.fireEvent('output', message);
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
		this.set('world', world);
    this.set('location', "discoworld/rooms/lobby");
    world.getRoom("discoworld/rooms/lobby").addPlayer(this.name);
		this.force('look');
		return true;
	}

});
