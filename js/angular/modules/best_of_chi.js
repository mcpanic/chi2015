angular.module('chi2015_controllers').controller("best_of_chi_controller",
  ["$scope", "papers_factory", "$location", "$anchorScroll",
  function($scope, papers_factory, $location, $anchorScroll) {

    $scope.data = []

    start();
    function start(){
      papers_factory.get({}, function(data){
        $scope.papers = data;
        var bp_papers = [];
        var hm_papers = [];
        var bp_count = 0;
        var hm_count = 0;

        for (var k in $scope.papers) {

          $scope.papers[k].id = k;

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

          if ($scope.papers[k].award) {
            bp_papers.push($scope.papers[k]);
            bp_count++;
            console.log($scope.papers[k]);
          } else if ($scope.papers[k].hm) {
            hm_papers.push($scope.papers[k]);
            hm_count++;
            // console.log($scope.papers[k]);
          } else {
            continue;
          }

          setTimeout(function(){
            if (get_url_vars()['id']) {
              $scope.focus(get_url_vars()['id'])
            }            
          }, 100)


        }

        $scope.bp_count = bp_count;
        $scope.hm_count = hm_count;
        $scope.bp_papers = bp_papers;
        $scope.hm_papers = hm_papers;

        $scope.focus = function(id) {
          $location.hash(id);
          $anchorScroll();
        }

        console.log($scope.bp_count, $scope.hm_count);
      })

    }


    // $scope.toggle = function(id){
    //   for (var i in $scope.data){
    //     if ($scope.data[i].id==id) $scope.data[i].toggle = !$scope.data[i].toggle
    //   }
    // }

    $scope.abstract_toggle = function(id) {
      $scope.papers[id].abstract_toggle = !$scope.papers[id].abstract_toggle;
    }



}])

function get_url_vars() {
    var vars = {};
    var parts = window.location.href.replace(/[?&]+([^=&]+)=([^&]*)/gi, function(m,key,value) {
      if (value.indexOf('#') > -1) {
        value = value.trim().split('#')[0];
      }
        vars[key] = value;
    });
    return vars;
}