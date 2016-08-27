/**
 * Created by Administrator on 8/16/2016.
 */
(function (angular) {
    var app = angular.module('homeApp', ['ng-pagination','BDService','editBD', 'addDoctor', 'doctorList', 'billList', 'billDetails', 'ngRoute']);
    app.config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/home_page:page?', {//是html名
         // $routeProvider.when('/home_page', {//是html名
            templateUrl: 'html/home_page.html',//路径
            controller: 'mainController'
        })
            .otherwise({
                redirectTo: "/home_page"//html文件名
            })
    }]);

// 创建控制器
    app.controller('mainController', ['MyService','$scope', '$routeParams', '$route', '$window', '$location', '$http', function (MyService,$scope, $routeParams, $route, $window, $location, $http) {

        $scope.addDoctor = function () {
            $location.url('/addDoctor');
        }
        $scope.addDoctorBD = function () {
            $location.url('/editBD');
        }
        $scope.checkList = function (id) {
            // console.log("item",id);
            var params = "?userId="+ id +"&"+"pwd="+"123";
            $location.url('/doctorList'+params);
        }
        $scope.editBD = function (id) {

            var params = "?userId="+ id +"&"+"pwd="+"123";
            // $location.path('/editBD'+homeEditParams);

            $location.url('/editBD'+params);
        }

        $scope.$on("paginationCtrlChange",function(event,response){
            $scope.datas = response.data.records;
            $scope.total = response.data.total;//总共的数据
            //
            // $scope.lists = response.data.list;
            // $scope.totalList = response.data.totalList;

        })
        //  var page = ($routeParams.page || '1') - 0;//字符串转数字
        // $scope.page = page;

    }]);

    app.controller('paginationHomeCtrl', ['$scope','MyService',function($scope,MyService) {
        
        $scope.homeLists=[
                {id:1,pagesize:"10"},
                {id:2,pagesize:"20"},
                {id:3,pagesize:"30"}
            ];
        $scope.selectValue =  $scope.homeLists[0];
        $scope.currentPage = 1;
        $scope.getPagesize = function () {
                // $scope.value =  $scope.selectValue.action
                // $scope.selectValue =  $scope.selectValue.action
                //  console.log($scope.selectValue.pagesize);
                 // $scope.currentPage = 1;
                 requestHomeData();
            }
        $scope.onPageChange = function() {
            // ajax request to load data
            // var currentPage = $scope.currentPage;
            // console.log($scope.currentPage);
            requestHomeData();
        };
        var requestHomeData = function () {
            var info = {
                "pagesize":$scope.selectValue.pagesize ,
                "page":$scope.currentPage};
            MyService.getHomeData(info,handleHomeResult);
            console.log(info);
        }

        var handleHomeResult = function (response) {
             console.log(response.data);
            //设置总页数
            $scope.pageCount = response.data.totalPage;
            // $scope.pageCount =6;

            $scope.$emit("paginationCtrlChange",response);
        };

        requestHomeData();
    }]);

})(angular);

