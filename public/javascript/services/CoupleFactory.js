(function() {
	'use strict';
	angular.module('app')
	.factory('CoupleFactory', CoupleFactory);

	CoupleFactory.$inject = ['$http', '$q', '$window', '$rootScope'];

	function CoupleFactory($http, $q, $window, $rootScope) {
		var o = {};


	//------------------------TOKENS HERE-----------------------------------------------



	//------------------------LOGIN, REGISTER, LOGOUT-----------------------------------------------
	o.register = function(couple) {
		var q = $q.defer();
		$http.post('/api/couple/register', couple).success(function(res) {
			q.resolve();
			console.log(res);
		});
		return q.promise;
	};


	return o;
}
})();