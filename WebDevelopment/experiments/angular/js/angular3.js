$(window).load(function () {
    $(".prdtTable").hide();
});

var app = angular.module('ionicApp', []);
app.filter('offset', function () {
    return function (input, start) {
        start = parseInt(start, 10);
        return input.slice(start);
    };
});
app.controller('MainCtrl', function ($scope, $http) {

    $(document).ready(function () {
        $('.title').keyup(function () {
            $scope.fetchProducts();

        });
    });

    $scope.fetchProducts = function () {
        var itemType = $scope.title;
        $http.jsonp('http://api.remix.bestbuy.com/v1/products(manufacturer=' + itemType + ')?format=json&show=all&callback=JSON_CALLBACK&apiKey=wu48f36djjruzarbeahrx8ay')
            .success(function (resp) {
                $scope.products = resp.products;
                console.log(resp.products);
                $(".prdtTable").show();
            })
            .error(function (data) {
                $scope.data = "Request failed";
            });


        $scope.itemsPerPage = 3;
        $scope.currentPage = 0;

        $scope.prevPage = function () {
            if ($scope.currentPage > 0) {
                $scope.currentPage--;
            }
        };

        $scope.prevPageDisabled = function () {
            return $scope.currentPage === 0 ? "disabled" : "";
        };

        $scope.pageCount = function () {
            return Math.ceil($scope.products.length / $scope.itemsPerPage) - 1;
        };

        $scope.nextPage = function () {
            if ($scope.currentPage < $scope.pageCount()) {
                $scope.currentPage++;
            }
        };

        $scope.nextPageDisabled = function () {
            return $scope.currentPage === $scope.pageCount() ? "disabled" : "";
        };

        $scope.setPage = function (n) {
            $scope.currentPage = n;
        };

    };

});