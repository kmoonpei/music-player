import * as types from '../../actionTypes';
const initState = { list: [] }
export default function Ranks(state = initState, action) {
    switch (action.type) {
        case types.RANKLIST:
            return Object.assign({}, state, action.data);
        default:
            return state;
    }
};

