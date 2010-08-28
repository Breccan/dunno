Commands = {
  'look': function(obj) {
    var room = this.getRoom();
    var returner = [];
    if (!obj) {
      if (!room) { return "You aren't in a place. That's... Cool? No one can hurt you here"; } 
      returner.push(room.long);
      var exits = room.get('exits');
      if (exits) {
        returner.push( "Exits:" + new Hash(exits).getKeys().join(", "));
      }
      //implement items and looking at things
    }
    else {
      returner.push( "You can't see anything interesting.");
    }
    return returner.join("\r\n");
  }, 
  'move': function(direction){
    var room = this.getRoom();
    if (room && room.exits[direction]) {
      this.moveTo(room.exits[direction]);
      this.force('look');
      return "You move "+ direction ;
    } else {
      return "There's nothing in that direction.";
    }
  }
};

