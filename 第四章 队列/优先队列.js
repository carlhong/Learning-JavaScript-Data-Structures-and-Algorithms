function PriorityQueue() {
	var items = [];

	function QueueElement(element, priority) { // {1}
		this.element = element;
		this.priority = priority;
	}
	this.enqueue = function(element, priority) {
		var queueElement = new QueueElement(element, priority);
		if (this.isEmpty()) {
			items.push(queueElement); // {2}
		} else {
			var added = false;
			for (var i = 0; i < items.length; i++) {
				if (queueElement.priority <items[i].priority) {
					items.splice(i, 0, queueElement); // {3}
					added = true;
					break; // {4}
				}
			}
			if (!added) { //{5}
				items.push(queueElement);
			}
		}
	};
	//其他方法和默认的Queue实现相同
}