//setter
var app = angular.module("app",[]).config(function($routeProvider){
	$routeProvider.when('/d3Charts',{
		templateUrl:'d3Charts.html',
		//controller:'d3ChartsController'
	})

	.when('/d3Cluster',{
		templateUrl:'d3Cluster.html',
		//controller:'d3ClusterController'
	})

	.when('/angularCMS',{
		templateUrl:'angularCMS.html',
		controller:'angularCMSController'
	})
	.when('/angularCMS/:itemId',{
		templateUrl:'angularDetail.html',
		controller:'angularDetailController'
	})

	.when('/phonegap',{
		templateUrl:'phonegap.html',
		controller:'phonegapController'
	})

	.when('/phpAjax',{
		templateUrl:'phpAjax.html',
		controller:'phpAjaxController'
	})

	.otherwise({
		redirectTo:'/angularCMS'
	});
});

app.factory('myService', function($http){
	return{
		// not use now
		getTeam: function() {
		return $http.get('_/json/team.json').then(function (result) {
		return result.data;
		})
		},
		// not use now
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



app.controller('angularCMSController',function($scope, myService){
	$scope.title = "Angular Data binding";
	$scope.intro = "This is a small example to display startup's resources.";
	$scope.layout = 'grid';
	$scope.resources = myService.getResource();
});

app.controller('angularDetailController', function($scope, myService, $routeParams) {
	$scope.title = "Angular Data binding";
	$scope.intro = "This is a small example to display startup's resources.";
    $scope.people = myService.getResource();
    $scope.whichItem = $routeParams.itemId;
});

app.controller('phonegapController',function($scope){
	$scope.title = "Phonegap + jQmobile presentation";
	$scope.intro = "Two small projects done in the 2011 winter";
});

app.controller('phpAjaxController',function($scope){
	$scope.title = "PHP + Ajax - ulac end to end test";
	$scope.intro = "Coming Soon .... // a preparation for ulac key registration feature ";
});
