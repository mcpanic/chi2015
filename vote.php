<!DOCTYPE html>
<html lang="en">
	<head>
		<link rel="stylesheet" type="text/css" href="_vendor/bootstrap-3.1.1-dist/css/bootstrap.min.css" />
		<link rel="stylesheet" type="text/css" href="_vendor/bootstrap-3.1.1-dist/css/bootstrap-theme.min.css" />
		<link rel="stylesheet" type="text/css" href="css/schedule.css" />
		<meta name="viewport" content="width=device-width, initial-scale=1.0">
	</head>
	<body>
		<div class='container'></div>
	</body>
	<script type="text/javascript" src="_vendor/underscore/underscore-min.js"></script>
	<script type="text/javascript" src="_vendor/jquery-ui-1.10.4/jquery-1.10.2.js"></script>
	<script type="text/javascript" src="_vendor/jquery-ui-1.10.4/ui/minified/jquery-ui.min.js"></script>
	<script type="text/javascript" src="_vendor/constraintjs-0.9.6-beta/cjs.js"></script>
	<script type="text/javascript" src="_vendor/bootstrap-3.1.1-dist/js/bootstrap.min.js"></script>
	<script type="text/javascript" src="_vendor/dropbox-js-datastore-sdk-1.0.0/lib/dropbox-datastores-1.0.0.js"></script>
	<script type="text/javascript" src="_vendor/history.js-1.8.0b2/scripts/bundled/html4html5/jquery.history.js"></script>

	<script type="text/javascript" src="js/core.js"></script>
	<script type="text/javascript" src="js/util.js"></script>
	<script type="text/javascript" src="js/user_data.js"></script>
	<script type="text/javascript" src="js/dropbox.js"></script>
	<script type="text/javascript" src="js/db_query.js"></script>
	<script type="text/javascript" src="js/db_filter.js"></script>
	<script type="text/javascript" src="js/schedule.js"></script>
	<script type="text/javascript" src="js/timeslot_grid.js"></script>
	<script type="text/javascript" src="js/navbar.js"></script>
	<script type="text/javascript" src="js/votes.js"></script>
	<script type="text/javascript" src="js/paper.js"></script>
	<script type="text/javascript" src="js/expanded_session.js"></script>
	<script type="text/javascript" src="js/map.js"></script>
	<script type="text/javascript" src="js/voterIdInput.js"></script>
	<script type="text/javascript" src="js/videoModal.js"></script>
	<script type="text/javascript">
		if (window.location.protocol !== "https:") {
			if(window.location.hostname !== "localhost") {
				//window.location.href = "https:" + window.location.href.substring(window.location.protocol.length);
			}
		}
		$(function() {
			$('.container').schedule({ });
		});
	</script>
</html>
