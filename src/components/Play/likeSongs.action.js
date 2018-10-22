import * as types from '../../actionTypes';
const LikeSongsAction = (kind, data) => {
    switch (kind) {
        case 'LikeSongs':
            data.list=data.list.map((item,i)=>{
                item.hash=item.hash.toUpperCase()
                return item
            })
            return {
                type: types.LIKESONGS,
                data: data
            };
            break;
    }
}
export { LikeSongsAction }