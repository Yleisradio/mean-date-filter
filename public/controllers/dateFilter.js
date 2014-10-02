'use strict';

angular.module('mean.date-filter').controller('DateFilterController', ['$scope', 'Global', 'DateFilter',
  function($scope, Global, DateFilter) {
    $scope.global = Global;
    $scope.package = {
      name: 'date-filter'
    };
  }
]);
