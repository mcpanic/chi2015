<?php
header('Content-Type: application/json');
$file="interactivity_list.csv";
$csv= file_get_contents($file);
//echo $file;
$array = array_map("str_getcsv", explode("\n", $csv));
//echo $csv;
echo '{"data": '.json_encode($array) . "}";
;?>