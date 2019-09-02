import React, {Component} from 'react';
import {
    View, TextInput, Button, StyleSheet,
    Text, Image, Linking, AsyncStorage
} from 'react-native';
import {FastDesign, textColor, bcackGroundColor} from '../../Styles/Styles';
import {withNavigation, NavigationActions} from 'react-navigation'
import TextInputCurved from '../../Components/TextInputCurved/TextInputCurved';
import ButtonCurved from '../../Components/ButtonCurved/ButtonCurved';
import ButtonGradientCurved from '../../Components/ButtonGradientCurved/ButtonGradientCurved';
import HrefLink from '../../Components/HrefLink/HrefLink';
import axios from 'axios';
import Spinner from 'react-native-loading-spinner-overlay';
import * as actions from '../../Redux/actions/auth';
import { connect } from 'react-redux';

class AuthScreen extends Component {
    static navigationOptions = {
        header: null
    }

    state = {idValue: '', error: false, spinner: false};

    componentDidMount() {
      // console.log("AuthScreen componentDidMount");
      //  AsyncStorage.getItem('idValue').then((value) => {
      //   console.log("AuthScreen AsyncStorage");
      //   console.log(value);
      //    this.setState({ 'idValue': value });
      //    this.getMinerData(value);
      //  });
    }

    registerBtn = () => {
       if(this.state.idValue === '') {
         this.setState({error: 'لطفا شناسه خود را وارد کنید.'}); 
       } else {
         this.props.getMinerStatus(this.state.idValue);
       }
        
        // console.log("registerBtn");
        // this.setState({spinner: true});
        // console.log(this.state.idValue);
        // axios.post('https://hashbazaar.com/api/miner-data',{id: this.state.idValue}).then((response)=>{
        //    console.log("api minerData");
        //    console.log(response);
        //    if(parseInt(response.data.error) === 500) {
        //       this.setState({error: true, spinner: false});
        //    } else {
        //       this.setState({ spinner: false});
        //       AsyncStorage.setItem('idValue', this.state.idValue);
        //       this.props.navigation.navigate('Panel');
        //    }
        // }).catch((err)=> {
        //    console.log("api minerData err");
        //    console.log(err);
        // });
    };

    getMinerData = (idValue) => {
        axios.post('https://hashbazaar.com/api/miner-data',{id: idValue}).then((response)=>{
           console.log("api minerData");
           console.log(response);
           if(parseInt(response.data.error) === 500) {
              // this.setState({error: true, spinner: false});
           } else {
              // this.setState({ spinner: false});
              // AsyncStorage.setItem('idValue', this.state.idValue);
              this.props.navigation.navigate('Panel');
           }
        }).catch((err)=> {
           console.log("api minerData err");
           console.log(err);
        });
    }

    setText = (text) => {
        // console.log(text);
        this.setState({idValue: text});
    };

    openHashbazaarLogin = () => {
        Linking.canOpenURL('https://www.hashbazaar.com/fa/login').then(supported => {
            if (supported) {
                Linking.openURL('https://www.hashbazaar.com/fa/login');
            } else {
                console.log("Don't know how to open URI: " + this.props.url);
            }
        });
    };

    openHashbazaarRegister = () => {
        Linking.canOpenURL('https://www.hashbazaar.com/fa/signup?plan=classic').then(supported => {
            if (supported) {
                Linking.openURL('https://www.hashbazaar.com/fa/signup?plan=classic');
            } else {
                console.log("Don't know how to open URI: " + this.props.url);
            }
        });
    };

    render() {
        var textError, buuton;
        if(this.state.error) {
           textError = <Text style={{...FastDesign.textCenter, ...FastDesign.BYekanFont, ...FastDesign.h5, ...textColor.red }}>شناسه شما اشتباه است.</Text>
        }

        if(this.props.error !== '') {
            textError = <Text style={{...FastDesign.textCenter, ...FastDesign.BYekanFont, 
              ...FastDesign.h5, ...textColor.red }}>{this.props.error}</Text>
        }

        if(!this.props.loading) {
          buuton = <ButtonGradientCurved onPress={this.registerBtn} text="ثبت"
                              styleText={{...FastDesign.h3, ...FastDesign.BYekanFont, ...FastDesign.textCenter, ...textColor.white, ...FastDesign.pt1, ...FastDesign.pb1}} />;
        }
        if(this.props.isAuthenticate) {
          console.log("isAuthenticate true");
          this.props.navigation.navigate('Panel');
        }
        console.log("isAuthenticate");console.log(this.props.isAuthenticate);
        return (
            <View style={{...FastDesign.flexColumn, ...FastDesign.alignCenter, ...FastDesign.pl4, ...FastDesign.pr4}}>
                <Text style={{...FastDesign.textCenter, ...FastDesign.BYekanFont, ...FastDesign.h4 }}>ماینرهای خود را از راه دور مشاهد کنید.</Text>
                {textError}
                <TextInputCurved value={this.state.idValue} onChangeText={this.setText} placeholder="شناسه"/>
                {buuton}
                <Spinner visible={this.props.loading} textContent={'لطفا صبر کنید...'} textStyle={styles.spinnerTextStyle} />
                {/*<Text style={{...FastDesign.textCenter, ...FastDesign.BYekanFont, ...FastDesign.h5}}>لططا با مراجعه به سایت hashbazaar.com ، شناسه خود را دریافت کنید و در فرم زیر وارد کنید</Text>*/}
                <View style={{ ...FastDesign.flexRow, ...FastDesign.alignSelfStretch, ...FastDesign.flexSpaceBetween, ...FastDesign.mt2, }}>
                  <HrefLink onPress={this.openHashbazaarLogin} text="شناسه خود را فراموش کردید؟" styleText={{...textColor.blue, ...FastDesign.textCenter, ...FastDesign.BYekanFont}}  />
                  <HrefLink onPress={this.openHashbazaarRegister} text="ثبت نام نکرده اید؟" styleText={{...textColor.blue, ...FastDesign.textCenter, ...FastDesign.BYekanFont}}  />
                </View>
                {/*<Button style={{...FastDesign.mb1}} onPress={this.openHashbazaarLogin} title=/>*/}
                {/*<Button style={{...FastDesign.mt1}} onPress={this.openHashbazaarRegister} title="ثبت نام نکرده اید؟" />*/}
            </View>
        )
    }
}

const styles = StyleSheet.create({
  spinnerTextStyle: {
    color: '#FFF'
  },
});

const mapStateToProps = state => {
    return {
        loading: state.auth.loading,
        isAuthenticate: state.auth.isAuthenticate,
        minerStatus: state.auth.minerStatus,
        error: state.auth.error
    };
};

const mapDispatchToProps = dispatch => {
    return {
        getMinerStatus: (idValue) => dispatch( actions.getMinerStatus(idValue) ),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(AuthScreen);

// export default AuthScreen;