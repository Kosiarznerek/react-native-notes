<?php

//No login or no password passed
if (!isset($_POST['login'])) {
    echo '{"response": false, "reason":"Unable to find \'login\' property."}';
    exit(0);
}
if (!isset($_POST['password'])) {
    echo '{"response": false, "reason":"Unable to find \'password\' property."}';
    exit(0);
}

//Database connection
require_once __DIR__ . '\..\db_connect.php';

//Checks if user exists in database
$result = $conn->query("SELECT `password` FROM `users` WHERE `login`='" . htmlspecialchars($_POST['login']) . "'");

//User do not exist in data base
if ($result->num_rows !== 1) {
    echo '{"response": false, "reason":"No such user in database."}';
    exit(0);
}

//Getting password
$result = $result->fetch_assoc();
$result = $result['password'];

//Password verification
if (password_verify($_POST['password'], $result)) {
    echo '{"response": true}';
    exit(0);
} else {
    echo '{"response": false, "reason": "Incorrect user password."}';
    exit(0);
}