import React, {Component} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
} from 'react-native';


import PanelBriefDataScreen from './Screens/PanelBriefDataScreen/PanelBriefDataScreen';
import AuthScreen from './Screens/AuthScreen/AuthScreen';
import PanelDetailDataScreen from './Screens/PanelDetailDataScreen/PanelDetailDataScreen';
import {createStackNavigator, createAppContainer, createSwitchNavigator, createBottomTabNavigator} from 'react-navigation';
import { createStore, applyMiddleware, compose, combineReducers } from "redux";
import { Provider } from 'react-redux';
import thunk from "redux-thunk";
import auth from './Redux/reducers/auth';
import {checkAuth} from './Redux/actions/auth';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

// const config = {
//     key: 'primary',
//     storage
// }


 const rootReducer = combineReducers({
    auth: auth
});
 
const store = createStore(rootReducer, composeEnhancers(
    applyMiddleware(thunk)
));

store.dispatch(checkAuth());
// const SwitchNavigator = createSwitchNavigator({
//     PanelBriefDataScreen: PanelBriefDataScreen, // This screen renders a navigator!
//     PanelDetailDataScreen: PanelDetailDataScreen,
// });

const SwitchNavigator = createBottomTabNavigator({
    PanelBriefDataScreen,
    PanelDetailDataScreen,
},{
    tabBarOptions: {
        activeTintColor: '#FF5722',
        // activeColor: 'blue',
        labelStyle: {fontSize: 20, fontWeight: 'bold', fontFamily: 'BYekan'},
        // tabStyle: {paddingBottom: 5},
        style: {paddingBottom: 5, paddingTop: 5, height: 60,},
        showLabel: false,
        // showIcon: false,
    }
});


class Panel extends Component {
    static router = SwitchNavigator.router;
    static navigationOptions = {
        header: null
    }
    render() {
        return (
            <SwitchNavigator navigation={this.props.navigation} />
        )
    }
}

const AuthenticationNavigator = createStackNavigator({
    Auth: AuthScreen,
    Panel: Panel,
});

const AppContainer = createAppContainer(AuthenticationNavigator);

class App extends React.Component {
    render() {
        return (
           <Provider store={store}>
                <AppContainer/>
            </Provider>
         );
    }
}

export default App;