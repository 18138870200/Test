/**
 * 
 * @authors JunBo (you@example.org)
 * @date    2016-07-29 10:54:26
 * @version $Id$
 */

(function() {
    angular.module('starter').controller('myCurrencyController', myCurrencyController);
    myCurrencyController.$inject = ['$scope','Service','$stateParams'];

    function myCurrencyController($scope,Service,$stateParams) {
       $scope.balance = $stateParams.myCurrency;
       $scope.$on('$ionicView.beforeEnter', function() {
           Service.setWechatTitle('和微币账户');
        }, false);
    }
})();

