import * as types from '../../actionTypes';
const init_state = { list: [] }
export default function PlayListState(state = init_state, action) {
    switch (action.type) {
        case types.PLAYLIST:
            return Object.assign({}, state, action.data);
            break;
        default:
            return state;
    }
}