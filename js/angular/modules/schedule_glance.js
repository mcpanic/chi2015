angular.module('chi2015_controllers').controller("schedule_glance_controller",
  ["$scope", "schedule_glance_factory",
  function($scope, schedule_glance_factory) {

    $scope.schedule = {

    }

    start();
    function start(){
      schedule_glance_factory.get({}, 
      function(response) {
        var data = response.data
        var day = null
        var date = null
        var time = null
        var date_index = 0;
        var time_index = 0;
        for (var i in data){
          //console.log(data[i])
          if (data[i][0]!=null) {
            var obj = {
              id: "id_"+data[i][0],
              title: data[i][4],
              plenary: false
            }

            if (data[i][1].trim()!="") {
              day = data[i][1];
              time_index = 0;
            }

            if (!$scope.schedule[day]) {
              $scope.schedule[day] = {
                day: day,
                date_index: date_index
              }
              date_index++;
            }

            if (data[i][2].trim()!="") {
              date = data[i][2]
              //date = m_names[orig_date.getMonth()] + " " + orig_date.getDate() +", " + orig_date.getFullYear();           
            }
            if (!$scope.schedule[day].date) $scope.schedule[day].date = date

            if (data[i][3].trim()!="") {
              time = data[i][3];
              time_index++;                        
            }
            if (!$scope.schedule[day].time  ) $scope.schedule[day].time = {}
            if (!$scope.schedule[day].time[time]) $scope.schedule[day].time[time] = {
              timer: [],
              string: time,
              date_index: time_index-1
            };

            if (data[i][5].trim()!="") {
              obj.plenary = true
              obj.speaker = data[i][5]
              obj.detail = data[i][6]
            }

            if (data[i][7].trim()!="") obj.href = data[i][7]            
            else obj.href = "#"
            
            obj.day = day
            obj.date = date
            obj.time = time

            //onsole.log(obj)

            $scope.schedule[day].time[time].timer.push(obj)

            // if (!$scope.schedule[day].time) {
            //   $scope.schedule[day].time = [obj]
            // }
            // else {
            //   $scope.schedule[day].time.push(obj)
            // }
            
          } 
          
          //console.log($scope.data)
          
        }

        //console.log($scope.schedule)
        // $scope.data = data;
      })
    }

    // $scope.toggle = function(id){
    //   for (var i in $scope.data){
    //     if ($scope.data[i].id==id) $scope.data[i].toggle = !$scope.data[i].toggle
    //   }
    // }
  }])

angular.module('chi2015_app').filter("schedule_glance_day_desktop", function(){
  return function(objs) {
    var filtered = [];
    angular.forEach(objs, function(obj){
      filtered.push(obj)
    })

    filtered.sort(function(a, b){
      return (a.date_index > b.date_index ? 1 : -1)
    })

    return filtered
  }
})