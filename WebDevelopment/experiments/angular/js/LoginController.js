﻿var app = angular.module('commentsApp', ['ngRoute']);

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

app.config(function ($routeProvider) {
    $routeProvider
     .when('/home', {
         templateUrl: '../partials/Wallpaper.html'
     })

     .when('/login', {
         templateUrl: '../partials/ActualLogin.html',
         controller: 'MainController'
     })
     .when('/search', {
         templateUrl: '../partials/searchWithDetails.html',
         controller: 'searchController'
     })
    .when('/details/:sku', {
        templateUrl: '../partials/ProductDetails.html',
        controller: 'DetailsController'
    })
    .when('/favorites', {
        templateUrl: '../partials/favorites.html',
        controller: 'FavouritesController'
    })
    .when('/comments/:sku', {
        templateUrl: '../partials/reviews.html',
        controller: 'ReviewsController'
    })
    .when('/myReviews', {
        templateUrl: '../partials/MyReviews.html',
        controller: 'MyReviewsController'
    })

});

app.controller('searchController', function ($scope, $http, ProductService) {
    $scope.fetchProducts = function () {
        ProductService.fetchProducts($scope.title, function (response) {
            $scope.products = response.products;
            console.log($scope.products);
        });
    };

    $scope.addToFavorites = function (product) {
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

app.controller('DetailsController', function ($scope, $http, $routeParams) {
    var sku = $routeParams.sku;
    $scope.showDetails = function () {
        $http.jsonp('http://api.remix.bestbuy.com/v1/products(sku=' + sku + ')?format=json&show=all&callback=JSON_CALLBACK&apiKey=wu48f36djjruzarbeahrx8ay')
            .success(function (response) {
                $scope.productDetail = response.products[0];
                console.log(response.products);

            });
    };
    $scope.showDetails();
});

app.controller('ReviewsController', function ($scope, $http, $routeParams, ProductService) {
    var sku = $routeParams.sku;
    $scope.showDetails = function () {
        $http.jsonp('http://api.remix.bestbuy.com/v1/reviews(sku=' + sku + ')?format=json&apiKey=wu48f36djjruzarbeahrx8ay&show=all&callback=JSON_CALLBACK')
                            .success(function (resp) {
                                $scope.reviews = resp.reviews;
                                console.log($scope.reviews);
                            });
    };
    $scope.showDetails();

    $scope.addReviews = function () {
        var myReview = {
            title: $scope.myTitle,
            comment: $scope.myReview,
            reviewer: [{ name: $scope.myName }],
        }
        $scope.reviews.push(myReview);
        ProductService.addToReviews(myReview);
    }
});

app.controller('MyReviewsController', function ($scope, $http, ProductService) {
    $scope.getReviews = function () {
        $scope.myReviews = ProductService.getReviews();
        console.log($scope.myReviews);
    }
    $scope.getReviews();
});

app.controller('LoginController', function ($scope, $http, ProductService) {
        $scope.login = function () {
            var username = $scope.username;
            console.log(username)
        $scope.currentuser = ProductService.login(username);
        console.log($scope.currentuser);
    }
});

app.controller('MainController', function ($scope, ProductService) {
    $scope.currentuser = null;
    $scope.login = function () {
        var username = $scope.username;
        console.log(username)
        $scope.currentuser = ProductService.login(username);
        console.log($scope.currentuser);
    }

    $scope.logout = function () {
        $scope.currentuser = null;
        $scope.username = null;
        $scope.password = null;
        ProductService.logout();
        console.log($scope.currentuser);
    }
});



