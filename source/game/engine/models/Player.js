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
		this.addItem(this.world.loadItem('rollerskates'));
		return true;
	}

});
