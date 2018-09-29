import * as types from '../../actionTypes';
const PlayListAction = (kind, data) => {
    switch (kind) {
        case 'SavePlayList':
            return {
                type: types.PLAYLIST,
                data: data
            };
            break;
    }
}
export { PlayListAction }