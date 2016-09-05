(function() {
	//angular中的constant()创建的是一个可以被配置的常量
	//constant()方法可以将一个已经存在的变量注册为服务，
	//然后通过依赖注入，可以注入到应用的其他部分中去。
	angular.module('starter').constant('backend', [{
            'service': 'api',
			'port': '9101',
			'names': ['security/getUserInfo','security/modifyUserInfo']
		},
		{
			'service': 'api',
			'port': '9104',
			'names': ['account/findBalance']
		},
		{
			'service': 'api',
			'port': '9102',
			'names': ['tasks/getTaskPage',
			'tasks/getTaskDetail',
			'tasks/wxTask/receiveTask',
			'tasks/wxShare/getWxMp',
			'tasks/wxShare/getWxArt',
			'tasks/wxShare/getMpSign',
			'tasks/wxShare/getArtSign',
			'tasks/wxShare/shareNotify',
			'tasks/recordViewArt']
		},
		{
			'service': 'common/api',
			'port': '9980',
			'names': ['file/upload']
		}]);
})();
