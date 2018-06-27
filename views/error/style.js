import {StyleSheet} from "react-native";

export default StyleSheet.create({
    view: {
        flex: 1,
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#3b5998',
        marginTop: 20
    },
    headerText: {
        alignSelf: 'stretch',
        textAlign: 'center',
        color: '#3b5998',
        fontSize: 20,
        fontWeight: '800',
        padding: 20,
        backgroundColor: '#f7f7f7',
    },
    messageText: {
        alignSelf: 'stretch',
        textAlign: 'center',
        color: '#f7f7f7',
        fontSize: 20,
        fontWeight: '800',
        padding: 20,
        backgroundColor: '#3b5998',
        borderWidth: 4,
        borderColor: '#f7f7f7'
    }
})