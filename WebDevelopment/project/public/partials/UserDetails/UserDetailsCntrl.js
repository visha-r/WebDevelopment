app.controller('UserDetailsController', function ($scope, $http, $routeParams, UserService, ProductService, $location, $rootScope) {

	$scope.username = $routeParams.username;
	$scope.currentuser = $rootScope.currentuser;
	$scope.followsAlready = false;
	UserService.checkLoggedIn(function(result)
			{
		if (result !== '0'){
			UserService.getUserDetails($scope.currentuser, function(response){
				for(var i in response.follows){
					if(response.follows[i].username == $scope.username){
						$scope.followsAlready = true;
						break;
					}
				}

			})
		}
			})

			UserService.getUserDetails($scope.username, function(response){
				$scope.user = response;
				$scope.userId = response._id;

				// fetches the details of the favorite products from the remote database
				var skuList = [];
				for(var i in $scope.user.favorites)
				{
					skuList.push($scope.user.favorites[i].id);
				}
				ProductService.fetchMultipleProducts(skuList.join(), function(response){
					$scope.favoriteProducts = [];
					for(var i in response.products){
						$scope.favoriteProducts.push(response.products[i]);
					}
				})

				// fetches the details of the reviewed products from the remote database
				skuList = [];
				for(var i in $scope.user.reviews)
				{
					skuList.push($scope.user.reviews[i].sku);
				}
				ProductService.fetchMultipleProducts(skuList.join(), function(response){
					$scope.reviewedProducts = [];
					for(var i in response.products){
						var tempProduct = response.products[i];
						for(var j in $scope.user.reviews){
							if($scope.user.reviews[j].sku == response.products[i].sku){
								tempProduct.userReview = $scope.user.reviews[j];
								$scope.reviewedProducts.push(tempProduct);
								break;
							}
						}
					}
				})
			})


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

	$scope.followUser = function(){
		UserService.checkLoggedIn(function(result)
				{
//			User is Authenticated
			if (result !== '0'){
				UserService.getUserDetails($scope.currentuser, function(result){
					result.follows.unshift({username:$scope.username});
					$scope.followsAlready = true;
					UserService.addFollows(result, function(response){
						UserService.getUserDetails($scope.username, function(response){
							response.followedBy.unshift({username:$scope.currentuser});
							UserService.addFollowedBy(response, function(){
								$location.url('/profile/'+"network");
							})

						})
					})			
				})
			}
			else{
				$location.url('/login');
			}
				})
	}

	// unfollows the user which the user already follows	
	$scope.unfollowUser = function(){
		UserService.checkLoggedIn(function(result)
				{
//			User is Authenticated
			if (result !== '0'){
				var ptr = 0;
				for(var i in result.follows){
					if(result.follows[i].username == $scope.username){
						ptr = i;
						break;
					}
				}
				result.follows.splice(ptr,1);
				$scope.user.follows.splice(ptr,1);
				$scope.followsAlready = false;

				UserService.addFollows(result, function(response){
					UserService.getUserDetails($scope.username, function(newUser){
						var ptr1 = 0;
						for(var i in newUser.followedBy){
							if(newUser.followedBy[i].username == result.username){
								ptr1 = i;
								break;
							}
						}
						newUser.followedBy.splice(ptr1,1);
						UserService.addFollowedBy(newUser, function(){
							$location.url('/profile/'+"network");
						})
					})
				})			
			}
			else{
				$location.url('/login');
			}
				})
	}	
})