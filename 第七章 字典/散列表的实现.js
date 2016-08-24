function HashTable() {
	var table = [];
	var loseloseHashCode = function(key) {
		var hash = 0; //{1}
		for (var i = 0; i < key.length; i++) { //{2}
			hash += key.charCodeAt(i); //{3}
		}
		return hash % 37; //{4}
	};
	var djb2HashCode = function(key) {
		var hash = 5381; //{1}
		for (var i = 0; i < key.length; i++) { //{2}
			hash = hash * 33 + key.charCodeAt(i); //{3}
		}
		return hash % 1013; //{4}
	};
	this.put = function(key, value) {
		var position = loseloseHashCode(key); //{5}
		console.log(position + ' - ' + key); //{6}
		table[position] = value; //{7}
	};
	this.get = function(key) {
		return table[loseloseHashCode(key)];
	};
	this.remove = function(key) {
		table[loseloseHashCode(key)] = undefined;
	};


	//分离链接法
	var ValuePair = function(key, value) {
		this.key = key;
		this.value = value;
		this.toString = function() {
			return '[' + this.key + ' - ' + this.value + ']';
		}
	};
	this.put = function(key, value) {
		var position = loseloseHashCode(key);
		if (table[position] == undefined) { //{1}
			table[position] = new LinkedList();
		}
		table[position].append(new ValuePair(key, value)); //{2}
	};
	this.get = function(key) {
		var position = loseloseHashCode(key);
		if (table[position] !== undefined) { //{3}
			//遍历链表来寻找键/值
			var current = table[position].getHead(); //{4}
			while (current.next) { //{5}
				if (current.element.key === key) { //{6}
					return current.element.value; //{7}
				}
				current = current.next; //{8}
			}
			//检查元素在链表第一个或最后一个节点的情况
			if (current.element.key === key) { //{9}
				return current.element.value;
			}
		}
		return undefined; //{10}
	};
	this.remove = function(key) {
		var position = loseloseHashCode(key);
		if (table[position] !== undefined) {
			var current = table[position].getHead();
			while (current.next) {
				if (current.element.key === key) { //{11}
					table[position].remove(current.element); //{12}
					if (table[position].isEmpty()) { //{13}
						table[position] = undefined; //{14}
					}
					return true; //{15}
				}
				current = current.next;
			}
			// 检查是否为第一个或最后一个元素
			if (current.element.key === key) { //{16}
				table[position].remove(current.element);
				if (table[position].isEmpty()) {
					table[position] = undefined;
				}
				return true;
			}
		}
		return false; //{17}
	};



	//线性探查法
	this.put = function(key, value) {
		var position = loseloseHashCode(key); // {1}
		if (table[position] == undefined) { // {2}
			table[position] = new ValuePair(key, value); // {3}
		} else {
			var index = ++position; // {4}
			while (table[index] != undefined) { // {5}
				index++; // {6}
			}
			table[index] = new ValuePair(key, value); // {7}
		}
	};
	this.get = function(key) {
		var position = loseloseHashCode(key);
		if (table[position] !== undefined) { //{8}
			if (table[position].key === key) { //{9}
				return table[position].value; //{10}
			} else {
				var index = ++position;
				while (table[index] === undefined || table[index].key !== key) { //{11}
					index++;
				}
				if (table[index].key === key) { //{12}
					return table[index].value; //{13}
				}
			}
		}
		return undefined; //{14}
	};
	this.remove = function(key) {
		var position = loseloseHashCode(key);
		if (table[position] !== undefined) { //{8}
			if (table[position].key === key) { //{9}
				table[position] = undefined; //{10}
			} else {
				var index = ++position;
				while (table[index] === undefined || table[index].key !== key) { //{11}
					index++;
				}
				if (table[index].key === key) { //{12}
					table[index] = undefined; //{13}
				}
			}
		}
		return undefined; //{14}
	};
}