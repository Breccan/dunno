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

	set_aliases: function(aliases) {
		this.aliases = aliases;
	},

	add_alias: function(alias) {
		this.aliases.push(alias);
	},

	getDescription: function(observer) {
		return this.long;
	}

});
