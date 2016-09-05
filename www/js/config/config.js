(function() {
    angular.module('starter').config(config);
    config.$inject = ['$stateProvider', '$urlRouterProvider', '$ionicConfigProvider'];

    function config($stateProvider, $urlRouterProvider, $ionicConfigProvider) {

        $stateProvider
            .state('validation', {
                url: '/validation',
                templateUrl: "templates/validation.html",
                controller: 'validationController'
            })


        .state('homePage', {
            cache: false,
            url: '/homePage?openid',
            templateUrl: "templates/homePage.html",
            controller: 'homePageController',
        })

        .state('servicePasswordBind', {
            url: '/servicePasswordBind',
            templateUrl: "templates/servicePasswordBind.html",
            controller: 'servicePasswordBindController'
        })

        .state('finishedMission', {
            url: '/finishedMission',
            templateUrl: "templates/finishedMission.html",
            controller: 'finishedMissionController'
        })


        .state('personInfo', {
            url: '/personInfo',
            templateUrl: "templates/personInfo.html",
            controller: 'personInfoController',
        })

        .state('myCurrency', {
            url: '/myCurrency?myCurrency',
            templateUrl: "templates/myCurrency.html",
            controller: 'myCurrencyController'
        })

        .state('missionDetail', {
            url: '/missionDetail?taskid',
            templateUrl: "templates/missionDetail.html",
            controller: 'missionDetailController'
        })

        .state('barcode', {
            url: '/barcode?receivedTaskId&currentId&shareId',
            templateUrl: "templates/barcode.html",
            controller: 'barcodeController'
        })

        .state('article', {
            url: '/article?receivedTaskId&currentId&shareId',
            templateUrl: "templates/article.html",
            controller: 'articleController'
        })

        .state('test', {
            url: '/test',
            templateUrl: "templates/test.html",
            controller: 'testController'
        })

        $urlRouterProvider.otherwise('/homePage');
    }


})();
