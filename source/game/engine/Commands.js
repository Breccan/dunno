Commands = {

	'look': function(obj) {
		var room = this.get('room');
		var reply = [];
		if (!obj) {
			return this.get('room').getDescription(this);
		} else {
			reply.push("You can't see anything interesting.");
		}
		return reply;
	}, 

	'move': function(direction){
		var room = this.getRoom();
		if (room && room.exits[direction]) {
			var success = this.moveTo(room.exits[direction]);
			if (!success) return "You can't go that way."
			this.force('look');
			return "You move "+ direction +".";
		} else {
			return "There's nothing in that direction.";
		}
	},

	'say': function(content) {
		sys.puts(this.name + "wants to say "+content);
		this.emit(this.name.capitalize()+' says: '+content);
		return "You say: " + content;
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
	}

};

