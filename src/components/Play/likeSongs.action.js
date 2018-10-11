import * as types from '../../actionTypes';
const LikeSongsAction = (kind, data) => {
    switch (kind) {
        case 'LikeSongs':
            return {
                type: types.LIKESONGS,
                data: data
            };
            break;
    }
}
export { LikeSongsAction }