(function() {
  'use strict';
  angular.module('app')
  .controller('ProfileController', ProfileController);

  ProfileController.$inject = ['CoupleFactory', 'MessageFactory',"MainFactory", '$state', '$stateParams', '$rootScope'];

  function ProfileController(CoupleFactory, MessageFactory, MainFactory, $state, $stateParams, $rootScope) {
    var vm = this;

    if(!$stateParams.id) {
      $state.go('Profile');
    } else {
      CoupleFactory.getCoupleLoggedIn($stateParams.id).then(function(res) {
        vm.couple = res;
      }) ;
    }

    //checks if visitor is logged in
    if($rootScope._couple) {
      CoupleFactory.getCoupleLoggedIn($rootScope._couple.id).then(function(res) {

        vm.coupleLoggedIn = res;
        // console.log(vm.coupleLoggedIn) ;
      })
    };

    //================For Editing===============================================
    vm.editProfile = function() {
      // console.log("editProfile in ProfileController")
      CoupleFactory.editProfile(vm.couple);
      $state.go('Profile');
    }

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
