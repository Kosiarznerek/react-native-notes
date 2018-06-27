import {StyleSheet} from "react-native";

export default StyleSheet.create({
    view: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'space-between',
        backgroundColor: '#3b5998',
        marginTop: 20
    },
    headerView: {
        flex: 1,
        flexDirection: 'row',
        alignSelf: 'stretch',
        alignItems: 'center',
        justifyContent: 'center',
        borderBottomColor: '#ffffff',
        borderBottomWidth: 2
    },
    headerText: {
        fontSize: 40,
        fontWeight: '900',
        color: '#ffffff'
    },
    notesList: {
        flex: 7,
        flexDirection: 'column',
        alignSelf: 'stretch'
    }
})