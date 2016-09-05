(function() {
	angular.module('starter').factory('code', code);
	code.$inject = ['$ionicPopup'];

	function code($ionicPopup) {

		var RETURN_CODE = {
			SUCCESS: {
				val: 1000,
				msg: '成功'
			},
			NO_PERMISSIONS_ACCESS: {
				val: 1001,
				msg: '无权限访问'
			},
			MERCHANT_NO_EXISTS: {
				val: 1002,
				msg: '商户不存在'
			},
			PAYMENT_METHOD_ERROR: {
				val: 1003,
				msg: '支付方式错误'
			},
			SERVER_PROCESSING_EXCEPTION: {
				val: 1004,
				msg: '服务器处理异常'
			},
			FAIL: {
				val: 1005,
				msg: '失败'
			},
			INCOMPLETE_PARAMETER: {
				val: 1006,
				msg: '参数不全'
			},
			REQUEST_IS_INVALID: {
				val: 1007,
				msg: '请求已失效'
			},
			SIGNATURE_ERROR: {
				val: 1100,
				msg: '签名错误'
			},
			SIGNATURE_ERROR: {
				val: 1100,
				msg: '签名错误'
			},
			TRANSACTION_ORDER_DOES_NOT_EXIST: {
				val: 2001,
				msg: '交易订单不存在'
			}
		}

		function popup(data, url) {
			console.log('接口调用出错:' + data.val + ',' + data.msg + ',' + url);
			var popup = $ionicPopup.alert({
				title: '<strong>接口调用出错</strong>',
				template: "<p style='text-align: center;'>" + data.val + ':' + data.msg + '<br/>' + url + "</p>",
				okText: '确认',
			});
			
			return popup;
		}

		return {
			checkReturnCode: function(val, url) {
				var return_code = Number(val),
					judg = (RETURN_CODE.SUCCESS.val == return_code);
				if (!judg) {
					switch (return_code){
						case RETURN_CODE.NO_PERMISSIONS_ACCESS.val:
							popup(RETURN_CODE.NO_PERMISSIONS_ACCESS, url);
							break;
						case RETURN_CODE.MERCHANT_NO_EXISTS.val:
							popup(RETURN_CODE.MERCHANT_NO_EXISTS, url);
							break;
						case RETURN_CODE.PAYMENT_METHOD_ERROR.val:
							popup(RETURN_CODE.PAYMENT_METHOD_ERROR, url);
							break;
						case RETURN_CODE.SERVER_PROCESSING_EXCEPTION.val:
							popup(RETURN_CODE.SERVER_PROCESSING_EXCEPTION, url);
							break;
						case RETURN_CODE.FAIL.val:
							popup(RETURN_CODE.FAIL, url);
							break;
						case RETURN_CODE.INCOMPLETE_PARAMETER.val:
							popup(RETURN_CODE.INCOMPLETE_PARAMETER, url);
							break;
						case RETURN_CODE.REQUEST_IS_INVALID.val:
							popup(RETURN_CODE.REQUEST_IS_INVALID, url).then(function(){
								location.href = '#/tab/login';
							});
							break;
						case RETURN_CODE.SIGNATURE_ERROR.val:
							popup(RETURN_CODE.SIGNATURE_ERROR, url);
							break;
						case RETURN_CODE.TRANSACTION_ORDER_DOES_NOT_EXIST.val:
							popup(RETURN_CODE.TRANSACTION_ORDER_DOES_NOT_EXIST. url);
							break;
						default:
							break;
					}
				} 
				return judg;
			}
		};

	}

})();