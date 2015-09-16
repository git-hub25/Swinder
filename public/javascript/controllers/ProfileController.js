(function() {
	'use strict';
	angular.module('app')
	.controller('ProfileController', ProfileController);

	ProfileController.$inject = ['CoupleFactory', 'MessageFactory', '$state', '$stateParams'];

	function ProfileController(CoupleFactory, MessageFactory, $state, $stateParams) {
		var vm = this;

		if(!$stateParams.id) {
			CoupleFactory.getCouples().then(function(res) {
				vm.couples = res;
			});
		}

		vm.enterConversation = function() {
			MessageFactory.enterConversation();
			$state.go('CreateMessage');
		}
	}
})();