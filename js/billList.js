/**
 * Created by Administrator on 8/18/2016.
 */
(function (angular) {
    var app = angular.module('billList', ['BDService', 'ngRoute']);

    app.config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/billList', {
            templateUrl: 'html/billList.html',
            controller: 'billListCtrl'
        })
            .otherwise({
                redirectTo: "/billList"
            })
    }]);
// 创建控制器
    app.controller('billListCtrl', ['MyService', '$scope', '$location', '$http', function (MyService, $scope, $location, $http) {

        var urlParams = MyService.getParams($location.url());
        console.log(urlParams);
        $scope.urlParams = urlParams;


        $scope.backOfBill = function () {
            $location.url('/doctorList');
        }
        $scope.addDoctorOfBill = function () {
            $location.url('/addDoctor');
        }
        $scope.details = function (id) {
            var params = "?userId="+ id +"&"+"pwd="+"123";
            $location.url('/details'+params);
        };
        $scope.search = function () {
            $scope.$broadcast("billListQueryclick");

        }
        $scope.getStartime = function () {
            // console.log($scope.startime);
        }
        $scope.getEndtime = function () {
            // console.log($scope.endtime);
        }

        $scope.$on("paginationBillList", function (event, response) {
            $scope.total = response.data.total;//总共的数据
            $scope.billLists = response.data.billList;
            // $scope.totalBill = response.data.totalBill;
        });
    }]);
// 分页控制器
    app.controller('paginationBillListCtrl', ['$scope', 'MyService', function ($scope, MyService) {
        $scope.billLists = [
            {id: 1, pagesize: "10"},
            {id: 2, pagesize: "20"},
            {id: 3, pagesize: "30"}
        ];
        $scope.selectValue = $scope.billLists[0];
        $scope.currentPage = 1;
        $scope.getPagesize = function () {
            requestBillListData();
        }

        $scope.onPageChange = function () {
            // console.log($scope.currentPage);
            requestBillListData();
        };
        var requestBillListData = function () {
            var info = {
                // "urlParams": $scope.urlParams,
                "pagesize": $scope.selectValue.pagesize,
                "page": $scope.currentPage,
                "startime": $scope.startime,
                "endtime": $scope.endtime,
                "selectBillList": $scope.selectBillList == undefined ? "1" : $scope.selectBillList
            };
            MyService.getBillListData(info, handlBillListResult);
            console.log(info);

        angular.extend(info,$scope.urlParams);
            console.log("==========="+info);
        }
        var handlBillListResult = function (response) {
            console.log(response.data);
            //设置总页数
            $scope.pageCount = response.data.totalPage;
            // $scope.pageCount =6;
            $scope.$emit("paginationBillList", response);
        };
        requestBillListData();
        $scope.$on("billListQueryclick", function () {
            requestBillListData();
        })
    }]);

})(angular);

