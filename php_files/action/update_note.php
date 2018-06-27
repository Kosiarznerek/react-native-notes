<?php

//Data validation
if (!isset($_POST['login'])) {
    echo '{"response": false, "reason":"Unable to find \'login\' property."}';
    exit(0);
}
if (!isset($_POST['password'])) {
    echo '{"response": false, "reason":"Unable to find \'password\' property."}';
    exit(0);
}
if (!isset($_POST['note_id'])) {
    echo '{"response": false, "reason":"Unable to find \'note_id\' property."}';
    exit(0);
}
if (!isset($_POST['note_title'])) {
    echo '{"response": false, "reason":"Unable to find \'note_title\' property."}';
    exit(0);
}
if (!isset($_POST['note_text'])) {
    echo '{"response": false, "reason":"Unable to find \'note_text\' property."}';
    exit(0);
}
if (!isset($_POST['note_color'])) {
    echo '{"response": false, "reason":"Unable to find \'note_color\' property."}';
    exit(0);
}

//Empty note
if (trim($_POST['note_title']) === '') {
    echo '{"response": false, "reason":"Note title cannot be empty."}';
    exit(0);
}
if (trim($_POST['note_text']) === '') {
    echo '{"response": false, "reason":"Note text cannot be empty."}';
    exit(0);
}
if (trim($_POST['note_color']) === '') {
    echo '{"response": false, "reason":"Note color cannot be empty."}';
    exit(0);
}

//Getting user id
require_once __DIR__ . '\..\functions\get_user_id.php';
$user_id = get_user_id($_POST['login'], $_POST['password']);
if ($user_id < 0) {
    echo '{"response": false, "reason":"Unable to find user in database"}';
    exit(0);
}

//Database connection
require_once __DIR__ . '\..\db_connect.php';

//Attempt to update note
if ($conn->query("UPDATE `notes` SET `title`='" . htmlspecialchars($_POST['note_title']) . "',`text`='" . htmlspecialchars($_POST['note_text']) . "',`color`='" . htmlspecialchars($_POST['note_color']) . "' WHERE `id`='" . htmlspecialchars($_POST['note_id']) . "' AND `user_id`='$user_id'")) {
    echo '{"response": true}';
    exit(0);
} else {
    echo '{"response": false, "reason":"Unable to update note. ' . $conn->error . '"}';
    exit(0);
}