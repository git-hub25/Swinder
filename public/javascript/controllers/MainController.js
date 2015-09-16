(function() {
	'use strict';
	angular.module('app')
	.controller('MainController', MainController);

	MainController.$inject = ["CoupleFactory"];

	function MainController(CoupleFactory) {
		var vm = this;
		vm.title = 'Swinder';

		CoupleFactory.getCouples().then(function(res) {
			vm.couples = res;
		});


	}
})();
