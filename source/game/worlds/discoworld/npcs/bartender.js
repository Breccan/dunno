exports.npc = new Class({

	Extends: Living,

	create: function() {

		this.set_short('a bartender');

		this.add_alias('bartender');

		this.set_long(
      "This is a bartender, he works here night after night while you "+
      "have your fun on the dance floor. He probably has some pretty "+
      "crazy stories to tell"
		);

		this.load_chat(20, [
			"say 'What are you after?",
			"@grins widely.",
			"say I highly recommend Hendrick's gin.",
			"say This is just my night job, by day I fight giant robots from outerspace.",
			"@quietly chews on a toothbrush."
		]);

	}

});
