(function() {
	'use strict';
	angular.module('app')
	.controller('MessageController', MessageController);

	MessageController.$inject = ['$state', 'MessageFactory', '$rootScope'];

	function MessageController($state, MessageFactory, $rootScope) {
		var vm = this;
		vm.status = $rootScope._user;
		vm.message = {};

		vm.getMessages = function() {	
			MessageFactory.getMessages().then(function(res) {
				vm.messages = res;
				console.log(res);
			});
		};
		
		vm.getMessages();


		vm.sendMessage = function(message) {
			vm.message.createdDate = new Date(vm.message.createdDate + '-1-1');
			MessageFactory.sendMessage(vm.message);
			vm.getMessages();

		};

		vm.deleteMessage = function(message) {
			vm.messages.splice(vm.messages.indexOf(message), 1);
			MessageFactory.deleteMessage(message)
		};

		//figure out how to take every message, or the conversation as a whole and delete it
		vm.deleteConversation = function(conversation) {

		}
	}
})();