(function() {
  'use strict';
  angular.module('app')
  .controller('MessageController', MessageController);

  MessageController.$inject = ['$state', 'MessageFactory', '$rootScope'];

  function MessageController($state, MessageFactory, $rootScope) {
    var vm = this;
    vm.message = {};

    vm.getMessages = function() {
      MessageFactory.getMessages().then(function(res) {
        vm.messages = res;
        // console.log(res);
      });
    };
    
    vm.loadConversations = function() {
      MessageFactory.getConversation().then(function(res) {
        console.log(res);
      });

      vm.loadConversations();


    //not working what the fuck
    vm.sendMessage = function() {
      vm.message.createdDate = new Date();
      vm.message.createdBy = vm.loggedInCouple.id;
      vm.message.conversationId = $rootScope._conversation._id;
      MessageFactory.sendMessage(vm.message).then(function(res) {
        delete vm.message;
        vm.getMessages();
      });
      console.log('vm.sendMessage!')
    };

    vm.sendMessage();

    vm.deleteMessage = function(message) {
      vm.messages.splice(vm.messages.indexOf(message), 1);
      MessageFactory.deleteMessage(message);
    };

    //figure out how to take every message, or the conversation as a whole and delete it
    vm.deleteConversation = function(conversation) {

    };

    //vm.getMessages();
  }
}
})();
