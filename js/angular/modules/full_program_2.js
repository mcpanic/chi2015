function check_query(objs, sessions, papers, type, query) {

	query = query.toLowerCase()

	var filtered = [];

	for (var i in objs){
		var session_index = objs[i].session
		if (query.trim().length<=2) {
			//console.log(sessions[session_index].type)
			if (sessions[session_index]) {
				if (type[sessions[session_index].type].bool) filtered.push(objs[i])
			}
			
		}
		else {
			
			if (sessions[session_index]!=null) {

				if (sessions[session_index].s_title.toLowerCase().indexOf(query) > -1 && 
					type[sessions[session_index].type].bool) {
					filtered.push(objs[i])
				}
				if (sessions[session_index].chair.toLowerCase().indexOf(query) > -1 && 
					type[sessions[session_index].type].bool) {
					filtered.push(objs[i])
				}
				else {
					for (var k in sessions[session_index].submissions) {
						var paper_index = sessions[session_index].submissions[k]
						if (papers[paper_index]) {
							if (papers[paper_index].title.toLowerCase().indexOf(query) > -1 && 
								type[sessions[session_index].type].bool) {
								filtered.push(objs[i])
								break;
							}
							else {
								var checker = false
								for (var l in papers[paper_index].keywords) {
									if (papers[paper_index].keywords[l].toLowerCase().indexOf(query) > - 1
										&& type[sessions[session_index].type].bool) {
										filtered.push(objs[i])
										checker = true
										break;
									}
								}
								if (checker) {
									break;
								}
								else {
									for (var m in papers[paper_index].authors) {
										if (papers[paper_index].authors[m].name.toLowerCase().indexOf(query) > -1 &&
											type[sessions[session_index].type].bool) {
											filtered.push(objs[i])
											checker = true
											break;
										}
										else if (papers[paper_index].authors[m].city.toLowerCase().indexOf(query) > -1 &&
												 type[sessions[session_index].type].bool) {
											filtered.push(objs[i])
											checker = true
											break;
										}
										else if (papers[paper_index].authors[m].country.toLowerCase().indexOf(query) > -1 &&
												 type[sessions[session_index].type].bool) {
											filtered.push(objs[i])
											checker = true
											break;
										}

									}
									if (checker) break;
								}
							}
						}

					}

				}					
			}
		}
	}

	return filtered
}

angular.module('chi2015_app').filter("full_schedule_session", function(){
	return function(objs, index, length, sessions, papers, type, query) {
		var filtered = check_query(objs, sessions, papers, type, query) 
		var new_filtered = []

		var count = 0
		for (var j in filtered) {
			if (j>=index && count<length) {
				new_filtered.push(filtered[j])
				count++;
			}
		}

		return new_filtered
	}
})

angular.module('chi2015_app').filter("full_schedule_day_filter", function(){
	return function(objs, sessions, papers, type, query) {
		var filtered = []

		for (var i in objs) {
			
			for (var j in objs[i].slots) {
				var session_list = check_query(objs[i].slots[j].sessions, sessions, papers, type, query)
				if (session_list.length>0) {
					filtered.push(objs[i])
					break;
				}
			}

		}
		return filtered
	}
})

angular.module('chi2015_app').filter("full_schedule_time_filter", function(){
	return function(objs, sessions, papers, type, query) {
		var filtered = []

		for (var i in objs) {			
			var session_list = check_query(objs[i].sessions, sessions, papers, type, query)
			if (session_list.length>0) {
				filtered.push(objs[i])
			}			
		}
		return filtered
	}
})

angular.module('chi2015_app').filter("session_type_filter", function(){
	
	return function(objs) {
		var filtered = [];
		angular.forEach(objs, function(obj){
			filtered.push(obj)
		})

		filtered.sort(function(a, b){
			return (a.index > b.index ? 1 : -1)
		})

		return filtered
	}
})



