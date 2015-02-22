var app = angular.module('mainApp', ['ngRoute']);

$(document).ready(function () {
    $("#loginlink").click(function () {
        $("#loginlink").addClass("active");
        $("#homelink").removeClass("active");
        $("#favoritelink").removeClass("active");
        $("#searchlink").removeClass("active");
    });

    $("#homelink").click(function () {
        $("#homelink").addClass("active");
        $("#loginlink").removeClass("active");
        $("#searchlink").removeClass("active");
        $("#favoritelink").removeClass("active");
    });

    $("#searchlink").click(function () {
        $("#searchlink").addClass("active");
        $("#loginlink").removeClass("active");
        $("#homelink").removeClass("active");
        $("#favoritelink").removeClass("active");
    });

    $("#favoritelink").click(function () {
        $("#favoritelink").addClass("active");
        $("#searchlink").removeClass("active");
        $("#loginlink").removeClass("active");
        $("#homelink").removeClass("active");
    });
});

$(window).load(function () {
    $("#homelink").click();
});

app.controller('MainController', function ($scope, $route) {

});

 app.config(function ($routeProvider) {
     $routeProvider
      .when('/home', {
        templateUrl: '../partials/Wallpaper.html'
        })

      .when('/login', {
            templateUrl: '../partials/Login.html'
        })
      .when('/search', {
          templateUrl: '../partials/search.html',
          controller: 'searchController'
      })

     .when('/favorites', {
         templateUrl: '../partials/favorites.html',
         controller: 'FavouritesController'
     });

 });

 app.controller('searchController', function ($scope,$http,ProductService) {
     $scope.fetchProducts = function () {
         ProductService.fetchProducts($scope.title, function (response) {
             $scope.products = response.products;
             console.log($scope.products);
         });
     };

     $scope.addToFavorites = function(product){
         ProductService.addToFavorites(product);
     }

 });

 app.controller('FavouritesController', function ($scope, ProductService) {
     $scope.getFavorites = function () {
         $scope.favoriteProducts = ProductService.getFavorites();
         console.log($scope.favoriteProducts);
     }

     $scope.getFavorites();
 });
