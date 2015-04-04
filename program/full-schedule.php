<?php
  $pageTitle = "Program";
  $ng_app = "full_program_2";
  include "../header.php";
?>
</div>
<h1>Full Program</h1>

<div ng-controller="full_program_controller" id="full_program">

	<div class="full_schedule_container">

		<!-- Add buttons and Search bar here -->
		<div class="row full_schedule_options">
			<div class="full_schedule_checkbox col-sm-9">
				<b><i>View by:</i></b><br/>
				<div class="row">
					<form>
						<div class="col-xs-6 col-sm-3" ng-repeat="type in session_type | session_type_filter" style="margin-top: 10px">
							<input type="checkbox" style="margin-right: 10px" ng-model="type.bool" 
							ng-click="toggle_legends(type.id, 'session_type')"/>
							<img 
							style="margin-right: 10px"
							ng-src="<?php echo $prefix; ?>/img/program/{{type.id}}_black.png" height="20"/>
							<span ng-bind="type.name"></span>
						</div>
					</form>
				</div>
				<div style="margin-top: 10px">
					<b><i>Jump to</i></b>
					<div class="row">
						<div class="col-xs-6 col-sm-3 btn" ng-repeat="day_word in schedule_days" ng-click="focus(day_word)">
							<div class="day-button" ng-bind="day_word">

							</div>
						</div>
					</div>
				</div>
			</div>

			<div class="full_schedule_search col-sm-3">
				<form>
					<input type="text" class="form-control" id="search" ng-model="full_schedule_query" placeholder="Search Paper, Title, Author, Country">
					<br/><div class="day-button" ng-if="full_schedule_query.trim()!=''" ng-click="clear_query()">Clear</div>
					<br/><div class="row">
							<div class="col-xs-6" ng-repeat="type in search_type | session_type_filter" style="margin-top: 10px">
								<input type="checkbox" style="margin-right: 10px" ng-model="type.bool" 
								ng-click="toggle_legends(type.id, 'search_type')"/>
								<span ng-bind="type.name"></span>
							</div>
						</div>
				</form>
			</div>
		</div>

		<div class="row full_schedule_day" ng-repeat="day in schedule | full_schedule_day_filter:sessions:papers:session_type:search_type:full_schedule_query ">
			<div class="full_schedule_day_header" ng-attr-id="{{day.day}}">
				<h4><span ng-bind="day.day"></span>,&nbsp;<span ng-bind="day.date"></span></h4>
			</div>

			<div class="full_schedule_container_2">

				<div class="row full_schedule_row_slot" ng-repeat="slot in day.slots | full_schedule_time_filter:sessions:papers:session_type:search_type:full_schedule_query">
					<div class="full_schedule_divider">
					</div>
					<div class="full_schedule_cell col-md-2 col-sm-3 col-xs-6">
						<div class="full_schedule_cell_inside full_schedule_cell_time" style="cursor: default">
							<h4 ng-bind="slot.time" class="full_schedule_time"></h4>
						</div>
					</div>

					<div ng-repeat="row in row_counts[row_index]">

						<div>
							<div 
							ng-repeat="session in slot.sessions | full_schedule_session:row[0]:row[1]:sessions:papers:session_type:search_type:full_schedule_query" 
							class="full_schedule_cell col-md-2 col-sm-3 col-xs-6" 
							ng-mouseover="schedule_mouse_enter(session.indices)"
							ng-mouseleave="schedule_mouse_exit(session.indices)"
							ng-class="schedule_hover(session.hover)"
							ng-click="schedule_click(session.indices, false)"
							ng-attr-id="{{isFocus(session.indices)}}">
								<div class="full_schedule_cell_inside full_schedule_bg"
								style="background-image: url('<?php echo $prefix; ?>/img/program/{{sessions[session.session].type}}_bg.png')" 
								ng-class="schedule_inside_class(sessions[session.session].url)"
								>
									<div class="full_schedule_session_title" >
										<span ng-bind-html="sessions[session.session].s_title.substr(0, 70).trim()" ></span><span ng-if="sessions[session.session].s_title.length>70">...</span>
									</div>
									<div class="full_schedule_session_room">
										<span class="full4_session_img">
											<img src="<?php echo $prefix; ?>/img/program/best.png" ng-if="sessions[session.session].hasAward && !session.hover && hide_icons"/>
											<img src="<?php echo $prefix; ?>/img/program/best_white.png" ng-if="sessions[session.session].hasAward && session.hover && hide_icons"/>
											<img src="<?php echo $prefix; ?>/img/program/honorable.png" ng-if="sessions[session.session].hasHonorableMention && !session.hover && hide_icons"/>
											<img src="<?php echo $prefix; ?>/img/program/honorable_white.png" ng-if="sessions[session.session].hasHonorableMention && session.hover && hide_icons"/>
										</span>
										<span ng-if="sessions[session.session].room.trim()!=''" class="full_schedule_session_room_text" ng-bind="'Rm: '+sessions[session.session].room">

										</span>
									</div>	
								</div>
							</div>
						</div>

						<div>
							<div 
							ng-repeat="session in slot.sessions | full_schedule_session:row[0]:row[1]:sessions:papers:session_type:search_type:full_schedule_query"
							id="{{session.session}}" class="animate-if full_schedule_div col-md-11 col-sm-11 col-xs-11" 
							ng-if="session.focus">
								<div class="full_schedule_div_inside">
									<div class="sessions_title">
										<img 
										ng-src="<?php echo $prefix; ?>/img/program/{{sessions[session.session].type}}_black.png"/ class="full_schedule_icon">
										<span ng-bind-html="sessions[session.session].s_title">
										</span>
									</div>
									<div class="sessions_subtitle_link" ng-if="sessions[session.session].url">During this session, real-time captioning will be available <br>at: <a ng-href="{{sessions[session.session].url}}" ng-bind-html="''+sessions[session.session].url"></a></div>
									<div class="sessions_subtitle_border"></div>
									<div class="full_schedule_session_description">
										<span ng-if="sessions[session.session].room.trim()!=''">
											Room: <span ng-bind="sessions[session.session].room"></span><br/>
										</span>
										<span ng-if="sessions[session.session].chair.trim()!=''">
											Chair: 
											<span ng-bind="sessions[session.session].chair"></span><br/>
										</span>
										Date: <span ng-bind="day.day"></span>,&nbsp;<span ng-bind="day.date"></span><br/>
										Time: <span ng-bind="slot.time"></span>

										<div ng-repeat="submissions in sessions[session.session].submissions"
										class="full_schedule_submission" ng-if="papers[submissions]!=null">
											<a class="h4_a" ng-href="<?php echo $prefix; ?>/program/best-of-chi/?id={{submissions}}" ng-if="papers[submissions].award || papers[submissions].hm">
												<h4 class="full_schedule_submission_h4" >
												
													<span ng-attr-id="{{submissions}}" ng-bind="papers[submissions].title"></span>
													<img src="<?php echo $prefix; ?>/img/program/best.png" ng-if="papers[submissions].award && hide_icons"/>
													<img src="<?php echo $prefix; ?>/img/program/honorable.png" ng-if="papers[submissions].hm && hide_icons"/>
												
												</h4>
											</a>
											<h4 class="full_schedule_submission_h4" ng-if="!(papers[submissions].award || papers[submissions].hm)">
												
												<span ng-attr-id="{{submissions}}" ng-bind="papers[submissions].title"></span>
												<img src="<?php echo $prefix; ?>/img/program/best.png" ng-if="papers[submissions].award && hide_icons"/>
												<img src="<?php echo $prefix; ?>/img/program/honorable.png" ng-if="papers[submissions].hm && hide_icons"/>
											
											</h4>

											<div class="full_schedule_keywords" ng-if="papers[submissions].keyword_string.trim()!=''">
												<b><i>Keywords</i></b>: 
												<p>
													<span
													ng-bind="papers[submissions].keyword_string">
													</span>
												</p>
											</div>
											
											<div class="full_schedule_authors">
												<span ng-if="sessions[session.session].type=='paper'">
													<b><i>Authors</i></b>
												</span>
												<span ng-if="sessions[session.session].type=='altchi'">
													<b><i>Authors</i></b>
												</span>
												<span ng-if="sessions[session.session].type=='special' && 
												              !(session.session=='s-src' || session.session=='s-sdc' ||
												             session.session=='s-sgc')  ">
													<b><i>Hosts</i></b>
												</span>
												
												<span ng-if="sessions[session.session].type=='special' && 
												             (session.session=='s-src' || session.session=='s-sdc' ||
												             session.session=='s-sgc')">
													<b><i>Judges</i></b>
												</span>
												<span ng-if="sessions[session.session].type=='course'">
													<b><i>Facilitators</i></b>
												</span>
												<span ng-if="sessions[session.session].type=='SIG'">
													<b><i>Hosts</i></b>
												</span>
												<span ng-if="sessions[session.session].type=='casestudy'">
													<b><i>Authors</i></b>
												</span>
												<span ng-if="sessions[session.session].type=='panel'">
													<b><i>Panelists</i></b>
												</span>
												<span ng-if="sessions[session.session].type=='keynote'">
													<p><b><i>Plenary Speaker: </i></b><span ng-bind="papers[submissions].speaker"></span><br/>
														<i><span ng-bind="papers[submissions]['speaker-affiliation']"></span></i></p>
												</span>

												<ul>
													<li ng-repeat="author in papers[submissions].authors">
														<span ng-bind="author.name"></span>,
														<span ng-bind="author.affiliation"></span>, 
														<span ng-bind="author.location"></span>

													</li>
												</ul>
												
											</div>
											
											<div class="full_schedule_abstract" ng-if="papers[submissions].abstract.trim()!='' && papers[submissions].abstract_toggle">
												<div style="height: 30px;">
													<div style="text-align:left; float: left;width: 50%;height: 100%;border:solid 0px;padding-top: 7px;"><b><i>Abstract: </i></b></div>
													<div style="text-align:right;  float: right;width: 50%;height: 100%;border:solid 0px; padding-right: 10px; padding-botton: 20px" >
														<button style="font-size: 11px; " class="btn btn-danger" ng-click="abstract_translate(submissions, 'e')" ng-init="count=0"> English </button>
														<button style="font-size: 11px; " class="btn btn-danger" ng-click="abstract_translate(submissions, 'k')" ng-init="count=0"> Korean </button>
														<button style="font-size: 11px; " class="btn btn-danger" ng-click="abstract_translate(submissions, 'j')" ng-init="count=0"> Japanese </button>
														<button style="font-size: 11px; " class="btn btn-danger" ng-click="abstract_translate(submissions, 'c')" ng-init="count=0"> Chinese </button>
													</div>
												</div>
												<p ng-bind-html="''+papers[submissions].abstract" ng-if="papers[submissions].abstract_lang=='e'"></p>
												<p ng-bind-html="''+papers[submissions].abstract_j" ng-if="papers[submissions].abstract_lang=='j'"></p>
												<p ng-bind-html="''+papers[submissions].abstract_c" ng-if="papers[submissions].abstract_lang=='c'"></p>
												<p ng-bind-html="''+papers[submissions].abstract_k" ng-if="papers[submissions].abstract_lang=='k'"></p>
												<p><a ng-click="abstract_toggle(submissions)" ng-if="papers[submissions].cAndB.trim()!=''" style="cursor:pointer">Short Description</a></p>
											</div>
											<div class="full_schedule_abstract" ng-if="papers[submissions].cAndB.trim()!='' && !papers[submissions].abstract_toggle">
												<b><i>Short Description: </i></b>
												<p ng-bind-html="''+papers[submissions].cAndB"></p>
												<p><a ng-click="abstract_toggle(submissions)" ng-if="papers[submissions].abstract.trim()!=''" style="cursor:pointer">Show Abstract</a></p>
											</div>
											<div class="full_schedule_abstract" ng-if="papers[submissions].bio">
												<b><i>Biography: </i></b>
												<p ng-bind-html="''+papers[submissions].bio"></p>
											</div>

											<a ng-click="focus()" style="cursor:pointer">Go back Up</a><br/>
											<a ng-click="schedule_click(session.indices, true)" style="cursor:pointer">Close</a>
										</div>

										<br ng-if="sessions[session.session].type=='wip' || sessions[session.session].type=='interactivity'"/>
										<a href="<?php echo $prefix; ?>/program/works-in-progress-rotation-schedule" ng-if="sessions[session.session].type=='wip'">See Work in Progress Submissions here</a>
										<a href="<?php echo $prefix; ?>/program/interactivity" ng-if="sessions[session.session].type=='interactivity'">See Interactivity Demo Submissions here</a>

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

<?php
  include "../modified_footer.php";
?>
