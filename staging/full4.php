<?php
  $pageTitle = "Program";
  $ng_app = "full_program";
  include "../header.php";
?>
</div>
<h1>Full Program</h1>

<div ng-controller="full_program_controller" id="full_program">

	<div class="full4_schedule_container">

		<div class="row full4_schedule_day" ng-repeat="day in schedule">
			<div class="full4_schedule_day_header" >
				<h4><span ng-bind="day.day"></span>,&nbsp;<span ng-bind="day.date"></span></h4>
			</div>

			<div class="full4_schedule_container_2">

				<div class="row full4_row_slot" ng-repeat="slot in day.slots">
					<div class="full4_divider">
					</div>
					<div class="full4_schedule_cell col-md-2 col-sm-3 col-xs-6">
						<div class="full4_schedule_cell_inside full4_schedule_cell_time">
							<h4 ng-bind="slot.time" class="full4_time"></h4>
						</div>
					</div>

					<div ng-repeat="session in slot.sessions">
						<div class="full4_schedule_cell col-md-2 col-sm-3 col-xs-6"  
						data-parent="#accordion" data-toggle="collapse" href="#{{session.session}}" ng-click="full4_toggle(session.session)">
							<div class="full4_schedule_cell_inside {{'full4_'+sessions[session.session].type}}" >
								<div ng-bind-html="sessions[session.session].s_title" class="full4_session_title">
								</div>
								<div class="full4_session_room">
									<span class="full4_session_img">
										<img src="<?php echo $prefix; ?>/img/program/best.png" ng-if="sessions[session.session].hasAward"/>
										<img src="<?php echo $prefix; ?>/img/program/honorable.png" ng-if="sessions[session.session].hasHonorableMention"/>
									</span>
									<span class="full4_session_room_text" ng-bind="'Rm: '+sessions[session.session].room">

									</span>
								</div>	
							</div>
						</div>

						<div id="{{session.session}}" class=" collapse full4_schedule_div col-md-11 col-sm-11 col-xs-11">
							<div class="full4_schedule_div_inside">
								<h3 ng-bind-html="sessions[session.session].s_title">
								</h3>
								<div class="full4_session_description">
									
									Room: <span ng-bind="sessions[session.session].room"></span><br/>
									<span ng-if="sessions[session.session].chair.trim()!=''">Chair: 
										<span ng-bind="sessions[session.session].chair"></span>
									</span>
								
									<div ng-repeat="submissions in sessions[session.session].submissions">
										<h4 >
											<span ng-bind="papers[submissions].title"></span>
											<img src="<?php echo $prefix; ?>/img/program/best.png" ng-if="papers[submissions].award"/>
											<img src="<?php echo $prefix; ?>/img/program/honorable.png" ng-if="papers[submissions].hm"/>
										</h4>
										<div class="full4_authors">
											<ul>
											<li ng-repeat="author in papers[submissions].authors">
												<span ng-bind="author.name"></span>, &nbsp;
												<span ng-bind="author.affiliation"></span>, &nbsp;
												<span ng-bind="author.location"></span>

											</li>
											</ul>
										</div>
										<div class="full4_abstract">
											<p ng-bind-html="'<b><i>Abstract: </i></b><br/>'+papers[submissions].abstract"></p>
										</div>
										
									</div>

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