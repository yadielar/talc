'use strict';

/* Filters */

angular.module('talcApp.filters', []).
  filter('toFixed', ['isNumber', 'Settings', function(isNumber, Settings) {
    return function(x) {
    	if (Settings.decimalPlaces) {
	    	if (isNumber(x)) {
	    		return parseFloat(x).toFixed(Settings.decimalPlaces);
	    	} else {
	    		return x;
	    	}
    	} else {
    		return x;
    	}
    };
  }]);
