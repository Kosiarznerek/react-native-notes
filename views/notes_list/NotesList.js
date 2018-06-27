import React from "react";
import {ScrollView, Text, View, Alert} from "react-native";
import SingleNote from '../../components/single_note/SingleNote';
import style from './style'

//Database
import {GetAllUserNotes, DeleteNote} from './../../library/Database';

export default class NotesList extends React.Component {

    constructor(props) {
        super(props);

        //State
        this.state = {
            notesData: [] //Array<NoteData>
        };

        //User data
        this.userData = {
            login: props.userData.login,
            password: props.userData.password
        };

        //Getting all user notes
        GetAllUserNotes(this.userData.login, this.userData.password).then(response => {
            if (response.response) this.setState({notesData: response.response});
            else Alert.alert('Getting notes error.', response.reason, [{text: 'OK'}], {cancelable: false});
        })
    }

    /**
     * Executes when user pressed 'delete' button on note
     * @param {string} id Id of pressed note
     */
    onNoteDeletePress = id => {
        DeleteNote(this.userData.login, this.userData.password, id).then(response => {
            if (!response.response) Alert.alert('Deleting notes error', response.reason, [{text: 'OK'}], {cancelable: false});
            else {
                Alert.alert('Success', 'Note deleted successfully.', [{text: 'OK'}], {cancelable: false});
                this.setState({notesData: this.state.notesData.filter(n => n.id !== id)})
            }
        })
    };

    render() {
        return (
            <View style={style.view}>
                /* Header */
                <View style={style.headerView}>
                    <Text style={style.headerText}>Notes</Text>
                </View>

                /* Notes list */
                <View style={style.notesList}>
                    <ScrollView>
                        {
                            this.state.notesData.map(noteData =>
                                <SingleNote
                                    title={noteData.title}
                                    text={noteData.text}
                                    color={noteData.color}
                                    key={noteData.id}
                                    onEditPress={() => typeof this.props.onNoteEditPress === 'function'
                                        ? this.props.onNoteEditPress(noteData.id)
                                        : null
                                    }
                                    onDeletePress={() => this.onNoteDeletePress(noteData.id)}
                                />
                            )
                        }
                    </ScrollView>
                </View>
            </View>
        )
    }
}