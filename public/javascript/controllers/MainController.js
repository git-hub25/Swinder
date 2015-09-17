(function() {
	'use strict';
	angular.module('app')
	.controller('MainController', MainController);

	MainController.$inject = ["CoupleFactory", "$rootScope", 'MessageFactory'];

	function MainController(CoupleFactory, $rootScope, MessageFactory) {
		var vm = this;
		vm.title = 'Swinder';

		// var loggedInCouple = $rootScope._couple ;

		// Takes 2 ids recipient and logged in id
		// pass it to conversation router and create a new conversation.
		vm.getConversation = function(loggedInId, recipientId) {
			vm.newConversation = {
				createdBy: loggedInId,
				recipient: recipientId 
			} ;
			MessageFactory.enterConversation(vm.newConversation).then(function(res) {
				console.log(res) ;
			})
		}
		// Testing getConversation
		// vm.getConversation(26, 26) ;	
	}
})();
