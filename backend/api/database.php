<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: PUT, GET, POST, DELETE");
header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");

define('DB_HOST', 'localhost');
define('DB_USER', 'root');
define('DB_PASS', 'pmap');
define('DB_NAME', 'pmap_database');


  $db = mysqli_connect(DB_HOST ,DB_USER ,DB_PASS ,DB_NAME);

  if (mysqli_connect_errno($db)) {
    echo 'failure';
    die("Failed to connect:" . mysqli_connect_error());
  }

  mysqli_set_charset($db, "utf8");
