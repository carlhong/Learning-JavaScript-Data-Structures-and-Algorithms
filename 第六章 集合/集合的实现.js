function Set() {
	var items = {};
	this.has = function(value) {
		return items.hasOwnProperty(value);
	};
	this.add = function(value) {
		if (!this.has(value)) {
			items[value] = value; //{1}
			return true;
		}
		return false;
	};
	this.remove = function(value) {
		if (this.has(value)) {
			delete items[value]; //{2}
			return true;
		}
		return false;
	};
	this.clear = function() {
		items = {}; // {3}
	};
	this.size = function() {
		return Object.keys(items).length; //{4}
	};
	this.values = function() {
		return Object.keys(items);
	};
	this.union = function(otherSet) {
		var unionSet = new Set(); //{1}
		var values = this.values(); //{2}
		for (var i = 0; i < values.length; i++) {
			unionSet.add(values[i]);
		}
		values = otherSet.values(); //{3}
		for (var i = 0; i < values.length; i++) {
			unionSet.add(values[i]);
		}
		return unionSet;
	};
	this.intersection = function(otherSet) {
		var intersectionSet = new Set(); //{1}
		var values = this.values();
		for (var i = 0; i < values.length; i++) { //{2}
			if (otherSet.has(values[i])) { //{3}
				intersectionSet.add(values[i]); //{4}
			}
		}
		return intersectionSet;
	}
	this.difference = function(otherSet) {
		var differenceSet = new Set(); //{1}
		var values = this.values();
		for (var i = 0; i < values.length; i++) { //{2}
			if (!otherSet.has(values[i])) { //{3}
				differenceSet.add(values[i]); //{4}
			}
		}
		return differenceSet;
	};
	this.subset = function(otherSet) {
		if (this.size() > otherSet.size()) { //{1}
			return false;
		} else {
			var values = this.values();
			for (var i = 0; i < values.length; i++) { //{2}
				if (!otherSet.has(values[i])) { //{3}
					return false; //{4}
				}
			}
			return true; //{5}
		}
	};
}