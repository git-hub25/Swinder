(function() {
	'use strict';
	angular.module('app')
	.controller('NavBarController', NavBarController);

	NavBarController.$inject = ["$state", "CoupleFactory", "MainFactory", "$rootScope"];

	function NavBarController($state, CoupleFactory, MainFactory, $rootScope) {
		var vm = this;
		vm.couple = {};
		vm.status = $rootScope._couple;

		vm.register = function() {
			CoupleFactory.register(vm.couple).then(function(){
				vm.couple = {};
				vm.couple.body = "";
				$state.go("Profile");
			});
		};

		vm.login = function() {
			CoupleFactory.login(vm.couple).then(function(){
				vm.status = $rootScope._couple;
				$state.go("Profile");
			})
		}

	}
})();