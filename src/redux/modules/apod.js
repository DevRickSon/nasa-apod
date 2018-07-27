import {createAction, handleActions} from 'redux-actions';
import * as api from 'lib/api';

const GET_APOD_PENDINTG = 'apod/GET_APOD_PENDING';
const GET_APOD_FULFILLED = 'apod/GET_APOD_FULFILLED';
const GET_APOD_REJECTED = 'apod/GET_APOD_REJECTED';

const pending = createAction(GET_APOD_PENDINTG);
const fulfilled = createAction(GET_APOD_FULFILLED);
const rejected = createAction(GET_APOD_REJECTED);

export const getAPOD = date => async dispatch => {
    dispatch(pending());

    try{
        const response = await api.getAPOD(date);
        dispatch(fulfilled(response.data));
    }catch(e){
        dispatch(rejected());
    }
};

const initialState = {
    date: null,
    maxDate: null,
    mediaType: null,
    pending: false,
    rejected: false,
    url: null
};

export default handleActions({
    [GET_APOD_PENDINTG]: state => {
        return {
            ...state,
            pending: true,
            rejected: false
        }
    },

    [GET_APOD_FULFILLED]: (state, action) => {
        const {date, media_type: mediaType, url} = action.payload;
        const {maxDate} = state;
        let newState = {
            ...state,
            date,
            mediaType,
            pending: false,
            url
        };

        if(!maxDate) newState.maxDate = date;

        return newState;
    },

    [GET_APOD_REJECTED]: state => {
        return {
            ...state,
            pending:false,
            rejected: true
        };
    }
}, initialState);