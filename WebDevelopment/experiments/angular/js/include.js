/**
 * javascript to include navigation menu in every page
 **/

document.write("<ul class='nav nav-tabs'>");
document.write("<li role='presentation' class='music active' ng-click='music()'><a href='#'>Music</a></li>");
document.write("<li role='presentation' class='software' ><a href='#' ng-click='software()'>Software</a></li>");
document.write("<li role='presentation' class='movie' ><a href='#' ng-click='movie()'>Movie</a></li>");
document.write("</li>");
document.write("</ul>");
$(document).ready(function () {
    $(window).load(function () {
        $(".prdtTable").hide();
    });

    angular.module('ionicApp', [])
    .controller('MainCtrl', function ($scope, $http) {

        // method to load music products
        $scope.music = function () {
            $http.jsonp('http://api.remix.bestbuy.com/v1/products(type=Music)?format=json&show=all&callback=JSON_CALLBACK&apiKey=wu48f36djjruzarbeahrx8ay')
             .success(function (resp) {
                 alert('inside music');
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
});