Item = new Class({

	Implements: Base,

	short: null,

	long: null,

	aliases: [],
	
	set_short: function(desc) {
		this.short = desc;
	},

	on_equip: function() {

	},

	on_remove: function() {

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
	},

	getShort: function() {
		if (this.short) return this.short;
		return 'a thing';
	},

	hasAlias: function(alias) {
		return (this.aliases.contains(alias));
	}

});
