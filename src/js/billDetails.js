/**
 * Created by Administrator on 8/18/2016.
 */

/**
 * Created by Administrator on 8/18/2016.
 */
(function (angular) {
    // var app = angular.module('homeApp',['ngRoute','editBD']);
    var app = angular.module('billDetails', ['BDService','ngRoute','chart.js']);

    app.config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/details', {
            templateUrl: 'html/billDetails.html',
            controller: 'detailsCtrl'
        })
            .otherwise({
                redirectTo: "/details"
            })

    }]);
// 创建控制器
    app.controller('detailsCtrl', ['MyService','$scope', '$location', '$http', function (MyService,$scope, $location, $http) {
        console.log('ceshi');
        var urlParams = MyService.getParams($location.url());
        console.log(urlParams);
        $scope.urlParams = urlParams;

        var handldetailResult = function (response) {
            $scope.response = response;
            $scope.sorts = response.data.sort;
            $scope.billList = response.data.billList;
            // console.log(response.data.billList);
            // for (var i = 0; i < $scope.billList.length; i++) {
            //                 var obj = $scope.billList[i];
            //                 $scope.doctorBill = obj.doctorBill;
            //             }
        };

        // MyService.getdetailListData($scope.urlParams,handldetailResult);
        
        

        $scope.backBillList = function () {
            $location.url('/billList');
        }

    }]);

    app.controller("PieCtrl", function ($scope) {
        $scope.labels = ['CT', 'MR', 'DX', 'CR', '推荐大病', '推荐片子'];
        $scope.data = [300, 500, 100,300,200,100,300];
    });
    app.controller("BarCtrl", function ($scope) {
        $scope.labels = ['CT', 'MR', 'DX', 'CR', '推荐大病', '推荐片子'];
        // $scope.options = { legend: { display: true } };//false时隐藏表格上显示的series，true显示
        $scope.series = ['上月', '本月'];
        $scope.colors = [
            { // grey
                backgroundColor: 'rgba(3,98,152,1)',
                // pointBackgroundColor: 'rgba(148,159,177,1)',
                // pointHoverBackgroundColor: 'rgba(148,159,177,1)',
                // borderColor: 'rgba(148,159,177,1)',
                // pointBorderColor: '#fff',
                // pointHoverBorderColor: 'rgba(148,159,177,0.8)'
            },{ // grey
                backgroundColor: 'rgba(208,211,220,1)',
                // pointBackgroundColor: 'rgba(148,159,177,1)',
                // pointHoverBackgroundColor: 'rgba(148,159,177,1)',
                // borderColor: 'rgba(148,159,177,1)',
                // pointBorderColor: '#fff',
                // pointHoverBorderColor: 'rgba(148,159,177,0.8)'
            }];
        // $scope.colors = ['#036298', '#d0d3dc'];
        $scope.data = [
            [1000, 1500,2000, 2500,1500,1000,500],
            [1750, 2750, 1500, 1750, 1000, 2750, 1750]
        ];

        $scope.getdata = function(id){
            if(id == 'id1'){
                return  [
                    [1000, 1500,2000, 2500,1500,1000,500],
                        [1750, 2750, 1500, 1750, 1000, 2750, 1750]
                ];
            }
        };


    });
})(angular);
