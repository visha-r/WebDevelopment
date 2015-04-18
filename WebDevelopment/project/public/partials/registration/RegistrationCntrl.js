app.controller('registerController', function ($scope, $http, ProductService, $location) {
	$scope.errMsg = "success";
	$scope.user = {};

	$http.get("http://api.geonames.org/countryInfo?type=JSON&username=visha")
	.success(function(response){
		$scope.countryList = response.geonames;
	})

	$scope.register = function(){
		ProductService.register($scope.user, function(response){
			if(!response){
				$scope.errMsg = null;
			}
			$location.url('/registrationSuccess');
		});
	};
});