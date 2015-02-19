angular.module('chi2015_controllers').controller('full_program_controller', 
	['$scope', 'papers_factory', 'sessions_factory', 'schedules_factory',
	function($scope, papers_factory, sessions_factory, schedules_factory){

	$scope.schedule = []
	$scope.sessions = {}
	$scope.papers = {}

	start();

	function start(){
		schedules_factory.get({}, function(data){
        $scope.schedule = data.data;

        console.log($scope.schedule)

        sessions_factory.get({}, function(data){
        	$scope.sessions = data

        	for (var i in $scope.sessions) {
        		$scope.sessions[i].session_toggle = "col-md-4"
        	}

        	console.log($scope.sessions)

        	papers_factory.get({}, function(data){
        		$scope.papers = data

        		console.log($scope.papers)
        	})
        })
      })
	}

	$scope.toggle = function(id) {
		for (var i in $scope.sessions) {
			if (i==id && $scope.sessions[i].session_toggle == "col-md-4") $scope.sessions[i].session_toggle = "col-md-12"
			else $scope.sessions[i].session_toggle = "col-md-4"
		}
	}


}])