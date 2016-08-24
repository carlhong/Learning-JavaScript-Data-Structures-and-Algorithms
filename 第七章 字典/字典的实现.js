function Dictionary() {
	var items = {};
	this.has = function(key) {
		return key in items;
	}
	this.set = function(key, value) {
		items[key] = value; //{1}
	}
	this.remove = function(key) {
		if (this.has(key)) {
			delete items[key];
			return true;
		}
		return false;
	}
	this.get = function(key) {
		return this.has(key) ? items[key] : undefined;
	};
	this.values = function() {
		var values = {};
		for (var k in items) { //{1}
			if (this.has(k)) {
				values.push(items[k]); //{2}
			}
		}
		return values;
	};
	this.getItems = function() {
		return items;
	}
}