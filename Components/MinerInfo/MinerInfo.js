import React, {Component} from 'react';
import {
    View,
    Text, StyleSheet,
} from 'react-native';
import {FastDesign, backgroundColor} from '../../Styles/Styles';
import HorizontalLine from '../../Components/HorizontalLine/HorizontalLine';

class MinerInfo extends Component {

    render() {
        var upTime = this.props.upTime;
        if(upTime.includes("d")) {
          var res = upTime.split("d");
          upTime = res[0] + " روز ";
          // console.log("upTime.split(d)");
          // console.log(res);
          if(res[1].includes('h')) {
             res = res[1].split("h");
             upTime = upTime + res[0] + " ساعت " ;
             if(res[1].includes('m')) {
              res = res[1].split("m");
              upTime = upTime + res[0] + " دقیقه " ;
            }
          }
        }
        var temperature;
        // console.log(this.props.temp1);
        // console.log(this.props.temp2);
        var temp1 = this.props.temp1.map((item)=>{
           return (
              <Text style={{...FastDesign.h6, ...FastDesign.BYekanFont, ...FastDesign.textCenter}}>{item}</Text>
            );
        });
        var temp2 = this.props.temp2.map((item)=>{
           return (
              <Text style={{...FastDesign.h6, ...FastDesign.BYekanFont, ...FastDesign.textCenter}}>{item}</Text>
            );
        });
        temperature = (<View style={{...FastDesign.flexRow, ...FastDesign.flexSpaceAround,  ...FastDesign.alignSelfStretch, 
                ...FastDesign.pl1, ...FastDesign.pr1}}>
                <View style={{...FastDesign.flexColumn,  ...FastDesign.alignSelfStretch }}>
                   <Text style={{...FastDesign.h5, ...FastDesign.BYekanFont, ...FastDesign.textCenter}}>دماهای دو</Text>
                   <HorizontalLine width={1} color="#000" />
                   {temp1}
                </View>
                <View style={{...FastDesign.flexColumn,  ...FastDesign.alignSelfStretch }}>
                   <Text style={{...FastDesign.h5, ...FastDesign.BYekanFont, ...FastDesign.textCenter}}>دماهای یک</Text>
                   <HorizontalLine width={1} color="#000" />
                   {temp2}
                </View>
                </View>);
        return (
            <View style={{...FastDesign.flexColumn, ...FastDesign.alignCenter, ...styles.container, ...backgroundColor.white,
                ...FastDesign.mt2, ...FastDesign.pt2, ...FastDesign.pb2}}>
                <View style={{...FastDesign.flexRow, ...FastDesign.alignSelfStretch, ...FastDesign.flexSpaceBetween,
                 ...FastDesign.pl1, ...FastDesign.pr1}}>
                   <Text style={{...FastDesign.h5, ...FastDesign.textLeft}}>{this.props.minerName}</Text>
                   <Text style={{...FastDesign.h6, ...FastDesign.textRight}}>{this.props.ip}</Text>
                </View>
                 <HorizontalLine width={1} color="#000" />
                 <View style={{...FastDesign.flexRow, ...FastDesign.alignSelfStretch, ...FastDesign.flexSpaceBetween, 
                   ...FastDesign.pl1, ...FastDesign.pr1}}>
                   <Text style={{...FastDesign.h6, ...FastDesign.BYekanFont}}>سرعت فن ها: {this.props.fanSpeeds}</Text>
                   <Text style={{...FastDesign.h6, ...FastDesign.BYekanFont}}> نرخ هش : {this.props.totalHashrate} تراهش</Text>
                </View>
                <HorizontalLine width={1} color="#000" />
                {temperature}
                <Text style={{...FastDesign.h6, ...FastDesign.BYekanFont, ...FastDesign.textCenter}}> زمان روشن بودن: {upTime}</Text>
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