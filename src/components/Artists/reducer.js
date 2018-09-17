import * as types from '../../actionTypes';
const initState = { list: [] }
export default function Artists(state = initState, action) {
    switch (action.type) {
        case types.ARTISTS_LIST:
            return Object.assign({}, state, action.data);
        default:
            return state;
    }
};
