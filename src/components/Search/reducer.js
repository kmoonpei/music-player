import * as types from '../../actionTypes';
const initState = { list: [] }
export default function HotSearch(state = initState, action) {
    switch (action.type) {
        case types.HOTWORD:
            return Object.assign({}, state, action.data);
        default:
            return state;
    }
};

