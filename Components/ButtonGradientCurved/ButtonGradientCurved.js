import React, {Component} from 'react';
import {
    TouchableOpacity ,StyleSheet, Text,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

class ButtonGradientCurved extends Component {

    render() {
        return (
            <TouchableOpacity onPress={this.props.onPress}  style={styles.Button}>
              <LinearGradient colors={['#FF6A83', '#F3A866']}  start={{x: 0, y: 0}} end={{x: 1, y: 0}}  style={styles.linerGradient}>
                <Text style={this.props.styleText}>{this.props.text}</Text>
              </LinearGradient>
            </TouchableOpacity>
        )
    }
}

const styles = StyleSheet.create({
    Button: {
        textAlign: 'center',
        fontSize: 22,
        borderWidth: 0,
        alignSelf: 'stretch',
        borderRadius: 35,
        width:"100%", marginTop: 10, marginBottom: 10,
    },
    linerGradient: {
        borderRadius: 35,
    }
});

export default ButtonGradientCurved;