/**
 * 
 * @authors Junbo (you@example.org)
 * @date    2016-07-29 10:51:53
 * @version $Id$
 */

(function() {
    angular.module('starter').controller('servicePasswordBindController', servicePasswordBindController);
    servicePasswordBindController.$inject = ['$scope','$state','$ionicLoading','$location'];

    function servicePasswordBindController($scope,$state,$ionicLoading,$location) {
        
       //调绑定的接口
       $scope.bind=function(){
            show();
             $location.path('/homePage').replace();
        };

        $scope.goValidationPage = function(){
             $location.path('/validation').replace();
        }

        var show = function() {
            $ionicLoading.show({
                template: '<div class="spinnerBack"><ion-spinner class="spinner" icon="bubbles"></ion-spinner><span>正在绑定</span></div>',
                 noBackdrop:false,
                hideOnStateChange:false
            }).then(function() {
                
            });
        };

        $scope.hide = function() {
            $ionicLoading.hide().then(function() {
                console.log("绑定成功/绑定失败");
            });
        };
    }
})();