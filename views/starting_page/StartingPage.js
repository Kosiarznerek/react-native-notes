import React from "react";
import {KeyboardAvoidingView, ScrollView, Text, TextInput, View, Alert} from "react-native";
import ButtonPrimary from "../../components/button_primary/ButtonPrimary";
import ButtonSecondary from "../../components/button_secondary/ButtonSecondary";
import {UserIsValid, AddNewUser} from './../../library/Database'
import style from './style'
import Error from "../error/Error";

export default class StartingPage extends React.Component {

    constructor() {
        super();

        this.state = {
            current: 'SIGN_IN', // 'SIGN_IN' or 'SIGN_UP'

            //Forms data
            formLogin: null,
            formPassword: null,
            formPasswordRep: null,
            formEmail: null,

            //Activation and deactivation form (is deactivated when waiting from server response)
            formEnabled: true
        }
    }

    /**
     * Executes when sign_in or sign_up form was submitted
     */
    onFormSubmit = () => {
        //Form is not enabled
        if (!this.state.formEnabled) return;

        //Blocking form
        this.setState({formEnabled: false});

        //Sign in form was submitted
        if (this.state.current === 'SIGN_IN') UserIsValid(
            this.state.formLogin,
            this.state.formPassword
        ).then(response => {
            if (!response.response) { //Negative response
                this.showFormMessage('Form error', response.reason);
                this.setState({formEnabled: true});
            } else typeof this.props.onSuccess === 'function' //Positive response
                ? this.props.onSuccess(this.state.formLogin, this.state.formPassword)
                : false;
        });


        //Sign up form was submitted
        else if (this.state.current === 'SIGN_UP') AddNewUser(
            this.state.formLogin,
            this.state.formPassword,
            this.state.formPasswordRep,
            this.state.formEmail
        ).then(response => {
            if (!response.response) { //Negative response
                this.showFormMessage('Form error', response.reason);
                this.setState({formEnabled: true});
            } else { //Positive response
                this.showFormMessage('Success', 'User was created successfully.');
                this.setState({
                    formEnabled: true,
                    formLogin: null,
                    formPassword: null,
                    formPasswordRep: null,
                    formEmail: null
                });
            }
        });
    };

    /**
     * Changes form type
     */
    changeFormType = () => {
        //Form not enabled
        if (!this.state.formEnabled) return;

        //Clearing form and changing form type
        this.setState({
            current: this.state.current === 'SIGN_IN' ? 'SIGN_UP' : 'SIGN_IN',
            formLogin: null,
            formPassword: null,
            formPasswordRep: null,
            formEmail: null
        })
    };

    /**
     * Shows forms error in alert message
     * @param title
     * @param message
     */
    showFormMessage(title, message) {
        Alert.alert(
            title, message,
            [{text: 'OK'}],
            {cancelable: false}
        )
    }

    /**
     * Render method
     * @return {*}
     */
    render() {

        //Sign in state
        if (this.state.current === 'SIGN_IN') return (
            <ScrollView contentContainerStyle={style.containerView} scrollEnabled={false}>
                <Text style={style.headerText}>Notes</Text>
                <KeyboardAvoidingView style={style.formView} behavior="padding">
                    /* Form title */
                    <View>
                        <Text style={style.formHeader}>Sign in the account</Text>
                    </View>

                    /* From inputs */
                    <TextInput
                        style={style.formInput}
                        autoCorrect={false}
                        autoCapitalize={'none'}
                        placeholder="Login"
                        onChangeText={v => this.setState({formLogin: v})}
                        value={this.state.formLogin}
                        editable={this.state.formEnabled}
                    />
                    <TextInput
                        secureTextEntry={true}
                        autoCorrect={false}
                        style={style.formInput}
                        placeholder="Password"
                        onChangeText={v => this.setState({formPassword: v})}
                        value={this.state.formPassword}
                        editable={this.state.formEnabled}
                    />

                    /* Form buttons */
                    <ButtonPrimary text={'Sign In'} onPress={this.onFormSubmit} style={{borderWidth: 0}}/>
                    <ButtonSecondary text={'New Account'} onPress={this.changeFormType}/>
                </KeyboardAvoidingView>
            </ScrollView>
        );

        //Sign up state
        if (this.state.current === 'SIGN_UP') return (
            <ScrollView contentContainerStyle={style.containerView} scrollEnabled={false}>
                <Text style={style.headerText}>Notes</Text>
                <KeyboardAvoidingView style={style.formView} behavior="padding">
                    /* Form title */
                    <View>
                        <Text style={style.formHeader}>Create new account</Text>
                    </View>

                    /* Form inputs */
                    <TextInput
                        style={style.formInput}
                        autoCorrect={false}
                        autoCapitalize={'none'}
                        placeholder="Login"
                        onChangeText={v => this.setState({formLogin: v})}
                        value={this.state.formLogin}
                        editable={this.state.formEnabled}
                    />
                    <TextInput
                        secureTextEntry={true}
                        autoCorrect={false}
                        style={style.formInput}
                        placeholder="Password"
                        onChangeText={v => this.setState({formPassword: v})}
                        value={this.state.formPassword}
                        editable={this.state.formEnabled}

                    />
                    <TextInput
                        secureTextEntry={true}
                        autoCorrect={false}
                        style={style.formInput}
                        placeholder="Repeat password"
                        onChangeText={v => this.setState({formPasswordRep: v})}
                        value={this.state.formPasswordRep}
                        editable={this.state.formEnabled}
                    />
                    <TextInput
                        style={style.formInput}
                        keyboardType={"email-address"}
                        autoCorrect={false}
                        autoCapitalize={'none'}
                        placeholder="Email"
                        onChangeText={v => this.setState({formEmail: v})}
                        value={this.state.formEmail}
                        editable={this.state.formEnabled}
                    />

                    /* Form buttons */
                    <ButtonPrimary text={'Create account'} onPress={this.onFormSubmit} style={{borderWidth: 0}}/>
                    <ButtonSecondary text={'Sign in'} onPress={this.changeFormType}/>
                </KeyboardAvoidingView>
            </ScrollView>
        );

        //Unknown state
        return (<Error text={"Unknown state in 'StartingPage' class."}/>)
    }

}