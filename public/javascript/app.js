(function() {
	'use strict';
	angular.module('app', ['ui.router', 'mobile-angular-ui'])
	.config(Config);
	Config.$inject = ['$stateProvider', '$urlRouterProvider'];
	function Config($stateProvider, $urlRouterProvider) {
		$stateProvider.state('Home',{
			url: '/',
			templateUrl: 'views/home.html',
			controller: "MainController",
			controllerAs: "vm"
		}).state('RegisterCouple',{
			url: '/Register',
			templateUrl: 'views/register_couple.html',
		}).state('Profile',{
			url: '/Profile',
			templateUrl: 'views/profile.html',
			controller: "ProfileController",
			controllerAs: "vm"
		}).state('CreateMessage',{
			url: '/CreateMessage',
			templateUrl: 'views/create_message.html',
			controller: "MessageController",
			controllerAs: "vm"
		}).state('EditProfile',{
			url: '/EditProfile/:id',
			templateUrl: 'views/edit_profile.html',
			controller: "ProfileController",
			controllerAs: "vm"
		}).state('LoginCouple',{
			url: '/Login',
			templateUrl: 'views/login_couple.html'
		});

		$urlRouterProvider.otherwise('/');
	}
})();
