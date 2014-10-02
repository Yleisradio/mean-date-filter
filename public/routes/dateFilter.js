'use strict';

angular.module('mean.date-filter').config(['$stateProvider',
  function($stateProvider) {
    $stateProvider.state('dateFilter example page', {
      url: '/dateFilter/example',
      templateUrl: 'date-filter/views/index.html'
    });
  }
]);
