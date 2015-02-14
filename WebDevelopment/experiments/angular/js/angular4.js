$(window).load(function () {
    $(".initiallyHidden").hide();
});

angular.module('ionicApp', [])
        .controller('MainCtrl', function ($scope, $http) {
                $(".product").change(function () {
                    var sku = $(".product :selected").val();
                        $http.jsonp('http://api.remix.bestbuy.com/v1/reviews(sku='+sku+')?format=json&apiKey=wu48f36djjruzarbeahrx8ay&show=all&callback=JSON_CALLBACK')
                            .success(function (resp) {
                                $scope.reviews = resp.reviews;
                                console.log(resp.reviews);
                                $(".initiallyHidden").show();
                            })
                            .error(function (data) {
                                $scope.data = "Request failed";
                            });

                });

                $scope.addReviews = function () {
                    var myReview = {
                        title: $scope.myTitle,
                        comment:$scope.myReview,
                        reviewer: [{ name: $scope.myName }],
                    }
                    $scope.reviews.push(myReview);
                    console.log($scope.reviews);
                }
            });