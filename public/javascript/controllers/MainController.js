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


		// var loggedInCouple = $rootScope._couple ;

		}
		// Testing getConversation
		// vm.getConversation(26, 26) ;

		vm.getProfiles();

		vm.profileRandomizer = function(array) {
			var random = Math.floor((Math.random()*array.length));
			console.log(random)
			return array[random];
		};

		vm.likeProfile = function(profile) {
			
			vm.matches.push(profile);
			vm.getProfiles();
		}

	}
})();
