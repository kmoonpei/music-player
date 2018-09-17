import * as types from '../../actionTypes';

const ArtistsAction = (data) => {
    return {
        type: types.ARTISTS_LIST,
        data: data
    }
}

export { ArtistsAction }