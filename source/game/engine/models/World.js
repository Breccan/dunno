World = new Class({

	players: {},

	rooms: {},

	items: {},

	/**
	 * The name of the world will determine the path to the world's room and
	 * object files.
	 */
	initialize: function(name) {
		this.name = name;
	},

	/**
	 * Adds the player to the world.
	 */
	addPlayer: function(player) {
		this.players[player.name] = player;
	}

});
