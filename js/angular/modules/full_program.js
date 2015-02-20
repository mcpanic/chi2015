angular.module('chi2015_controllers').controller('full_program_controller', 
	['$scope', 'papers_factory', 'sessions_factory', 'schedules_factory', "$window",
	 '$location', '$anchorScroll',
	function($scope, papers_factory, sessions_factory, schedules_factory, $window, 
		     $location, $anchorScroll){

	$scope.schedule = []
	$scope.sessions = {}
	$scope.papers = {}
	$scope.schedule_index = 0;

	$scope.isWide = function() {
    	return $window.innerWidth > 1000; //your breakpoint here.
	}

	$scope.isDesktop = function() {
		return $window.innerWidth > 768; //your breakpoint here.
	}

	$scope.returnClass = function() {
		if ($scope.isWide() && $scope.isDesktop()) return "col-md-2"
		else if ($scope.isDesktop) return "col-sm-3"
		else return "col-xs-6"
	}

	$scope.full4_toggle = function(id) {
		$scope.sessions[id].full4_toggle = !$scope.sessions[id].full4_toggle
		if ($scope.sessions[id].full4_toggle) {
			$location.hash(id);

		      // call $anchorScroll()
		    $anchorScroll();
		}
		
	}

	$scope.pick_day = function(index) {
		$scope.schedule_index = index;
	}

	start();

	function start(){
		schedules_factory.get({}, function(data){
        $scope.schedule = data.data;

        for (var j in $scope.schedule) {
        	$scope.schedule[j].index = j;
        }

        console.log($scope.schedule)

        sessions_factory.get({}, function(data){
        	$scope.sessions = data

        	for (var i in $scope.sessions) {
        		$scope.sessions[i].session_toggle = "col-md-4"
        		$scope.sessions[i].full4_toggle = false;
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