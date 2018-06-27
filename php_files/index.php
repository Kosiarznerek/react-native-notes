<?php

//Receiving post data
$_POST = json_decode(file_get_contents('php://input'), true);

//No action
if (!isset($_POST['action'])) {
    echo '{"response": false, "reason": "No action declared."}';
    exit(0);
}

//Depends on action type
switch ($_POST['action']) {
    case 'UserIsValid':
        require_once __DIR__ . '\action\user_is_valid.php';
        break;
    case 'AddNewUser':
        require_once __DIR__ . '\action\add_new_user.php';
        break;
    case 'GetAllUserNotes':
        require_once __DIR__ . '\action\get_all_user_notes.php';
        break;
    case 'GetUserNote':
        require_once __DIR__ . '\action\get_user_note.php';
        break;
    case 'InsertNewNote':
        require_once __DIR__ . '\action\insert_new_note.php';
        break;
    case 'UpdateNote':
        require_once __DIR__ . '\action\update_note.php';
        break;
    case 'DeleteNote':
        require_once __DIR__ . '\action\delete_note.php';
        break;
    default:
        echo '{"response": false, "reason": "Unknown action type."}';
        exit(0);
}