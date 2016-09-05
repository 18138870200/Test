(function() {
    angular.module('starter').factory('Service', Service);

    Service.$inject = ['$q', '$http', '$ionicPopup', 'Upload', 'backend', 'backendUrl', 'code', '$ionicLoading'];

    function Service($q, $http, $ionicPopup, Upload, backend, backendUrl, code, $ionicLoading) {
        var bind = 'true';
        var ionicLoadingShow = false;

        var factory = {
            getJson: getJson, //获取本地json
            post: post, //向服务器请求数据
            postDirectly: postDirectly,
            showAlert: showAlert, //提示框
            upload: upload,//上传图片
            setWechatTitle: setWechatTitle
        };
        return factory;

        // 获取本地json
        function getJson(name, folder) {

            var defered = $q.defer();

            $http.get('js/json/' + (folder || '') + name + '.json').success(function(data) {
                defered.resolve(data);
            });
            return defered.promise;
        }

        //公用弹框
        function showAlert(item) {
            var alertPopup = $ionicPopup.alert({
                template: item,
                okText: '确认'
            });
            //成功后调用then方法
            alertPopup.then(function(res) {

            });
        }

        //发送网络请求
        function post(ctrl, name, param) {
            var defered = $q.defer(),
                ctrlAndName = ctrl == "" ? name : (ctrl + '/' + name);

            var backendDetail = {},
                serviceData = angular.copy(param || {});

            angular.forEach(backend, function(item, i) {
                if (item.names.indexOf(ctrlAndName) >= 0) {
                    backendDetail = item;
                }
            });

            var objProperties = Object.getOwnPropertyNames(serviceData);
            var sortProperties = objProperties.sort();
            var md5String = '';

            angular.forEach(sortProperties, function(key, i) {
                if (i < sortProperties.length - 1) {
                    md5String += key + '=' + serviceData[key] + '&';
                } else {
                    md5String += key + '=' + serviceData[key]
                }
            });

            var upCaseMd5String = md5(md5String).toUpperCase();
            angular.extend(serviceData, { sign: upCaseMd5String });

            var port = ':' + backendDetail.port;

            if ('80' == backendUrl.port) {
                port = '';
            }
            var httpUrl = (backendDetail.url || backendUrl.url) + port + '/' + backendDetail.service + '/' + ctrlAndName;

            console.log(httpUrl);

            show(name);

            $http({
                method: 'POST',
                url: httpUrl,
                data: JSON.stringify(serviceData),
                headers: {
                    'Content-Type': 'application/json;charset=UTF-8'
                },
                timeout: 15000
            }).success(function(data) {
                console.log('----------------' + httpUrl + '---------------');
                console.log('参数：' + JSON.stringify(serviceData));
                console.log('返回数据：' + JSON.stringify(data));
                defered.resolve(data);
                code.checkReturnCode(data.returnCode, httpUrl)
                hide();
            }).error(function(data) {
                defered.reject();
                //处理错误 
                // showErrorMessage(httpUrl);
                console.log('----------------' + httpUrl + '---------------');
                console.log('参数：' + JSON.stringify(serviceData));
                console.log('返回数据：' + JSON.stringify(data));
                hide();
            });
            return defered.promise;
        }

        function postDirectly(url, params) {
            console.log(url);
            var defered = $q.defer();
            $http({
                method: 'POST',
                url: url,
                data: JSON.stringify(params),
                headers: {
                    'Content-Type': 'application/json;charset=UTF-8'
                },
                timeout: 15000
            }).success(function(data) {
                console.log('返回数据：' + JSON.stringify(data));
                defered.resolve(data);
                hide();
            }).error(function(data) {
                defered.reject();
                //处理错误 
                // showErrorMessage(httpUrl);
                console.log('返回数据：' + JSON.stringify(data));
                hide();
            });
            return defered.promise;
        }


        //图片上传
        function upload(file) {
            var defered = $q.defer();
            var backendDetail = {};
            angular.forEach(backend, function(item, i) {
                if (item.names.indexOf('file/upload') >= 0) {
                    backendDetail = item;
                }
            });
            var httpUrl = backendUrl.fileUploadUrl + ':' + backendDetail.port + '/' + backendDetail.service + '/' + 'file/upload';
            show('upload');
            Upload.upload({
                url: httpUrl,
                data: { fileData: file },
                headers: { 'Access-Control-Allow-Origin': '*' }
            }).then(function(resp) {
                hide();
                if (resp.data.returnCode == 1000) {
                    defered.resolve(resp);
                    // console.log('Success ' + resp.config.data.file.name + 'uploaded. Response: ' + resp.data);
                } else {
                    console.log('Error status: ' + resp.data);
                }
            }, function(resp) {
                hide();
                defered.reject();
                console.log('Error status: ' + resp.status);
            }, function(evt) {
                // var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
                // console.log('progress: ' + progressPercentage + '% ' + evt.config.data.file.name);
            });
            return defered.promise;
        };



        function show(name) {
            if (ionicLoadingShow) {
                return;
            }
            var tip = '';
            if (name == 'aabbcc') {
                tip = '正在绑定';
            } else {
                tip = 'loading..';
            }
            $ionicLoading.show({
                template: '<div class="spinnerBack"><ion-spinner class="spinner" icon="bubbles"></ion-spinner><span>' + tip + '</span></div>',
                noBackdrop: false,
                hideOnStateChange: false
            }).then(function() {
                ionicLoadingShow = true;
            });
        };

        function hide() {
            $ionicLoading.hide().then(function() {
                ionicLoadingShow = false;
            });
        };

        function showErrorMessage(url) {
            $ionicPopup.alert({
                title: '<strong>提示</strong>',
                template: '<div style="text-align:center">' + '网络不给力，请检查网络连接！' + '</div>',
                okText: '确定'
            });
            console.log("请求时发生错误: " + url);
        }

        //在微信公众号上修改title
        function setWechatTitle(title) {
            document.title = title;
            // hack在微信等webview中无法修改document.title的情况
            $body = $('body');
            var $iframe = $('<iframe src="/images/iframe.png"></iframe>').on('load', function() {
                setTimeout(function() {
                    $iframe.off('load').remove()
                }, 0)
            }).appendTo($body)
        }

    }
})();