angular.module('chi2015_controllers').controller('full_program_controller', 
	['$scope', 'papers_factory', 'sessions_factory', 'schedules_factory', "$window",
	 '$location', '$anchorScroll',
	function($scope, papers_factory, sessions_factory, schedules_factory, $window, 
		     $location, $anchorScroll){

	$scope.hide_icons = false
	$scope.schedule = [];
	$scope.sessions = {};
	$scope.papers = {};
	$scope.schedule_index = 0;
	$scope.schedule_count = 0;
	$scope.session_count = 0;
	$scope.paper_count = 0;
	$scope.row_index = 0;
	$scope.focused_group = null;
	$scope.full_schedule_query = ""
	$scope.row_counts = [
		[
			[0, 5], [5, 6], [11, 6]
		],
		[
			[0, 3], [4, 4], [8, 4], [12, 4] 
		],
		[
			[0, 1], [2, 2], [4, 2], [6, 2], [8, 2], [10, 2], [12, 2], [14, 2]
		]
	]

	$scope.session_type = {
		all: {
			id: "all",
			name: "All",
			bool: true,
			index: 0
		},
		paper: {
			id: "paper",
			name: "Paper",
			bool: true,
			index: 1
		},
		altchi: {
			id: "altchi",
			name: "alt.chi",
			bool: true,
			index: 2
		},
		casestudy: {
			id: "casestudy",
			name: "Case Study",
			bool: true,
			index: 3
		},
		SIG: {
			id: "SIG",
			name: "SIG",
			bool: true,
			index: 4
		},
		course: {
			id: "course",
			name: "Course",
			bool: true,
			index: 5
		},
		panel: {
			id: "panel",
			name: "Panel",
			bool: true,
			index: 6
		},
		special: {
			id: "special",
			name: "Special",
			bool: true,
			index: 7
		}
	}
	$scope.schedule_days = [
		"Monday", "Tuesday", "Wednesday", "Thursday" 
	]

	var sm = 768
	var md = 992

	$scope.isDesktop = function() {
    	return $window.innerWidth >= md; //your breakpoint here.
	}

	$scope.isSmallDevice = function() {
		return $window.innerWidth >= sm;
	}

	function checkResize() {
		if ($scope.isDesktop() && $scope.isSmallDevice()) {
			$scope.row_index = 0
		}
		else if ($scope.isSmallDevice()) {
			$scope.row_index = 1	
		}
		else {
			$scope.row_index = 2
		}
		console.log("CheckResize")
		console.log($scope.row_index)
	}

	angular.element($window).on('resize', angular.bind($scope, function(){	
		checkResize();
		console.log("resize")
		$scope.$apply();
	}));

	$scope.schedule_mouse_enter = function(indices) {
		$scope.schedule[indices[0]].slots[indices[1]].sessions[indices[2]].hover = true
	}

	$scope.schedule_mouse_exit = function(indices) {
		if (!$scope.schedule[indices[0]].slots[indices[1]].sessions[indices[2]].focus) {
			$scope.schedule[indices[0]].slots[indices[1]].sessions[indices[2]].hover = false
		}	
	}
	
	$scope.schedule_hover = function(bool) {
		if (bool) return "full_schedule_cell_inside_color_hover"
		else return "full_schedule_cell_inside_color"
	}

	$scope.schedule_click = function(indices, bool){

		if ($scope.focused_group!=null) {
			if ($scope.focused_group[0]==indices[0] && 
				$scope.focused_group[1]==indices[1] &&
				$scope.focused_group[2]==indices[2]) $scope.focus();
			else setTimeout(function(){
				$scope.focus();
			}, 10)
		}
				
		if (!$scope.schedule[indices[0]].slots[indices[1]].sessions[indices[2]].focus) {
			for (var j in $scope.schedule) {
	        	for (var a in $scope.schedule[j].slots) {
	        		for (var b in $scope.schedule[j].slots[a].sessions) {
	    				$scope.schedule[j].slots[a].sessions[b].hover = false;
						$scope.schedule[j].slots[a].sessions[b].focus = false;	    							
	        		}
	        	}
	        }
	        $scope.schedule[indices[0]].slots[indices[1]].sessions[indices[2]].focus = true
			$scope.schedule[indices[0]].slots[indices[1]].sessions[indices[2]].hover = true
			$scope.focused_group = indices
		}
		else {
			for (var j in $scope.schedule) {
	        	for (var a in $scope.schedule[j].slots) {
	        		for (var b in $scope.schedule[j].slots[a].sessions) {
	    				$scope.schedule[j].slots[a].sessions[b].hover = false;
						$scope.schedule[j].slots[a].sessions[b].focus = false;	    							
	        		}
	        	}
	        }
	        if (!bool) $scope.schedule[indices[0]].slots[indices[1]].sessions[indices[2]].hover = true
	       	else $scope.schedule[indices[0]].slots[indices[1]].sessions[indices[2]].hover = false;
	       $scope.focused_group = false
		}
		//$scope.focus();	
		console.log($scope.focused_group)	


		//if ($scope.focused_group) $scope.focus();		
	}

	$scope.focus = function(id) {
		if (id=="" || id==null) id="focus"
		$location.hash(id);
		$anchorScroll();
	}

	$scope.isFocus = function(indices) {
		if ($scope.schedule[indices[0]].slots[indices[1]].sessions[indices[2]].focus) {
			return "focus"
		}
		else {
			return ""
		}
	}

	$scope.abstract_toggle = function(id) {
		$scope.papers[id].abstract_toggle = !$scope.papers[id].abstract_toggle
	}

	$scope.toggle_legends = function(id) {
		if (id=="all") {
			var check_all = false
			if (!$scope.session_type["all"].bool) {
				for (var j in $scope.session_type) {

					if (j!="all") {
						if (!$scope.session_type[j].bool) {
							check_all = true
							$scope.session_type[j].bool = true
						}
					}
				}
				if (!check_all) {
					for (var k in $scope.session_type) {
					if (k!="all")
						$scope.session_type[k].bool = $scope.session_type["all"].bool
					}
				}
				else $scope.session_type["all"].bool=true

			}
			else {
				for (var i in $scope.session_type) {
				if (i!="all")
					$scope.session_type[i].bool = $scope.session_type["all"].bool
				}
			}		
		}
		else if (!$scope.session_type[id].bool && $scope.session_type["all"].bool) {
			for (var k in $scope.session_type) {
			if (k!=id)
				$scope.session_type[k].bool = false
			}
			$scope.session_type[id].bool = true
		}
		
		// console.log($scope.session_type)
	}

	start();

	function start(){
		checkResize();
		schedules_factory.get({}, function(data){
        $scope.schedule = data.data;

        for (var j in $scope.schedule) {
        	$scope.schedule[j].index = j;
        	for (var a in $scope.schedule[j].slots) {
        		for (var b in $scope.schedule[j].slots[a].sessions) {
					$scope.schedule[j].slots[a].sessions[b].indices = [j,a,b];
					$scope.schedule[j].slots[a].sessions[b].index = b;
					$scope.schedule[j].slots[a].sessions[b].hover = false;
					$scope.schedule[j].slots[a].sessions[b].focus = false;
        		}
        	}
        }

        $scope.schedule_count = $scope.schedule.length;

        console.log($scope.schedule)
        console.log($scope.schedule.length)

        sessions_factory.get({}, function(data){
        	$scope.sessions = data
        	var count = 0;
        	for (var i in $scope.sessions) {
        		$scope.sessions[i].full4_toggle = false;
        		$scope.sessions[i].index = count
        		count++;
        	}

        	$scope.session_count = count
        	console.log($scope.session_count)
        	console.log($scope.sessions)

        	papers_factory.get({}, function(data){
        		$scope.papers = data

        		var count = 0
        		for (var k in $scope.papers) {
        			$scope.papers[k].index = count;
        			if ($scope.papers[k].cAndB) {
        				if ($scope.papers[k].cAndB.trim()!="") $scope.papers[k].abstract_toggle = false;
	        			else $scope.papers[k].abstract_toggle = true;
        			}
        			else $scope.papers[k].abstract_toggle = true;
        			

        			$scope.papers[k].keyword_string = ""

        			for (var l in $scope.papers[k].keywords) {
        				if (l==$scope.papers[k].keywords.length-1) $scope.papers[k].keyword_string += $scope.papers[k].keywords[l]
        				else $scope.papers[k].keyword_string += $scope.papers[k].keywords[l]+", "
        			}
        			
        			count++
        		}

        		$scope.paper_count = count

        		console.log($scope.paper_count)
        		console.log($scope.papers)
        	})
        })
      })
	}

}])