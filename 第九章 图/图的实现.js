function Graph() {
	var vertices = []; //{1}
	var adjList = new Dictionary(); //{2}
	this.addVertex = function(v) {
		vertices.push(v); //{3}
		adjList.set(v, []); //{4}
	};
	this.addEdge = function(v, w) {
		adjList.get(v).push(w); //{5}
		adjList.get(w).push(v); //{6}
	};
	this.toString = function() {
		var s = '';
		for (var i = 0; i < vertices.length; i++) { //{10}
			s += vertices[i] + ' -> ';
			var neighbors = adjList.get(vertices[i]); //{11}
			for (var j = 0; j < neighbors.length; j++) { //{12}
				s += neighbors[j] + ' ';
			}
			s += '\n'; //{13}
		}
		return s;
	};
	var initializeColor = function() {
		var color = [];
		for (var i = 0; i < vertices.length; i++) {
			color[vertices[i]] = 'white'; //{1}
		}
		return color;
	};
	this.bfs = function(v, callback) {
		var color = initializeColor(), //{2}
			queue = new Queue(); //{3}
		queue.enqueue(v); //{4}
		while (!queue.isEmpty()) { //{5}
			var u = queue.dequeue(), //{6}
				neighbors = adjList.get(u); //{7}
			color[u] = 'grey'; // {8}
			for (var i = 0; i < neighbors.length; i++) { // {9}
				var w = neighbors[i]; // {10}
				if (color[w] === 'white') { // {11}
					color[w] = 'grey'; // {12}
					queue.enqueue(w); // {13}
				}
			}
			color[u] = 'black'; // {14}
			if (callback) { // {15}
				callback(u);
			}
		}
	};
	this.BFS = function(v) {
		var color = initializeColor(),
			queue = new Queue(),
			d = [], //{1}
			pred = []; //{2}
		queue.enqueue(v);
		for (var i = 0; i < vertices.length; i++) { //{3}
			d[vertices[i]] = 0; //{4}
			pred[vertices[i]] = null; //{5}
		}
		while (!queue.isEmpty()) {
			var u = queue.dequeue(),
				neighbors = adjList.get(u);
			color[u] = 'grey';
			for (i = 0; i < neighbors.length; i++) {
				var w = neighbors[i];
				if (color[w] === 'white') {
					color[w] = 'grey';
					d[w] = d[u] + 1; //{6}
					pred[w] = u; //{7}
					queue.enqueue(w);
				}
			}
			color[u] = 'black';
		}
		return { //{8}
			distances: d,
			predecessors: pred
		};
	};
	var shortestPathA = graph.BFS(myVertices[0]);
	console.log(shortestPathA);

	var fromVertex = myVertices[0]; //{9}
	for (var i = 1; i < myVertices.length; i++) { //{10}
		var toVertex = myVertices[i], //{11}
			path = new Stack(); //{12}
		for (var v = toVertex; v !== fromVertex; v = shortestPathA.predecessors[v]) { //{13}
			path.push(v); //{14}
		}
		path.push(fromVertex); //{15}
		var s = path.pop(); //{16}
		while (!path.isEmpty()) { //{17}
			s += ' - ' + path.pop(); //{18}
		}
		console.log(s); //{19}
	}

	this.dfs = function(callback) {
		var color = initializeColor(); //{1}
		for (var i = 0; i < vertices.length; i++) { //{2}
			if (color[vertices[i]] === 'white') { //{3}
				dfsVisit(vertices[i], color, callback); //{4}
			}
		}
	};
	var dfsVisit = function(u, color, callback) {
		color[u] = 'grey'; //{5}
		if (callback) { //{6}
			callback(u);
		}
		var neighbors = adjList.get(u); //{7}
		for (var i = 0; i < neighbors.length; i++) { //{8}
			var w = neighbors[i]; //{9}
			if (color[w] === 'white') { //{10}
				dfsVisit(w, color, callback); //{11}
			}
		}
		color[u] = 'black'; //{12}
	};
	var time = 0; //{1}
	this.DFS = function() {
		var color = initializeColor(), //{2}
			d = [],
			f = [],
			p = [];
		time = 0;
		for (var i = 0; i < vertices.length; i++) { //{3}
			f[vertices[i]] = 0;
			d[vertices[i]] = 0;
			p[vertices[i]] = null;
		}
		for (i = 0; i < vertices.length; i++) {
			if (color[vertices[i]] === 'white') {
				DFSVisit(vertices[i], color, d, f, p);
			}
		}
		return { //{4}
			discovery: d,
			finished: f,
			predecessors: p
		};
	};
	var DFSVisit = function(u, color, d, f, p) {
		console.log('discovered ' + u);
		color[u] = 'grey';
		d[u] = ++time; //{5}
		var neighbors = adjList.get(u);
		for (var i = 0; i < neighbors.length; i++) {
			var w = neighbors[i];
			if (color[w] === 'white') {
				p[w] = u; // {6}
				DFSVisit(w, color, d, f, p);
			}
		}
		color[u] = 'black';
		f[u] = ++time; //{7}
		console.log('explored ' + u);
	};
}