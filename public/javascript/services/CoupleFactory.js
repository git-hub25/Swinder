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
		});
		return q.promise;
	};

	o.login = function(couple) {
		var q = $q.defer();
		couple.username = couple.username.toLowerCase();
		$http.post('/api/couple/login', couple).success(function(res) {
			setToken(res.Token);
			$rootScope._couple = isLoggedIn();
			q.resolve();
		});
		return q.promise;
	};

	//------------------------LOGIN, REGISTER, LOGOUT-----------------------------------------------
	o.getCouples = function() {
		var q = $q.defer();
		$http.get('/api/couple').success(function(res) {
			q.resolve(res);
		});
		return q.promise;
	}


	return o;
}
})();