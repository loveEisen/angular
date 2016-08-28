/**
 * Created by Administrator on 8/17/2016.
 */

(function(angular){
	var app = angular.module('editBD',['BDService','ngRoute']);
app.config(['$routeProvider',function ($routeProvider) {
    $routeProvider.when('/editBD',{
        templateUrl:'html/editBD.html',
        controller:'editBDCtrl'
    }).otherwise({
        redirectTo:"/editBD"
    })
}]);

app.controller('editBDCtrl',['MyService','$scope','$location','$http',function (MyService,$scope,$location,$http) {

    $scope.urlParams = MyService.getParams($location.url());

    var handleEditDataResult = function (response) {
            // 让该表单默认上返回来的数据
            $scope.user.name = response.data.name;

        };

    if($scope.urlParams!=undefined){
            MyService.geteditBDData($scope.urlParams,handleEditDataResult);

        }

    $scope.backDoctorBD = function () {
        $location.path('/home_page');
        };

    $scope.leaderBDs=[
        {id:1,BD:"10"},
        {id:2,BD:"20"},
        {id:3,BD:"30"}
        ];
    $scope.selectLeaderBD =  $scope.leaderBDs[0];

    // $scope.user = {};
    $scope.getName  = function(){
        console.log($scope.user.name)
        if($scope.user.name.length > 0){
            return true;
        }else {
            return false;
        }
    }
    $scope.getTelphone  = function(){
        console.log($scope.user.telphone)

        if($scope.user.telphone.length > 0){
//            $scope.telephoneStatus = false;
            return true;
        }else {
//            $scope.telephoneStatus = true;
            return false;
        }
    }
    $scope.getLoginName  = function(){
        console.log($scope.user.loginName)
        if($scope.user.loginName.length > 0){
            return true;
        }else {
            return false;
        }
    }
    $scope.getLoginPwd  = function(){
        console.log($scope.user.password)
        if($scope.user.password != undefined){
            return true;
        }else {
            return false;
        }
    }

    $scope.getLeaderBD = function () {
        console.log($scope.selectLeaderBD.BD);
    }

    $scope.submitEditBDData  = function(){
        var islegal = $scope.getName() && $scope.getTelphone() && $scope.getLoginName() &&$scope.getLoginPwd();
        console.log( islegal);
        if(!islegal){

            alert("输入不合法");
            return;
        }

        //需要验证输入是否合法,不合法，返回相应位置，提示信息
        var info = {
            "name":$scope.user.name,
            "gender":$scope.user.gender == undefined ? "0":$scope.user.gender,
            "telphone":$scope.user.telphone,
            "loginName":$scope.user.loginName,
            "password":$scope.user.password,
            "selectLeaderBD":$scope.selectLeaderBD.BD,
            "manger":$scope.user.manger == undefined ? "0":$scope.user.manger
        };
        angular.extend(info,$scope.urlParams);
        console.log("-----",info);

        // 处理响应后的数据，根据返回的数据判断提示登录名 密码 是否正确
        var handleSaveDataResult = function (response) {
            
            if(response.status === 200 ){


            }else {
                

            }

        };
        MyService.geteditBDData(info,handleSaveDataResult);
    }

// geteditBDData

}]);
})(angular);