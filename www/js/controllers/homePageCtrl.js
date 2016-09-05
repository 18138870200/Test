/**
 * 
 * @authors JunBo (you@example.org)
 * @date    2016-07-29 10:56:40
 * @version $Id$
 */

(function() {
    angular.module('starter').controller('homePageController', homePageController);
    homePageController.$inject = ['$scope', '$state', '$location', 'Service', '$stateParams'];

    function homePageController($scope, $state, $location, Service, $stateParams) {
        var openid = $stateParams.openid;
        localStorage.openid = openid;

        var getTaskPageIndex = 0;
        //已完成任务
        var doneTaskArr = [];
        //待领取任务
        var waitBeGetArr = [];
        //查看我完成的任务展示与否
        $scope.showIonItem4 = false;
        //我的和微币
        $scope.balance = '';
        //用户头像
        $scope.avatar = '';
        //用户姓名
        $scope.userName = '';
        //用户所属公司
        $scope.position = '';

        $scope.$on('$ionicView.beforeEnter', function() {
            Service.setWechatTitle('粉丝俱乐部');
        }, false);


        $scope.$watch('$viewContentLoaded', function(event) {
            getUserInfo();

        });

        //获取用户信息
        function getUserInfo() {
            Service.post('security', 'getUserInfo', {
                id: 0,
                openId: localStorage.openid,
                sex: 0
            }).then(function(data) {
                if (data.returnCode == 1000) {
                    $scope.avatar = data.dataInfo.avatar;
                    $scope.userName = data.dataInfo.name;
                    $scope.position = data.dataInfo.position;
                    savePersonInfo(data.dataInfo);
                    getFindBalance(data.dataInfo);
                    $scope.scroll = true;
                }
            });
        }

        //获取和微币账户余额
        function getFindBalance(dataInfo) {
            Service.post('account', 'findBalance', {
                status: 1,
                type: 0,
                userid: dataInfo.id
            }).then(function(data) {
                if (data.returnCode == 1000) {
                    if (data.dataInfo) {
                        $scope.balance = data.dataInfo.balance;
                    }
                }
            });
        }

        //获取任务
        function getTaskPage() {
            Service.post('tasks', 'getTaskPage', {
                pageSize: 20,
                startRow: getTaskPageIndex * 20,
                taskId: 0,
                city: localStorage.personInfoCityCode,
                province: localStorage.personInfoProvinceCode,
                status: 'ALL'
            }).then(function(data) {
                if (data.returnCode == 1000) {
                    var dataInfoObj = data.dataInfo;
                    if (dataInfoObj) {
                        var pageDataArr = dataInfoObj.pageData;
                        for (var i = 0; i < pageDataArr.length; i++) {
                            taskObj = pageDataArr[i];
                            if (taskObj.taskActiveStatus == 1) {
                                doneTaskArr.push(taskObj);
                            } else {
                                waitBeGetArr.push(taskObj);
                            }
                        }
                        $scope.taskArr = waitBeGetArr;
                    } else {
                        $scope.scroll = false;
                    }


                    if (doneTaskArr.length > 0) {
                        $scope.newestTask = doneTaskArr[0];
                        $scope.showIonItem4 = true;
                    }
                } else {
                    $scope.scroll = false;
                }

            });
        }

        //保存用户相关信息
        var savePersonInfo = function(dataInfo) {
            localStorage.personInfoAvatar = dataInfo.avatar;
            localStorage.personInfoDepartment = dataInfo.department;
            localStorage.personInfoId = dataInfo.id;
            localStorage.personInfoName = dataInfo.name;
            localStorage.personInfoPhone = dataInfo.phone;
            localStorage.personInfoSex = dataInfo.sex;
            localStorage.personInfoUpdateCount = dataInfo.updateCount;
            localStorage.personInfoNickName = dataInfo.wechatNickname;
            localStorage.personInfoOrgName = dataInfo.orgName;
            localStorage.personInfoRoleName = dataInfo.roleName;
            localStorage.personInfoCityCode = dataInfo.cityCode;
            localStorage.personInfoProvinceCode = dataInfo.provinceCode;
            localStorage.personInfoWxQrCode = dataInfo.wxQrCode;
        }

        //进入个人信息页
        $scope.goPersonInfoPage = function() {
            $state.go('personInfo');
            // $state.go('test');
        }

        //进入我的和微币页
        $scope.goMyCurrencyPage = function() {
            $state.go('myCurrency', { myCurrency: $scope.balance});
        }


        //上拉加载更多
        $scope.loadMore = function() {
            getTaskPage();
            getTaskPageIndex += 1;
            $scope.$broadcast('scroll.infiniteScrollComplete');
        }

    }

})();
