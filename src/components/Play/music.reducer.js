import * as types from '../../actionTypes';
//当前播放歌曲对象
const MusicState=(state = {}, action)=> {
    switch (action.type) {
        case types.MUSIC:
            return action.data;
            break;
        default:
            return state;
    }
}
//音量控制
const VolumeState=(state = 0.5, action)=> {
    switch (action.type) {
        case types.VOLUME:
            return action.data;
            break;
        default:
            return state;
    }
}
//当前播放歌曲是否为喜欢
const FavorState = (state=null,action) => {
    switch (action.type) {
        case types.ISFAVOR:
            return action.data;
            break;
        default:
            return state;
    }
}
//播放控制
const IsPlayState = (state=true,action) => {
    switch (action.type) {
        case types.ISPLAY:
            return action.data;
            break;
        default:
            return state;
    }
}
// 歌词同步
const LyricsUpdate = (state = {}, action) => {
    switch (action.type) {
        case types.UPDATELYRIC:
            return Object.assign({}, state, action.data);
        default:
            return state;
    }
};
// 播放进度
const progress = (state = {currentTime: 0, percentage: 0}, action) => {
    switch (action.type) {
        case types.PROGRESS:
            return Object.assign({}, state, action.data);
        default:
            return state;
    }
};
// 声音对象
const audio = (state = {}, action) => {
    switch (action.type) {
        case types.AUDIOOBJ:
            return Object.assign({}, state, action.data);
        default:
            return state;
    }
};
export { MusicState, VolumeState, FavorState, IsPlayState, LyricsUpdate, progress, audio }