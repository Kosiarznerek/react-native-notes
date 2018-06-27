<?php

//Uncompleted data
if (!isset($_POST['login'])) {
    echo '{"response": false, "reason":"Unable to find \'login\' property."}';
    exit(0);
}
if (!isset($_POST['password'])) {
    echo '{"response": false, "reason":"Unable to find \'password\' property."}';
    exit(0);
}
if (!isset($_POST['passwordRep'])) {
    echo '{"response": false, "reason":"Unable to find \'passwordRep\' property."}';
    exit(0);
}
if (!isset($_POST['email'])) {
    echo '{"response": false, "reason":"Unable to find \'email\' property."}';
    exit(0);
}

//Checking password match
if ($_POST['password'] !== $_POST['passwordRep']) {
    echo '{"response": false, "reason":"Passwords are not the same."}';
    exit(0);
}

//Email validation
if (!filter_var($_POST['email'], FILTER_VALIDATE_EMAIL)) {
    echo '{"response": false, "reason":"Invalid email address."}';
    exit(0);
}

//Database connection
require_once __DIR__ . '\..\db_connect.php';

//Checking if login is not busy
$free_login = $conn->query("SELECT `login` FROM `users` WHERE `login`='" . htmlspecialchars($_POST['login']) . "'");
if ($free_login->num_rows === 1) {
    echo '{"response": false, "reason": "User with login ' . $_POST['login'] . ' already exists in database."}';
    exit(0);
}

//Checking if email address is not busy
$free_email = $conn->query("SELECT `email` FROM `users` WHERE `email`='" . htmlspecialchars($_POST['email']) . "'");
if ($free_email->num_rows === 1) {
    echo '{"response": false, "reason": "User with email ' . $_POST['email'] . ' already exists in database."}';
    exit(0);
}

//Preparing data to insert
$user_login = htmlspecialchars($_POST['login']);
$user_password = password_hash($_POST['password'], PASSWORD_DEFAULT);
$user_email = htmlspecialchars($_POST['email']);

//Attempt to insert
if ($conn->query("INSERT INTO `users`(`login`, `password`, `email`) VALUES ('$user_login','$user_password','$user_email')")) {
    echo '{"response": true}';
    exit(0);
} else {
    echo '{"response": false, "reason":"Unable insert new user to data base. ' . $conn->error . '"}';
    exit(0);
}