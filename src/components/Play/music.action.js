import * as types from '../../actionTypes';
const MusicAction = (kind, data) => {
    switch (kind) {
        case 'music':
            return {
                type: types.MUSICVOICE,
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
export { MusicAction ,VolumeAction }