(function() {
  'use strict';
  angular.module('app')
    .controller('MessageController', MessageController);

  MessageController.$inject = ['$state', 'MessageFactory', '$rootScope'];

  function MessageController($state, MessageFactory, $rootScope) {
    var vm = this;
    vm.message = {};

    vm.loadConversations = function() {
      MessageFactory.getConversation().then(function(res) {
        //Res is the entire convo between users. we are only interested in the array on the message property
        vm.recipientCouple = res.recipient;
        vm.loggedInCouple = res.createdBy;
        console.log(vm.recipientCouple, " space ", vm.recipientCouple);
        vm.conversationMessages = res.message;
      });
    }



    //not working what the fuck
    vm.sendMessage = function() {
      vm.message.createdDate = new Date();
      vm.message.createdBy = $rootScope._couple.id;
      vm.message.conversationId = $rootScope._conversation._id;
      MessageFactory.sendMessage(vm.message).then(function(res) {
        vm.loadConversations();
        delete vm.message;
      });
    };



    vm.deleteMessage = function(message) {
      vm.messages.splice(vm.messages.indexOf(message), 1);
      MessageFactory.deleteMessage(message);
    };

    //figure out how to take every message, or the conversation as a whole and delete it
    vm.deleteConversation = function(conversation) {

    };


    vm.loadConversations();
  }
})();
