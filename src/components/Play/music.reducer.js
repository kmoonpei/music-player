import * as types from '../../actionTypes';
const MusicState=(state = {}, action)=> {
    switch (action.type) {
        case types.MUSIC:
            return action.data;
            break;
        default:
            return state;
    }
}
const VolumeState=(state = 0.5, action)=> {
    switch (action.type) {
        case types.VOLUME:
            return action.data;
            break;
        default:
            return state;
    }
}
export { MusicState, VolumeState }