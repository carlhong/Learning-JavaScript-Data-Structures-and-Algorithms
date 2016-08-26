function ArrayList() {
	var array = []; //{1}
	this.insert = function(item) { //{2}
		array.push(item);
	};
	this.toString = function() { //{3}
		return array.join();
	};
	this.bubbleSort = function() {
		var length = array.length; //{1}
		for (var i = 0; i < length; i++) { //{2}
			for (var j = 0; j < length - 1 - i; j++) { //{3}
				if (array[j] > array[j + 1]) { //{4}
					swap(j, j + 1); //{5}
				}
			}
		}
	};
	var swap = function(index1, index2) {
		var aux = array[index1];
		array[index1] = array[index2];
		array[index2] = aux;
	};
	this.selectionSort = function() {
		var length = array.length, //{1}
			indexMin;
		for (var i = 0; i < length - 1; i++) { //{2}
			indexMin = i; //{3}
			for (var j = i; j < length; j++) { //{4}
				if (array[indexMin] > array[j]) { //{5}
					indexMin = j; //{6}
				}
			}
			if (i !== indexMin) { //{7}
				swap(i, indexMin);
			}
		}
	};
	this.insertionSort = function() {
		var length = array.length, //{1}
			j, temp;
		for (var i = 1; i < length; i++) { //{2}
			j = i; //{3}
			temp = array[i]; //{4}
			while (j > 0 && array[j - 1] > temp) { //{5}
				array[j] = array[j - 1]; //{6}
				j--;
			}
			array[j] = temp; //{7}
		}
	};
	this.mergeSort = function() {
		array = mergeSortRec(array);
	};
	var mergeSortRec = function(array) {
		var length = array.length;
		if (length === 1) { //{1}
			return array; //{2}
		}
		var mid = Math.floor(length / 2), //{3}
			left = array.slice(0, mid), //{4}
			right = array.slice(mid, length); //{5}
		return merge(mergeSortRec(left), mergeSortRec(right)); //{6}
	};
	var merge = function(left, right) {
		var result = [], // {7}
			il = 0,
			ir = 0;
		while (il < left.length && ir < right.length) { // {8}
			if (left[il] < right[ir]) {
				result.push(left[il++]); // {9}
			} else {
				result.push(right[ir++]); // {10}
			}
		}
		while (il < left.length) { // {11}
			result.push(left[il++]);
		}
		while (ir < right.length) { // {12}
			result.push(right[ir++]);
		}
		return result; // {13}
	};
	this.quickSort = function() {
		quick(array, 0, array.length - 1);
	};
	var quick = function(array, left, right) {
		var index; //{1}
		if (array.length > 1) { //{2}
			index = partition(array, left, right); //{3}
			if (left < index - 1) { //{4}
				quick(array, left, index - 1); //{5}
			}
			if (index < right) { //{6}
				quick(array, index, right); //{7}
			}
		}
	};
	var partition = function(array, left, right) {
		var pivot = array[Math.floor((right + left) / 2)], //{8}
			i = left, //{9}
			j = right; //{10}
		while (i <= j) { //{11}
			while (array[i] < pivot) { //{12}
				i++;
			}
			while (array[j] > pivot) { //{13}
				j--;
			}
			if (i <= j) { //{14}
				swapQuickStort(array, i, j); //{15}
				i++;
				j--;
			}
		}
		return i; //{16}
	};
}

function createNonSortedArray(size) { //{6}
	var array = new ArrayList();
	for (var i = size; i > 0; i--) {
		array.insert(i);
	}
	return array;
}