app.controller('LoginController', function($scope, $http, $location, $rootScope, UserService)
		{
	$scope.login = function(user)
	{
		$scope.loginError = false;
		UserService.login(user, function(response)
				{
				$rootScope.currentuser = response.username;
				$rootScope.userId = response._id;
				$rootScope.user = response;
				$location.url('/profile/'+"user");
				});
	}
		});