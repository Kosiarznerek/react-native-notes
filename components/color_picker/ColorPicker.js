import React from "react";
import {TouchableOpacity, View} from "react-native";
import style from './style'

export default class ColorPicker extends React.Component {

    /**
     * Creating ColorPicker object
     * @param {{defaultColor?:string, colorSet?:string[], onColorUpdate?:(string), enabled: boolean}} props
     */
    constructor(props) {
        super(props);

        //Available colors
        this.colorSet = Array.isArray(this.props.colorSet)
            ? this.props.colorSet
            : [ //Default colors
                '#ffe0bd',
                '#ffcd94',
                '#eac086',
                '#ffad60',
                '#ffe39f'
            ];

        //State
        this.state = {
            currentColor: this.props.defaultColor || '#ffe0bd'
        };

        //On color update
        this.props.defaultColor !== this.state.currentColor && typeof this.props.onColorUpdate === 'function'
            ? this.props.onColorUpdate(this.state.currentColor)
            : null;

        //Current color is not in colorSet
        this.colorSet.indexOf(this.state.currentColor) < 0
            ? this.colorSet.push(this.state.currentColor)
            : null
    }

    render() {
        return (
            <View style={[style.view, this.props.style]}>
                /* Generating color palette */
                {
                    this.colorSet.map(color => <TouchableOpacity
                        key={color}
                        activeOpacity={0.2}
                        style={[style.touchableOpacity, {
                            backgroundColor: color,
                            borderWidth: color === this.state.currentColor ? 4 : 0
                        }]}
                        onPress={() => {
                            if (this.props.enabled !== true) return;
                            this.setState({currentColor: color});
                            typeof this.props.onColorUpdate === 'function'
                                ? this.props.onColorUpdate(color)
                                : null
                        }}
                    />)
                }
            </View>
        )
    }
}