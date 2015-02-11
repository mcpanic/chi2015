angular.module('chi2015_controllers').controller("interactivity_controller",
  ["$scope", "interactivity_factory",
  function($scope, interactivity_factory) {

    $scope.data = []

    start();
    function start(){
      interactivity_factory.get({}, function(response){
        var data = response.data
        for (var i in data){
          console.log(data[i]!=null)
            if (data[i][0]!=null) {
              var obj = {
              id: data[i][0],
              title: data[i][1],
              authors: data[i][2],
              abstract: data[i][3],
              title_2: data[i][4],
              description: data[i][5],
              toggle: false
            }
            $scope.data.push(obj)
          }
          
          //console.log($scope.data)
          
      }
        // $scope.data = data;
    })
  }

  $scope.toggle = function(id){
    for (var i in $scope.data){
      if ($scope.data[i].id==id) $scope.data[i].toggle = !$scope.data[i].toggle
    }
  }
}])