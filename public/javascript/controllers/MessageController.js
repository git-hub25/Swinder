(function() {
  'use strict';
  angular.module('app')
    .controller('MessageController', MessageController);

  MessageController.$inject = ['$state', 'MessageFactory', '$rootScope'];

  function MessageController($state, MessageFactory, $rootScope) {
    var vm = this;
    vm.loggedInCouple = $rootScope._couple;
    vm.message = {};

    vm.getMessages = function() {
      MessageFactory.getMessages().then(function(res) {
        vm.messages = res;
        // console.log(res);
      });
    };
    vm.createConversation = function(loggedInId, recipientId) {
      vm.newConversation = {
        createdBy: loggedInId,
        recipient: recipientId
      }
      MessageFactory.enterConversation(vm.newConversation).then(function(res) {
        console.log(res);
      });
    }
    //Needs to be fixed!!
    vm.getConversations = function() {
      //Get request for conversations
      MessageFactory.getConversations($rootScope._couple.id).then(function(res) {
        console.log(res);
      })

    }
    vm.getConversations();

    vm.sendMessage = function(id) {
      vm.message.createdDate = new Date();
      vm.message.createdBy = vm.loggedInCouple.id;
      MessageFactory.sendMessage(vm.message);
      delete vm.message;

      vm.getMessages();

    };

    vm.deleteMessage = function(message) {
      vm.messages.splice(vm.messages.indexOf(message), 1);
      MessageFactory.deleteMessage(message);
    };

    //figure out how to take every message, or the conversation as a whole and delete it
    vm.deleteConversation = function(conversation) {

    }

    //vm.getMessages();
  }
})();
