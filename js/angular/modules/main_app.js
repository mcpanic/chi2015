angular.module('chi2015_app', ['chi2015_controllers', 'ngRoute', 'ngAnimate']);
angular.module('chi2015_controllers', ["ngSanitize", "chi2015_services"]);
angular.module('chi2015_services', ['ngResource']);

angular.module('chi2015_app').config(['$routeProvider','$locationProvider', function($routeProvider, $locationProvider){

 $routeProvider.otherwise({redirectTo: window.location.pathname})

 $locationProvider.html5Mode({
   enabled: true,
   requireBase: false,
   rewriteLinks: false
 });

 // $locationProvider.hashPrefix('!');
}])

// angular.module('chi2015_app').run([
//  '$rootScope', '$location', '$anchorScroll', '$routeParams',
//  function($rootScope, $location, $anchorScroll, $routeParams) {
//    //when the route is changed scroll to the proper element.
//    $rootScope.$on('$routeChangeSuccess', function (newRoute, oldRoute) {
//      $location.hash($routeParams.scrollTo);
//      $anchorScroll();
//    });
//  }]);

angular.module('chi2015_controllers').controller('main_controller', ['$scope', '$window', function($scope, $window){
	var sm = 768
	var md = 992
	$scope.isGeneralSmallWindow = function() {
		console.log($window.innerWidth)
		return ($window.innerWidth >= sm && $window.innerWidth < md )
	}

	$scope.isGeneralMediumWindow = function() {
		console.log($window.innerWidth)
		return $window.innerWidth >= md
	}

	angular.element($window).on('resize', angular.bind($scope, function(){
		//console.log("resize")
		$scope.$apply();
	}));
}])

angular.module('chi2015_controllers').controller('link_controller',
  ['$scope', '$location', 'link_factory',
	function($scope, $location, link_factory){
		start();

		$scope.data = []
		$scope.is_selected = function(link){
			var array = clean_pathname(window.location.pathname.split("/"));

			if (array.length > 0) {
				var link_num = 0
				if (array[0].trim()=="chi2015") link_num = 1
				//console.log(array)
				if (array.length <= link_num) return ""
				else if (array[link_num].trim()==link) return "selected";
				else return "";
			}
			else return "";
		}

		$scope.is_selected_dropdown = function(link) {
			return $scope.is_selected(link) + " dropdown-toggle"
		}

		$scope.is_dropdown = function(length){
			if (length>0) return "dropdown"
			else ""
		}

		function start(){

			link_factory.get({}, function(data){

				$scope.data = data.data;

				for (var i in $scope.data) {
					$scope.data[i].sub_links_count = $scope.data[i].sub_links.length
				}
			})
		}
	}])

angular.module('chi2015_services').factory('link_factory', ['$resource',
	function($resource) {
    return data_link("link", $resource)
	}])

angular.module('chi2015_services').factory('exhibitors_factory', ['$resource',
  function($resource) {
    return data_link("exhibits", $resource)
  }
])

angular.module('chi2015_services').factory('interactivity_factory', ['$resource',
  function($resource) {
    return data_link("interactivity", $resource)
  }
])

angular.module('chi2015_services').factory('schedule_glance_factory', ['$resource',
  function($resource) {
    return data_link("schedule_glance", $resource)
  }
])

angular.module('chi2015_services').factory('video_previews_factory', ['$resource',
    function($resource) {
    return data_link("video_previews", $resource)
    }])

angular.module('chi2015_services').factory('papers_factory', ['$resource',
	function($resource) {
    return data_link("papers", $resource)
	}])

angular.module('chi2015_services').factory('sessions_factory', ['$resource',
	function($resource) {
    return data_link("sessions", $resource)
	}])

angular.module('chi2015_services').factory('schedules_factory', ['$resource',
	function($resource) {
    return data_link("schedule", $resource)
	}])

angular.module('chi2015_services').factory('wip_factory', ['$resource',
	function($resource) {
    return data_link("wip", $resource)
	}])

function data_link(data, $resource){
  var array = clean_pathname(window.location.pathname.split("/"));
  var pathcount = array.length
  if (array.length > 0){
    if (array[0].trim() == "chi2015") {
      pathcount--
    }
  }
  var str = ""
  for (var i = 0; i<pathcount; i++){
    str+="../"
  }
  //console.log(str);
  return $resource(str+'js/data/'+data, {}, {
    get: { method: 'GET' }
  })
}

function clean_pathname(pathname){
	var array = [];
	for (var i in pathname){
		if (pathname[i].trim()!="") array.push(pathname[i])
	}
	return array;
}