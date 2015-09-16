(function() {
	'use strict';
	angular.module('app')
	.controller('ProfileController', ProfileController);

	ProfileController.$inject = ['CoupleFactory', '$state', '$stateParams'];

	function ProfileController(CoupleFactory, $state, $stateParams) {
		var vm = this;

		if(!$stateParams.id) {
			CoupleFactory.getCouples().then(function(res) {
				vm.couples = res;
			});
		}
	}
})();