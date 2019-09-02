import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../utility';
import {AsyncStorage} from 'react-native';

const initialState = {
    minerStatus: [],
    loading: false,
    error: '',
    isAuthenticate: false
};

const setMinersStatus = (state, action) => {
    return updateObject(state, {minerStatus: action.minerStatus});
};

const setError = (state, action) => {
    return updateObject(state, {error: action.error});
};

const setLoading = (state, action) => {
    return updateObject(state, {loading: action.loading});
};

const setAuthenticate = (state, action) => {
    console.log("setAuthenticate reducer");
    console.log(action.isAuthenticate);
    return updateObject(state, {isAuthenticate: action.isAuthenticate});
};

const reducer = ( state = initialState, action ) => {
    switch ( action.type ) {
        case actionTypes.Set_Error: return setError(state, action);
        case actionTypes.Set_MinerStatus: return setMinersStatus(state, action);
        case actionTypes.Set_Loading: return setLoading(state, action);
        case actionTypes.Set_Auth: return setAuthenticate(state, action);
        default:
            return state;
    }
};

export default reducer;
