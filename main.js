var mainApp = angular.module("mainApp", ['ngRoute']);

mainApp.config(function($routeProvider) {
	$routeProvider
		.when('/home', {
			templateUrl: 'home.html',
			controller: 'HotelsController'
		})
		.otherwise({
			redirectTo: '/home'
		});
});

mainApp.controller('HotelsController', function($scope, $http, $timeout) {
	$scope.showLoadDetails = false;
	$scope.errorPage = false;
	$scope.reviewPresent = false;
	$scope.div_=[]; 
	$scope.reviews = [];

	$scope.rating = function(rate){
		rate = Math.round(rate * 2) / 2;
	  let htmlTag = [];
	  for (var i = rate; i >= 1; i--)
	    htmlTag.push('<i class="fa fa-star" aria-hidden="true" style="color: gold;"></i>&nbsp;');
	  if (i == .5) htmlTag.push('<i class="fa fa-star-half-o" aria-hidden="true" style="color: gold;"></i>&nbsp;');
	  for (let i = (5 - rate); i >= 1; i--)
	    htmlTag.push('<i class="fa fa-star-o" aria-hidden="true" style="color: gold;"></i>&nbsp;');

	  return htmlTag.join('');
	}

	$scope.loadHotels = function(){
		$http.get('http://fake-hotel-api.herokuapp.com/api/hotels?count=5')
  	.then(function(response){
			$scope.hotels = response.data;
			$scope.showLoadDetails = true;
			$scope.errorPage = false;
			$timeout(function() {
	      $scope.hotels.forEach(function(hotel, index){
	      	var stars = "stars";
	      	var reviews = "reviews"
					document.getElementById(stars+index).innerHTML = $scope.rating(hotel.stars);
					document.getElementById(reviews+index).innerHTML = $scope.rating(hotel.rating);
					var start_date = hotel.date_start.split("T")[0];
					var end_date = hotel.date_end.split("T")[0];
					hotel.date_start = start_date.split("-")[2]+"."+start_date.split("-")[1]+"."+start_date.split("-")[0]
					hotel.date_end = end_date.split("-")[2]+"."+end_date.split("-")[1]+"."+end_date.split("-")[0]
				});  
	    }, 100);
  	},
    function(data) {
      $scope.errorPage = true;
      $scope.showLoadDetails = false;
    });	
	}

	$scope.showReview = function(id, index){
		console.log(index);
		$http.get('http://fake-hotel-api.herokuapp.com/api/reviews?hotel_id='+id)
  	.then(function(response){
  		if($scope.div_[index] === undefined){
  			$scope.div_[index]=true;
  		}
  		else if($scope.div_[index] === true){
  			$scope.div_[index]=false;
  		}
  		else{
  			$scope.div_[index]=true;
  		}
  		
			$scope.reviews[index] = response.data;
  	},
    function(data) {
     console.log(data);
    });	
	}
});