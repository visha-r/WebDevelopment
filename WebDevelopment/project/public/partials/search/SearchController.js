app.controller('searchController', function ($scope, $http, $routeParams, ProductService, $rootScope, $location) {
	$scope.flag = false;
	$scope.category = $routeParams.category;
	$scope.manufacturer = $routeParams.manufacturer;
	$scope.subclass =  $routeParams.subclass;
	$scope.userId = $routeParams.username;
	$scope.noLogin = $scope.userId;
	$scope.itemsPerPage = 10;
	$scope.orderedBy = "+salePrice";
	$scope.currentPage = 0;

	$scope.pagination = function(){

		$scope.prevPage = function () {
			if ($scope.currentPage > 0) {
				$scope.currentPage--;
			}
		};

		$scope.prevPageDisabled = function () {
			return $scope.currentPage === 0 ? "disabled" : "";
		};

		$scope.pageCount = function () {
			console.log(Math.ceil($scope.products.length / $scope.itemsPerPage)-1);
			return Math.ceil($scope.products.length / $scope.itemsPerPage)-1;
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
	}

	ProductService.fetchProductsByCategory($scope.manufacturer, $scope.category, function(response){
		console.log(response.products);
		$scope.products = response.products;
		//$scope.orderedBy = "name";
		$scope.pagination();

		/*$scope.range = function() {
    	        var rangeSize = 5;
    	        var ret = [];
    	        var start;

    	        start = $scope.currentPage;
    	        if ( start > $scope.pageCount()-rangeSize ) {
    	          start = $scope.pageCount()-rangeSize+1;
    	        }

    	        for (var i=start; i<start+rangeSize; i++) {
    	          ret.push(i);
    	        }
    	        return ret;
    	      };*/
	});
	
	$scope.searchByKeyword = function(){
		$scope.products = [];
		ProductService.searchByKeyword($scope.keyword, function(response){
			$scope.itemsPerPage = 10;
			$scope.orderedBy = "+salePrice";
			$scope.currentPage = 0;
			console.log(response.products);
			$scope.products = response.products;
			$scope.pagination();
		});
	}

	$scope.addToFavorites = function (productId) {
		$http.get('/loggedin').success(function(user)
				{
//			User is Authenticated
			if (user !== '0'){
				$scope.userId = $rootScope.user._id;
				var favorite = {id:productId};
				ProductService.fetchLogin(function(response){
					for(var i in response){
						if(response[i]._id == $scope.userId){
							$scope.user = response[i];
							break;
						}
					}
					$scope.user.favorites.push(favorite);
					ProductService.addFavorite($scope.user);
					$location.url('/profile/'+"favorite");
				}); 
			}
//			User is Not Authenticated
			else
			{
				$location.url('/login');
			}
				});
	};  

	$scope.addToCart = function (productId) {
		$http.get('/loggedin').success(function(user)
				{
//			User is Authenticated
			if (user !== '0'){
				$scope.userId = $rootScope.user._id;
				var cart = {id:productId, count : 1};
				ProductService.fetchLogin(function(response){
					for(var i in response){
						if(response[i]._id == $scope.userId){
							$scope.user = response[i];
							break;
						}
					}

					var alreadyPresent = false;	
					for(var i in $scope.user.cart)	{
						(function(i){
							if($scope.user.cart[i].id == productId){
								console.log('present');
								alreadyPresent = true;
								$scope.user.cart[i].count +=1;
								$rootScope.cartCount += 1;
								ProductService.addToCart($scope.user);
								$location.url('/profile/'+"cart");
							}
						})(i);
					}
					if(!alreadyPresent){
						console.log('not present');
						$scope.user.cart.push(cart);
						$rootScope.cartCount += 1;
						console.log($scope.user);
						ProductService.addToCart($scope.user);
						$location.url('/profile/'+"cart");
					}
				})
			}
//			User is Not Authenticated
			else
			{
				$location.url('/login');
			}
				});
	}
});