var Utility = {
	random: function(min, max) {
		return Math.floor(Math.random() * (max - min)) + min;
	},

	has: function(array, value) {
		return (array.indexOf(value) >= 0) ? true : false;
	},

	getDate: function(date) {
		var today = (date) ? new Date(date) : new Date();
		if (today.toJSON()) {
			return {
				'day': today.getDate(), 
				'month': today.getMonth() + 1, 
				'year': today.getFullYear(),
				'hour': today.getHours(),
				'minute': today.getMinutes(),
				'second': today.getSeconds(),
				'full': today.toJSON(),
				'unix': today.getTime()
			};
		} 
		return false;
	},
	
	uniques: function(arr) {
		var a = [];
		for (var i=0, l=arr.length; i<l; i++) if (a.indexOf(arr[i]) === -1 && arr[i] !== '') a.push(arr[i]);
		return a;
	},
	
	getQuadrant: function(axis1, axis2) {
		// Creates a graph of 2 values, each having 50 units from top to bottom
		// Crossing these axes in the middle creates quadrants
		// Values are assumed to be percentages out of 100
		switch (true) {
			case axis1 >= 50 && axis2 >= 50:
				// +1, +2
				return 2; break;
			case axis1 <= 50 && axis2 >= 50:
				// -1, +2
				return 1; break;
			case axis1 >= 50 && axis2 <= 50:
				// +1, -2
				return 4; break;
			case axis1 <= 50 && axis2 <= 50:
				// -1, -2
				return 3; break;
		}
	},

	numSort: function(arr) {
		arr.sort(function(a,b) {return a-b});
		return arr;
	},
	
	loadJSON: function(file, callback) {   
		var xobj = new XMLHttpRequest();
		xobj.overrideMimeType('application/json');
		xobj.onreadystatechange = function() {
			if (xobj.readyState == 4 && xobj.status == '200') callback(JSON.parse(xobj.responseText));
		};
		xobj.open('GET', file, true);
		xobj.send(null);  
	},
	
	shuffle: function(array) {
		// Shuffles an array in-place
		for (var i = array.length - 1; i > 0; i--) {
			var j = Math.floor(Math.random() * (i + 1));
			var temp = array[i];
			array[i] = array[j];
			array[j] = temp;
		}
	}
}