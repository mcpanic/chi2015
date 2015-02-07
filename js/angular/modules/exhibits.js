/**
 * Created by tjmonsi on 2/7/15.
 */

angular.module('chi2015_controllers').controller("list_of_exhibitors_controller",
  ["$scope", "$window", "exhibitors_factory",
  function($scope, $window, exhibitors_factory) {

    $scope.isWide = function() {
      return $window.innerWidth > 768; //your breakpoint here.
    }

    angular.element($window).on('resize', angular.bind($scope, $scope.$apply));

    $scope.data = []

    start();
    function start(){
      exhibitors_factory.get({}, function(data){
        $scope.data = data.data;
      })
    }
  }])