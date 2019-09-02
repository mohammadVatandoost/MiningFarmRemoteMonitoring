import React, {Component} from 'react';
import {
    TouchableOpacity ,StyleSheet, Text,
} from 'react-native';

class HrefLink extends Component {

    render() {
        return (
            <TouchableOpacity onPress={this.props.onPress}  >
                <Text style={this.props.styleText}>{this.props.text}</Text>
            </TouchableOpacity>
        )
    }
}

const styles = StyleSheet.create({
    Button: {
        alignSelf: 'stretch',
        width:"100%",
    },
});

export default HrefLink;