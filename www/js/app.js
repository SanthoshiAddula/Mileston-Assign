
var myApp = angular.module('weatherHistory',[]);

myApp.controller('weatherCtrl',function($scope,$filter,$q,pastWeekWeather,CalcDateService){
	$scope.showWeatherInfo = false;
	$scope.showLoader = false;
	$scope.location = '';
	$scope.dates = CalcDateService.getPastWeekDates();
	// call this method on click of submit to show weather information
	$scope.updateWeather = function() {
		$scope.inputLocation = $scope.location;
		$scope.showLoader = true;
		$scope.lastWeekWeather = {};
		var weatherHistory = [];
		var deferred = $q.defer();
		angular.forEach($scope.dates,function(dtValue,key){
			var tempDate = $filter('date')(dtValue, 'yyyy-MM-dd');
		  
			weatherHistory.push(pastWeekWeather.getWeather($scope.location,tempDate));
			deferred.resolve(weatherHistory);
		});
		$q.all(weatherHistory).then(function (data){
			$scope.lastWeekWeather= data;
			$scope.showWeatherInfo = true;
			$scope.showLoader = false;
		},function failure(err){
			console.log("error");
		});			
	};		
});

//service for getting the past 7 days' dates
myApp.service('CalcDateService', function($filter){

  var date = new Date();
  
  this.getPastWeekDates = function() {
    var dateArray = [];
    for(i=0;i<7;i++) {
      var tempDate = new Date();
      tempDate.setDate(date.getDate()-i);
      dateArray.push(tempDate);
    }
    
    return dateArray;
  };

});

//service for retrieving the weather information based on location and date
myApp.service('pastWeekWeather', function($http,$filter,$q,CalcDateService){
  
  this.getWeather = function(place,tempDate) {
  	var pastWeekWeatherObj = {};
  	var tempWeather,weatherHistory,promiseArray = [];
  	var locationSearched,errorMsg="";	  

    var weatherApiUrl = 'https://api.apixu.com/v1/history.json?key=4c158abc25e84e9b98872525171606&q='+place+'&dt='+tempDate;

      var promise = $http({
        method: 'GET',
        url: weatherApiUrl
      }).then(function (response){
        var data = response.data.forecast;
		    var location = response.data.location;
		    locationSearched = location.name+", "+location.region+", "+location.country;
        var maxtemp_f = data.forecastday[0].day.maxtemp_f;
        var mintemp_f = data.forecastday[0].day.mintemp_f;
        var condition = data.forecastday[0].day.condition.text;
        tempWeather = {
          date:tempDate,
          maxTemp:maxtemp_f,
          minTemp:mintemp_f,
          condition:condition,
          location:locationSearched
        }
        return tempWeather;

      },function (error){
		    tempWeather = {
		      errorMsg:"No results found"
		    }
		    return tempWeather;
      });
      return promise;
	
  };

});

