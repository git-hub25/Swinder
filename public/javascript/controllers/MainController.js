(function() {
	'use strict';
	angular.module('app')
	.controller('MainController', MainController);

	MainController.$inject = ["CoupleFactory", "$rootScope", 'MessageFactory'];

	function MainController(CoupleFactory, $rootScope, MessageFactory) {
		var vm = this;
		vm.title = 'Swinder';
		vm.matches = [];
		vm.getProfiles = function() {
			CoupleFactory.getCouples().then(function(res) {
				vm.getCouples = res;
				vm.randomProfile = vm.profileRandomizer(vm.getCouples);
				console.log(vm.getCouples);
			});
		};

<<<<<<< HEAD
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
=======
		vm.getProfiles();

		vm.profileRandomizer = function(array) {
			var random = Math.floor((Math.random()*array.length));
			console.log(random)
			return array[random];
		};

		vm.likeProfile = function(profile) {
			vm.matches.push(profile);
			vm.getProfiles();

			console.log(vm.matches)
		}
>>>>>>> 6db1fc67e52885f7632133695445b79805e79f41
	}
})();
