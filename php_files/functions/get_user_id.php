<?php

//Database connection
require_once __DIR__ . '\..\db_connect.php';

/**
 * Getting user id from database based on login and password
 * @param string $login User login
 * @param string $password User password
 * @return int Negative int when user do not exists in data base
 */
function get_user_id($login, $password)
{
    //Global connection
    global $conn;

    //Getting user password
    $db_user = $conn->query("SELECT `password`, `id` FROM `users` WHERE `login`='" . htmlspecialchars($login) . "'");

    //User do not exist
    if ($db_user->num_rows !== 1) return -1;

    //Getting user data
    $db_user = $db_user->fetch_assoc();

    //Password validation
    if (!password_verify($password, $db_user['password'])) return -1;

    //Returning user id from db
    return $db_user['id'];
}