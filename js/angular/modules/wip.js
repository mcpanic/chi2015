angular.module('chi2015_controllers').controller("wip_controller",
  ["$scope", "wip_factory", "$window",
  function($scope, wip_factory, $window) {

    $scope.data = []

    $scope.isWide = function() {
      console.log("HELLO")
        return $window.innerWidth > 768; //your breakpoint here.
    }

    start();
    function start(){
      wip_factory.get({}, function(data){
        $scope.data = data.data;
        console.log($scope.data)
      })
    }
  }])