/**
 * Created by Administrator on 8/23/2016.
 */
(function (angular) {
    var app = angular.module('BDService',[]);
    app.service('MyService',['$http','$window',function($http,$window){
       
        // this.task = function(){
        //     console.log(1234);
        // }
        // 获取主页数据
        this.getHomeData = function(info,callback){
             $http.post("../src/tsconfig.json", info)
             // $http.post(" http://12.168.1.129:8080/management/getDoctorBdList", info)
            .then(function (response) {
                // 获取每页显示的数据
                callback(response);
            })

        }

        // 获取编辑页面数据
        this.geteditBDData = function(info,callback){
             $http.post("../src/tsconfig.json", info)
             // $http.post(" http://12.168.1.129:8080/management/getDoctorBdList", info)
            .then(function (response) {
                // 获取每页显示的数据
                callback(response);
            })

        }



        // 获取医生列表doctorList数据
        this.getDoctorListData = function(info,callback){
            $http.post("../src/tsconfig.json", info)
                .then(function (response) {
                    // 截取每页显示的数据
                    callback(response);
                })
        }
        // 获取账单列表billList数据
        this.getBillListData = function(info,callback){
            $http.post("../src/tsconfig.json", info)
                .then(function (response) {
                    // 截取每页显示的数据
                    callback(response);
                })
        }
        // 获取详情页的数据
        // this.getdetailListData = function(info,callback){
        //     $http.post("../src/tsconfig.json", info)
        //         .then(function (response) {
        //             // 截取每页显示的数据
        //             callback(response);
        //         })
        // }
        // 获得其他页面传来的参数
        this.getParams = function (address) {
            var startIndex =address.indexOf("?");
            if(startIndex===-1){
                return {};
            }
            var paramsStr =address.slice(startIndex+1);
            var paramsArr = paramsStr.split("&");
            var obj = {};
            for(var i = 0;i < paramsArr.length;i++){
                var num =  paramsArr[i].indexOf("=");
                obj[paramsArr[i].slice(0,num)]=paramsArr[i].slice(num+1);
            }
            return obj;
        }
    }])
})(angular)