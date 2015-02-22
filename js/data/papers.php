<?php
header('Content-Type: application/json');
echo substr(file_get_contents("papers-no-award.json"), 9);

?>