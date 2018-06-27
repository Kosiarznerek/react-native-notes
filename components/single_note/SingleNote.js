import React from "react";
import {Image, Text, TouchableOpacity, View} from "react-native";

import style from './style';

export default class SingleNote extends React.Component {

    /**
     * Crops a long text to shorter ended with '(...)' if too long
     * @param {string} longString String to crop
     * @param {number} maxLength Max length of string
     * @return {string}
     */
    static CropToLength(longString, maxLength) {
        //Size ok
        if (longString.length <= maxLength) return longString;

        //Separate words by space
        const words = longString.split(' ');

        //Creating short ver
        let shorString = '';
        for (let i = 0; i < words.length; i++) {
            if (shorString.length + words[i].length <= maxLength)
                shorString += words[i] + ' ';
            else if (i !== 0) return `${shorString}(...)`;
            else return `${words[i].substring(0, maxLength)}(...)`;
        }
    }

    render() {
        return (
            /* Note container */
            <View style={[style.view, {borderRightColor: this.props.color || '#ffad60'}]}>
                /* Note title */
                <Text style={style.titleText}>
                    {
                        typeof this.props.title === 'string'
                            ? SingleNote.CropToLength(this.props.title, 30)
                            : '[Empty title]'
                    }
                </Text>

                /* Note text */
                <Text style={style.noteText}>
                    {
                        typeof this.props.text === 'string'
                            ? SingleNote.CropToLength(this.props.text, 100)
                            : '[Empty text]'
                    }
                </Text>

                /* Note buttons */
                <View style={style.iconsView}>
                    /* Edit */
                    <TouchableOpacity
                        onPress={() => typeof this.props.onEditPress === 'function' ? this.props.onEditPress() : null}
                        style={style.iconButton}
                    >
                        <Image source={require('./../../assets/edit.png')}/>
                    </TouchableOpacity>

                    /* Delete */
                    <TouchableOpacity
                        onPress={() => typeof this.props.onDeletePress === 'function' ? this.props.onDeletePress() : null}
                        style={style.iconButton}
                    >
                        <Image source={require('./../../assets/garbage.png')}/>
                    </TouchableOpacity>
                </View>
            </View>
        )
    }
}