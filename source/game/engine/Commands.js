Commands = {

	'': function() {
		return true;
	},

	'look': function(obj) {
		var room = this.get('room');
		var reply = [];
		if (!obj) {
			return room.getDescription(this);
		} else {
			//First check local inventory.
			var item = this.getItem(obj);
			//Then check the room environment.
			if (!item) item = room.getItem(obj);
			if (!item) item = room.getLiving(obj);
			//Then check extra description details.
			if (!item) {
				var detail = this.get('room').getDetail(obj);
				if (detail) return detail;
			}
			//If we still don't have anything, return nothing.
			if (!item) return("You can't see anything interesting.");
			//Otherwise, return the item's description.
			return item.getDescription();
		} return reply;
	}, 

	'drop': function(target) {
		if (!target) return "Drop what?";
		var item = this.getItem(target);
		if (!target) return "You don't have that.";
		this.emit("%You drop%s "+item.get('short')+'.');
		this.get('room').addItem(item);
		this.removeItem(item);
		return true;
	},

	'take': function(target) {
		if (!target) return "Take what?";
		var item = this.get('room').getItem(target);
		if (!item) return "You don't see that.";
		this.emit("%You take%s "+item.get('short'));
		this.get('room').removeItem(item);
		this.addItem(item);
		return true;
	},

	'inventory': function() {
		if (this.get('items').length<0) return "You have nothing.";
		var shorts = [];
		this.get('items').each(function(item) {
			shorts.push(item.get('short'));
		});
		return "You have: "+shorts.join(', ');
	},

	'move': function(direction) {
		var room = this.getRoom();
		if (room && room.exits[direction]) {
			var success = this.moveTo(room.exits[direction]);
			if (!success) return "You can't go that way."
			this.emit("%You leave%s "+direction+".");
			return true;
		} else {
			return "There's nothing in that direction.";
		}
	},

	'say': function(content) {
		this.emit('%You say%s: '+content);
		return true;
	},

	'tell': function(string) {
		var params = string.split(' ');
		var target = params.shift();
		target = this.world.getPlayer(target);
		if (target) {
			target.send(this.name + " tells you: " + params.join(' '));
			return ("You tell " + target.name + ": " + params.join(' '));
		} else {
			return "Tell who?";
		}
	},

	"'": function(string) {
		this.force("say " + string);
		return true;
	},

	"search": function(string) {
		return "You search around for a bit but don't find anything. If there was something here then someone else has already taken it.";
	},

	"save": function(string) {
    	return "You can't save. In Disco your past doesn't matter, only your performance on the night.";
	},

	"kill": function(string) {
    	return "This is a peaceful place. If you need to burn off some energy, then try to outdance some folks.";
	},

	"outdance": function(string) {
		var target = this.get('room').getLiving(string);
		if (target) return target.genderize("You want to outdance "+((target.gender=='male')?'HIM':'HER')+"?!");
	}

};
