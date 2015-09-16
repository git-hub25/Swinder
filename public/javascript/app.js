(function() {
	'use strict';
	angular.module('app', ['ui.router'])
	.config(Config);
	Config.$inject = ['$stateProvider', '$urlRouterProvider'];
	function Config($stateProvider, $urlRouterProvider) {
		$stateProvider.state('Home',{
			url: '/',
			templateUrl: 'views/home.html',
			controller: "HomeController",
			controllerAs: "vm"
		}).state('RegisterCouple',{
			url: '/RegisterCouple',
			templateUrl: 'views/register_couple.html',
			controller: "NavBarController",
			controllerAs: "vm"
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
			url: '/EditProfile',
			templateUrl: 'views/edit_profile.html',
			controller: "ProfileController",
			controllerAs: "vm"
		});

		$urlRouterProvider.otherwise('/');
	}
})();
