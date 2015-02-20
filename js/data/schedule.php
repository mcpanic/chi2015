<?php
header('Content-Type: application/json');
echo "{\"data\": ".substr(file_get_contents("schedule.json"), 9)."}";

?>