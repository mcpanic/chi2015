<?php
  $pageTitle = "Program";
  $ng_app = "full_program";
  include "../header.php";
?>
<h1>Program</h1>

<div ng-controller="full_program_controller" class="full_schedule">

	<div ng-repeat="day in schedule">
		<div>
			<h3><span ng-bind="day.day"></span>,&nbsp;<span ng-bind="day.date"></span></h3>
		</div>
		<div class="row slot_row" ng-repeat="slot in day.slots">
			<div class="col-md-2 slot_time"  ng-id="slot.slot_id">
				<span ng-bind="slot.time"></span>
			</div>
			<div class="col-md-10" id="accordion">
				<div ng-repeat="session in slot.sessions">
					<div class="session_cell col-md-4">
						<div class="inside_session_cell {{'session_'+sessions[session.session].type}}" 
							data-parent="#accordion" data-toggle="collapse" href="#{{session.session}}_long">
							<div class="session_type" ng-bind="sessions[session.session].type">
							</div>
							<div ng-bind-html="sessions[session.session].s_title" class="session_title">
							</div>
							<div ng-bind="sessions[session.session].room" class="session_room">
							</div>
						</div>
					</div>
					<div id="{{session.session}}_long" class="collapse col-md-11 session_cell_full">
						<div class="inside_session_cell_full {{'session_'+sessions[session.session].type}}">
							<h4 ng-bind-html="sessions[session.session].s_title">
							</h4>
							<div class="session_room">
								Room: <span ng-bind="sessions[session.session].room"></span><br/>
								<span ng-if="sessions[session.session].chair.trim()!=''">Chair: 
									<span ng-bind="sessions[session.session].chair"></span>
								</span>
								<div ng-repeat="submissions in sessions[session.session].submissions">
									<h5 ng-bind="papers[submissions].title"></h5>
									<p ng-bind-html="papers[submissions].abstract"></p>
								</div>

							</div>

						</div>
					</div>
				</div>

			</div>
		</div>
	</div>

</div>

<?php
  include "../footer.php";
?>