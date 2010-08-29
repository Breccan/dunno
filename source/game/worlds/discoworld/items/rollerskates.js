exports.item = new Class({

	Extends: Item,

	create: function() {
		this.set_long("This pair of rollerskates is amazing.");
		this.set_short("a pair of roller skates");
		this.set_aliases(['skates', 'rollerskates']);
	}

});
