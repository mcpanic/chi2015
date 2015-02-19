<?php
  $pageTitle = "Program";
  $ng_app = "full_program";
  include "../header.php";
?>
</div>
<h1>Full Program</h1>

<div ng-controller="full_program_controller" id="full_program">

<div ng-repeat="day in schedule">
	<h3><span ng-bind="day.day"></span>,&nbsp;<span ng-bind="day.date"></span></h3>

	<div class="row slot_row" ng-repeat="slot in day.slots">
		<div class="col-md-1 slot_time"  ng-id="slot.slot_id">
			<span ng-bind="slot.time"></span>
		</div>
		<div class="col-md-11" id="accordion">
			<div ng-repeat="session in slot.sessions">
				<div class="session_cell col-xs-2">
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

				<div id="{{session.session}}_long" class="collapse col-xs-11 session_cell_full">
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

</div> <!-- column-wrapper -->
      </div> <!-- container -->

      <hr>

        <footer id="footer" role="contentinfo">
            &copy; copyright 2014 | <a href="http://www.sigchi.org/">ACM SIGCHI</a>
        </footer>
    </div> <!-- /container -->
    <script src="//ajax.googleapis.com/ajax/libs/jquery/1.10.1/jquery.min.js"></script>
    <script>window.jQuery || document.write('<script src="<?php echo $prefix; ?>/js/vendor/jquery-1.10.1.min.js"><\/script>')</script>

    <script src="<?php echo $prefix; ?>/js/vendor/bootstrap.min.js"></script>

    <script src="<?php echo $prefix; ?>/js/main.js"></script>

    <script type="text/javascript">
      var _gaq = _gaq || [];
      _gaq.push(['_setAccount', 'UA-48768494-1']);
      _gaq.push(['_trackPageview']);
      (function() {
        var ga = document.createElement('script'); ga.type = 'text/javascript'; ga.async = true;
        ga.src = ('https:' == document.location.protocol ? 'https://ssl' : 'http://www') + '.google-analytics.com/ga.js';
        var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(ga, s);
      })();
    </script>

    </body>
</html>