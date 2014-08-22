'use strict';

/* Services */

angular.module('talcApp.services', []).
	value('guide', 
		"Talc is a text calculator. Powder in some text and numbers like this:\n\n"+
		"Pizza Party:\n"+
		"4 cokes * $1.50 each + 1 pepperoni pizza * $6 each\n"+
		"3 breadsticks * $3.50 each + 2 cheese pizzas * $5 each\n"+
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
					partialSum = false,
					clean = [];
				for (var i=0, x=contents.length; i < x; i++) {
					var prevChar = contents.charAt(i-1),
						nextChar = contents.charAt(i+1),
						increaseLineCount = false;
					currentChar = contents.charAt(i);
					clean[lineCount] = clean[lineCount] || {};
					clean[lineCount].original = clean[lineCount].original || "";
					clean[lineCount].parsed = clean[lineCount].parsed || "";
					clean[lineCount].result = clean[lineCount].result || null;

					clean[lineCount].original += currentChar;

					if (this.operators.indexOf(currentChar) > -1 || isNumber(currentChar)) {
						clean[lineCount].parsed += currentChar;
					} else if (currentChar === ".") {
						if ( isNumber(prevChar) && isNumber(nextChar) ) {
							clean[lineCount].parsed += currentChar;
						}
					} else if (currentChar === ">") {
						partialSum = true;
					} else if (currentChar === "\n") {
						increaseLineCount = true;
					}
					if (increaseLineCount || (i+1) == x) {
						if (partialSum) {
							clean[lineCount].result = this.getSum(clean);
							partialSum = false;
						} else {
							clean[lineCount].result = this.getResult(clean[lineCount].parsed);
						}
						lineCount++;
					}
				}
				return clean;
			},
			getResult: function(expression) {
				try {
					var result = eval(expression);
				} catch(err) {
					console.log(expression+" is not a valid expression.");
				}
				return result || null;
				//lines[i].result = lines[i].result || null;
			},
			getSum: function(lines) {
				var sum = 0;
				for (var i=0, x=lines.length; i < x; i++) {
					sum += lines[i].result;
				}
				return sum;
			}
		};
		return ParsedContents;
	}]);