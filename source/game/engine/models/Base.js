Base = new Class({

	save: {},

	initialize: function() {
		this.create();
	},

	save: function (k, v) {
		this.save[k] = v;
	},

	get: function(k) {
		var meth = 'get'+k.capitalize();
		return (this[meth]) ? this[meth]() : this.save[k] || null;
	},

	set: function(k ,v) {
		var meth = 'set'+k.capitalize();
		if (this[meth]) this[meth](v);
		else this.save(k,v);
	}

});
