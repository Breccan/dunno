Living = new Class({

	Extends: Base,

	Implements: [Events,Options,Container],

	queue: [],
	heartTimer: null,
	short: null,
	long: null,
	name: null,
	world: null,
	room: null,
	location: null,
	gender: 'male', //OMG SEXIST!!!!!ONE!!!!

	create: function(name) {
		this.set('name', name);
		this.startHeart();
	},

	getDescription: function(observer) {
		return this.genderize('%You look%s pretty ordinary.');
	},

	genderize: function(str, you) {

		var male = (this.gender=='male');
		var name = this.name.capitalize();
		var pronouns = {
			'you'   : (male) ? 'he'  : 'she',
			'You'   : name, //(male) ? 'He'  : 'She',
			'yours' : (male) ? 'his' : 'her',
			'Yours' : (male) ? 'His' : 'Her',
			'your'  : (male) ? 'his' : 'her',
			'Your'  : name+"'s", //(male) ? 'His' : 'her',
			's'     : 's'
		};

		if (you) {
			var set = {};
			new Hash(pronouns).each(function(v,k) {
				set[k] = k;	
			});
			set.s = '';
			pronouns = set;
		}

		var match = str.match(/%(\w+)/g);
		if (!match) return str;

		match.each(function(k) {
			var k = k.replace(/^%/, '');
			if (typeof pronouns[k] !== 'undefined') str = str.replace('%'+k, pronouns[k]);
		});

		return str;

	},

	setRoom: function(room) {
		if (this.room && this.room.path == this.location) return;
		if (this.get('room')) this.get('room').removePlayer(this);
		this.room = room;
		this.room.addPlayer(this);
		this.location = this.room.path;
	},
	
	getRoom: function() {
		return this.room;
	},

	setLocation: function(path) {
		sys.puts("Setting location to "+path);
		var room = this.world.getRoom(path);
		if (!room) {
			log_error("Can't find room for "+path);
			return;
		}
		this.setRoom(this.world.getRoom(path));
		this.location = path;
	},

	//moveTo Includes tracking which players are where.
	moveTo: function(path) {
		sys.puts("Transporting "+this.name+" to room "+path);
		var room = this.world.getRoom(path);
		if (!room) return false;
		this.set('room', room);
		return true;
   	},

	/**
	 * If it's living, it has a heart beat.  Every time the heart beats, the 
	 * next command in the action queue will be called.
	 */
	startHeart: function() {
		this.heartTimer = (function(){ this.beatHeart(); }).periodical(1000, this);
	},

	/**
	 * If there's a queue, the next action will be called up.  If there's not,
	 * run the regen routine and check to see if the player is dead (ie, if 
	 * their heart should KEEP beating).
	 */
	beatHeart: function() {
		if (this.queue.length>0) this.callNextAction();
	},

	/**
	 * The heart should be stopped when the player's hit points are below 0.
	 * This will cause the player to become dead.
	 */
	stopHeart: function() {
		unset(this.heartTimer);
		this.fireEvent('death');
	},

	/**
	 * Because 'send' likes to send things to the character, and NPCs don't
	 * need to be sent messages.
	 */
	send: function(message, delay) { },

	/**
	 * Emits a message to everyone in the room.
	 */
	emit: function(message) {
		var my = this;
		var me = this.name;
		if (!this.get('room')) {
			log_error("Player should have a room but does not!");
			return;
		}
		this.get('room').get('players').each(function(player, name) {
			if (player.name != me) player.send(my.genderize(message));
			//second person = true
			else player.send(my.genderize(message, true));
		});
	},

	/**
	 * When a player enters a command, we'll add it to the command stack.
	 */
	queueCommand: function(str) {

		this.queue.push(str);

	},

	parseCommand: function(string) {

		string = string.trim();
		var params = string.split(' ');
		var command = params.shift();
		var out = '';
		if (typeof Commands[command] !== 'undefined'){
			params = params.join(' ');
			out = Commands[command].bind(this).pass(params)();
		}
		else if (this.get('room') && this.get('room').hasExit(string)){
			this.force('move '+ string);
			return this.force('look');
		}

		//The commands either have to return before this point or have
		//output that is equal to true or a string.
		//
		//Otherwise, the parser will treat it like an invalid command.

		if (out===true) return;
		if (!out) out = 'What?';
		
		this.send(out);

	},

	callNextAction: function() {
		var response = this.parseCommand(this.queue.shift());
	},

	/**
	 * Force the character to do something.
	 */
	force: function(command) {
		return this.parseCommand(command);
	},

/**
 * Fun things to implement if we have time later.
 */

	increaseHeartrate: function(times) {

	},

	decreaseHeartrate: function(times) {

	},

	freeze: function(duration)  {

	},

	passOut: function() {

	},

	wakeUp: function() {

	}

});
