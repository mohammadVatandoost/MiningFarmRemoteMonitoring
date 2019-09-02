import React, {Component} from 'react';
import {
    TextInput,StyleSheet,
} from 'react-native';

class TextInputCurved extends Component {

    render() {
        return (
            <TextInput value={this.props.value} style={styles.TextInput} placeholder={this.props.placeholder}
                       onChangeText={(text) => {this.props.onChangeText(text)}} placeholderTextColor={this.props.placeholderTextColor} />
        )
    }
}

const styles = StyleSheet.create({
    TextInput: {
        textAlign: 'center',
        fontSize: 22,
        borderRadius: 25,
        borderWidth: 1,
        alignSelf: 'stretch', marginTop: 10, marginBottom: 10
    },
});

export default TextInputCurved;