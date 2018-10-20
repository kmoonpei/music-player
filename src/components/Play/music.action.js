import * as types from '../../actionTypes';
import API from '../../utils/API';

const MusicAction = (kind, data) => {
    switch (kind) {
        case 'music':
            return {
                type: types.MUSIC,
                data: data
            };
            break;
    }
}
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

const ToPause = (data) => {
    return {
        type: types.ISPLAY,
        data: data
    }
}

const TofavorAction = (data) => {
    return {
        type: types.ISFAVOR,
        data: data
    }
}
const FetchMusic = (hash,favorList) => {
    return async dispatch =>{
        try {
            let res_song = await fetch(`/kugou${API.song_detail}?cmd=playInfo&hash=${hash}`);
            let data_song = await res_song.json();
            let res_lyrics = await fetch(`/kugou${API.song_lyrics}?cmd=100&hash=${hash}&timelength=${data_song.timeLength}`);
            let data_lyrics = await res_lyrics.text();
            let musicObjec = {song:data_song,lyrics:data_lyrics}
            dispatch(MusicAction('music',musicObjec))
            let tag = false
            favorList.forEach(element => {
                if(element.hash === musicObjec.song.hash){
                    tag = true;
                    return
                }
            });
            dispatch(TofavorAction(tag))
        } catch (err) {
            console.log('Error', err)
        }
    }
}
export { MusicAction ,VolumeAction, FetchMusic, TofavorAction }