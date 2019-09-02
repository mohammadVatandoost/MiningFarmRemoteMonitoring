import React, {Component} from 'react';
import {
    TouchableOpacity ,StyleSheet, Text,
} from 'react-native';

class ButtonCurved extends Component {

    render() {
        return (
            <TouchableOpacity onPress={this.props.onPress}  style={styles.Button}>
                <Text style={this.props.styleText}>{this.props.text}</Text>
            </TouchableOpacity>
        )
    }
}

const styles = StyleSheet.create({
    Button: {
        textAlign: 'center',
        fontSize: 22,
        borderWidth: 1,
        alignSelf: 'stretch',
        borderRadius: 25,
        width:"100%", marginTop: 10, marginBottom: 10,
    },
});

export default ButtonCurved;