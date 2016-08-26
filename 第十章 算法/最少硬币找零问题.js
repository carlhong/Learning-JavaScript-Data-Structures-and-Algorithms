//动态规划
function MinCoinChange(coins) {
	var coins = coins; //{1}
	var cache = {}; //{2}
	this.makeChange = function(amount) {
		var me = this;
		if (!amount) { //{3}
			return [];
		}
		if (cache[amount]) { //{4}
			return cache[amount];
		}
		var min = [],
			newMin, newAmount;
		for (var i = 0; i < coins.length; i++) { //{5}
			var coin = coins[i];
			newAmount = amount - coin; //{6}
			if (newAmount >= 0) {
				newMin = me.makeChange(newAmount); //{7}
			}
			if (
				newAmount >= 0 && //{8}
				(newMin.length < min.length - 1 || !min.length) //{9}
				&& (newMin.length || !newAmount) //{10}
			) {
				min = [coin].concat(newMin); //{11}
				console.log('new Min ' + min + ' for ' + amount);
			}
		}
		return (cache[amount] = min); //{12}
	};
}

//贪心算法
function MinCoinChange(coins){
var coins = coins; //{1}
this.makeChange = function(amount) {
var change = [],
total = 0;
for (var i=coins.length; i>=0; i--){ //{2}
var coin = coins[i];
while (total + coin <= amount) { //{3}
change.push(coin); //{4}
total += coin; //{5}
}
}
return change;
};
}
var minCoinChange = new MinCoinChange([1, 5, 10, 25]);
console.log(minCoinChange.makeChange(3));