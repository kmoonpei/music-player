import * as types from '../../actionTypes';
const PlayListAction = (kind, data) => {
    switch (kind) {
        case 'SavePlayList':
            data.list=data.list.map((item,i)=>{
                item.hash=item.hash.toUpperCase()
                return item
            })
            return {
                type: types.PLAYLIST,
                data: data
            };
            break;
    }
}
export { PlayListAction }