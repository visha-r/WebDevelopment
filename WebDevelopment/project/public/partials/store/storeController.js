app.controller('StoreController', function($scope,$http, ProductService){
	$scope.searchStores = function(){
		ProductService.storeLocator($scope.zipcode, function(response){
			$scope.stores = response.stores;
		})
	}
})