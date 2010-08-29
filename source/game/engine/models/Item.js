Item = new Class({

	Implements: Base,

	short: null,

	long: null,

	aliases: [],
	
	set_short: function(desc) {
		this.short = desc;
	},

	set_long: function(desc) {
		this.long = desc;
	},

	getDescription: function(observer) {
		return this.long;
	}

});
