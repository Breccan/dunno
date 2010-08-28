Client = new Class ({
  type: "web",
  stream: null,
  initialize: function(client){
    this.stream = client;
  },
  on: function(type, fun) {
    if (type === "data") {
      this.stream.on("message", fun);
    }
    else {
      this.stream.on(type, fun);
    }
 },
  write: function(text) {
    var message = { message: [this.stream.sessionId, text]};
    this.stream.send(message);
  }
});
