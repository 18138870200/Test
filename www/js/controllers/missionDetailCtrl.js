/**
 * 
 * @authors JunBo (you@example.org)
 * @date    2016-07-29 10:55:46
 * @version $Id$
 */

(function() {
    angular.module('starter').controller('missionDetailController', missionDetailController);
    missionDetailController.$inject = ['$scope', '$stateParams', 'Service', '$state'];

    function missionDetailController($scope, $stateParams, Service, $state) {
        var taskid = $stateParams.taskid;
        var taskType;
        var timer;

        $scope.$on('$ionicView.beforeEnter', function() {
           Service.setWechatTitle('任务详情');
        }, false);

        //模板加载完成之后
        $scope.$watch('$viewContentLoaded', function(event) {
            getTaskDetail();
        });
       

        //获取任务详情
        function getTaskDetail() {
            Service.post('tasks', 'getTaskDetail', {
                pageSize: 0,
                startRow: 0,
                taskId: taskid,
            }).then(function(data) {
                if (data.returnCode==1000) {
                    dealWithTheTaskDetailData(data);
                }
            });
        }


        //获取到任务详情后进行数据处理
        function dealWithTheTaskDetailData(data) {
            $scope.balance = '&' + data.dataInfo.goodsPrice;
            $scope.missionName = data.dataInfo.name;
            taskType = data.dataInfo.taskType;
            if (taskType == 0) {
                $scope.myVar = '../img/chat.png';
                $scope.servicePage = true;
                $scope.articlePage = false;
            } else {
                $scope.myVar = '../img/service.png';
                $scope.servicePage = false;
                $scope.articlePage = true;
            }

            var missionDetailArr = [];
            var name = '';
            var contentText = '';
            for (var i = 0; i < 5; i++) {
                switch (i) {
                    case 0:
                        name = '发布者:';
                        contentText = data.dataInfo.name;
                        break;
                    case 1:
                        name = '任务时间:';
                        contentText = formateDate(data.dataInfo.startTime) + ' 至 ' + formateDate(data.dataInfo.endTime);
                        break;
                    case 2:
                        name = '奖品数量:';
                        contentText = data.dataInfo.stock;
                        break;
                    case 3:
                        name = '适用人群:';
                        contentText = data.dataInfo.recipient;
                        break;
                    case 4:
                        name = '任务限次:';
                        contentText = data.dataInfo.timeslimits;
                        break;
                }
                var missionDetailObj = { "name": name, "contentText": contentText };
                missionDetailArr.push(missionDetailObj);
            }
            $scope.detailArr = missionDetailArr;

            var promotingStrategyStr = data.dataInfo.goodsReponseData.promotingStrategy;
            if (promotingStrategyStr) {
                $scope.taskStrategyArr = promotingStrategyStr.split('</br>');
            }
            $scope.articleTitle = data.dataInfo.goodsReponseData.title;
            $scope.articleSummary = data.dataInfo.goodsReponseData.remark;
            $scope.articleImg = data.dataInfo.goodsReponseData.promotingImage;
        }

        $scope.goNext = function() {
            receiveTask();
        }

        // 跳转之前先领取任务
        function receiveTask() {
            Service.post('tasks/wxTask', 'receiveTask', {
                taskId: taskid,
                wxChatAccount: localStorage.openid,
                taskType: taskType,
            }).then(function(data) {
                if (data.returnCode == 1000) {
                    var receivedTaskId = data.dataInfo.id;
                    if (taskType == 0) {
                        $state.go('barcode', { receivedTaskId: receivedTaskId, currentId: localStorage.openid });
                    } else {
                        $state.go('article', { receivedTaskId: receivedTaskId, currentId: localStorage.openid });
                    }
                }
            });
        }

        function formateDate(input) {
            var date = new Date(input);
            Y = date.getFullYear() + '-';
            M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
            D = date.getDate() < 10 ? '0' + date.getDate() : date.getDate();
            return Y + M + D;
        }
    }
})();
