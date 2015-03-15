<?php
  $pageTitle = "Interactivity";
  $ng_app = "interactivity";
  include "../header.php";

?>

<div>
    <h2>Program | Interactivity</h2>
</div>

<div role="main" id="interactivity" ng-controller="interactivity_controller">

	<p>
		Interactivity offers hands-on demonstrations that let you see, hear and touch interactive visions of the future. They take the form of prototypes, demonstrations, artworks, design experiences and inspirational technologies. Interactivity offers an alternative to CHI’s traditional text format to disseminate advances in the field. Interactivity promotes and provokes discussion about the role of technology by actively engaging attendees one-on-one.
	</p>

	<div ng-repeat="int_data in data" class="interactivity_box">
		<h3 ng-bind="int_data.id+': '+int_data.title" id="{{int_data.id}}"></h3>
		<div>
			<h4>Authors</h4>
			<p ng-bind="int_data.authors" class="authors"></p>
		</div>
		<div ng-if="!int_data.toggle" >
			<h4>Description</h4>
			<p ng-bind="int_data.description" class="description"></p>
		</div>
		<div ng-if="int_data.toggle" >
			<h4>Abstract</h4>
			<p ng-bind="int_data.abstract" class="abstract"></p>
		</div>
		<a ng-click="toggle(int_data.id)" class="btn">Toggle Description/Abstract</a>
	</div>
</div>

<?php
  include "../footer.php";
?>