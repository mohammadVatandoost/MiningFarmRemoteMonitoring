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
            dispatch( getPoolsData(value) );
        } 
     });
   };
};

export const refresh = (id) => {
  return dispatch => {
    dispatch( getMinerStatus(id));
    dispatch( getPoolsData(id) );
  };
}

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
              dispatch( setMinersStatus(response.data, value) );    
           }
        }).catch((err)=> {
           console.log("api minerData err");
           console.log(err);
        });
    };
}

export const getPoolsData = (id) => {
  return dispatch => {
    console.log("action getPoolsData");
     axios.post('https://hashbazaar.com/api/get-pool-data',{id: id}).then((response)=>{
           console.log("api pool data");
           console.log(response);
           if(parseInt(response.data.code) === 200) {
            console.log("correct data");
              // dispatch( setError("شناسه شما اشتباه است."));
              // dispatch(setLoading(false));
              dispatch( setPoolData(response.data.message) );
           } else {
            console.log("not correct data");
              // dispatch( setPoolData(response.data) );
           }
        }).catch((err)=> {
           console.log("api getPoolsData error ");
           console.log(err);
        });
      };
}

export const setPoolData = (poolData) => {
     return {
        type: actionTypes.Set_Pool_Data,
        poolData: poolData         
     }
}

export const setError = (error) => {
     return {
        type: actionTypes.Set_Error,
        error: error         
     }
}

export const setMinersStatus = (minerStatus, id) => {
    return {
        type: actionTypes.Set_MinerStatus,
        minerStatus: minerStatus,
        id: id
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