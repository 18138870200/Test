(function() {
    angular.module('starter').controller('articleController', articleController);
    articleController.$inject = ['$scope', '$stateParams', 'Service', '$location', '$timeout'];

    function articleController($scope, $stateParams, Service, $location, $timeout) {
        var id = $stateParams.receivedTaskId;
        var currentId = $stateParams.currentId;
        var shareId = $stateParams.shareId;
        var recordId = $stateParams.recordId;
        var timer;
        var mpSignDataInfo = {};
        var wxArtDataInfo = {};
        if (id) {
            getWxArt();
        }

        $scope.$on('$ionicView.beforeEnter', function() {
            Service.setWechatTitle('物料详情');
        }, false);

        // $scope.$on('$ionicView.afterEnter', function() {
        //     if (!recordId || currentid == shareId) {
        //         return;
        //     }
        //     //当timeout被定义时，它返回一个promise对象
        //     timer = $timeout(function() {}, 3000);
        //     //将resolve/reject处理函数绑定到timer promise上以确保我们的cancel方法能正常运行
        //     timer.then(
        //         function() {
        //             recordViewArt(1);
        //         }
        //     );

        // }, false);


        // $scope.$on('$destroy', function() {
        //     $timeout.cancel(timer);
        //     if (!recordId || currentid == shareId) {
        //         return;
        //     }
        //     recordViewArt(2);
        // })


        //文章阅读3秒之后发送给后台 或  阅读结束后发送给后台
        //type:1 有效阅读   2 结束时间
        // function recordViewArt(type) {
        //     Service.post('tasks', 'recordViewArt', {
        //         recordId: recordId,
        //         type: type,
        //     }).then(function(data) {
        //         if (data.returnCode == 1000) {

        //         }
        //     });
        // }


        //获取文章详情
        function getWxArt() {
            Service.post('tasks/wxShare', 'getWxArt', {
                id: id
            }).then(function(data) {
                if (data.returnCode == 1000) {
                    var anode = document.getElementById("extraLink");
                    anode.setAttribute("src", data.dataInfo.artUrl);
                    getArtSign();
                    wxArtDataInfo = data.dataInfo;
                }
            });
        }

        //获取文章签名
        function getArtSign() {
            var absurl = $location.absUrl();
            var url1 = absurl.substring(0,absurl.indexOf('#'));
            var urlEncoded = urlencode(url1);
            var httpUrl = 'http://wxtest2.vpclub.cn/cmosGetSgin.aspx?receivedId=' + id + '&currentId=' + currentId + '&url=' + urlEncoded;
            console.log(httpUrl);
            Service.postDirectly(httpUrl)
                .then(function(data) {
                    console.log(data);
                    WXConfigGetter2(data);
                    mpSignDataInfo = data.dataInfo;
                });
            //备份的url
            var urld = 'http://wxtest2.vpclub.cn/cmosGetSgin.aspx?receivedId=26&currentid=ovCZJuH75w8S6K0QrnHDaVtqjIcg&url=http%3A%2F%2Fcmostest.vpclub.cn%2F%23%2Farticle%3FreceivedTaskId%3D34%26currentid%3DovCZJuH75w8S6K0QrnHDaVtqjIcg';
        }



        //获取文章签名
        // function getArtSign() {
        //     var absurl = $location.absUrl();
        //     var paramDic = {};
        //     if (shareId) {
        //         paramDic = { receiveId: id, currentId: currentId, url: absurl, shareId: shareId };
        //     } else {
        //         paramDic = { receiveId: id, currentId: currentId, url: absurl, shareId: localStorage.openid };
        //     }

        //     Service.post('tasks/wxShare', 'getArtSign', paramDic).then(function(data) {
        //         if (data.returnCode == 1000) {
        //             WXConfigGetter2(data);
        //             mpSignDataInfo = data.dataInfo;
        //         }
        //     });
        // }



        function urlencode(str) {
            str = (str + '').toString();
            return encodeURIComponent(str).replace(/!/g, '%21').replace(/'/g, '%27').replace(/\(/g, '%28').
            replace(/\)/g, '%29').replace(/\*/g, '%2A').replace(/%20/g, '+');
        }


        //分享之后发送通知
        function shareNotify() {
            var paramDic = { taskType: "1", shareWechatOpenId: currentId, id: id, shareUrl: mpSignDataInfo.linkUrl };
            Service.post('tasks/wxShare', 'shareNotify', paramDic).then(function(data) {
                if (data.returnCode == 1000) {
                }
            });
        }


        //通过config接口注入权限验证配置
        function WXConfigGetter2(data) {
            wx.config({
                debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
                appId: data.dataInfo.appId, // 必填，公众号的唯一标识
                timestamp: data.dataInfo.timestamp, // 必填，生成签名的时间戳
                nonceStr: data.dataInfo.nonceStr, // 必填，生成签名的随机串
                signature: data.dataInfo.signature, // 必填，签名，见附录1
                jsApiList: ["onMenuShareTimeline", "onMenuShareAppMessage", "onMenuShareQQ", "onMenuShareWeibo"] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
            });
        }

        //通过ready接口处理成功验证,config信息验证后会执行ready方法，所有接口调用都必须在config接口获得结果之后，config是一个客户端的异步操作，所以如果需要在页面加载时就调用相关接口，
        //则须把相关接口放在ready函数中调用来确保正确执行。对于用户触发时才调用的接口，则可以直接调用，不需要放在ready函数中。
        wx.ready(function() {
            // 分享到朋友圈
            wx.onMenuShareTimeline({
                title: wxArtDataInfo.title,
                desc: wxArtDataInfo.description,
                link: mpSignDataInfo.linkUrl,
                imgUrl: wxArtDataInfo.promotingImage,
                success: function() {
                    shareNotify();
                },
                cancel: function() {}
            });

            // 分享到微信朋友
            wx.onMenuShareAppMessage({
                title: wxArtDataInfo.title,
                desc: wxArtDataInfo.description,
                link: mpSignDataInfo.linkUrl,
                imgUrl: wxArtDataInfo.promotingImage,
                success: function() {
                    shareNotify();
                },
                cancel: function() {}
            });

            // config信息验证失败会执行error函数，如签名过期导致验证失败，具体错误信息可以打开config的debug模式查看，也可以在返回的res参数中查看，对于SPA可以在这里更新签名。
            wx.error(function(res) {
                alert("errorMSG:" + JSON.stringify(res));
            });
        });

        document.getElementsByName('extraLink')[0].height = window.screen.height;

    }
})();
