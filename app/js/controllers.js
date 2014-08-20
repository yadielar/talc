'use strict';

/* Controllers */

angular.module('talcApp.controllers', [])
	.controller('EditorController', ['$scope', function($scope) {
		$scope.editorContents = localStorage.getItem('talcContent') || "";
		$scope.parsedContents = [];
		$scope.results = [];
		this.save = function(){
			localStorage.setItem('talcContent', $scope.editorContents);
			//console.log("Saved:\n"+$scope.editorContents);
		};
		this.clear = function(){
			localStorage.clear();
			$scope.editorContents = "";
			$scope.results = [];
		};
		this.addResults = function(){
			var parsed = $scope.parsedContents;
			$scope.results = [];
			for (var i=0, x=parsed.length; i < x; i++) {
				$scope.results[i] = {};
				$scope.results[i].original = parsed[i].original;
				try {
					$scope.results[i].val = eval(parsed[i].parsed);
				} catch(err) {
					console.log(parsed[i].parsed+" is not a valid expression.");
				}
				$scope.results[i].val = $scope.results[i].val || "";
			}
			console.log($scope.results);
		};
		this.parse = function(){
			var contents = $scope.editorContents,
				currentChar,
				lineCount = 0,
				operators = ["+","-","*","/","(",")"],
				clean = [];
			function isNumber(n) {
				return !isNaN(parseFloat(n)) && isFinite(n);
			};
			for (var i=0, x=contents.length; i < x; i++) {
				var prevChar = contents.charAt(i-1),
					nextChar = contents.charAt(i+1);
				currentChar = contents.charAt(i);
				clean[lineCount] = clean[lineCount] || {};
				clean[lineCount].original = clean[lineCount].original || "";
				clean[lineCount].original += currentChar;
				clean[lineCount].parsed = clean[lineCount].parsed || "";
				if (operators.indexOf(currentChar) > -1 || isNumber(currentChar)) {
					clean[lineCount].parsed += currentChar;
				} else if (currentChar === ".") {
					if ( isNumber(prevChar) && isNumber(nextChar) ) {
						clean[lineCount].parsed += currentChar;
					}
				} else if (currentChar === "\n") {
					/*if (clean[lineCount] === undefined) {
						clean[lineCount] = 0;
					}*/
					lineCount++;
				}
			}
			$scope.parsedContents = clean;
			console.log($scope.parsedContents);
			this.addResults();
			this.save();
		};
	}])
	.controller('SettingsController', ['$scope', function($scope) {

	}]);
