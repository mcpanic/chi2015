<?php
header('Content-Type: application/json');
$file="schedule_glance.csv";
$csv= file_get_contents($file);
$csv =  utf8_encode($csv);
//echo $file;
$array = array_map("str_getcsv", explode("\n", $csv));
// print_r($array);
// echo json_encode($array);
echo '{"data": '.json_encode($array) . "}";
;?>