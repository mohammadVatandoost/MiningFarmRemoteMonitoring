import React, { Component } from 'react';
import {
    View,
    Text, StyleSheet,
    StatusBar, TouchableHighlight
} from 'react-native';
import {withNavigation} from 'react-navigation'


class HorizontalLine extends Component {

    jewelStyle = () => {
        console.log('HorizontalLine');
        console.log(this.props.color); console.log(this.props.width);
      return {
        borderBottomColor: `this.props.color`,
        borderBottomColor: `this.props.width`,
      }
    }

    render() {
        return (
            <View
                style={this.jewelStyle()}
            />
        );
    }
}

export default withNavigation(HorizontalLine);