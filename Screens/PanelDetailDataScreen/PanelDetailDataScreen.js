import React, {Component} from 'react';
import {
    View, AsyncStorage,
    Text,StyleSheet, ScrollView
} from 'react-native';
import {FastDesign, backgroundColor} from '../../Styles/Styles';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { Table, Row, Rows } from 'react-native-table-component';
import axios from 'axios';
import MinerInfo from '../../Components/MinerInfo/MinerInfo';
import * as actions from '../../Redux/actions/auth';
import { connect } from 'react-redux';

class PanelDetailDataScreen extends Component {
    static navigationOptions = {
        tabBarLabel: "جزئی",
        tabBarIcon: ({ focused, tintColor }) => {
            return <Icon size={30} name="list" color={tintColor} />;
        },
    };

    constructor(props) {
        super(props);
        this.state = {
            tableHead: ['نرخ هش (TH)','زمان کارکرد','فن 2','فن 1','دمای 2', 'دمای 1', 'ip', 'نام'],
            tableData: [
                ['14.542','3:45','4800 rpm','4200 rpm','75-78-81', '75-78-81', '192.168.1.22', 'S11'],
                ['14.542','3:45','4800 rpm','4200 rpm','75-78-81', '75-78-81', '192.168.1.22', 'S11'],
                ['14.542','3:45','4800 rpm','4200 rpm','75-78-81', '75-78-81', '192.168.1.22', 'S11'],
                ['14.542','3:45','4800 rpm','4200 rpm','75-78-81', '75-78-81', '192.168.1.22', 'S11']
            ],
            widthArr: [150, 80, 80, 80, 100, 100, 150, 50],
            idValue: '', data: []
        }
    }

    componentDidMount() {
       // AsyncStorage.getItem('idValue').then((value) => {
       //   this.setState({ 'idValue': value });
       //   this.getMinerData(value);
       // });
    }

    getMinerData = (idValue) => {
        axios.post('https://hashbazaar.com/api/miner-data',{id: idValue}).then((response)=>{
           console.log("api minerData");
           console.log(response);
           if(parseInt(response.data.error) === 500) {
            console.log("api minerData");console.log('error500');
           } else {
              var data = response.data;
              // var totalTrahash = 0; 
              // for(var i=0; i<data.length;i++) {
              //    totalTrahash = totalTrahash + parseInt(data[i].totalHashrate);
              // }
              this.setState({data: data})
           }
        }).catch((err)=> {
           console.log("api minerData err");
           console.log(err);
        });
    }

    render() {
        const state = this.state; 
        var dataShowing;
        if(this.props.minerStatus.length > 0) {
         dataShowing = this.props.minerStatus.map((item, index) => {
            var fanSpeeds = "";
            for(var i=0; i< item.fanSpeeds.length;i++) {
              fanSpeeds = fanSpeeds + item.fanSpeeds[i];
              if(i !== (item.fanSpeeds.length-1)) {fanSpeeds = fanSpeeds + " , ";}
            }
            var temp1 = "";
            for(var i=0; i< item.temp1.length;i++) {
              temp1 = temp1 + item.temp1[i];
              if(i !== (item.temp1.length-1)) {temp1 = temp1 + " , ";}
            }

            var temp2 = "";
            for(var i=0; i< item.temp2.length;i++) {
              temp2 = temp2 + item.temp2[i];
              if(i !== (item.temp2.length-1)) {temp2 = temp2 + " , ";}
            }

            return (<MinerInfo key={index} minerName={item.minerName} ip={item.ip} fanSpeeds={fanSpeeds}
            totalHashrate={item.totalHashrate} temp1={item.temp1} temp2={item.temp2} upTime={item.upTime} />)
         });
        }
        return (
            <View style={{...FastDesign.flexOne,...FastDesign.flexColumn, ...FastDesign.alignSelfStretch,
                 ...backgroundColor.grey}}>
               <View style={{marginTop: 40}}>
                <ScrollView>
                <View style={{...FastDesign.flexRow, ...FastDesign.alignSelfStretch, ...FastDesign.flewWrap,
                 ...FastDesign.alignCenter, ...FastDesign.justifyContent}}>
                  {dataShowing}
                 </View>
                </ScrollView>
               </View>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: { flex: 1, padding: 16, paddingTop: 30, backgroundColor: '#fff' },
    head: { height: 40, backgroundColor: '#f1f8ff' },
    text: { textAlign: 'center', fontFamily: 'BYekan' },
    textHead: {fontFamily: 'BYekan', textAlign: 'center', paddingLeft: 2, paddingRight: 2,},
});

// export default PanelDetailDataScreen;

const mapStateToProps = state => {
    return {
        loading: state.auth.loading,
        isAuthenticate: state.auth.isAuthenticate,
        minerStatus: state.auth.minerStatus,
        error: state.auth.error,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        getMinerStatus: (idValue) => dispatch( actions.getMinerStatus(idValue) ),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(PanelDetailDataScreen);

// <Table borderStyle={{borderWidth: 1, borderColor: '#c8e1ff'}}>
//                     <Row data={state.tableHead} widthArr={state.widthArr} style={styles.head} textStyle={styles.textHead}/>
//                     <Rows data={state.tableData} widthArr={state.widthArr} textStyle={styles.text}/>
//                   </Table>