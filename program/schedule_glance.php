<?php
  $pageTitle = "Scheduling at a Glance";
  $ng_app = "schedule_glance";
  include "../header.php";

?>

<div>
    <h2>Program | Scheduling at a Glance</h2>
</div>

<div id="schedule_glance" ng-controller="schedule_glance_controller">

	<div ng-repeat="day in schedule | schedule_glance_day_desktop">
		<h4 ng-bind="day.day + ' ' + day.date" class="day_header"> </h4>

		<div class="day_schedule row">
			<div class="time_row row" ng-repeat="time in day.time | schedule_glance_day_desktop">
				<div class="time_time col-md-3" ng-bind="time.string"></div>
				<div class="col-md-1">...</div>
				<div class="col-md-8 row">
					<div ng-repeat="obj in time.timer" >
						<a ng-href="{{obj.href}}"><span ng-bind-html="obj.title"></span></a>
						<br ng-if="obj.plenary"/><span ng-if="obj.plenary" ng-bind="obj.speaker+', '"></span><i><span ng-if="obj.plenary" ng-bind="obj.detail"></span></i>
					</div>
				</div>
			</div>
		</div>
	</div>

</div>

<?php
  include "../footer.php";
?>