import React from "react";
import {ScrollView, Text, TextInput, View, Alert} from "react-native";
import ButtonSecondary from "../../components/button_secondary/ButtonSecondary";
import ButtonPrimary from "../../components/button_primary/ButtonPrimary";
import ColorPicker from "../../components/color_picker/ColorPicker";
import style from './style'
import {InsertNewNote, UpdateNote, GetUserNote} from '../../library/Database'
import NoteData from '../../library/NoteData';

export default class NoteEditor extends React.Component {

    /**
     * Note Editor view
     * @param {{mode: 'EDIT_NOTE'|'ADD_NOTE', userData:{login: string, password: string}, onSuccess?: function, onExit?: function, noteID?: string}} props
     */
    constructor(props) {
        super(props);

        //State
        this.state = {
            //Note data
            noteTitle: '',
            noteText: '',
            noteColor: '',
            noteID: this.props.noteID,

            //Form enabled
            formEnabled: !(this.props.mode === 'EDIT_NOTE') //Wil be changed to true after receiving note data from db
        };

        //Getting note data when 'EDIT_MODE'
        if (this.props.mode === 'EDIT_NOTE') GetUserNote(props.userData.login, props.userData.password, props.noteID).then(r => {
            if (r.response) this.setState({ //Positive response
                noteTitle: r.response.title,
                noteText: r.response.text,
                noteColor: r.response.color,
                formEnabled: true
            }); else Alert.alert('Error', r.reason, [{text: 'OK'},], {cancelable: false})
        })
    }

    /**
     * Executes when form was submitted
     */
    onFormSubmit = () => {
        //Disabling form
        this.setState({formEnabled: false});

        //Adding new note
        if (this.props.mode === 'ADD_NOTE') InsertNewNote(this.props.userData.login, this.props.userData.password, new NoteData(
            this.state.noteTitle,
            this.state.noteText,
            this.state.noteColor
        )).then(r => {
            if (r.response) { //Positive response
                Alert.alert('Success', 'Note was created successfully.', [{text: 'OK'},], {cancelable: false});
                typeof this.props.onSuccess === 'function'
                    ? this.props.onSuccess()
                    : null
            } else { //Something went wrong
                Alert.alert('Error', r.reason, [{text: 'OK'},], {cancelable: false});
                this.setState({formEnabled: true})
            }
        });

        //Editing note
        if (this.props.mode === 'EDIT_NOTE') UpdateNote(this.props.userData.login, this.props.userData.password, new NoteData(
            this.state.noteTitle,
            this.state.noteText,
            this.state.noteColor,
            this.state.noteID
        )).then(r => {
            this.setState({formEnabled: true});
            if (r.response) Alert.alert('Success', 'Note was updated successfully.', [{text: 'OK'},], {cancelable: false});
            else Alert.alert('Error', r.reason, [{text: 'OK'},], {cancelable: false});
        })
    };

    render() {
        return (
            <ScrollView contentContainerStyle={{flex: 1}} scrollEnabled={false}>
                <View style={style.view}>
                    /* Header text depending on mode */
                    <View style={style.headerView}>
                        <Text style={style.headerText}>{
                            this.props.mode === 'EDIT_NOTE'
                                ? 'Editing note'
                                : 'Add new note'
                        }</Text>
                    </View>

                    /* Note title input */
                    <TextInput
                        style={style.titleInput}
                        placeholder={'Title'}
                        value={this.state.noteTitle}
                        onChangeText={text => this.setState({noteTitle: text})}
                        editable={this.state.formEnabled}
                    />

                    /* Note text input */
                    <TextInput
                        style={style.textInput}
                        placeholder={'Write your note here'}
                        multiline={true}
                        value={this.state.noteText}
                        onChangeText={text => this.setState({noteText: text})}
                        editable={this.state.formEnabled}
                    />

                    /* Color picker for note */
                    <ColorPicker
                        onColorUpdate={color => this.setState({noteColor: color})}
                        enabled={this.state.formEnabled}
                    />

                    /* Submit button */
                    <ButtonSecondary
                        text={this.props.mode === 'EDIT_NOTE' ? 'Save changes' : 'Add note'}
                        onPress={this.onFormSubmit}
                    />

                    /* Cancel button */
                    <ButtonPrimary
                        text={'Exit'}
                        style={{borderWidth: 0}}
                        onPress={() => {
                            typeof this.props.onExit === 'function'
                                ? this.props.onExit()
                                : null
                        }}
                    />
                </View>
            </ScrollView>
        )
    }
}
