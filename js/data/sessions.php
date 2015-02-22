<?php
header('Content-Type: application/json');
echo substr(file_get_contents("sessions-no-award.json"), 9);

?>