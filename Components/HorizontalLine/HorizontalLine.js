import React, { Component } from 'react';
import {
    View,
    Text, StyleSheet,
    StatusBar, TouchableHighlight
} from 'react-native';
import {withNavigation} from 'react-navigation'


class HorizontalLine extends Component {

    render() {
        return (
            <View
                style={{
                    borderBottomColor: this.props.color,
                    borderBottomWidth: this.props.width,
                }}
            />
        );
    }
}

export default withNavigation(HorizontalLine);