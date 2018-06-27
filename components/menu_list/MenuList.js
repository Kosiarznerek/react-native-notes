import React from "react";
import {Text, View} from "react-native";
import style from './style'
import ButtonPrimary from "../button_primary/ButtonPrimary";

export default class MenuList extends React.Component {
    render() {
        return (
            <View style={style.view}>
                /* Menu header */
                <Text style={style.headerText}>Menu</Text>

                /* Generating menu list */
                {
                    this.props.menuOptions instanceof Array
                        ? this.props.menuOptions.map(value =>
                            <ButtonPrimary
                                text={value.text}
                                key={value.key}
                                onPress={() => this.props.onMenuOptionPress(value)}
                            />
                        )
                        : false
                }
            </View>
        )
    }
}