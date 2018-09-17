import * as types from '../../actionTypes';
export default function AlbumsList(state = {}, action) {
    switch (action.type) {
        case types.ALBUMS:
            return Object.assign({}, state, action.data);
        default:
            return state;
    }
};
