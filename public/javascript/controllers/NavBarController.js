(function() {
  'use strict';
  angular.module('app')
    .controller('NavBarController', NavBarController);

  NavBarController.$inject = ["$state", "CoupleFactory", "MainFactory", "$rootScope"];

  //--------------FOR GETTING ID TO EDIT. IF NO ID IS SENT THEN STAY IN EDIT HTML------------



  function NavBarController($state, CoupleFactory, MainFactory, $rootScope) {
    var vm = this;
    // vm.couple = {};


    vm.loggedInCouple = $rootScope._couple;
    //Logs you in on register
    vm.register = function() {
      CoupleFactory.register(vm.couple).then(function() {
        delete vm.couple;
        $state.go("LoginCouple");
      });
    };


    //Moved to Message Controller
    // vm.getConversation = function(loggedInId, recipientId) {
    //   vm.newConversation = {
    //     createdBy: loggedInId,
    //     recipient: recipientId
    //   } ;
    //   MessageFactory.enterConversation(vm.newConversation).then(function(res) {
    //     console.log(res) ;
    //   });

    vm.login = function() {
      CoupleFactory.login(vm.couple).then(function() {
        vm.loggedInCouple = $rootScope._couple;
        $state.go("Home");
      });
    };

    vm.logout = function() {
      CoupleFactory.logout();
      vm.loggedInCouple = $rootScope._couple;
      $state.go("Home");
    };

  }
})();
