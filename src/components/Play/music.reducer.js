import * as types from '../../actionTypes';
const MusicState=(state = {}, action)=> {
    switch (action.type) {
        case types.MUSICVOICE:
            return action.data;
            break;
        default:
            return state;
    }
}
const VolumeState=(state = {}, action)=> {
    switch (action.type) {
        case types.VOLUME:
            return action.data;
            break;
        default:
            return state;
    }
}
export { MusicState, VolumeState }