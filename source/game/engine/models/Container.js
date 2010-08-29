Container = new Class({

	Extends: Base,

	items: [],

	getItem: function(name) {
		var name = name.split(' ')[0];
		var item = false;
		this.items.each(function(i){
			if (!item && i.hasAlias(name)) item = i;
		});
		return item;
	},

	addItem: function(item) {
		this.items.push(item);
	},

	removeItem: function(item) {
		this.items.erase(item);
	}

});
