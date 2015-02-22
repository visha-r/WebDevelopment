var app = angular.module('mainApp', ['ngRoute']);
app.controller('RoutingController', function ($scope, $route) {
});

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
        templateUrl: '../partials/NoFavorites.html'
    });

});

app.controller('searchController', function ($scope, $http) {
    $scope.fetchProducts = function () {
        var title = $scope.title;
        $http.jsonp('http://api.remix.bestbuy.com/v1/products(manufacturer=' + title + ')?format=json&show=all&callback=JSON_CALLBACK&apiKey=wu48f36djjruzarbeahrx8ay')
        .success(function(response){
            $scope.products = response.products;
            console.log($scope.products);
        })
    };

    var favoriteProducts = [];
    $scope.addToFavorites = function (product) {
        favoriteProducts.push(product);
    }

});
