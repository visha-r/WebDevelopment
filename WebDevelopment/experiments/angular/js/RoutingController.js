var app = angular.module('mainApp', ['ngRoute']);
app.controller('RoutingController', function ($scope, $route) {
});

app.config(function ($routeProvider) {
    $routeProvider
        .when('/home', {
            templateUrl: 'Wallpaper.html'
        })

        .when('/login', {
            templateUrl: 'Login.html'
        })

        .when('/search', {
         templateUrl: 'search.html',
         controller: 'searchController'
     })

    .when('/favorites', {
        templateUrl: 'NoFavorites.html'
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
