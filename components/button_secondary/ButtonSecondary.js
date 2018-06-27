import React from "react";
import {Text, TouchableOpacity} from "react-native";
import style from "./style";

export default class ButtonPrimary extends React.Component {
    render() {
        return (
            <TouchableOpacity
                style={[style.touchableOpacity, this.props.style]}
                onPress={() => typeof this.props.onPress === 'function' ? this.props.onPress() : false}
            >
                <Text style={style.text}>{this.props.text || ''}</Text>
            </TouchableOpacity>
        )
    }
}