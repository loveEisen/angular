/**
 * Created by Administrator on 8/18/2016.
 */
(function (angular) {
    var app = angular.module('doctorList', ['BDService', 'addDoctor', 'billList', 'ngRoute']);
    app.config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/doctorList:page?', {
            templateUrl: 'html/doctorList.html',
            controller: 'doctorListCtrl'
        })
            .otherwise({
                redirectTo: "/doctorList"
            })

    }]);
// 创建控制器
    app.controller('doctorListCtrl', ['MyService', '$scope', '$routeParams', '$route', '$location', '$http', function (MyService, $scope, $routeParams, route, $location, $http) {
          // console.log("========",$location.url());
        var urlParams = MyService.getParams($location.url());
        console.log(urlParams);
        $scope.urlParams = urlParams;
        $scope.backOfList = function () {
            $location.url('/home_page');
        }
        $scope.addDoctorOfList = function () {
            $location.url('/addDoctor');
        }
        $scope.querryBill = function (id) {
            var params = "?userId="+ id +"&"+"pwd="+"123";
            // $location.path('/doctorList'+params);
            // $location.path('/billList'+doctorlistParams);
            $location.url('/billList'+params);
        }
        $scope.editDoctor = function (id) {
            var params = "?userId="+ id +"&"+"pwd="+"123";
            $location.url('/addDoctor'+params);
        }
        $scope.search = function () {
          $scope.$broadcast("doctorListQueryclick");
        }
        $scope.$on("doctorlistPageCtrlChange", function (event, response) {
            $scope.doctorLists = response.data.doctorList;

        })

        $scope.getStartime = function () {
            console.log($scope.startime);
        }
        $scope.getEndtime = function () {
            console.log($scope.endtime);
        }
        $scope.getList = function () {
            console.log($scope.selectList);
        }
    }]);

    app.controller('doctorlistPageCtrlChange', ['$scope', 'MyService', function ($scope, MyService) {
        $scope.doctorLists = [
            {id: 1, pagesize: "10"},
            {id: 2, pagesize: "20"},
            {id: 3, pagesize: "30"}
        ];
        $scope.selectValue = $scope.doctorLists[0];

        $scope.currentPage = 1;
        $scope.getPagesize = function () {
            // console.log($scope.selectValue.pagesize);
            requestDoctorListData();
        }

        $scope.onPageChange = function () {
            // ajax request to load data
            // var currentPage = $scope.currentPage;
            // console.log($scope.currentPage);
            requestDoctorListData();

        };

        var requestDoctorListData = function () {
            // console.log(params);
            // 医生列表默认是0
            var info = {
               // "urlParams" : $scope.urlParams,
               "pagesize" : $scope.selectValue.pagesize,
               "page" : $scope.currentPage,
               "startime" :$scope.startime,
               "endtime" :$scope.endtime,
               "selectList" :$scope.selectList== undefined ? "0":$scope.selectList
            };
            angular.extend(info,$scope.urlParams);
            MyService.getDoctorListData(info, handlDoctorListResult);
            console.log("==========",info);
        }
        var handlDoctorListResult = function (response) {
            console.log(response.data);
            //设置总页数
            $scope.pageCount = response.data.totalPage;
            // $scope.pageCount = 6;

            $scope.$emit("doctorlistPageCtrlChange", response);
        };
        requestDoctorListData();
        // 父元素点击查询按钮时重新获取数据
        $scope.$on("doctorListQueryclick", function () {
            requestDoctorListData();
        });
    }]);


})(angular);
