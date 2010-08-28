Player = new Class({

	Extends: Living,

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
	}

});

