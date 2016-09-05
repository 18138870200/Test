/**
 * 
 * @authors JunBO (you@example.org)
 * @date    2016-07-29 10:52:42
 * @version $Id$
 */

(function() {
    angular.module('starter').controller('personInfoController', personInfoController);
    personInfoController.$inject = ['$scope', '$ionicActionSheet', '$timeout', '$stateParams', 'Service', 'backendUrl', 'backend'];

        function personInfoController($scope, $ionicActionSheet, $timeout, $stateParams, Service, backendUrl, backend) {
    
        $scope.avatar = localStorage.personInfoAvatar;
        $scope.department = localStorage.personInfoDepartment;
        $scope.id = localStorage.personInfoId;
        $scope.name = localStorage.personInfoName;
        $scope.phone = localStorage.personInfoPhone;    
        $scope.sex = localStorage.personInfo_sex == 1 ? '男' : '女';
        $scope.updateCount = localStorage.personInfoUpdateCount;
        $scope.wechatNickname = localStorage.personInfoNickName;
        $scope.orgName = localStorage.personInfoOrgName;
        $scope.roleName = localStorage.personInfoRoleName;
        $scope.haveWxQrCode = localStorage.personInfoWxQrCode ? true : false;

        $scope.$on('$ionicView.beforeEnter', function() {
           Service.setWechatTitle('个人资料');
        }, false);

        $scope.showSexSelectActionSheet = function() {
            var hideSheet = $ionicActionSheet.show({
                buttons: [
                    { text: '女' },
                    { text: '男' }
                ],
                cancelText: '取消',
                cancel: function() {

                },
                buttonClicked: function(index) {
                    Service.post('security', 'modifyUserInfo', {
                        id: localStorage.personInfoId,
                        sex: index,
                        updatedBy: localStorage.personInfoName
                    }).then(function(data) {
                        if (data.returnCode == 1000) {
                            localStorage.personInfoSex = index;
                            $scope.sex = index == 1 ? '男' : '女';
                        }
                    });
                    return true;
                }
            });
            $timeout(function() {
                hideSheet();
            }, 2000);
        };

        $scope.data = {
            file: null,
            defaultImage: '../img/图片.jpg'
        };

        $scope.$watch('data.file', function(newValue, oldValue, scope) {
            if ($scope.data.file) {
                Service.upload($scope.data.file).then(function(resp) {
                    modifyPersonHeadImg(resp.data.dataInfo.url);
                });
            }
        });

        //修改用户头像
        function modifyPersonHeadImg(newImageUrl) {
            Service.post('security', 'modifyUserInfo', {
                id: localStorage.personInfoId,
                avatar: newImageUrl,
                updatedBy: localStorage.personInfoName
            }).then(function(data) {
                if (data.returnCode == 1000) {
                    $scope.avatar = newImageUrl;
                }
            });
        }
    }
})();
