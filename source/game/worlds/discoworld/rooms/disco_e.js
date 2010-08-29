exports.room = new Class({

	Extends: Room,

	create: function() {
		this.set_short("the eastern edge of the dance floor");
		this.set_long("This is the eastern edge of the dance floor. The music is loud, the lights are flashing and  the center is full of dancers. The bar is to the east and people occasionally push past you to get to it.");
		this.add_item('floor', "The dance floor is a collection of lights that alternate in time with the music. Groovy.");
		this.add_exit("northeast", "bar_n");
		this.add_exit("east", "bar_c");
		this.add_exit("southeast", "bar_s");
		this.add_exit("southwest", "disco_s");
		this.add_exit("west", "disco_center");
		this.add_exit("south", "disco_se");
		this.add_exit("north", "disco_ne");
	}

});
