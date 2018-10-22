import * as types from '../../actionTypes';
import API from '../../utils/API';
import {parseLyric} from '../../utils/tools';

//当前播放歌曲
const MusicAction = (kind, data) => {
    switch (kind) {
        case 'music':
            if(data.song){
                data.song.hash = data.song.hash.toUpperCase()
            }
            return {
                type: types.MUSIC,
                data: data
            };
            break;
    }
}
//音量控制
const VolumeAction = (kind, data) => {
    switch (kind) {
        case 'volume':
            return {
                type: types.VOLUME,
                data: data
            };
            break;
    }
}
//播放控制
const ToPlay = (data) => {
    return {
        type: types.ISPLAY,
        data: data
    }
}
//当前播放是否喜欢
const TofavorAction = (data) => {
    return {
        type: types.ISFAVOR,
        data: data
    }
}

//歌词同步
const UpdataLyric = (data) => {
    return {
        type: types.UPDATELYRIC,
        data: data
    }
}
//播放进度
const Progress = (data) => {
    return {
        type: types.PROGRESS,
        data: data
    }
}
//声音对象
const audioObj = (data) => {
    return {
        type: types.AUDIOOBJ,
        data: data
    }
}
//获取歌曲信息
const FetchMusic = (hash,favorList) => {
    return async dispatch =>{
        try {
            let res_song = await fetch(`/kugou${API.song_detail}?cmd=playInfo&hash=${hash}`);
            let data_song = await res_song.json();
            let res_lyrics = await fetch(`/kugou${API.song_lyrics}?cmd=100&hash=${hash}&timelength=${data_song.timeLength}`);
            let data_lyrics = await res_lyrics.text();
            let musicObjec = {song:data_song,lyrics:parseLyric(data_lyrics)}
            dispatch(MusicAction('music',musicObjec))
            let tag = false
            favorList.forEach(element => {
                if(element.hash === musicObjec.song.hash){
                    tag = true;
                    return
                }
            });
            dispatch(TofavorAction(tag))
            dispatch(ToPlay(true))
        } catch (err) {
            console.log('Error', err)
        }
    }
}
export { MusicAction, VolumeAction, FetchMusic, TofavorAction, ToPlay, Progress, UpdataLyric, audioObj }