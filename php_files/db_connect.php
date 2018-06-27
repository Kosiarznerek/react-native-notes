<?php

//Getting connection with database
$conn = new mysqli('localhost', 'root', '', 'notes_app');
if ($conn->error) {
    echo '[db_connect.php ERROR]: ' . $conn->error;
    exit(0);
}