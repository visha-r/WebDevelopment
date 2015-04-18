var express = require('express');
var mongoose = require('mongoose');
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var bodyParser = require('body-parser');
var multer = require('multer');
var cookieParser = require('cookie-parser');
var session = require('express-session');

var app = express();
app.use(cookieParser())
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(session({ secret: 'this is the secret' }));
app.use(multer());
app.use(passport.initialize());
app.use(passport.session());
app.use(express.static(__dirname + '/public'));

var connectionString = process.env.OPENSHIFT_MONGODB_DB_URL || 'mongodb://localhost/Shopping';
mongoose.connect(connectionString);

var ProductSchema = new mongoose.Schema(
		{ sku: Number, reviews:[ReviewSchema]});

var ReviewSchema = new mongoose.Schema(
		{
			sku:Number, title:String, reviewer:[ReviewerSchema], comment:String, submissionTime:Date, rating: Number, local:Boolean
		}
);

var CartSchema = new mongoose.Schema(
		{
			id:Number,
			count:Number
		}
);

var FavoriteSchema = new mongoose.Schema(
		{
			id:Number
		}
);

var UserSchema = new mongoose.Schema(
		{ 
			firstname: String, lastname: String, email: String, phone: Number, address: String, 
			country: String, username: String, password : String, favorites :[FavoriteSchema], cart : [CartSchema],
			reviews:[ReviewSchema], follows : [{username: String}], followedBy : [{username: String}]
		});

var ReviewerSchema = new mongoose.Schema(
		{
			name:String
		}
);

var ProductDetail = mongoose.model("ProductDetail", ProductSchema);
var UserDetail = mongoose.model("Userdetail", UserSchema);

passport.use(new LocalStrategy(
		function(username, password, done)
		{
			UserDetail.findOne({username:username, password:password}, function(err, user){
				if(user){
					return done(null, user);
				}
				return done(null, false, {message: 'Unable to login'});
			})
		}));

passport.serializeUser(function(user, done) {
	done(null, user);
});
passport.deserializeUser(function(user, done) {
	done(null, user);
});

var auth = function(req, res, next)
{
	if (!req.isAuthenticated())
		res.send(401);
	else
		next();
};

app.get('/loggedin', function(req, res)
		{
	res.send(req.isAuthenticated() ? req.user : '0');
		});

app.get('/user/login', function(req,res){
	UserDetail.find(function(err,users){
		res.json(users);
	})
})

app.post('/user/login', passport.authenticate('local'), function(req, res)
		{
	res.send(req.user);
		});

app.post('/user/logout', function(req, res)
		{
	req.logOut();
	res.sendStatus(200);
		});

//ajax target for checking username
app.post('/user/checkUsername', function(req, res) {
	var username = req.body.username;
	// check if username is already taken - query your db here
	var usernameTaken = false;
	UserDetail.findOne({username: username}, function(err,user){
		if(user)
		{
			usernameTaken = true;
		}
		if (usernameTaken) {
			res.json(403, {
				isTaken: true
			});
			return
		}
		else
		{
			// looks like everything is fine
			res.send(200);
		}
	})
});

//ajax target for checking password
app.post('/user/checkPassword', function(req, res) {
	console.log('success');
	var username = req.body.username;
	console.log(req.body.username);
	// check if password matches
	var noMatch = false;
	UserDetail.findOne({username: username}, function(err,user){
		if(user.password != req.body.password)
		{
			noMatch = true;
		}
		if (noMatch) {
			res.json(403, {
				noMatch: true
			});
			return
		}
		else
		{
			// looks like everything is fine
			res.send(200);
		}
	})
});

app.get('/product/fetchAll', function(req,res){
	ProductDetail.find(function(err,products){
		res.json(products);
	})
})

app.get('/user/favorites/:id', function(req,res){
	UserDetail.findById(req.params.id, function(err,users){
		res.json(users.favorites);
	})
})

