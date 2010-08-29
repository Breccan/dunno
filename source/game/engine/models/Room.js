Room = new Class({

	Extends: Base,
	Implements: Container,
	long: null,
	short: null,
	exits: {},
	desc_items: {},
	players: {},
	living: [],

	initialize: function(world) {
		this.world   = world;
		this.players = new Hash(this.players);
		this.exits   = new Hash(this.exits);
		this.desc_items   = new Hash(this.items);
		this.create();
	},

	add_living: function(path) {
		var npc = this.world.loadNPC(path);
		npc.set('room', this);
	},
	
	addPlayer: function(player) {
		this.players[player.name] = player;
	},

	addNPC: function(npc) {
		sys.puts("The new NPC's name is "+npc.short);
		this.living.push(npc);
	},

	removePlayer: function(player) {
		delete(this.players[player.name]);
	},

	getPlayer: function(name) {
		return this.players[name] || false;
	},

	getExits: function() {
		return this.exits;
	},

	hasExit: function(exit) {
		return typeof this.exits[exit] !== 'undefined';
	},

	getDescription: function(observer) {
		var lines = [];
		lines.push(this.get('long'));
		lines.push('Exits: '+this.get('exits').getKeys().join(', '));
		var players = [];
		this.get('players').each(function(pl,name) {
			if (name!=observer.name) players.push(name);
		});
		if (players.length>0) lines.push('Players: '+players.join(', '));
    var living = [];
    var living_hash = new Hash(this.living);
    living_hash.each(function(live) {
      living.push(live.short);
    });
    //hack out the last one
    living.pop();
		if (living.length>0) lines.push(living.join(', ') + (living.length>1 ? " are" : " is") + " standing here.");
		return lines;
	},

	set_short: function(short) {
		this.short = short;
	},

	set_long: function(long) {
		this.long = long;
	},

	add_exit: function(dir, loc) {
		this.exits[dir] = loc;
	},

	//add an item view inside the room desc. LPC naming style.
	add_item: function(keyword, desc, aliases) {
		this.desc_items[keyword] = desc;
		var that = this;
		var aliases = new Hash(aliases);
		aliases.each(function(alias) { that.desc_items[alias] = keyword; });
	},

	getDetail: function(item) {
		return this.desc_items[item];
	},

	create: function() {
		this.set_short("Empty place")
		this.set_long("This room is broken. Pretend you didn't see it")
	}
	
});
