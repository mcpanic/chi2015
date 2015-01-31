

var main_app = angular.module('chi2015_app', ['chi2015_controllers']);
var chi2015_controllers = angular.module('chi2015_controllers', ["ngSanitize", "chi2015_services"]);
var chi2015_services = angular.module('chi2015_services', ['ngResource']);

chi2015_controllers.controller('link_controller', ['$scope', '$location', 'link_factory', 
	function($scope, $location, link_factory){
		start();

		$scope.data = []
		$scope.is_selected = function(link){
			var array = clean_pathname(window.location.pathname.split("/"));
			if (array.length > 0) {
				var link_num = 0
				if (array[0].trim()=="chi2015") link_num = 1
				console.log(array)
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

chi2015_services.factory('link_factory', ['$resource', 
	function($resource) {				
		var array = clean_pathname(window.location.pathname.split("/"));
		var pathcount = array.length
		if (array[0].trim() == "chi2015") {
			pathcount--
		}
		
		var str = ""
		for (var i = 0; i<pathcount; i++){
			str+="../"
		}
		console.log(str);
		return $resource(str+'js/data/link', {}, {
			get: { method: 'GET' }
		})
	}
	])

function clean_pathname(pathname){
	var array = [];
	for (var i in pathname){
		if (pathname[i].trim()!="") array.push(pathname[i])
	}
	return array;
}