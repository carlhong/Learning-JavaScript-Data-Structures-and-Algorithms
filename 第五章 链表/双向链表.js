function DoublyLinkedList() {
	var Node = function(element) {
		this.element = element;
		this.next = null;
		this.prev = null; //新增的
	};
	var length = 0;
	var head = null;
	var tail = null; //新增的
	//这里是方法
	this.insert = function(position, element) {
		//检查越界值
		if (position >= 0 && position <= length) {
			var node = new Node(element),
				current = head,
				previous,
				index = 0;
			if (position === 0) { //在第一个位置添加
				if (!head) { //新增的 {1}
					head = node;
					tail = node;
				} else {
					node.next = current;
					current.prev = node; //新增的 {2}
					head = node;
				}
			} else if (position === length) { //最后一项 //新增的
				current = tail; // {3}
				current.next = node;
				node.prev = current;
				tail = node;
			} else {
				while (index++ < position) { //{4}
					previous = current;
					current = current.next;
				}
				node.next = current; //{5}
				previous.next = node;
				current.prev = node; //新增的
				node.prev = previous; //新增的
			}
			length++; //更新列表的长度
			return true;
		} else {
			return false;
		}
	};
	this.removeAt = function(position) {
		//检查越界值
		if (position > -1 && position < length) {
			var current = head,
				previous,
				index = 0;
			//移除第一项
			if (position === 0) {
				head = current.next; // {1}
				//如果只有一项，更新tail //新增的
				if (length === 1) { // {2}
					tail = null;
				} else {
					head.prev = null; // {3}
				}
			} else if (position === length - 1) { //最后一项 //新增的
				current = tail; // {4}
				tail = current.prev;
				tail.next = null;
			} else {
				while (index++ < position) { // {5}
					previous = current;
					current = current.next;
				}
				//将previous与current的下一项链接起来——跳过current
				previous.next = current.next; // {6}
				current.next.prev = previous; //新增的
			}
			length--;
			return current.element;
		} else {
			return null;
		}
	};
}