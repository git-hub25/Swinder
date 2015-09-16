(function() {
  'use strict';
  angular.module('app')
  .controller('ProfileController', ProfileController);

  ProfileController.$inject = ['CoupleFactory', 'MessageFactory', '$state', '$stateParams', '$rootScope'];

  function ProfileController(CoupleFactory, MessageFactory, $state, $stateParams, $rootScope) {
    var vm = this;

    CoupleFactory.getCoupleLoggedIn($rootScope._couple.id).then(function(res) {
      vm.coupleLoggedIn = res;
    });

    vm.enterConversation = function() {
     MessageFactory.enterConversation();
     $state.go('CreateMessage');
   }
 }
})();
