import {StyleSheet} from 'react-native'

export default StyleSheet.create({
    view: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        alignContent: 'center',
        backgroundColor: '#3b5998',
        marginTop: 20
    },
    headerView: {
        flex: 1,
        justifyContent: 'center'
    },
    headerText: {
        color: '#ffffff',
        fontSize: 30,
        fontWeight: '900'
    },
    titleInput: {
        flex: 1,
        backgroundColor: '#ffffff',
        alignSelf: 'stretch',
        margin: 4,
        borderRadius: 4,
        color: '#3b5998',
        fontSize: 24,
        fontWeight: '600',
        padding: 8,
        maxHeight: 40
    },
    textInput: {
        flex: 4,
        backgroundColor: '#ffffff',
        alignSelf: 'stretch',
        margin: 4,
        borderRadius: 4,
        color: '#3b5998',
        fontSize: 18,
        fontWeight: '600',
        padding: 8
    }
})