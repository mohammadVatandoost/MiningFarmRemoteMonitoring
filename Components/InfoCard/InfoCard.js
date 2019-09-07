import React, {Component} from 'react';
import {
    View,
    Text, StyleSheet,
} from 'react-native';
import {FastDesign, backgroundColor} from '../../Styles/Styles';
import HorizontalLine from '../../Components/HorizontalLine/HorizontalLine';

class InfoCard extends Component {

    render() {
        return (
            <View style={{...FastDesign.flexColumn, ...FastDesign.alignCenter, ...styles.container, ...backgroundColor.white,
                ...FastDesign.mt2, ...FastDesign.pt2, ...FastDesign.pb2}}>
                <Text style={{...FastDesign.h4, ...FastDesign.BYekanFont, ...FastDesign.textCenter}}>{this.props.title}</Text>
                <HorizontalLine width={1} color="#000" />
                <Text style={{...FastDesign.h5,  ...FastDesign.textCenter}}>{this.props.text}</Text>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        width: "46%",
        borderRadius:10, justifyContent: 'center',
        alignItems: 'center',
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 3,
        },
        shadowOpacity: 0.29,
        shadowRadius: 4.65,
        elevation: 7,
    },
});
export default InfoCard;