app.filter('offset', function () {
	return function (input, start) {
		start = parseInt(start, 10);
		return input.slice(start);
	};
});

app.controller('UserProfileController', function ($scope, $http, $routeParams, UserService, ProductService, $rootScope, $location, $timeout) {

	$scope.itemsPerPage = 5;
	$scope.currentPage = 0;
	$scope.oneAtATime = true;
	$scope.profile = true;
	$scope.updProfile = false;
	$scope.updPswd = false ;

	$scope.userActive = false;
	$scope.favActive = false;
	$scope.cartActive = false;
	$scope.reviewActive = false;
	$scope.networkActive = false;

	var tab = $routeParams.activeTab;
	console.log(tab);

	if(tab == 'favorite'){
		$scope.favActive = true;
	}
	else if(tab == 'cart'){
		$scope.cartActive = true;
	}
	else if(tab == 'review'){
		$scope.reviewActive = true;
	}
	else if(tab == 'network'){
		$scope.networkActive = true;
	}
	else {
		$scope.userActive = true;
	}

	$scope.status = {
			isFirstOpen: true,
			isFirstDisabled: false
	};

	$scope.prevPage = function () {
		if ($scope.currentPage > 0) {
			$scope.currentPage--;
		}
	};

	$scope.prevPageDisabled = function () {
		return $scope.currentPage === 0 ? "disabled" : "";
	};

	$scope.pageCount = function () {
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

	$scope.showEdit = true;
	
	$scope.redirectToFav = function(){
		console.log('inside fav');
		$location.url('/profile/'+"favorite");
	}

	// user who is currently logged in
	$scope.username = $rootScope.currentuser;
	console.log( $scope.username);
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

		// fetches the details of the cart products from the remote database
		skuList = [];
		for(var i in $scope.user.cart)
		{
			skuList.push($scope.user.cart[i].id);
		}
		ProductService.fetchMultipleProducts(skuList.join(), function(response){
			$scope.cartProducts = [];
			$scope.totalCount = 0;
			$scope.totalPrice = Number(0);
			$rootScope.cartCount = 0;
			for(var i in response.products){
				$scope.totalCount +=1;
				var prdt = response.products[i];

				for(var j in $scope.user.cart){
					if($scope.user.cart[j].id == response.products[i].sku){
						prdt.count = $scope.user.cart[j].count;
						prdt._id = $scope.user.cart[j]._id;
						$scope.cartProducts.push(prdt);
						$rootScope.cartCount += $scope.user.cart[j].count;
						$scope.totalPrice = $scope.totalPrice + Number(response.products[i].salePrice)*Number($scope.user.cart[j].count);
						break;
					}
				}
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

	// deletes the review the user has written

	$scope.removeReview = function(product,index){
		UserService.getUserDetails($scope.username, function(response){
			var ptr = 0;
			for(var i in response.reviews){
				if(response.reviews[i]._id == product.userReview._id){
					ptr = i;
					break;
				}
			}
			response.reviews.splice(ptr,1);
			$scope.reviewedProducts.splice(index,1);
			var updatedProduct = {};
			ProductService.addReviews(response, function(result){
				console.log(result);
			});
			ProductService.fetchProducts(function(products){
				console.log(products);
				for(var i in products){
					(function(i){
						if(products[i].sku == product.sku){

							for(var j in products[i].reviews){
								if(products[i].reviews[j].submissionTime == product.userReview.submissionTime)
								{
									updatedProduct = products[i];
									updatedProduct.reviews.splice(j,1);
									break;
								}
							}
						}
					})(i);
				}
				ProductService.updateProductReview(updatedProduct, function(response){
				})
			})

		})
	};

	// removes a particular product from the favorite list
	$scope.removeFromFavorite = function(product, index){
		UserService.getUserDetails($scope.username, function(user){
			var ptr = 0;
			for(var i in user.favorites){
				if(user.favorites[i].id == product.sku){
					user.favorites.splice(i,1);
					break;
				}
			}

			$scope.favoriteProducts.splice(index,1);
			ProductService.updateFavorite(user, function(response){
			});
		})
	};

	$scope.addToCart = function (productId) {
		UserService.checkLoggedIn(function(user)
				{
//			User is Authenticated
			if (user !== '0'){
				$scope.userId = $rootScope.user._id;
				var cart = {id:productId, count : 1};
				ProductService.fetchLogin(function(response){
					for(var i in response){
						if(response[i]._id == $scope.userId){
							$scope.user = response[i];

							var alreadyPresent = false;	
							for(var i in $scope.user.cart)	{
								(function(i){
									if($scope.user.cart[i].id == productId){
										alreadyPresent = true;
										$scope.user.cart[i].count +=1;
										$rootScope.cartCount += 1;
										ProductService.addToCart($scope.user);
										$location.url('/profile/'+"cart");
									}
								})(i);
							}
							if(!alreadyPresent){
								$scope.user.cart.push(cart);
								$rootScope.cartCount += 1;
								ProductService.addToCartFromFavorite($scope.user, function(response){
									console.log(response);
									$location.url('/profile/'+"cart");
								});
							}
						}
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

	$scope.unfollowUser = function(username){
		UserService.checkLoggedIn(function(result)
				{
//			User is Authenticated
			if (result !== '0'){
				//var tempUser = result;

				var ptr = 0;
				for(var i in result.follows){
					if(result.follows[i].username == username){
						ptr = i;
						break;
					}
				}
				result.follows.splice(ptr,1);
				$scope.user.follows.splice(ptr,1);

				UserService.addFollows(result, function(response){
					UserService.getUserDetails(username, function(newUser){
						var localUser = newUser;
						var ptr1 = 0;
						for(var i in localUser.followedBy){
							if(localUser.followedBy[i].username == result.username){
								ptr1 = i;
								break;
							}
						}
						localUser.followedBy.splice(ptr1,1);
						UserService.addFollowedBy(localUser, function(){
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

	// updates the product count in the cart
	$scope.updateCount = function(product,index){
		if(product.count==0){
			$scope.removeFromCart(product,index);
		}
		else
		{
			UserService.checkLoggedIn(function(result)
					{
//				User is Authenticated
				if (result !== '0'){
					ProductService.fetchLogin(function(response){
						for(var k in response){
							if(response[k]._id == $scope.userId){
								$scope.user = response[k];
								for(var i in $scope.user.cart){
									(function(i){
										if($scope.user.cart[i].id == product.sku){
											$scope.user.cart[i].count = product.count;
											ProductService.updateCart($scope.user, function(response){
												$scope.totalPrice = 0;
												$rootScope.cartCount = Number(0);
												for(var j in $scope.cartProducts){
													(function(j) {
														$rootScope.cartCount += Number($scope.cartProducts[j].count);
														$scope.totalPrice = $scope.totalPrice + Number($scope.cartProducts[j].salePrice)*Number($scope.cartProducts[j].count);
													})(j);
												}
											});
										}
									})(i);
								}

							}
						}

					}); 
					$scope.cartProducts[index].count = product.count;
					$scope.showEdit = true;   		
				}
				else{
					$location.url('/login');
				}
					})
		}
	};

	// removes a particular product from the cart
	$scope.removeFromCart = function(product, index){
		UserService.getUserDetails($scope.username, function(user){
			var ptr = 0;
			for(var i in user.cart){
				(function(i){
					if(user.cart[i].id == product.sku){
						var localCount = user.cart[i].count;
						user.cart.splice(i,1);
						$scope.cartProducts.splice(index,1);
						ProductService.updateCart(user, function(response){
							$rootScope.cartCount -=  localCount;
							$scope.totalPrice = 0;
							for(var j in $scope.cartProducts){
								$scope.totalPrice = $scope.totalPrice + Number($scope.cartProducts[j].salePrice)*Number($scope.cartProducts[j].count);
							}
						});
					}
				})(i)
			}
		})
	};

	$scope.updatePassword = function(pswd){
		console.log(pswd);
		UserService.checkLoggedIn(function(user)
				{
//			User is Authenticated
			if (user !== '0'){
				$scope.userId = $rootScope.user._id;
				UserService.getUserDetails($scope.username, function(response){
					response.password = pswd;
					console.log(response);
					UserService.updateUser(response, function(resp){
						UserService.logout(function(response)
								{
							$rootScope.currentuser = null;	
							$rootScope.userId = null;
							$rootScope.user = null;
							$location.path('/login');
								});
					})
				})
			}
				})
	}

	$scope.updateProfile = function(){
		UserService.checkLoggedIn(function(user)
				{
//			User is Authenticated
			if (user !== '0'){
				$scope.userId = $rootScope.user._id;
				UserService.getUserDetails($scope.username, function(response){
					response.firstname = $scope.user.firstname;
					response.lastname = $scope.user.lastname;
					response.email = $scope.user.email;
					response.address = $scope.user.address;
					response.phone = $scope.user.phone;
					console.log(response);
					UserService.updateUser(response, function(resp){
						$scope.user = resp
						$rootScope.user = resp;
					})
				})
			}
				})
	}


})