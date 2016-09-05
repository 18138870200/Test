/**
 * 
 * @authors JunBo (you@example.org)
 * @date    2016-07-29 10:57:29
 * @version $Id$
 */

(function() {
    angular.module('starter').controller('finishedMissionController', finishedMissionController);
    finishedMissionController.$inject = ['$scope', '$filter', 'Service'];

    function finishedMissionController($scope, $filter, Service) {
        var getTaskPageIndex = 0;
        $scope.scroll = true;
        var doneTaskArr = [];

        $scope.$on('$ionicView.beforeEnter', function() {
            Service.setWechatTitle('我完成的任务');
        }, false);

        //获取任务
        function getTaskPage() {
            Service.post('tasks', 'getTaskPage', {
                pageSize: 20,
                startRow: getTaskPageIndex * 20,
                taskId: 0,
                city: localStorage.personInfoCityCode,
                province: localStorage.personInfoProvinceCode,
                status: 1
            }).then(function(data) {
                if (data.returnCode == 1000) {
                    var dataInfoObj = data.dataInfo;
                    if (dataInfoObj) {
                        var pageDataArr = dataInfoObj.pageData;
                        for (var i = 0; i < pageDataArr.length; i++) {
                            var taskObj = pageDataArr[i];
                            doneTaskArr.push(taskObj);
                        }
                    } else {
                        $scope.scroll = false;
                    }

                    $scope.missionArr = doneTaskArr;
                } else {
                    $scope.scroll = false;
                }
            });
        }

        $scope.showHide = true;
        $scope.titleArr = ['关注公众号任务', '推广公众号文章任务'];
        $scope.loadMore = function() {
            getTaskPage();
            getTaskPageIndex += 1;
            $scope.$broadcast('scroll.infiniteScrollComplete');
        }


        $scope.showDropdown = function() {
            if ($scope.showHide) {
                $scope.isShow = true;
                $scope.isIn = true;

            } else {
                $scope.isShow = false;
                $scope.isIn = false;

            }
            $scope.showHide = !$scope.showHide;
        }

        $scope.filtered = function(str) {
            var currentTaskArr = [];
            for (var i = 0; i < doneTaskArr.length; i++) {
                var taskObj = doneTaskArr[i];
                if (str == "关注公众号任务") {
                    if (taskObj.taskType == 0) {
                        currentTaskArr.push(taskObj);
                    }
                } else if (str == "推广公众号文章任务") {
                    if (taskObj.taskType == 1) {
                        currentTaskArr.push(taskObj);
                    }
                } else {
                    currentTaskArr.push(taskObj);
                }
            }
            $scope.missionArr = currentTaskArr;
        }

    }
})();