app.get('/user/reviews/:id', function(req,res){
	UserDetail.findById(req.params.id, function(err,users){
		res.json(users.reviews);
	})
})

app.get('/user/details/:username', function(req,res){
	UserDetail.findOne({username: req.params.username}, function(err,user){
		res.json(user);
	})
})

app.get('/user/cart/:id', function(req,res){
	UserDetail.findById(req.params.id, function(err,users){
		res.json(users.cart);
	})
})

app.post('/product/addReview', function (req, res) {
	var product = new ProductDetail(req.body);
	product.save(function (err, doc){
		res.json(req.body);
	})
});

app.put('/product/updateReview/:id', function (req, res) {
	console.log('inside update product');
	console.log(req.body.reviews);
	ProductDetail.findById(req.params.id, function(err, data){
		data.reviews = req.body.reviews;
		data.save(function(err, result){
			ProductDetail.findById(req.params.id, function(err, doc){
				console.log('updated');
				console.log(doc.reviews);
				res.json(doc.reviews);
			})
		})
	})
});

app.put('/user/addFavorite/:id', function(req,res){
	UserDetail.findById(req.params.id, function(err, data){
		data.favorites = req.body.favorites;
		data.save(function(err, result){
			UserDetail.findById(req.params.id, function(err, doc){
			})
		})
	})
});

app.put('/user/updateUser/:id', function(req,res){
	UserDetail.findById(req.params.id, function(err, data){
		data.firstname = req.body.firstname;
		data.lastname = req.body.lastname;
		data.address = req.body.address;
		data.country = req.body.country;
		data.email = req.body.email;
		data.password = req.body.password;
		data.phone = req.body.phone;
		data.save(function(err, result){
			UserDetail.findById(req.params.id, function(err, doc){
				res.json(doc);
			})
		})
	})
});

app.put('/user/addReview/:id', function(req,res){
	console.log('before updating');
	console.log(req.body);
	UserDetail.findById(req.params.id, function(err, data){
		data.reviews = req.body.reviews;
		data.save(function(err, result){
			UserDetail.findById(req.params.id, function(err, doc){
				console.log(doc.reviews);
				res.json(doc.reviews);
			})
		})
	})
});


app.put('/user/addToCart/:id', function(req,res){
	UserDetail.findById(req.params.id, function(err, data){
		data.cart = req.body.cart;
		data.save(function(err, result){
			UserDetail.findById(req.params.id, function(err, doc){
			})
		})
	})
})

app.put('/user/addToCartFromFavorite/:id', function(req,res){
	UserDetail.findById(req.params.id, function(err, data){
		data.cart = req.body.cart;
		data.save(function(err, result){
			UserDetail.findById(req.params.id, function(err, doc){
				console.log(doc);
				res.json(doc);
			})
		})
	})
})

app.put('/user/updateCart/:id', function(req,res){
	UserDetail.findById(req.params.id, function(err, data){
		data.cart = req.body.cart;
		data.save(function(err, result){
			UserDetail.findById(req.params.id, function(err, doc){
				res.json(doc.cart);
			})
		})
	})
})

app.put('/user/addFollows/:id', function(req,res){
	UserDetail.findById(req.params.id, function(err, user){
		user.follows = req.body.follows;
		user.save(function(err, result){
			UserDetail.findById(req.params.id, function(err, updatedUser){
				res.json(updatedUser);
			})
		})
	})
})

app.put('/user/addFollowedBy/:id', function(req,res){
	UserDetail.findById(req.params.id, function(err, user){
		user.followedBy = req.body.followedBy;
		user.save(function(err, result){
			res.json(result);
		})
	})
})

app.post('/user/register', function(req,res){
	var user = new UserDetail(req.body);
	user.save(function (err, doc){
		res.json(err);
	})
});

var ip = process.env.OPENSHIFT_NODEJS_IP || '127.0.0.1';
var port = process.env.OPENSHIFT_NODEJS_PORT || 3000;

app.listen(port,ip);