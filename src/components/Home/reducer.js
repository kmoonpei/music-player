import * as types from './actionTypes';
export  (state = {}, action) => {
    switch (action.type) {
        case types.SAVE_RANKLIST:
            return Object.assign({}, state, action.data);
        default:
            return state;
    }
};
