exports.npc = new Class({

	Extends: Living,

	create: function() {

		this.set_short('a lost raver');

		this.add_alias('raver');

		this.set_long(
			"This young man is clearly in the wrong establishment. "+
			"He is dressed in baggy, stained clothes and wearing a glow "+
			"stick.  He doesn't appear to be wearing roller skates."
		);

		this.load_chat(20, [
			"say 'Sup?",
			"@grins widely.",
			"say This music is pretty low-core.",
			"say So when does the party start?",
			"@quietly chews on a toothbrush."
		]);

	}

});
