/**
 * Created by tjmonsi on 2/7/15.
 */

angular.module('chi2015_controllers').controller("list_of_exhibitors_controller",
  ["$scope", "exhibitors_factory",
  function($scope, exhibitors_factory) {

    $scope.data = []

    start();
    function start(){
      exhibitors_factory.get({}, function(data){
        $scope.data = data.data;
      })
    }
  }])