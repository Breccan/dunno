Living = new Class({

	Extends: Base,

	Implements: Events,

	queue: [],

	heartTimer: null,

	short: null,

	long: null,

	create: function() {

		this.startHeart();

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
		this.send("budump...");
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

	parseCommand: function(str) {

		this.send("You want to: "+str);
		this.send("Well, you can't.", 100);

	},

	callNextAction: function() {
		var response = this.parseCommand(this.queue.shift());
		if (!response) this.send("What?");
		else this.send(response);
	},

	/**
	 * Force the character to do something.
	 */
	force: function(command) {
		this.queueCommand(command);
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
