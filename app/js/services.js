'use strict';

/* Services */

angular.module('talcApp.services', []).
	value('guide', 
		"Talc is a text calculator. Powder in some text and numbers like this:\n\n"+
		"Pizza Party:\n"+
		"4 cokes * $2 each + 1 pepperoni pizza * $6 each\n"+
		"3 breadsticks * $3 each + 2 cheese pizzas * $5 each\n"+
		"Total >\n\n"+
		"Use operators (+,-,*,/) to make calculations and > to get the sum of all preceding lines."
	).
	value('isNumber', function(n) {
		return !isNaN(parseFloat(n)) && isFinite(n);
	}).
	factory('ParsedContents', ['isNumber', function(isNumber) {
		function ParsedContents(contents) {
			this.lines = this.parse(contents);
			this.sum = this.getSum(this.lines);
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
				this.getResults(clean);
				return clean;
			},
			getResults: function(lines) {
				for (var i=0, x=lines.length; i < x; i++) {
					try {
						lines[i].result = eval(lines[i].parsed);
					} catch(err) {
						console.log(lines[i].parsed+" is not a valid expression.");
					}
					lines[i].result = lines[i].result || null;
				}
			},
			getSum: function(lines) {
				var sum = 0;
				for (var i=0, x=lines.length; i < x; i++) {
					sum += lines[i].result;
				}
				return sum;
			},
			getPartialSum: function(lines) {
				
			}
		};
		return ParsedContents;
	}]);