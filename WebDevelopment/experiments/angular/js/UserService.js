app.factory("ProductService", function ProductService($http) {
    var fetchProducts = function (manufacturer, callback) {
        $http.jsonp('http://api.remix.bestbuy.com/v1/products(manufacturer=' + manufacturer + ')?format=json&show=all&callback=JSON_CALLBACK&apiKey=wu48f36djjruzarbeahrx8ay')
            .success(callback);
    };

    var favoriteProducts = [];
    var addToFavorites = function (product) {
        favoriteProducts.push(product);
        console.log(favoriteProducts);
    }

    var getFavorites = function () {
        for (var j in users) {
            var favoriteProductSIds = [];
            favoriteProducts = [];
            if (users[j].username == currentuser) {
                favoriteProductSIds = users[j].favoriteProducts;
                for (var f in users[j].favoriteProducts) {
                    $http.jsonp('http://api.remix.bestbuy.com/v1/products(sku=' + users[j].favoriteProducts[f] + ')?format=json&show=all&callback=JSON_CALLBACK&apiKey=wu48f36djjruzarbeahrx8ay')
                    .success(function (response) {
                    favoriteProducts.push(response.products[0]);
                    console.log('printing product ' + f);
                    console.log(response)
                });
                }               
                return favoriteProducts;
            }
        }
    }

    var myReviews = [];
    var addToReviews = function (review) {
        myReviews.push(review);
        console.log(myReviews);
    }

    var getReviews = function () {
        for (var j in users) {
            var reviewIds = [];
            if (users[j].username == currentuser) {
                reviewIds = users[j].reviews;
                for (var r in users[j].reviews) {
                    $http.jsonp('http://api.remix.bestbuy.com/v1/reviews(id=' + users[j].reviews[r] + ')?format=json&show=all&callback=JSON_CALLBACK&apiKey=wu48f36djjruzarbeahrx8ay')
                                    .success(function (response) {
                                        console.log('printing response ' + r);
                                        myReviews.push(response.reviews[0]);
                                        console.log(response);
                                    });
                }               
                return myReviews;
            }          
        }
        };

    var users = [
        {
            username: "john", password: "john", favoriteProducts: [5571203, 9878299, 4442019, 3318043],
            reviews: [38373652, 35664486, 35617114]
        },
        {
            username: "steve", password: "steve", favoriteProducts: [2607018, 1752772, 6876557, 3421338],
            reviews: [43246905, 39486888, 39708452]
        }
    ];

    var currentuser = null;

    var login = function (username) {
        for (var i in users) {
            if (users[i].username == username) {
                currentuser = users[i].username;
                return currentuser;
            }
            else
                currentuser = null;
        }
        return currentuser;
    }

    var logout = function () {
        currentuser = null;
        myReviews = [];
        favoriteProducts = [];
    }

    return {
        fetchProducts: fetchProducts,
        addToFavorites: addToFavorites,
        getFavorites: getFavorites,
        addToReviews: addToReviews,
        getReviews: getReviews,
        login: login,
        logout: logout
    }
})