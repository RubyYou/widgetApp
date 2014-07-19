//setter
var app = angular.module("app",[]).config(function($routeProvider){
	$routeProvider.when('/team',{
		templateUrl:'team.html',
		controller:'teamController'
	});

	$routeProvider.when('/network',{
		templateUrl:'network.html',
		controller:'networkController'
	});

	$routeProvider.when('/hypothesis',{
		templateUrl:'hypothesis.html',
		controller:'hypothesisController'
	});

	$routeProvider.when('/leanCanvas',{
		templateUrl:'leanCanvas.html',
		controller:'leanCanvasController'
	});

	$routeProvider.otherwise({
		redirectTo:'/team'
	});
});

/*app.controller('LoginController',function($scope,$location){
	$scope.credentials = {username:"",password:""};

	$scope.login =function(){
		if($scope.credentials.username == "lulu"){
			$location.path('home');
		}
	}
});*/

app.factory('myService', function($http){
	return{
		getTeam: function() {
		return $http.get('_/json/team.json').then(function (result) {
		return result.data;
		})
		},
		getNotes: function() {
		return $http.get('_/json/teamNotes.json').then(function (result) {
		return result.data;
		})
		},
		getResource: function() {
		return $http.get('_/json/resourcePeople.json').then(function (result) {
		return result.data;
		})
		}
	}
});

app.controller('teamController',function($scope, myService){
	$scope.members = myService.getTeam();
	$scope.notes = myService.getNotes();
});

app.controller('networkController',function($scope, myService){
	$scope.resources = myService.getResource();
	$scope.notes = myService.getNotes();
});

app.controller('hypothesisController',function($scope){
	$scope.title = "Hypothesis Progress";
});

app.controller('leanCanvasController',function($scope){
	$scope.title = "Lean Canvas Overview";
});

