import * as types from '../../actionTypes';
const initState = { list: [] }
export default function AlbumsList(state = initState, action) {
    switch (action.type) {
        case types.ALBUMS:
            return Object.assign({}, state, action.data);
        default:
            return state;
    }
};
