'use strict';

angular.module('mean.mean-date-filter').directive('meanDateFilter', ['DateFilter',

  function(DateFilter) {
    return {
      restrict: 'A',
      transclude: 'true',
      scope: {
        startDate: '=',
        endDate: '=',
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
        $scope.$watch(attrs.startDate, function(startDate) {
          $scope.startDate = startDate;
        });
        $scope.$watch(attrs.endDate, function(endDate) {
          $scope.endDate = endDate;
        });
        $scope.$watch(attrs.mode, function(mode) {
          changeMode(mode());
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
              $scope.startDate = moment(new Date()).subtract(1, 'year').toDate();
              $scope.endDate = moment(new Date()).subtract(1, 'days').toDate();
            } else if (mode === 'month') {
              $scope.startDate = moment(new Date()).subtract(1, 'month').toDate();
              $scope.endDate = moment(new Date()).subtract(1, 'days').toDate();
            } else if (mode === 'week') {
              $scope.startDate = moment(new Date()).subtract(7, 'days').toDate();
              $scope.endDate = moment(new Date()).subtract(1, 'days').toDate();
            }
            if (typeof callback === 'function') {
              callback();
            }
          }
        }

        $scope.resetMode = function() {
          $scope.mode = null;
        };

        $scope.save = function() {
          DateFilter.setDateFilter($scope.startDate, $scope.endDate, $scope.mode, function(data) {});
        };

        var load = function() {
          DateFilter.getDateFilter(function(data) {
            if (typeof data.startDate !== 'undefined') {
              $scope.startDate = moment(data.startDate).toDate();
            }
            if (typeof data.endDate !== 'undefined') {
              $scope.endDate = moment(data.endDate).toDate();
            }
            if (typeof data.mode !== 'undefined') {
              $scope.mode = data.mode;
            }
          });
        }
        load();

        if (!$scope.startDateText) {
          $scope.startDateText = 'Start Date';
        }
        if (!$scope.endDateText) {
          $scope.endDateText = 'End Date';
        }
        if (!$scope.weekText) {
          $scope.weekText = 'Viikko';
        }
        if (!$scope.monthText) {
          $scope.monthText = 'Kuukausi';
        }
        if (!$scope.yearText) {
          $scope.yearText = 'Vuosi';
        }
      }
    };
  }
]);
