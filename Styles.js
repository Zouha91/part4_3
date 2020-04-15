import { StyleSheet } from "react-native"

//A stylesheet to make our app beautiful
const styles = StyleSheet.create({
    noteview: {
        backgroundColor: 'silver',
        fontWeight: 'bold',
        fontSize: 30,
        padding: 10,
    },
    addnotestyle: {
        flex: 1, 
        flexDirection: 'column',
        alignItems: 'stretch',
        justifyContent: 'flex-end',
        backgroundColor: 'darkgrey',
        fontWeight: 'bold',
        fontSize: 30,
        padding: 10
    },
    addnotebutton: {
        fontWeight: 'bold',
        fontSize: 30,
        padding: 10
    },
    inputtext: {
        color: 'green',
        fontWeight: 'bold',
        fontSize: 20

    }

});

export default styles;