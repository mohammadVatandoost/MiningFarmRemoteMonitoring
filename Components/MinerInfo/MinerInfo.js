import React, {Component} from 'react';
import {
    View,
    Text, StyleSheet,
} from 'react-native';
import {FastDesign, backgroundColor} from '../../Styles/Styles';
import HorizontalLine from '../../Components/HorizontalLine/HorizontalLine';

class MinerInfo extends Component {

    render() {
        return (
            <View style={{...FastDesign.flexColumn, ...FastDesign.alignCenter, ...styles.container, ...backgroundColor.white,
                ...FastDesign.mt2, ...FastDesign.pt2, ...FastDesign.pb2}}>
                <View style={{...FastDesign.flexRow, ...FastDesign.alignSelfStretch, ...FastDesign.flexSpaceBetween,
                 ...FastDesign.pl1, ...FastDesign.pr1}}>
                   <Text style={{...FastDesign.h5, ...FastDesign.BYekanFont, ...FastDesign.textLeft}}>{this.props.minerName}</Text>
                   <Text style={{...FastDesign.h6, ...FastDesign.BYekanFont, ...FastDesign.textRight}}>{this.props.ip}</Text>
                </View>
                 <HorizontalLine width={1} color="#000" />
                 <View style={{...FastDesign.flexRow, ...FastDesign.alignSelfStretch, ...FastDesign.flexSpaceBetween, 
                   ...FastDesign.pl1, ...FastDesign.pr1}}>
                   <Text style={{...FastDesign.h6, ...FastDesign.BYekanFont}}>سرعت فن ها: {this.props.fanSpeeds}</Text>
                   <Text style={{...FastDesign.h6, ...FastDesign.BYekanFont}}> نرخ هش : {this.props.totalHashrate}</Text>
                </View>
                <HorizontalLine width={1} color="#000" />
                <View style={{...FastDesign.flexColumn,  ...FastDesign.alignSelfStretch, 
                ...FastDesign.pl1, ...FastDesign.pr1}}>
                   <Text style={{...FastDesign.h6, ...FastDesign.BYekanFont}}>دمای یک: {this.props.temp1} </Text>
                   <Text style={{...FastDesign.h6, ...FastDesign.BYekanFont}}>دمای دو:  {this.props.temp2} </Text>
                </View>
                <Text style={{...FastDesign.h6, ...FastDesign.BYekanFont, ...FastDesign.textCenter}}>{this.props.upTime} :زمان روشن بودن</Text>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        width: "95%",
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
export default MinerInfo;