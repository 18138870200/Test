(function() {
    angular.module('starter').controller('validationController', validationController);
    validationController.$inject = ['$scope', '$interval','$state','$location'];

    function validationController($scope, $interval,$state,$location) {
        var cm = self;
        //获取验证码计时器
        $scope.paracont = "获取验证码";
        $scope.paraevent = false;
        var second = 60,
            timePromise = undefined;
        $scope.getVerifyCode = function() {
            timePromise = $interval(function() {
                if (second <= 0) {
                    $interval.cancel(timePromise);
                    timePromise = undefined;
                    second = 60;
                    $scope.paracont = "重发验证码";
                    $scope.paraevent = false;
                } else {
                    $scope.paracont = second + "秒后获取";
                    $scope.paraevent = true;
                    second--;
                }
            }, 1000, 100);
        }


         $scope.bindPhoneCode = function(){
                stopIntervalFun();
                 bind();
         }



        //停止倒计时
         var stopIntervalFun = function() {
            $interval.cancel(timePromise);
            timePromise = undefined;
            second = 60;
            $scope.paracont = "获取验证码";
            $scope.paraevent = false; 
        }
  

        $scope.goServicePasswordBind = function(){
              stopIntervalFun();
               $location.path('/servicePasswordBind').replace();
        }

        //调绑定的接口
        var bind=function(){
           $location.path('/homePage').replace();
        }

    }
})();
