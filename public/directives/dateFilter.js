'use strict';

angular.module('mean.mean-date-filter').directive('meanDateFilter', ['MeanDateFilter',

  function(MeanDateFilter) {
    return {
      restrict: 'A',
      transclude: 'true',
      scope: {
        dates: '=',
        mode: '@',
        clearText: '@',
        currentText: '@',
        closeText: '@',
        weekText: '@',
        monthText: '@',
        yearText: '@',
        startDateText: '@',
        endDateText: '@',
        format: '@'
      },
      templateUrl: 'mean-date-filter/directives/templates/dateFilter.html',
      link: function($scope, element, attrs) {
        $scope.$watchCollection('dates', function(dates) {
          $scope.dates = dates;
        });
        $scope.$watch('mode', function(mode) {
          changeMode(mode, $scope.save);
        });
        $scope.opened = {
          start: false,
          end: false,
        };
        $scope.toggle = function(type, event) {
          event.preventDefault();
          event.stopPropagation();
          $scope.opened[type] = !$scope.opened[type];
        };

        $scope.week = function() {
          $scope.mode = 'week';
        };
        $scope.month = function() {
          $scope.mode = 'month';
        };
        $scope.year = function() {
          $scope.mode = 'year';
        };

        var changeMode = function(mode, callback) {
          if (mode) {
            if (mode === 'year') {
              $scope.dates.startDate = moment(new Date()).subtract(1, 'year').toDate();
              $scope.dates.endDate = moment(new Date()).subtract(1, 'days').toDate();
            } else if (mode === 'month') {
              $scope.dates.startDate = moment(new Date()).subtract(1, 'month').toDate();
              $scope.dates.endDate = moment(new Date()).subtract(1, 'days').toDate();
            } else if (mode === 'week') {
              $scope.dates.startDate = moment(new Date()).subtract(7, 'days').toDate();
              $scope.dates.endDate = moment(new Date()).subtract(1, 'days').toDate();
            }
            if (typeof callback === 'function') {
              callback();
            }
          }
        };

        $scope.resetMode = function() {
          $scope.mode = null;
        };

        $scope.save = function() {
          MeanDateFilter.setDateFilter($scope.dates.startDate, $scope.dates.endDate, $scope.mode, function(data) {});
        };

        var load = function() {
          MeanDateFilter.getDateFilter(function(data) {
            if (typeof data.startDate !== 'undefined') {
              $scope.dates.startDate = moment(data.startDate).toDate();
            }
            if (typeof data.endDate !== 'undefined') {
              $scope.dates.endDate = moment(data.endDate).toDate();
            }
            if (typeof data.mode !== 'undefined') {
              $scope.mode = data.mode;
            }
          });
        };
        load();

        if (!$scope.dates.startDateText) {
          $scope.dates.startDateText = 'Start Date';
        }
        if (!$scope.dates.endDateText) {
          $scope.dates.endDateText = 'End Date';
        }
        if (!$scope.weekText) {
          $scope.weekText = 'Week';
        }
        if (!$scope.monthText) {
          $scope.monthText = 'Month';
        }
        if (!$scope.yearText) {
          $scope.yearText = 'Year';
        }
      }
    };
  }
]);
