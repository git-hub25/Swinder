(function() {
	'use strict';
	angular.module('app')
	.controller('MainController', MainController);

	MainController.$inject = ['CoupleFactory'];

	function MainController(CoupleFactory) {
		var vm = this;
		vm.getProfiles = function() {
			CoupleFactory.getCouples().then(function(res) {
				vm.getCouples = res;
				console.log(vm.getCouples);
			});
		};

		vm.getProfiles();

		vm.title = 'Swinder';



	}
})();
