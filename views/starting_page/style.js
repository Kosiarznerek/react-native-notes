import {StyleSheet} from "react-native";

export default StyleSheet.create({
    containerView: {
        flex: 1,
        flexDirection: 'column',
        backgroundColor: '#3b5998',
        marginTop: 20,
        alignContent: 'space-between',
    },
    headerText: {
        flex: 1,
        flexDirection: 'row',
        color: '#ffffff',
        fontSize: 40,
        fontWeight: '900',
        padding: 10,
        textAlign: 'center'
    },
    formView: {
        flex: 10,
        flexDirection: 'column',
        alignSelf: 'stretch',
        justifyContent: 'center',
    },
    formHeader: {
        fontSize: 30,
        textAlign: 'center',
        color: '#ffffff',
        fontWeight: '600'
    },
    formInput: {
        alignSelf: 'stretch',
        backgroundColor: 'white',
        fontSize: 20,
        textAlign: 'center',
        padding: 10,
        borderRadius: 4,
        color: '#3b5998',
        margin: 4
    }
});