(function() {
	'use strict';
	angular.module('app')
	.factory('CoupleFactory', CoupleFactory);

	CoupleFactory.$inject = ['$http', '$q', '$window', '$rootScope'];

	function CoupleFactory($http, $q, $window, $rootScope) {
		var o = {};


	//------------------------TOKENS HERE-----------------------------------------------

	function setToken(token) {
		localStorage.setItem("token", token) ;
	}

	function removeToken() {
		localStorage.removeItem("token") ;
	}

	function getToken() {
		return localStorage.token ;
	}

	function isLoggedIn() {
		var token = getToken();
		if(token) {
			var payload = JSON.parse(urlBase64Decoder(token.split(".")[1]));
			if(payload.exp > Date.now() / 1000) {
				return payload;
			}
		} else {
			return false;
		}
	}

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
			setToken(res.token);
			$rootScope._couple = isLoggedIn();
			q.resolve();
		});
		return q.promise;
	};

	o.logout = function() {
		removeToken() ;
		$rootScope._couple = isLoggedIn() ;
	}

	function urlBase64Decoder(str) {
		var output = str.replace(/-/g, '+').replace(/_/g, '/');
		switch(output.length % 4) {
			case 0:{break; }
			case 2: {output += '=='; break;}
			case 3: {output += '='; break;}
			default:
			throw 'Illegal base64url string'
		}
		return decodeURIComponent(escape($window.atob(output)));
	}




	//------------------------LOGIN, REGISTER, LOGOUT, EDIT PROFILE-----------------------------------------------
	o.getCoupleLoggedIn = function (id) {
		var q = $q.defer();
		$http.get('/api/couple/'+ id).success(function (res) {
			q.resolve(res);
		})
		return q.promise;
	}


	o.editProfile = function (edittedProfile) {
		console.log(edittedProfile);

		var q = $q.defer();
		$http.put('/api/couple/' + edittedProfile._id, edittedProfile).success(function(res){
			q.resolve(res);
			console.log(res);

		});
		return q.promise;
	}

	$rootScope._couple = isLoggedIn() ;


	return o;
}
})();
