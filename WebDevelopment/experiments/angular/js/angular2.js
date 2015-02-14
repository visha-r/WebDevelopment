$(window).load(function () {
    $(".prdtTable").hide();
});

angular.module('ionicApp', [])
        .controller('MainCtrl', function ($scope, $http) {

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
            };
        });