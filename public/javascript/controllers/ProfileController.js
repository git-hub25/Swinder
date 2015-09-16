(function() {
  'use strict';
  angular.module('app')
    .controller('ProfileController', ProfileController);

  ProfileController.$inject = ['CoupleFactory', '$state', '$stateParams', '$rootScope'];

  function ProfileController(CoupleFactory, $state, $stateParams, $rootScope) {
    var vm = this;
		//Will throw a huge error if profile button or state is viwed without being logged in!!!!!
    CoupleFactory.getCoupleLoggedIn($rootScope._couple.id).then(function(res) {
      vm.coupleLoggedIn = res;
    });
    //
    // if(!$stateParams.id) {
    // 	CoupleFactory.getCouples().then(function(res) {
    // 		vm.couples = res;
    // 	});
    // }
  }
})();
