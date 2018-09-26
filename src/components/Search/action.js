import * as types from '../../actionTypes';
const HotSearchAction = (kind, data) => {
    switch (kind) {
        case 'HOTWORD':
            return {
                type: types.HOTWORD,
                data: data
            };
            break;
        case 'SEARCHWORD':
            return {
                type: types.SEARCHWORD,
                data: data
            }
    }

};
export { HotSearchAction };