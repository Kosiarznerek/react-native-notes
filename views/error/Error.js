import React from "react";
import {Text, View} from "react-native";
import style from './style';

export default class Error extends React.Component {

    render() {
        return (
            <View style={style.view}>
                <Text style={style.headerText}>Error page</Text>
                <Text style={style.messageText}>
                    {
                        this.props.text || 'Sorry. Unexpected error happened. Please restart application.'
                    }
                </Text>
            </View>
        )
    }

}