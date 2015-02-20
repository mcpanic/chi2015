<?php
header('Content-Type: application/json');
echo substr(file_get_contents("papers.json"), 9);

?>