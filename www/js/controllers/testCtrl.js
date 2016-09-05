(function() {
    angular.module('starter').controller('testController', testController);
    testController.$inject = ['$scope', '$state', '$location'];

    function testController($scope, $state, $location) {
        $scope.title = 'testController';

        // $scope.data = {
        //     file: null,
        //     defaultImage: '../img/图片.jpg'
        // };

        // $scope.upload = function() {


        //     if (!$scope.data.file) {
        //         return;
        //     }

        //     var url = $scope.params.url; //params是model传的参数，图片上传接口的url
        //     var data = angular.copy($scope.params.data || {}); // 接口需要的额外参数，比如指定所上传的图片属于哪个用户: { UserId: 78 }
        //     data.file = $scope.data.file;

        //     Upload.upload({
        //         url: url,
        //         data: data
        //     }).success(function(data) {
        //         $scope.hide(data);
        //     }).error(function() {
        //         logger.log('error');
        //     });
        // };



        // $scope.submit = function() {
        //     if ($scope.form.file.$valid && $scope.file) {
        //         $scope.upload($scope.file);
        //     }
        // };


        // upload on file select or drop
        // $scope.upload = function(file) {
        //     Upload.upload({
        //         url: 'upload/url',
        //         data: { file: file, 'username': $scope.username }
        //     }).then(function(resp) {
        //         console.log('Success ' + resp.config.data.file.name + 'uploaded. Response: ' + resp.data);
        //     }, function(resp) {
        //         console.log('Error status: ' + resp.status);
        //     }, function(evt) {
        //         var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
        //         console.log('progress: ' + progressPercentage + '% ' + evt.config.data.file.name);
        //     });
        // };




        // for multiple files:
        // $scope.uploadFiles = function(files) {
        //     if (files && files.length) {
        //         for (var i = 0; i < files.length; i++) {
        //             Upload.upload({..., data: { file: files[i] }, ... })...;
        //         }
        //         // or send them all together for HTML5 browsers:
        //         Upload.upload({..., data: { file: files }, ... })...;
        //     }
        // }


        //对象的原型属性
        // 两种方式通过对象的原型添加属性
        //  function Product(name,color){
        //     this.name = name;
        //     this.color = color;
        //     this.whatAreYou = function(){
        //         return 'this is a '+this.color+' '+this.name;
        //     };
        //  }
        // //第一种
        //  Product.prototype.price = 200;
        //  Product.prototype.rating = 3;
        //  Product.prototype.getInfo = function(){
        //     return "等级："+this.rating+"--价钱"+this.price;
        //  }
        //  //第二种
        //  Product.prototype={
        //     price:6888,
        //     rating:3,
        //     getInfo:function(){
        //         return "等级："+this.rating+"--价钱"+this.price;
        //     }
        //   }

        //   var p1 = new Product("junbo","red");
        //   console.log( p1.whatAreYou());
        //   console.log(p1.getInfo());


        //js 中扩展内建对象
        //反转字符串
        // String.prototype.reverse = function(){
        //   return Array.prototype.reverse.apply(this.split('')).join('');
        // }
        // console.log('maizi'.reverse());
        // //检测方法是否存在，不存在则扩展
        // if (!Array.prototype.inArray) {
        //   Array.prototype.inArray = function(needle){
        //       for(var i=0;i<this.length;i++){
        //           if (this[i]==needle) {
        //               return true;
        //           }
        //       }
        //       return false;
        //   }
        // }

        // var arr = ['a','b','c','d'];
        // console.log(arr.inArray('b'));


        //原型链继承
        // function Shape(){
        //     this.name = 'Shape';
        //     this.toString=function(){
        //         return this.name;
        //     }
        // }

        // function TwoDShape(){
        //     this.name = '2D shape';
        // }

        // function Triangle(side,height){
        //     this.name='Triangle';
        //     this.side=side;
        //     this.height = height;
        //     this.getArea=function(){
        //         return this.side*this.height/2;
        //     }
        // }
        // //继承
        // TwoDShape.prototype = new Shape();
        // Triangle.prototype = new TwoDShape();
        // //重置constructor 属性 （这里必须重置构造器，否则，TwoDShape原型的构造器会变成全局的Object 对象）
        // TwoDShape.prototype.constructor=TwoDShape;
        // Triangle.prototype.constructor=Triangle;
        // //创建对象
        // var myTriangle = new Triangle(5,10);
        // console.log(myTriangle.getArea());
        // //获取对象的构造器
        // console.log(myTriangle.constructor);
        // //对象实例化自
        // console.log(myTriangle instanceof Triangle);//true
        // console.log(myTriangle instanceof TwoDShape);//true
        // console.log(myTriangle instanceof Shape);//true
        // //检测对象是否在原型链上
        // console.log(Shape.prototype.isPrototypeOf(myTriangle));//true
        // console.log(TwoDShape.prototype.isPrototypeOf(myTriangle));//true
        // console.log(Triangle.prototype.isPrototypeOf(myTriangle));//true
        // console.log(Object.prototype.isPrototypeOf(myTriangle));//true
        // console.log(String.prototype.isPrototypeOf(myTriangle));//false


        //继承优化：只继承原型的方案
        // function Shape(){};
        // Shape.prototype.name = 'shape';
        // Shape.prototype.toString = function(){
        //    return this.name;
        // }

        // function TwoDShape(){};
        // TwoDShape.prototype = Shape.prototype;
        // TwoDShape.prototype.constructor=TwoDShape;
        // TwoDShape.prototype.name = '2D Shape';


        // function  Triangle(side,height){
        //      this.side = side;
        //      this.height = height;
        // }
        // Triangle.prototype = TwoDShape.prototype;
        // Triangle.prototype.constructor=Triangle;
        // Triangle.prototype.name = 'Triangle';
        // Triangle.prototype.getArea=function(){
        //        return this.side*this.height/2;
        // }

        // var my = new Triangle(5,10);
        // console.log(my.getArea(5,10));
        // console.log(my.toString());

        // //需要注意：只继承原型会带来一个问题
        // var s = new Shape();
        // console.log(s.name);
        //这里输出的结果为 Triangle  而不是 shape,这是因为只继承原型时name属性指向是同一个，
        //所以子类Triangle修改name属性时整个原型链上的name属性值都会被修改成同一个值
        //上述的问题可以通过临时构造器来解决，如下所示
        // function Shape(){};
        // Shape.prototype.name = 'Shape';
        // Shape.prototype.this.toString=function(){
        //    return this.name;
        // }
        // function TwoDShape(){};
        // //声明临时构造器
        // var F= function(){};
        // F.prototype = Shape.prototype;
        // TwoDShape.prototype = new F();
        // TwoDShape.prototype.construtor = TwoDShape;
        // TwoDShape.prototype.name = '2D Shape';
        // function  Triangle(side,height){
        //    this.side = side;
        //    this.height = height;
        // }
        // var F = function(){};
        // F.prototype = TwoDShape.prototype;
        // Triangle.prototype = new F();
        // Triangle.prototype.name = 'Triangle';
        // Triangle.prototype.getArea=function(){
        //    return this.side*this.height/2;
        // }

        // var my = new Triangle(5,10);
        // console.log(my.getArea(5,10));
        // console.log(my.toString());

        // console.log(my._proto__._proto__._proto__.construtor);
        // var s = new Shape();
        // console.log(s.name);


    }
})();
