(function() {
	'use strict';
	angular.module('app')
	.controller('MainController', MainController);

	MainController.$inject = ["CoupleFactory"];

	function MainController(CoupleFactory) {
		var vm = this;
		vm.title = 'Swinder';
		vm.getProfiles = function() {
			CoupleFactory.getCouples().then(function(res) {
				vm.getCouples = res;
				vm.randomProfile = vm.profileRandomizer(vm.getCouples);
				console.log(vm.getCouples);
			});
		};

		vm.getProfiles();

		vm.profileRandomizer = function(array) {
			var random = Math.floor((Math.random()*array.length));
			console.log(random)
			return array[random];
		};
	}
})();
