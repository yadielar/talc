'use strict';

/* Controllers */

angular.module('talcApp.controllers', [])
	.controller('EditorController', ['$scope', 'ParsedContents', 'guide', function($scope, ParsedContents, guide) {
		$scope.editorContents = localStorage.getItem('talcContent') || guide;
		$scope.parsedContents = {};
		this.save = function(){
			localStorage.setItem('talcContent', $scope.editorContents);
			//console.log("Saved:\n"+$scope.editorContents);
		};
		this.clear = function(){
			localStorage.clear();
			$scope.editorContents = "";
			$scope.parsedContents = {};
		};
		this.parse = function(){
			$scope.parsedContents = new ParsedContents($scope.editorContents);
			console.log($scope.parsedContents);
			this.save();
		};

	}])
	.controller('SettingsController', ['$scope', function($scope) {

	}]);
