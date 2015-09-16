(function() {
	'use strict';
	angular.module('app')
	.factory('MainFactory', MainFactory);

	MainFactory.$inject = ['$http', '$q'];

	function MainFactory($http, $q) {
		var o = {};
		

		function getAuth() {
			var auth = {
				headers: {
					Authorization: "Bearer " + localStorage.getItem("token")
				}
			}
			return auth ;
		}

		
		return o;
	}
})();