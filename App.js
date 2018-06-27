import React from 'react';

//Views
import StartingPage from './views/starting_page/StartingPage';
import NotesList from './views/notes_list/NotesList';
import NoteEditor from "./views/note_editor/NoteEditor";
import Error from './views/error/Error';

//Menu
import MenuList from './components/menu_list/MenuList';

const SideMenu = require('react-native-side-menu').default;

export default class App extends React.Component {

    constructor() {
        super();

        //State
        this.state = {
            current: 'STARTING_PAGE', // 'STARTING_PAGE' || 'NOTES_LIST' || 'ADD_NOTE' || 'EDIT_NOTE'
            userLogin: null, //Null when user is not signed in
            userPassword: null, //Null when user is not signed in
            noteID: null //Null when user is not currently editing any note
        };

        //Menu options
        this.menuOptions = [
            {key: 0, text: 'New note'},
            {key: 1, text: 'All notes'},
            {key: 2, text: 'Sign out'},
        ];
    }

    /**
     * Executes when user press any option from menu
     * @param {{key: number, text: string}} value Pressed value
     */
    onMenuOptionPress = value => {
        switch (value.key) {
            case 0: //New note
                this.setState({current: 'ADD_NOTE'});
                break;
            case 1://All notes
                this.setState({current: 'NOTES_LIST'});
                break;
            case 2: //Sign out
                this.setState({
                    current: 'STARTING_PAGE',
                    userLogin: null,
                    userPassword: null
                });
                break;
        }
    };

    /**
     * Executes when user pressed 'edit' button on note
     * @param {string} id Id of pressed note
     */
    onNoteEditPress = id => {
        this.setState({
            noteID: id,
            current: 'EDIT_NOTE'
        })
    };

    /**
     * Render method
     * @return {*}
     */
    render() {

        //When user is not signed in he has opportunity to sign in or sign up
        if (this.state.current === 'STARTING_PAGE') return (
            <StartingPage onSuccess={(userLogin, userPassword) => this.setState({
                userLogin,
                userPassword,
                current: 'NOTES_LIST'
            })}/>
        );

        //Application screen after signed in
        if (
            this.state.current === 'NOTES_LIST' ||
            this.state.current === 'ADD_NOTE' ||
            this.state.current === 'EDIT_NOTE'
        ) return (
            <SideMenu
                menu={<MenuList menuOptions={this.menuOptions} onMenuOptionPress={this.onMenuOptionPress}/>}
                menuPosition={'right'}
            >
                /* Notes list */
                {
                    this.state.current === 'NOTES_LIST'
                        ? <NotesList
                            userData={{login: this.state.userLogin, password: this.state.userPassword}}
                            onNoteEditPress={this.onNoteEditPress}
                        />
                        : false
                }

                /* Add note */
                {
                    this.state.current === 'ADD_NOTE'
                        ? <NoteEditor
                            mode={'ADD_NOTE'}
                            userData={{login: this.state.userLogin, password: this.state.userPassword}}
                            onExit={() => this.setState({current: 'NOTES_LIST'})}
                        />
                        : false
                }

                /* Edit note */
                {
                    this.state.current === 'EDIT_NOTE'
                        ? <NoteEditor
                            mode={'EDIT_NOTE'}
                            noteID={this.state.noteID}
                            userData={{login: this.state.userLogin, password: this.state.userPassword}}
                            onSuccess={() => this.setState({current: 'NOTES_LIST', noteID: null})}
                            onExit={() => this.setState({current: 'NOTES_LIST', noteID: null})}
                        />
                        : false
                }
            </SideMenu>
        );

        //Unknown state
        return (<Error text={"Unknown app state in 'App' class."}/>)
    }
}
