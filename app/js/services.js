'use strict';

/* Services */

angular.module('talcApp.services', []).
	value('isNumber', function(n) {
		return !isNaN(parseFloat(n)) && isFinite(n);
	}).
	factory('ParsedContents', ['isNumber', function(isNumber) {
		function ParsedContents(contents) {
			this.lines = this.parse(contents);
			this.results = this.getResults(this.lines);
			this.sum = this.getSum(this.results);
		}
		ParsedContents.prototype = {
			operators: ["+","-","*","/","(",")"],
			parse: function(contents) {
				var currentChar,
					lineCount = 0,
					clean = [];
				for (var i=0, x=contents.length; i < x; i++) {
					var prevChar = contents.charAt(i-1),
						nextChar = contents.charAt(i+1);
					currentChar = contents.charAt(i);
					clean[lineCount] = clean[lineCount] || {};
					clean[lineCount].original = clean[lineCount].original || "";
					clean[lineCount].original += currentChar;
					clean[lineCount].parsed = clean[lineCount].parsed || "";

					if (this.operators.indexOf(currentChar) > -1 || isNumber(currentChar)) {
						clean[lineCount].parsed += currentChar;
					} else if (currentChar === ".") {
						if ( isNumber(prevChar) && isNumber(nextChar) ) {
							clean[lineCount].parsed += currentChar;
						}
					} else if (currentChar === "\n") {
						lineCount++;
					}
				}
				return clean;
			},
			getResults: function(lines) {
				var results = [];
				for (var i=0, x=lines.length; i < x; i++) {
					results[i] = {};
					results[i].original = lines[i].original;
					try {
						results[i].val = eval(lines[i].parsed);
					} catch(err) {
						console.log(lines[i].parsed+" is not a valid expression.");
					}
					results[i].val = results[i].val || null;
				}
				return results;
			},
			getSum: function(results) {
				var sum = 0;
				for (var i=0, x=results.length; i < x; i++) {
					sum += results[i].val;
				}
				return sum;
			}
		};
		return ParsedContents;
	}]);