'use strict';

angular.module('mean.mean-date-filter').factory('MeanDateFilter', ['$http',
  function($http) {
  	var setDateFilter = function(startDate, endDate, mode, callback) {
  		$http.put('dateFilter', {
  			startDate: startDate,
  			endDate: endDate,
  			mode: mode
  		}).success(function(data) {
  			callback(data);
  		});
  	};
  	var getDateFilter = function(callback) {
  		$http.get('dateFilter').success(function(data) {
  			callback(data);
  		});
  	};	
    return {
      setDateFilter: setDateFilter,
      getDateFilter: getDateFilter
    };
  }
]);
