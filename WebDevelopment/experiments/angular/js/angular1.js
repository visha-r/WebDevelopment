
angular.module('ionicApp', [])
.controller('MainCtrl', function ($scope, $http) {

    $(window).load(function () {
        $(".prdtTable").hide();
    });

    // method to load music products
    $scope.music = function () {
        $http.jsonp('http://api.remix.bestbuy.com/v1/products(type=Music)?format=json&show=all&callback=JSON_CALLBACK&apiKey=wu48f36djjruzarbeahrx8ay')
         .success(function (resp) {
             $scope.products = resp.products;
         })
        .error(function (data) {
            $scope.data = "Request failed";
        });
        $(".movie").removeClass("active");
        $(".software").removeClass("active");
        $(".music").addClass("active");
        $(".prdtTable").show();
    };

    // Method to load movie products
    $scope.movie = function () {
        $http.jsonp('http://api.remix.bestbuy.com/v1/products(type=movie)?format=json&show=all&callback=JSON_CALLBACK&apiKey=wu48f36djjruzarbeahrx8ay')
        .success(function (resp) {
            $scope.products = resp.products;
        })
        .error(function (data) {
            $scope.data = "Request failed";
        });
        $(".music").removeClass("active");
        $(".software").removeClass("active");
        $(".movie").addClass("active");
        $(".prdtTable").show();
    };

    // Method to load software products
    $scope.software = function () {
        $http.jsonp('http://api.remix.bestbuy.com/v1/products(type=software)?format=json&show=all&callback=JSON_CALLBACK&apiKey=wu48f36djjruzarbeahrx8ay')
        .success(function (resp) {
            $scope.products = resp.products;
        })
        .error(function (data) {
            $scope.data = "Request failed";
        });
        $(".music").removeClass("active");
        $(".movie").removeClass("active");
        $(".software").addClass("active");
        $(".prdtTable").show();
    };

});