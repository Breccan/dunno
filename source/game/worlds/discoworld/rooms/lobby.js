exports.room = new Class({

	Extends: Room,

	create: function() {
		this.set_short("a sparsely decorated lobby");
		this.set_long("This is a large, unfurnished lobby.  It smells like fresh paint.  There's an elevator to the north and a door in the west wall marked \"Exit\".");
		this.add_item('elevator', "The elevator looks broken.");
		this.add_exit("west", "stairwell_01");
	}

});
