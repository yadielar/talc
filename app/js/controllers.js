'use strict';

/* Controllers */

angular.module('talcApp.controllers', [])
	.controller('EditorController', ['$scope', function($scope) {
		this.contents = localStorage.getItem('talcContent') || "";
		this.parsedContents = [];
		this.results = [];
		this.save = function(){
			localStorage.setItem('talcContent', this.contents);
			//console.log("Saved:\n"+this.contents);
		};
		this.clear = function(){
			localStorage.clear();
			window.location = window.location; // refresh
		};
		this.addResults = function(){
			var parsed = this.parsedContents;
			this.results = [];
			for (var i=0, x=parsed.length; i < x; i++) {
				this.results[i] = {};
				this.results[i].val = eval(parsed[i]);
			}
			console.log(this.results);
		};
		this.parse = function(){
			var contents = this.contents,
				currentChar,
				lineCount = 0,
				whiteList = ["+","-","*","/","(",")"],
				clean = [];
			function isNumber(n) {
				return !isNaN(parseFloat(n)) && isFinite(n);
			};
			for (var i=0, x=contents.length; i < x; i++) {
				var prevChar = contents.charAt(i-1),
					nextChar = contents.charAt(i+1);
				currentChar = contents.charAt(i);
				if (whiteList.indexOf(currentChar) > -1 || isNumber(currentChar)) {
					clean[lineCount] = clean[lineCount] || "";
					clean[lineCount] += currentChar;
				} else if (currentChar === ".") {
					if ( isNumber(prevChar) && isNumber(nextChar) ) {
						clean[lineCount] += currentChar;
					}
				} else if (currentChar === "\n") {
					lineCount++;
				}
			}
			this.parsedContents = clean;
			this.addResults();
			this.save();
			console.log(this.parsedContents);
		};
	}])
	.controller('ResultsController', ['$scope', function($scope) {
		this.results = [];
	}]);
