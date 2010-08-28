Living = new Class({

	Extends: Base,

	Implements: [Events,Options],

	queue: [],

	heartTimer: null,

	short: null,

	long: null,

	name: null,

	create: function(name) {
		this.set('name', name);
		this.startHeart();
	},
  //moveTo Includes tracking which players are where.
  moveTo: function(room) {
    if (typeof world.getRoom(room) !== 'undefined') {
      if (this.type === "player") {
        var old_room = world.getRoom(this.get('location'));
        old_room.removePlayer(this.name);
      }
      this.set('location', room);
      if (this.type === "player") {
        var new_room = world.getRoom(this.get('location'));
        new_room.addPlayer(this.name);
      }
    }
    else {
      this.set('location', room);
      if (this.type === "player") {
        var new_room = world.getRoom(this.get('location'));
        new_room.addPlayer(this.name);
      }
    }
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
      //HOrrible hack make it pass better please?
      params = params.join(' ')
     this.send(Commands[command].bind(this).pass(params)());
    }
    else if (this.get('room') && this.get('room').hasExit(string)){
      this.force('move '+ string);
    }
    else {
       this.send("What?");
    }
	},

	callNextAction: function() {
		var response = this.parseCommand(this.queue.shift());
	},

	/**
	 * Force the character to do something.
	 */
	force: function(command) {
		this.queueCommand(command);
	},
  getRoom: function() {
    return world.getRoom(this.get('location'));
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
