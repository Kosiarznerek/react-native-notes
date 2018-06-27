import PostData from './PostData';
import NoteData from "./NoteData";
import LOCALHOST from '../LOCALHOST' //My IP address

//Url to database (normally all files located in 'php_files' would be on real server)
const URL = `http://${LOCALHOST}/notes/php_files/index.php`;

/**
 * Checks if user exists in database
 * @param {string} login User login
 * @param {string} password User password
 * @return {Promise<{response: boolean, reason?: string}>}
 */
export const UserIsValid = (login, password) => PostData(URL, {
    action: 'UserIsValid',
    login, password
});

/**
 * Adds new user to database
 * @param {string} login User login
 * @param {string} password User password
 * @param {string} passwordRep Repeated password
 * @param {string} email User email address
 * @return {Promise<{response: boolean, reason?: string}>}
 */
export const AddNewUser = (login, password, passwordRep, email) => PostData(URL, {
    action: 'AddNewUser',
    login, password, passwordRep, email
});

/**
 * Getting all user notes from database
 * @param {string} login User login
 * @param {string} password User password
 * @return {Promise<{response: NoteData[]|boolean, reason?: string}>}
 */
export const GetAllUserNotes = (login, password) => PostData(URL, {
    action: 'GetAllUserNotes',
    login, password
});

/**
 * Gets user note
 * @param {string} login User login
 * @param {string} password User password
 * @param {string} noteID Note id to get
 * @return {Promise<{response:NoteData|boolean, reason?: string}>}
 */
export const GetUserNote = (login, password, noteID) => PostData(URL, {
    action: 'GetUserNote',
    login, password, noteID
});

/**
 * Inserts new note to database
 * @param {string} login User login
 * @param {string} password User password
 * @param {NoteData} noteData Note to insert
 * @return {Promise<{response: boolean, reason?: string}>}
 */
export const InsertNewNote = (login, password, noteData) => PostData(URL, {
    action: 'InsertNewNote',
    login, password,
    note_title: noteData.title,
    note_text: noteData.text,
    note_color: noteData.color
});

/**
 * Updates note data in database
 * @param {string} login
 * @param {string} password
 * @param {NoteData} noteData
 * @return {Promise<{response: boolean, reason?: string}>}
 */
export const UpdateNote = (login, password, noteData) => {
    //Note id validation
    if (!noteData.hasValidID) return new Promise(r => r({
        response: false,
        reason: "NoteData object contains incorrect id number."
    }));

    //Updating
    return PostData(URL, {
        action: 'UpdateNote',
        login, password,
        note_id: noteData.id,
        note_title: noteData.title,
        note_text: noteData.text,
        note_color: noteData.color
    })
};

/**
 * Deletes user note
 * @param {string} login User login
 * @param {string} password User password
 * @param {NoteData | string} noteData Note data with correct id or note id from database
 * @return {Promise<{response: boolean, reason?: string}>}
 */
export const DeleteNote = (login, password, noteData) => {
    //Note id validation
    if (noteData instanceof NoteData && !noteData.hasValidID) return new Promise(r => r({
        response: false,
        reason: "NoteData object contains incorrect id number."
    }));

    //Deleting
    return PostData(URL, {
        action: 'DeleteNote',
        login, password,
        note_id: noteData instanceof NoteData ? noteData.id : noteData
    })
};