//setter
var app = angular.module("app",[]).config(function($routeProvider){
	$routeProvider.when('/d3Charts',{
		templateUrl:'d3Charts.html',
		//controller:'d3ChartsController'
	});

	$routeProvider.when('/d3Cluster',{
		templateUrl:'d3Cluster.html',
		//controller:'d3ClusterController'
	});

	$routeProvider.when('/angularTemplate',{
		templateUrl:'angularTemplate.html',
		controller:'angularTemplateController'
	});

	$routeProvider.when('/css3animate',{
		templateUrl:'css3animate.html',
		controller:'css3animateController'
	});

	$routeProvider.when('/phpAjax',{
		templateUrl:'phpAjax.html',
		controller:'phpAjaxController'
	});

	$routeProvider.otherwise({
		redirectTo:'/login'
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



app.controller('angularTemplateController',function($scope, myService){
	$scope.resources = myService.getResource();
	$scope.notes = myService.getNotes();
});

app.controller('css3animateController',function($scope){
	$scope.title = "Css3 animation - many parts comes from old websites";
});

app.controller('phpAjaxController',function($scope){
	$scope.title = "PHP + Ajax - ulac back to front test simple";
});

