import * as types from '../../actionTypes';

const AlbumsAction = (data) => {
    return {
        type: types.ALBUMS,
        data: data
    }
}

export { AlbumsAction }