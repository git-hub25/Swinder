(function() {
  'use strict';
  angular.module('app')
  .controller('ProfileController', ProfileController);

  ProfileController.$inject = ['CoupleFactory', 'MessageFactory',"MainFactory", '$state', '$stateParams', '$rootScope'];

  function ProfileController(CoupleFactory, MessageFactory, MainFactory, $state, $stateParams, $rootScope) {
    var vm = this;

    //checks if visitor is logged in
    if($rootScope._couple) {
      CoupleFactory.getCoupleLoggedIn($rootScope._couple.id).then(function(res) {

        vm.coupleLoggedIn = res;
      })
    };

    vm.enterConversation = function(coupleToChatWithId) {
     MessageFactory.enterConversation(coupleToChatWithId).then(function (res) {

     $state.go('CreateMessage');
     });
   };

   vm.loadMatches = function() {
     MainFactory.loadMatches($rootScope._couple.id).then(function (res) {
       vm.likedCouples = res;

     })
   };

   vm.loadMatches();

 }
})();
