Commands = {

	'': function() {
		return true;
	},

	'look': function(obj) {
		var room = this.get('room');
		var reply = [];
		if (!obj) {
			sys.puts(this.name);
			return this.get('room').getDescription(this);
		} else {
      var living = room.get('living');
      var i = 0;
      for(i = 0; i < living.length; i=i+1){
        var live = living[i];
        if (live.get('aliases').include(obj)){
          return live.get('long');
        }
      };
			//First check local inventory.
			var item = this.getItem(obj);
			//Then check the room environment.
			if (!item) item = this.get('room').getItem(obj);
			//Then check extra description details.
			if (!item) item = this.get('room').getDetail(obj);
			if (!item) return("You can't see anything interesting.");
			return item.getDescription();
		} return reply;
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
    return "This is a peaceful place. If you need to burn off some energy then do it on the dance floor.";
  }

};
