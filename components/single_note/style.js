import {StyleSheet} from "react-native";

export default StyleSheet.create({
    view: {
        flexDirection: 'column',
        padding: 10,
        marginBottom: 5,
        backgroundColor: '#ffffff',
        borderRightWidth: 8
    },
    titleText: {
        fontSize: 26,
        fontWeight: '600',
        color: '#3b5998'
    },
    noteText: {
        fontSize: 20,
        fontWeight: '200',
        color: '#3b5998'
    },
    iconsView: {
        flexDirection: 'row'
    },
    iconButton: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: '#f7f7f7',
        marginRight: 2,
        marginTop: 2,
        borderRadius: 4,
        borderColor: '#dfe3ee',
        borderWidth: 1,
        padding: 4
    }
})