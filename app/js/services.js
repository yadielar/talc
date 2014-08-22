'use strict';

/* Services */

angular.module('talcApp.services', []).
	value('guide', 
		"Talc is a text calculator. Powder in some text and numbers like this:\n\n"+
		"Pizza Party:\n"+
		"4 cokes * $1.50 each + 1 pepperoni pizza * $6 each\n"+
		"3 breadsticks * $3.50 each + 2 cheese pizzas * $5 each\n"+
		"Subtotal >\n"+
		"Tax: $32.5 * 0.05\n"+
		"Total >\n\n"+
		"Use operators (+,-,*,/) to make calculations and > to get the sum of all preceding lines up to the last partial sum."
	).
	value('isNumber', function(n) {
		return !isNaN(parseFloat(n)) && isFinite(n);
	}).
	factory('Settings', function() {
		return {
			decimalPlaces: false
		};
	}).
	factory('Line', ['isNumber', function(isNumber) {
		function Line() {
			this.original = "";
			this.parsed = "";
			this.partialSum = false;
			this.result = null;
		}
		return Line;
	}]).
	factory('ParsedContents', ['isNumber', 'Line', function(isNumber, Line) {
		function ParsedContents(contents) {
			this.lines = this.parse(contents);
		}
		ParsedContents.prototype = {
			operators: ["+","-","*","/","(",")"],
			parse: function(contents) {
				var currentChar,
					count = 0,
					lines = [];
				for (var i=0, x=contents.length; i < x; i++) {
					var prevChar = contents.charAt(i-1),
						nextChar = contents.charAt(i+1),
						endOfLine = false;

					currentChar = contents.charAt(i);
					lines[count] = lines[count] || new Line();
					lines[count].original += currentChar;

					if (this.operators.indexOf(currentChar) > -1 || isNumber(currentChar)) {
						lines[count].parsed += currentChar;
					} else if (currentChar === ".") {
						if ( isNumber(prevChar) && isNumber(nextChar) ) {
							lines[count].parsed += currentChar;
						}
					} else if (currentChar === ">") {
						lines[count].partialSum = true;
					} else if (currentChar === "\n") {
						endOfLine = true;
					}
					if (endOfLine || (i+1) == x) {
						if (lines[count].partialSum) {
							var lastSum = 0;
							for (var j=lines.length-2; j >= 0; j--) {
								if (lines[j].partialSum) {
									lastSum = j;
									break;
								}
							}
							var sumSection = lines.slice(lastSum);
							lines[count].result = this.getSum(sumSection);
						} else {
							lines[count].result = this.getResult(lines[count].parsed);
							lines[count].partialSum = false;
						}
						count++;
					}
				}
				return lines;
			},
			getResult: function(expression) {
				try {
					var result = eval(expression);
				} catch(err) {
					console.log(expression+" is not a valid expression.");
				}
				return result || null;
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