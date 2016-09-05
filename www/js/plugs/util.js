//扩展js异步请求
XMLHttpRequest.prototype.post = function(url, data) {
	this.open('POST', url, true);
	this.setRequestHeader('Accept', 'application/json');
	this.setRequestHeader('Content-Type', 'application/json');
	this.setRequestHeader('charset', 'UTF-8');
	this.send(JSON.stringify(data));
}

var Util = {};

Util.newMark = '';
Util.oldMark = '';

//改变列表头部导航状态
Util.addListNavEvt = function(id, data, $rootScope) {

	var nav = document.getElementById(id).children;

	Util.listener = $rootScope.$on('$stateChangeStart',
		function(event, toState, toParams, fromState, fromParams, options) {
			for (var i = 0; i < nav.length; i++) {
				nav[i].className = 'col-25';
			}
			var key = data[toState.url.slice(1)];
			if (nav[key] != undefined) {
				nav[key].className = 'col-25 act';
			} else {
				Util.listener = null;
			}

		}
	)
}

//改变列表头部导航状态
Util.listNavEvt = function($event) {

	var str = $event.target.dataset.hash;

	var children = $event.target.parentElement.children;

	for (var i = 0; i < children.length; i++) {
		children[i].className = 'col-25';
	}

	$event.target.className = 'col-25 act';
}

//获取时间戳
Util.getTimestamp = function() {
	var time = new Date(),
		stamp = new String(),
		month,
		day,
		hours,
		minutes,
		seconds;
	if (time.getMonth() < 9) {
		month = '0' + (time.getMonth() + 1);
	} else {
		month = time.getMonth() + 1;
	}
	if (time.getDate() < 10) {
		day = '0' + time.getDate();
	} else {
		day = time.getDate();
	}
	if (time.getHours() < 10) {
		hours = '0' + time.getHours();
	} else {
		hours = time.getHours();
	}
	if (time.getMinutes() < 10) {
		minutes = '0' + time.getMinutes();
	} else {
		minutes = time.getMinutes();
	}
	if (time.getMinutes() < 10) {
		minutes = '0' + time.getMinutes();
	} else {
		minutes = time.getMinutes();
	}
	if (time.getSeconds() < 10) {
		seconds = '0' + time.getSeconds();
	} else {
		seconds = time.getSeconds();
	}
	return stamp.concat(time.getFullYear(), month, day, hours, minutes, seconds);
}

//ng-repeat到最后一个元素时，重置下拉效果。
Util.resetLoad = function(last, $scope) {
	if (last) {
		$scope.isLoad = false;
		$scope.$broadcast('scroll.infiniteScrollComplete');
		$scope.isLoad = true;
		$scope.$broadcast('scroll.infiniteScrollComplete');
	}
}

Util.clearLoad = function($scope) {
	$scope.isLoad = false;
	$scope.$broadcast('scroll.infiniteScrollComplete');
}

Util.bridge = function(parm) {
	var obj = parm;
	this.act = false;
	this.add = function(data) {
		for (key in obj) {
			obj[key] = data[key];
		}
		this.act = true;
	}
	this.get = function() {
		return obj;
	}
}
Util.getLocalTime = function(nS) {
	return new Date(parseInt(nS) * 1000).toLocaleString().replace(/年|月/g, "-").replace(/日/g, " ");
}



//生成唯一标识
function GUID(){
    this.date = new Date();
    /* 判断是否初始化过，如果初始化过以下代码，则以下代码将不再执行，实际中只执行一次 */
    if (typeof this.newGUID != 'function') {
        /* 生成GUID码 */
        GUID.prototype.newGUID = function() {
                this.date = new Date();
                var guidStr = '';
                sexadecimalDate = this.hexadecimal(this.getGUIDDate(), 16);
                sexadecimalTime = this.hexadecimal(this.getGUIDTime(), 16);
                for (var i = 0; i < 9; i++) {
                    guidStr += Math.floor(Math.random() * 16).toString(16);
                }
                guidStr += sexadecimalDate;
                guidStr += sexadecimalTime;
                while (guidStr.length < 32) {
                    guidStr += Math.floor(Math.random() * 16).toString(16);
                }
                return this.formatGUID(guidStr);
            }
            /*
             * 功能：获取当前日期的GUID格式，即8位数的日期：19700101
             * 返回值：返回GUID日期格式的字条串
             */
        GUID.prototype.getGUIDDate = function() {
                return this.date.getFullYear() + this.addZero(this.date.getMonth() + 1) + this.addZero(this.date.getDay());
            }
            /*
             * 功能：获取当前时间的GUID格式，即8位数的时间，包括毫秒，毫秒为2位数：12300933
             * 返回值：返回GUID日期格式的字条串
             */
        GUID.prototype.getGUIDTime = function() {
                return this.addZero(this.date.getHours()) + this.addZero(this.date.getMinutes()) + this.addZero(this.date.getSeconds()) + this.addZero(parseInt(this.date.getMilliseconds() / 10));
            }
            /*
             * 功能: 为一位数的正整数前面添加0，如果是可以转成非NaN数字的字符串也可以实现
             * 参数: 参数表示准备再前面添加0的数字或可以转换成数字的字符串
             * 返回值: 如果符合条件，返回添加0后的字条串类型，否则返回自身的字符串
             */
        GUID.prototype.addZero = function(num) {
                if (Number(num).toString() != 'NaN' && num >= 0 && num < 10) {
                    return '0' + Math.floor(num);
                } else {
                    return num.toString();
                }
            }
            /* 
             * 功能：将y进制的数值，转换为x进制的数值
             * 参数：第1个参数表示欲转换的数值；第2个参数表示欲转换的进制；第3个参数可选，表示当前的进制数，如不写则为10
             * 返回值：返回转换后的字符串
             */
        GUID.prototype.hexadecimal = function(num, x, y) {
                if (y != undefined) {
                    return parseInt(num.toString(), y).toString(x);
                } else {
                    return parseInt(num.toString()).toString(x);
                }
            }
            /*
             * 功能：格式化32位的字符串为GUID模式的字符串
             * 参数：第1个参数表示32位的字符串
             * 返回值：标准GUID格式的字符串
             */
        GUID.prototype.formatGUID = function(guidStr) {
            var str1 = guidStr.slice(0, 8) + '-',
                str2 = guidStr.slice(8, 12) + '-',
                str3 = guidStr.slice(12, 16) + '-',
                str4 = guidStr.slice(16, 20) + '-',
                str5 = guidStr.slice(20);
            return str1 + str2 + str3 + str4 + str5;
        }
    }
}

Util.getKeyByAES = function(){
	//var key_128 = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15];
	var key_128 = 'test012345678900';
	return key_128;
}

Util.getUserId = function() {
	return localStorage.userId;
}
Util.getToken = function() {
	return localStorage.token;
}
Util.getShopId = function() {

	return localStorage.shopId;
}
Util.getBusinessId = function() {
	return localStorage.businessid;
}
Util.getTelephone = function() {
	return localStorage.telePhone;
}
Util.getsysId = function() {
	return localStorage.sysid;
}
Util.getMerchantName = function() {
	return localStorage.merchantName;
}
Util.getUserName = function() {
	return localStorage.userName;
}
Util.suborgId = function() {
	return localStorage.suborgid;
}
Util.getRealName = function() {
	return localStorage.realName;
}
Util.getOrigin = function(){
	return localStorage.origin;
}
Util.getAppId = function(){
	return localStorage.appId;
}
