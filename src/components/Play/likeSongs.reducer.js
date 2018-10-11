import * as types from '../../actionTypes';
const init_state = { list: [] }
export default function LikeSongsListState(state = init_state, action) {
    switch (action.type) {
        case types.LIKESONGS:
            return Object.assign({}, state, action.data);
            break;
        default:
            return state;
    }
}