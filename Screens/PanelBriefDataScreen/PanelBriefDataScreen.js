import React, {Component} from 'react';
import {
    View, AsyncStorage,
    Text,
} from 'react-native';
import {FastDesign, backgroundColor} from '../../Styles/Styles';
import {withNavigation, NavigationActions} from 'react-navigation'
import Icon from 'react-native-vector-icons/MaterialIcons';
import InfoCard from '../../Components/InfoCard/InfoCard';
import axios from 'axios';
import * as actions from '../../Redux/actions/auth';
import { connect } from 'react-redux';

class PanelBriefDataScreen extends Component {
    static navigationOptions = {
        tabBarLabel: "مختصر",
        tabBarIcon:  ({ focused, tintColor }) => {
            return <Icon size={30} name="dashboard" color={tintColor} />;
        },
    }

    state = {idValue: '', totalTrahash: 0, devicesNum: 0, activeDevices: 0, inActiveDevices: 0, data: []};

    componentDidMount() {
      // console.log("componentDidMount PanelBriefDataScreen");
      //  AsyncStorage.getItem('idValue').then((value) => {
      //   console.log("AsyncStorage PanelBriefDataScreen");
      //   console.log(value);
      //    this.setState({ 'idValue': value });
      //    this.getMinerData(value);
      //  });
    }


    getMinerData = (idValue) => {
        axios.post('https://hashbazaar.com/api/miner-data',{id: idValue}).then((response)=>{
           console.log("api minerData");
           console.log(response);
           if(parseInt(response.data.error) === 500) {
            console.log("api minerData");console.log('error500');
           } else {
              var data = response.data;
              var totalTrahash = 0; 
              for(var i=0; i<data.length;i++) {
                var temp = data[i].totalHashrate;
                if (typeof temp === 'string') {temp = temp.replace(",", ""); }
                 totalTrahash = totalTrahash + parseInt(temp);
                 console.log("totalTrahash");console.log(totalTrahash);
                 console.log(i+" totalTrahash");console.log(temp);
              }
              console.log("data");console.log(data);
              this.setState({totalTrahash: totalTrahash, devicesNum: data.length, 
                activeDevices: data.length, inActiveDevices: 0, data: data});
           }
        }).catch((err)=> {
           console.log("api minerData err");
           console.log(err);
        });
    }

    render() {
        var briefData;
        var poolData;
        if(this.props.poolData.length > 0) {
           poolData = this.props.poolData.map((item) => {
            return (<View style={{...FastDesign.flexColumn}}>
               <Text style={{...FastDesign.h5, ...FastDesign.textCenter, ...FastDesign.BYekanFont}}>{item.type.toUpperCase()}</Text>
              </View>);
           });
        }
        if(this.props.minerStatus.length > 0) {
           var data = this.props.minerStatus;
           var totalTrahash = 0; 
              for(var i=0; i<data.length;i++) {
                var temp = data[i].totalHashrate;
                if (typeof temp === 'string') {temp = temp.replace(",", ""); }
                 totalTrahash = totalTrahash + parseInt(temp);
                 console.log("totalTrahash");console.log(totalTrahash);
                 console.log(i+" totalTrahash");console.log(temp);
              }
          briefData = <View style={{...FastDesign.flexRow, ...FastDesign.alignSelfStretch, ...FastDesign.flexSpaceBetween, ...FastDesign.flewWrap,}}>
                    <InfoCard title="مجموع تراهش ها" text={totalTrahash} />
                    <InfoCard title="تعداد دستگاه ها" text={data.length} />
                    <InfoCard title="دستگاه های فعال" text={data.length} />
                    <InfoCard title="دستگاه های غیرفعال" text="0" />
                </View>;
        }
        return (
            <View style={{...FastDesign.flexOne, ...FastDesign.flexColumn, ...FastDesign.alignSelfStretch, ...FastDesign.pl2, ...FastDesign.pr2,
                ...FastDesign.pt3, ...backgroundColor.grey}}>
                {briefData}
                {poolData}
            </View>
        )
    }
}

const mapStateToProps = state => {
    return {
        loading: state.auth.loading,
        isAuthenticate: state.auth.isAuthenticate,
        minerStatus: state.auth.minerStatus,
        error: state.auth.error,
        poolData: state.auth.poolData
    };
};

const mapDispatchToProps = dispatch => {
    return {
        getMinerStatus: (idValue) => dispatch( actions.getMinerStatus(idValue) ),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(PanelBriefDataScreen);

// export default PanelBriefDataScreen;