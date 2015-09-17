(function() {
  'use strict';
  angular.module('app')
    .controller('MainController', MainController);

  MainController.$inject = ["CoupleFactory", "$rootScope", 'MessageFactory'];

  function MainController(CoupleFactory, $rootScope, MessageFactory) {
    var vm = this;
    vm.title = 'Swinder';
    vm.matches = [];

    vm.profileRandomizer = function(array) {
      var random = Math.floor((Math.random() * array.length));
      return array[random];
    };

    vm.getProfiles = function() {
      CoupleFactory.getCouples().then(function(res) {
        vm.getCouples = res;
        vm.randomProfile = vm.profileRandomizer(vm.getCouples);
      });
    };






    vm.likeProfile = function(id) {
      CoupleFactory.postMatches(id).then(function (res) {
      vm.getProfiles();
      })
    }
      vm.getProfiles();
  }

})();
