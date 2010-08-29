Container = new Class({

	Extends: Base,

	items: [],

	getItem: function(name) {
		var name = name.split(' ')[0];
		var response = false;
		this.items.each(function(item){
			if (item.get('aliases').contains(name)) response = item;
		});
		return response;
	},

	addItem: function(item) {
		this.items.push(item);
	},

	removeItem: function(item) {
		this.items.erase(item);
	}

});
