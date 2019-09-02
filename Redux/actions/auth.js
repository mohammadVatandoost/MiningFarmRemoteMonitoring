import * as actionTypes from './actionTypes';
import {AsyncStorage} from 'react-native';
import axios from 'axios';

export const checkAuth = () => {
    console.log('auth actions checkAuth');
   return dispatch => {
    AsyncStorage.getItem('idValue').then((value) => {
        console.log("AsyncStorage idValue");
        console.log(value);
        if(value !== null) {
            dispatch( getMinerStatus(value));
        } 
     });
   };
};

export const getMinerStatus =  (value) => {
    return dispatch => {
       console.log("action getMinerStatus");
       dispatch(setLoading(true));
       dispatch(setError(''));
       axios.post('https://hashbazaar.com/api/miner-data',{id: value}).then((response)=>{
           console.log("api minerData");
           console.log(response);
           dispatch(setLoading(false));
           if(parseInt(response.data.error) === 500) {
              dispatch( setError("شناسه شما اشتباه است."));
              dispatch(setLoading(false));
           } else {
              AsyncStorage.setItem('idValue', value);
              dispatch( setAuth(true) );
              dispatch(setLoading(false));
              dispatch( setMinersStatus(response.data) );
           }
        }).catch((err)=> {
           console.log("api minerData err");
           console.log(err);
        });
    };
}

export const setError = (error) => {
     return {
        type: actionTypes.Set_Error,
        error: error         
     }
}

export const setMinersStatus = (minerStatus) => {
    return {
        type: actionTypes.Set_MinerStatus,
        minerStatus: minerStatus,
    }
}

export const setLoading = (loading) => {
    return {
        type: actionTypes.Set_Loading,
        loading: loading,
    }
}

export const setAuth = (isAuthenticate) => {
    return {
        type: actionTypes.Set_Auth,
        isAuthenticate: isAuthenticate,
    }
}

// const updateStoreWallets = (wallets) => {
//     return {
//                 type: actionTypes.Update_Wallet,
//                 wallets: wallets
//             }
// }