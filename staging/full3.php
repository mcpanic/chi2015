<?php
  $pageTitle = "Program";
  $ng_app = "full_program";
  include "../header.php";
?>
</div>
<h1>Full Program</h1>

<div ng-controller="full_program_controller" id="full_program">

	<div class="row">
		<div ng-repeat="day in schedule" class="col-md-2 full3_day_tab btn" ng-click="pick_day(day.index)">
			<div class="full3_day_tab_inside ">
				<span ng-bind="day.day"></span>
			</div>
		</div>
	</div>
	<div class="row">
		<div class="full3_time_row">
			<div class="full3_time_header">
				<span ng-if="schedule_index==0">8:30 - 10:00</span>
				<span ng-if="schedule_index!=0">8:30 - 9:20</span>
			</div>
		</div>
		<div ng-repeat="slot in schedule[schedule_index].slots" class="full3_time_row">
			<div class="full3_time_header">
				<span ng-bind="slot.time"></span>
			</div>
			<div class="full3_session_cells {{'session_'+sessions[session.session].type}}" ng-repeat="session in slot.sessions">

				<span ng-bind-html="sessions[session.session].s_title" class="session_title">
				</span><br/>
				Room: <span ng-bind="sessions[session.session].room" class="session_room">
				</span>
			</div>
		</div>
		<div class="full3_time_row" ng-if="schedule_index==3">
			<div class="full3_time_header">
				<span>16:30 - 17:50</span>
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