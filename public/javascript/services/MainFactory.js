(function() {
	'use strict';
	angular.module('app')
	.factory('MainFactory', MainFactory);

	MainFactory.$inject = ['$http', '$q'];

	function MainFactory($http, $q) {
		var o = {};
		
		return o;
	}
})();