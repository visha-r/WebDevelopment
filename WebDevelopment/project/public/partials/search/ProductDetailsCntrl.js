app.controller('ProductDetailsController', function ($scope, $http, $routeParams, ProductService, UserService, $rootScope, $location) {

	$scope.show = false;
	$scope.myshow = true;
	$scope.btnshow = false;
	var sku = $routeParams.sku;
	$scope.userId = $routeParams.userId;

	// fetches all related products from the remote database
	ProductService.getProduct($routeParams.sku, function(response){
		$scope.product = response.products[0];
		$scope.relatedProducts = [];
		
		// fetches the details of the favorite products from the remote database
		var skuList = [];
		for(var i in $scope.product.relatedProducts)
		{
			if(i==8)
				break;
			skuList.push($scope.product.relatedProducts[i].sku);
		}
		ProductService.fetchMultipleProducts(skuList.join(), function(response){
			$scope.favoriteProducts = [];
			for(var i in response.products){
				$scope.relatedProducts.push(response.products[i]);
			}
		})
		
	})

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
	};

	/*$scope.getReviews = function(){
		ProductService.getReviews(sku, function(response){
			$scope.reviews = response.reviews;
			ProductService.fetchProducts(function(response){
				for(var i in response){
					if(response[i].sku == sku){
						var tempReviews = $scope.reviews.concat(response[i].reviews);
						$scope.reviews = [];
						$scope.reviews = tempReviews;
						break;
					}
				}
			})
		})
	}*/
	
	$scope.getReviews = function(){
			$scope.reviews = [];
			ProductService.fetchProducts(function(response){
				for(var i in response){
					(function(i){
						if(response[i].sku == sku){
						var tempReviews = $scope.reviews.concat(response[i].reviews);
						$scope.reviews = [];
						$scope.reviews = tempReviews;
					}
				})(i);
				}
				ProductService.getReviews(sku, function(response){
					var tempReviews1 = $scope.reviews.concat(response.reviews);
					$scope.reviews = [];
					$scope.reviews = tempReviews1;
			})
		})
	}

	$scope.CheckIfLogged = function(){
		UserService.checkLoggedIn(function(user)
				{
//			User is Authenticated
			if (user !== '0'){
				$scope.userId = $rootScope.user._id;
				$scope.user = $rootScope.user;

			}
//			User is Not Authenticated
			else
			{
				$location.url('/login');
			}
				});
	}

	$scope.submitReview = function(review){

		ProductService.fetchLogin(function(response){
			for(var i in response){
				if(response[i]._id == $scope.userId){
					$scope.user = response[i];
					break;
				}
			}
			var reviewer = [];
			reviewer.push({name:$scope.user.username});

			// creates a new review object adding all necessary fields
			var myReview = {
					comment:review.comment, 
					title:review.title, 
					submissionTime : new Date(),
					reviewer : reviewer,
					rating: review.rating,
					local: true,  // tells if the review is a local one
					sku:sku		 // id of the product for which the review has been written
			};

			// resets the fields for dynamic hide and show
			review.comment = "";
			review.title = "";
			review.rating = 1;

			if(typeof $scope.user.reviews == undefined){
				$scope.user.reviews = [];
			}

			// updates the user's profile by adding this review to his reviews list
			$scope.user.reviews.push(myReview);
			console.log($scope.user.reviews);
			ProductService.addReviews($scope.user, function(response){

			});

			$scope.reviews.unshift(myReview);

			// fetches the local reviews of the product if there is any
			var localProduct = {};
			ProductService.fetchProducts(function(response){
				for(var i in response){
					if(response[i].sku == sku){
						localProduct = response[i];
						break;
					}
				}

				// if the products doesn't have any local reviews already, a new review will be created

				if(jQuery.isEmptyObject(localProduct)){
					var localReview = [];
					localReview.unshift(myReview);
					localProduct = {sku: sku, reviews:localReview};
					ProductService.addProductReview(localProduct, function(response){

					})
				}
				// if the product already has local reviews, the current review will be pushed to it
				else
				{
					localProduct.reviews.unshift(myReview);
					ProductService.updateProductReview(localProduct, function(response){

					})
				}
			})
		})
	}
});