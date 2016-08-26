function ArrayList() {
	var array = []; //{1}
	this.insert = function(item) { //{2}
		array.push(item);
	};
	this.toString = function() { //{3}
		return array.join();
	};

	var swap = function(index1, index2) {
		var aux = array[index1];
		array[index1] = array[index2];
		array[index2] = aux;
	};
	this.sequentialSearch = function(item) {
		for (var i = 0; i < array.length; i++) { //{1}
			if (item === array[i]) { //{2}
				return i; //{3}
			}
		}
		return -1; //{4}
	};
	this.binarySearch = function(item) {
		this.quickSort(); //{1}
		var low = 0, //{2}
			high = array.length - 1, //{3}
			mid, element;
		while (low <= high) { //{4}
			mid = Math.floor((low + high) / 2); //{5}
			element = array[mid]; //{6}
			if (element < item) { //{7}
				low = mid + 1; //{8}
			} else if (element > item) { //{9}
				high = mid - 1; //{10}
			} else {
				return mid; //{11}
			}
		}
		return -1; //{12}
	};
}

function createNonSortedArray(size) { //{6}
	var array = new ArrayList();
	for (var i = size; i > 0; i--) {
		array.insert(i);
	}
	return array;
}