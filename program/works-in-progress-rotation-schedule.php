<?php
  $pageTitle = "Program | Work in Progress Rotation Schedule";
  $ng_app = "wip";

  include "../header.php";
?>

<div>
    <h2>Program | Work in Progress Rotation Schedule</h2>
</div>

<div role="main" id="courses" ng-controller="wip_controller">

<p>Dear Work in Progress Presenters,</p>

<p>Please check the table below to find what day your poster presentation will be. One set of accepted posters (rotation #1) will be displayed on the Tuesday (April 21st) and the second (rotation #2) on the Wednesday (22nd April). The final ID# will be the number by which your poster will be identified at the conference. For curious minds, the number breaks down as follows: <p>

<p>wip[x:rotation][yy:cluster][zz: poster number in that cluster].</p>

<p>So for a poster with ID wip20607 this number means that the poster is a work-in-progress poster (as opposed to a doctoral consortium or student research competition poster), belongs to the second rotation (so will be presented on Wednesday), belongs to cluster 06 and is poster #7 in that cluster.</p>

<p>The Tuesday and Wednesday coffee breaks (10:50-11:30, 15:50-16:30 –see here <a href="http://chi2015.acm.org/program/schedule-glance/">http://chi2015.acm.org/program/schedule-glance/</a>) are the designated poster viewing sessions during this year’s conference. However your posters should be hung all day (depending on your rotation) i.e. they should be put up first thing and taken down in the evening.</p>

<p>You are expected to bring your own printed posters and hang the posters yourselves. You also must be physically present at the poster during two spotlight sessions on your designated day - during the morning coffee break and the afternoon coffee break at the Exhibit hall. Your posters should be hung up before 10 AM and must be taken down at the end of the day.</p>

<p>Also please note:
<ul>
	<li>Each poster will have a display space approximately 1 meter wide and 2.5 meters high. So if you have a poster of landscape orientation, please ensure your display will fit within the 1 meter wide display space.</li>
	<li>WiPs are shown as posters only. Audiovisual and computing equipment will not be supplied. Power outlets will not be available. Furniture (tables for laptops etc) will not be available.
	</li>
	<li>Posters must be secured with tape on the poster boards (which will be provided). Tacks, push pins, and velcro will NOT work.
	</li>

</ul>
See you in Seoul!
</p>

	<table class="table">
		<thead style="font-weight: bold">
			<tr>
				<td>
					Final ID
				</td>
				<td>
					Poster Day
				</td>
				<td>
					Submission ID
				</td>
				<td>
					Paper
				</td>
				<td>
					Contact Author
				</td>
				<td>
					Theme
				</td>
			</tr>
		</thead>
		<tbody>
			<tr ng-repeat="wip in data">
				<td ng-repeat="d in wip" ng-bind="d"></td>
			</tr>
		</tbody>
	</table>

</div>



<?php
  include "../footer.php";
?>