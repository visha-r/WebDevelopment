app.factory("ProductService", function ProductService($http) {

	var fetch = function () {
		var result = $http.get('/product/fetch')
		.success(function(response){
			console.log('inside service');
			console.log(response);
			return response;
		})
		return result;
	};

	var fetchProducts = function (manufacturer,callback) {
		$http.jsonp('http://api.remix.bestbuy.com/v1/products(manufacturer=' + manufacturer + ')?format=json&show=all&pageSize=50&callback=JSON_CALLBACK&apiKey=wu48f36djjruzarbeahrx8ay')
		.success(callback);
	};   
	
	var searchByKeyword = function (keyword,callback) {
		$http.jsonp('http://api.remix.bestbuy.com/v1/products(search=' + keyword + ')?format=json&show=all&pageSize=50&callback=JSON_CALLBACK&apiKey=wu48f36djjruzarbeahrx8ay')
		.success(callback);
	};  

	var fetchProductsByCategory = function (manufacturer,category, callback) {
		$http.jsonp('http://api.remix.bestbuy.com/v1/products(manufacturer=' + manufacturer + '&class='+category+')?format=json&show=all&pageSize=50&callback=JSON_CALLBACK&apiKey=wu48f36djjruzarbeahrx8ay')
		.success(callback);
	};

	var fetchMultipleProducts = function (skuList, callback) {
		$http.jsonp('http://api.remix.bestbuy.com/v1/products(sku in(' + skuList + '))?format=json&show=all&pageSize=50&callback=JSON_CALLBACK&apiKey=wu48f36djjruzarbeahrx8ay')
		.success(callback);
	};        

	var addProduct = function (product) {
		var result = $http.post('/product/add', product)
		.success(function (response) {
			console.log(response);
			return response;
		});
		return result;
	};

	var getProduct = function(id, callback){
		$http.jsonp('http://api.remix.bestbuy.com/v1/products(sku=' + id + ')?format=json&show=all&callback=JSON_CALLBACK&apiKey=wu48f36djjruzarbeahrx8ay')
		.success(callback);
	};

	var getReviews = function(id, callback){
		$http.jsonp('http://api.remix.bestbuy.com/v1/reviews(sku=' + id + ')?format=json&show=all&callback=JSON_CALLBACK&apiKey=wu48f36djjruzarbeahrx8ay')
		.success(callback);
	};

	var updateProduct = function (product, callback) {
		var updatedResult = $http.put('/product/update/'+product._id, product)
		.success(callback);
		return updatedResult;
	};

	var addFavorite = function(user){
		$http.put('/user/addFavorite/'+user._id, user);
	}

	var addReviews = function(user){
		$http.put('/user/addReview/'+user._id, user);
	}

	var addProductReview = function(product){
		$http.post('/product/addReview', product);
	}

	var updateProductReview = function(product){
		$http.put('/product/updateReview/'+product._id, product);
	}

	var register = function(user,callback){
		$http.post('/user/register',user)
		.success(callback);
	}

	var addToCart = function(user){
		$http.put('/user/addToCart/'+user._id, user);
	}

	var addToCartFromFavorite = function(user, callback){
		$http.put('/user/addToCartFromFavorite/'+user._id, user)
		.success(callback);
	}

	var updateCart = function(user, callback){
		$http.put('/user/updateCart/'+user._id, user)
		.success(callback);
	}

	var fetchLogin = function(callback){
		$http.get('/user/login')
		.success(callback);
	}

	var fetchProducts = function(callback){
		$http.get('/product/fetchAll')
		.success(callback);
	}

	var removeProduct = function (product) {
		var result = $http.delete('/product/remove/'+product._id)
		.success(function (response) {
			return response;
		});
		return result;
	};

	var addReview = function (product, callback) {
		console.log(product);
		console.log(product._id);
		$http.put('/product/addReview/'+ product._id, product)
		.success(callback);
	};

	var removeReview = function (product, callback) {
		var result = $http.put('/product/removeReview/'+ product._id)
		.success(callback);
		return result;
	};

	var updateFavorite = function(user, callback){
		$http.put('/user/addFavorite/'+user._id, user)
		.success(callback);
	}

	var storeLocator = function(zipcode, callback){
		$http.jsonp("http://api.remix.bestbuy.com/v1/stores(area("+zipcode+",10))?format=json&callback=JSON_CALLBACK&apiKey=wu48f36djjruzarbeahrx8ay")
		.success(callback);
	}

	return {
		fetch: fetch,
		fetchProducts : fetchProducts,
		addProduct: addProduct,
		removeProduct : removeProduct,
		updateProduct : updateProduct,
		addReview : addReview,
		fetchLogin : fetchLogin,
		getProduct : getProduct,
		getReviews : getReviews,
		addFavorite : addFavorite,
		fetchProducts : fetchProducts,
		fetchProductsByCategory : fetchProductsByCategory,
		addToCart : addToCart,
		addToCartFromFavorite : addToCartFromFavorite,
		updateCart : updateCart,
		register : register,
		addReviews : addReviews,
		addProductReview : addProductReview,
		updateProductReview : updateProductReview,
		updateFavorite : updateFavorite,
		storeLocator : storeLocator,
		fetchMultipleProducts : fetchMultipleProducts,
		searchByKeyword : searchByKeyword
	}
})