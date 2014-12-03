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
        format: '@',
        momentjsFormat: '@'
      },
      templateUrl: 'mean-date-filter/directives/templates/dateFilter.html',
      link: function($scope, element, attrs) {
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
          changeMode('week', $scope.save);
        };
        $scope.month = function() {
          changeMode('month', $scope.save);
        };
        $scope.year = function() {
          changeMode('year', $scope.save);
        };

        var changeMode = function(mode, callback) {
          if (mode) {
            $scope.mode = mode;
            if (mode === 'year') {
              $scope.dates.startDate = moment(new Date()).subtract(1, 'year').format($scope.momentjsFormat);
              $scope.dates.endDate = moment(new Date()).subtract(1, 'days').format($scope.momentjsFormat);
            } else if (mode === 'month') {
              $scope.dates.startDate = moment(new Date()).subtract(1, 'month').format($scope.momentjsFormat);
              $scope.dates.endDate = moment(new Date()).subtract(1, 'days').format($scope.momentjsFormat);
            } else if (mode === 'week') {
              $scope.dates.startDate = moment(new Date()).subtract(7, 'days').format($scope.momentjsFormat);
              $scope.dates.endDate = moment(new Date()).subtract(1, 'days').format($scope.momentjsFormat);
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
              $scope.dates.startDate = moment(data.startDate).format($scope.momentjsFormat);
            }
            if (typeof data.endDate !== 'undefined') {
              $scope.dates.endDate = moment(data.endDate).format($scope.momentjsFormat);
            }
            if (typeof data.mode !== 'undefined') {
              $scope.mode = data.mode;
            }
          });
        };
        load();

        if (!$scope.startDateText) {
          $scope.startDateText = 'Start Date';
        }
        if (!$scope.endDateText) {
          $scope.endDateText = 'End Date';
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
