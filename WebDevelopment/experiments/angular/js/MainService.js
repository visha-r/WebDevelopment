app.factory("ProductService", function ProductService($http) {
    var fetchProducts = function (manufacturer,callback) {
        $http.jsonp('http://api.remix.bestbuy.com/v1/products(manufacturer=' + manufacturer + ')?format=json&show=all&callback=JSON_CALLBACK&apiKey=wu48f36djjruzarbeahrx8ay')
            .success(callback);
    };

    var favoriteProducts = [];
    var addToFavorites = function (product) {
        favoriteProducts.push(product);
        console.log(favoriteProducts);
    }

    var getFavorites = function () {
        return favoriteProducts;
    }

    var myReviews = [];
    var addToReviews = function (review) {
        myReviews.push(review);
        console.log(myReviews);
    }

    var getReviews = function () {
        return myReviews;
    }

    var users = [
        { username: "admin", password: "admin" },
        { username: "user", password: "user" }
    ];

    var currentuser = null;

    var login = function (username) {
        for (var i in users) {
            if (users[i].username == username) {
                currentuser = users[i].username;
            }
            else
                currentuser = null;
        }
        return currentuser;
    }

    return {
        fetchProducts: fetchProducts,
        addToFavorites: addToFavorites,
        getFavorites: getFavorites,
        addToReviews: addToReviews,
        getReviews : getReviews
    }
})